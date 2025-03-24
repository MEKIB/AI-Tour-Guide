import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import nodemailer from 'nodemailer'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Hotel from './modules/Hotel.js'; 
import Amenity from './modules/Facilities.js'; 
import HotelRules from './modules/HotelRules.js'; 
import HotelAdminList from './modules/HotelAdminList.js'; 
import ApprovedHotelAdmin from './modules/ApprovedHotelAdminLists.js';
import SystemAdminModel from './modules/SystemAdminLists.js';
import userModel from './modules/User.js';
import { authMiddleware,adminMiddleware } from './Routes/middleware.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));
console.log('Serving static files from:', uploadsDir);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpeg, jpg, png) and PDFs are allowed'));
  },
});




// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};













app.post('/api/hotels', verifyToken, upload.array('images', 10), async (req, res) => {
  try {
    const { name, location, facilityType, description, lat, long } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        name: file.filename,
        url: `/uploads/${file.filename}`,
      }));
    }

    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: 'Hotel admin not found' });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;

    // Check if a hotel already exists for this hotelAdminId
    const existingHotel = await Hotel.findOne({ HotelAdminId: hotelAdminId });
    if (existingHotel) {
      // Update existing hotel
      const updatedHotel = await Hotel.findOneAndUpdate(
        { HotelAdminId: hotelAdminId },
        {
          name,
          location,
          facilityType,
          description,
          lat,
          long,
          images: images.length > 0 ? images : existingHotel.images, // Keep old images if no new ones
        },
        { new: true }
      );
      res.json({ message: 'Hotel updated successfully', data: updatedHotel });
    } else {
      // Create new hotel
      const newHotel = new Hotel({
        HotelAdminId: hotelAdminId,
        name,
        location,
        facilityType,
        description,
        lat,
        long,
        images,
      });
      await newHotel.save();
      res.json({ message: 'Hotel created successfully', data: newHotel });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



app.get('/api/hotel/admin', verifyToken, async (req, res) => {
  console.log('Request received at /api/hotel/admin');
  try {
      const email = req.user.email;

      const approvedAdmin = await ApprovedHotelAdmin.findOne({ email: email });

      if (!approvedAdmin) {
          console.log('Hotel admin not found');
          return res.status(404).json({ message: 'Hotel admin not found' });
      }

      const hotelAdminId = approvedAdmin.hotelAdminId;
      console.log("HotelAdminId from ApprovedAdmin:", hotelAdminId);

      const hotel = await Hotel.findOne({ HotelAdminId: hotelAdminId });

      if (!hotel) {
          console.log('Hotel not found for hotelAdminId:', hotelAdminId);
          return res.status(404).json({ message: 'Hotel not found' });
      }


      res.json(hotel);
  } catch (error) {
      console.error('Error in /api/hotel/admin:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


// GET: Fetch Hotels with Filters (Public Route)
app.get('/api/hotels', async (req, res) => {
  try {
    const { location, facilityType } = req.query;

    // Build query object
    const query = {};
    if (location && location !== 'All Locations') {
      query.location = { $regex: location, $options: 'i' }; // Case-insensitive search
    }
    if (facilityType && facilityType !== 'All Facility Types') {
      query.facilityType = facilityType;
    }

    const hotels = await Hotel.find(query);
    if (!hotels.length) {
      return res.status(200).json({ message: 'No hotels found', data: [] });
    }

    res.json({ message: 'Hotels fetched successfully', data: hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// GET /api/hotels/admin/:hotelAdminId - Get hotel by hotelAdminId
app.get('/api/hotels/admin/:hotelAdminId', async (req, res) => {
  try {
    const { hotelAdminId } = req.params;
    
    const hotel = await Hotel.findOne({ HotelAdminId: hotelAdminId });
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found for this admin ID' });
    }

    res.json({ data: hotel });
  } catch (error) {
    console.error('Error fetching hotel by admin ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});











































// GET: Fetch Amenities for the Hotel Admin
app.get('/api/amenities', verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: 'Hotel admin not found' });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;
    const amenityDoc = await Amenity.findOne({ hotelAdminId });
    if (!amenityDoc || !amenityDoc.amenities.length) {
      return res.status(200).json({ message: 'No amenities found', data: [] });
    }

    res.json({ message: 'Amenities fetched successfully', data: amenityDoc.amenities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Add or Update Amenities
app.post('/api/amenities', verifyToken, async (req, res) => {
  try {
    const { amenities } = req.body; // Expect an array of amenities

    if (!Array.isArray(amenities)) {
      return res.status(400).json({ message: 'Request body must contain an "amenities" array' });
    }

    // Validate each amenity object
    for (const amenity of amenities) {
      if (!amenity.name || !amenity.description || !amenity.icon) {
        return res.status(400).json({
          message: 'Each amenity must have name, description, and icon fields',
        });
      }
    }

    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: 'Hotel admin not found' });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;
    const existingAmenityDoc = await Amenity.findOne({ hotelAdminId });

    if (existingAmenityDoc) {
      // Update existing amenities
      const updatedAmenityDoc = await Amenity.findOneAndUpdate(
        { hotelAdminId },
        { amenities },
        { new: true }
      );
      res.json({ message: 'Amenities updated successfully', data: updatedAmenityDoc.amenities });
    } else {
      // Create new amenities document
      const newAmenityDoc = new Amenity({
        hotelAdminId,
        amenities,
      });
      await newAmenityDoc.save();
      res.json({ message: 'Amenities created successfully', data: newAmenityDoc.amenities });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// GET: Fetch Amenities by HotelAdminId (Public Route)
app.get('/api/amenities/by-hotel', async (req, res) => {
  try {
    const { hotelAdminId } = req.query;

    if (!hotelAdminId) {
      return res.status(400).json({ message: 'HotelAdminId is required' });
    }

    const amenityDoc = await Amenity.findOne({ hotelAdminId });
    if (!amenityDoc || !amenityDoc.amenities.length) {
      return res.status(200).json({ message: 'No amenities found', data: [] });
    }

    res.json({ message: 'Amenities fetched successfully', data: amenityDoc.amenities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});















// POST: Add or Update Hotel Rules (Protected Route with Token Verification)
app.post('/api/hotel-rules', verifyToken, async (req, res) => {
  try {
    const {
      checkIn,
      checkOut,
      cancellationPolicy,
      childPolicies,
      cotAndExtraBedPolicies,
      noAgeRestriction,
      petsAllowed,
      acceptedCards,
    } = req.body;

    // Extract email from the decoded token
    const email = req.user.email;

    // Find the hotelAdminId from ApprovedHotelAdmin model
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: 'Hotel admin not found' });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;
    console.log(`The approved hotel admin ID: ${hotelAdminId}`);

    // Check if rules already exist for this hotelAdminId
    const existingRules = await HotelRules.findOne({ hotelAdminId });

    if (existingRules) {
      // Update existing rules
      await HotelRules.findOneAndUpdate(
        { hotelAdminId },
        {
          checkIn,
          checkOut,
          cancellationPolicy,
          childPolicies,
          cotAndExtraBedPolicies,
          noAgeRestriction,
          petsAllowed,
          acceptedCards,
        },
        { new: true } // Return the updated document
      );
      res.json({ message: 'Hotel rules updated successfully' });
    } else {
      // Create new rules
      const newHotelRules = new HotelRules({
        hotelAdminId,
        checkIn,
        checkOut,
        cancellationPolicy,
        childPolicies,
        cotAndExtraBedPolicies,
        noAgeRestriction,
        petsAllowed,
        acceptedCards,
      });
      await newHotelRules.save();
      res.json({ message: 'Hotel rules created successfully' });
      console.log('Hotel rules created successfully');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch Hotel Rules (Protected Route with Token Verification)
app.get('/api/hotel-rules', verifyToken, async (req, res) => {
  try {
    // Extract email from the decoded token
    const email = req.user.email;

    // Find the hotelAdminId from ApprovedHotelAdmin model
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: 'Hotel admin not found' });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;

    // Fetch existing rules
    const rules = await HotelRules.findOne({ hotelAdminId });
    if (!rules) {
      return res.status(200).json({ message: 'No rules found', data: null });
    }

    res.json({ message: 'Hotel rules fetched successfully', data: rules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// GET: Fetch Hotel Rules by HotelAdminId (Public Route)
app.get('/api/hotel-rules/by-hotel', async (req, res) => {
  try {
    const { hotelAdminId } = req.query;

    if (!hotelAdminId) {
      return res.status(400).json({ message: 'HotelAdminId is required' });
    }

    const rules = await HotelRules.findOne({ hotelAdminId });
    if (!rules) {
      return res.status(200).json({ message: 'No rules found', data: null });
    }

    res.json({ message: 'Hotel rules fetched successfully', data: rules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
































// Email transporter setup (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email
    pass: process.env.EMAIL_PASS, // Your Gmail app password (not regular password)
  },
});

// Temporary storage for verification codes (in-memory, use Redis or DB in production)
const verificationCodes = new Map();




// Signup Route
app.post(
  '/api/signup',
  upload.fields([
    { name: 'passportId', maxCount: 1 },
    { name: 'tradeLicense', maxCount: 1 },
    { name: 'managerId', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        firstName,
        middleName,
        lastName,
        location,
        email,
        password,
        phoneNumber,
        agreedToTerms,
      } = req.body;

      // Validate required fields
      if (
        !firstName ||
        !lastName ||
        !location ||
        !email ||
        !password ||
        !phoneNumber ||
        agreedToTerms === undefined
      ) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }

      if (!req.files || !req.files.passportId || !req.files.tradeLicense || !req.files.managerId) {
        return res.status(400).json({ message: 'All required documents must be uploaded' });
      }

      if (agreedToTerms !== 'true') {
        return res.status(400).json({ message: 'You must agree to the terms and conditions' });
      }

      // Check if email already exists
      const existingUser = await HotelAdminList.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Generate a 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      verificationCodes.set(email, {
        code: verificationCode,
        data: {
          firstName,
          middleName,
          lastName,
          location,
          email,
          password,
          phoneNumber,
          passportId: {
            name: req.files.passportId[0].filename,
            url: `/uploads/${req.files.passportId[0].filename}`,
          },
          tradeLicense: {
            name: req.files.tradeLicense[0].filename,
            url: `/uploads/${req.files.tradeLicense[0].filename}`,
          },
          managerId: {
            name: req.files.managerId[0].filename,
            url: `/uploads/${req.files.managerId[0].filename}`,
          },
          agreedToTerms: true,
        },
      });

      // Send verification email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${verificationCode}. Please enter this code to complete your signup.`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Verification code sent to your email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);


// Verify Email Route
app.post('/api/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and verification code are required' });
    }

    const storedData = verificationCodes.get(email);
    if (!storedData || storedData.code !== code) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(storedData.data.password, salt);

    // Create new user
    const newHotelAdmin = new HotelAdminList({
      ...storedData.data,
      password: hashedPassword,
    });

    await newHotelAdmin.save();
    verificationCodes.delete(email); // Remove the temporary data
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});




// Get All Hotel Admins (only pending ones)
app.get('/api/hotel-admins', async (req, res) => {
  try {
    const hotelAdmins = await HotelAdminList.find({ isApproved: false }).select('-password');
    res.json(hotelAdmins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Hotel Admin by ID
app.get('/api/hotel-admins/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid hotel admin ID' });
    }
    const hotelAdmin = await HotelAdminList.findById(id).select('-password');
    if (!hotelAdmin) {
      return res.status(404).json({ message: 'Hotel admin not found' });
    }
    res.json(hotelAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});















// Approve Hotel Admin and Assign HotelAdminId
app.post('/api/hotel-admins/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid hotel admin ID' });
    }
    const hotelAdmin = await HotelAdminList.findById(id);
    if (!hotelAdmin) {
      return res.status(404).json({ message: 'Hotel admin not found' });
    }

    // Assign hotelAdminId based on location
    let hotelAdminId;
    const locationLower = hotelAdmin.location.toLowerCase();
    let rangeStart, rangeEnd;

    if (locationLower.includes('bahir dar')) {
      rangeStart = 100;
      rangeEnd = 200;
    } else if (locationLower.includes('gonder')) {
      rangeStart = 300;
      rangeEnd = 400;
    } else if (locationLower.includes('lalibela')) {
      rangeStart = 400;
      rangeEnd = 500;
    } else {
      return res.status(400).json({ message: 'Location not supported for hotel admin ID assignment' });
    }

    // Find the highest existing hotelAdminId in the range (check both collections)
    const existingApprovedAdmins = await ApprovedHotelAdmin.find({
      hotelAdminId: { $gte: rangeStart, $lte: rangeEnd },
    }).sort({ hotelAdminId: -1 }).limit(1);

    const existingPendingAdmins = await HotelAdminList.find({
      hotelAdminId: { $gte: rangeStart, $lte: rangeEnd },
    }).sort({ hotelAdminId: -1 }).limit(1);

    const highestId = Math.max(
      existingApprovedAdmins.length > 0 ? existingApprovedAdmins[0].hotelAdminId : rangeStart - 1,
      existingPendingAdmins.length > 0 ? existingPendingAdmins[0].hotelAdminId : rangeStart - 1
    );

    hotelAdminId = highestId + 1;

    if (hotelAdminId > rangeEnd) {
      return res.status(400).json({ message: `No available hotel admin IDs in range ${rangeStart}-${rangeEnd}` });
    }

    // Save to ApprovedHotelAdmin collection
    const approvedHotelAdmin = new ApprovedHotelAdmin({
      firstName: hotelAdmin.firstName,
      middleName: hotelAdmin.middleName,
      lastName: hotelAdmin.lastName,
      location: hotelAdmin.location,
      email: hotelAdmin.email,
      password:hotelAdmin.password,
      phoneNumber: hotelAdmin.phoneNumber,
      passportId: hotelAdmin.passportId,
      tradeLicense: hotelAdmin.tradeLicense,
      managerId: hotelAdmin.managerId,
      hotelAdminId,
      approvedAt: new Date(),
    });
    await approvedHotelAdmin.save();

    // Optionally remove from HotelAdminList
    await HotelAdminList.findByIdAndDelete(id);

    res.json({ message: `Hotel admin ${hotelAdmin.email} approved successfully with ID ${hotelAdminId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Get All Approved Hotel Admins
app.get('/api/approved-hotel-admins', async (req, res) => {
  try {
    const approvedAdmins = await ApprovedHotelAdmin.find();
    res.json(approvedAdmins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove Approved Hotel Admin by ID
app.delete('/api/approved-hotel-admins/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid hotel admin ID' });
    }
    const result = await ApprovedHotelAdmin.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Hotel admin not found' });
    }
    res.json({ message: 'Hotel admin removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});







// Login Route (with JWT Authorization)
app.post('/api/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      const userAdmin = await ApprovedHotelAdmin.findOne({ email });

      console.log('User:', userAdmin);
      if (!userAdmin) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      console.log('User Password:', userAdmin.password);
      console.log('Password from Request:', password);

      const isPasswordValid = await bcrypt.compare(password, userAdmin.password);

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
          { userId: userAdmin._id, email: userAdmin.email, role: 'hotel-admin' },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      const { password: hashedPassword, ...userData } = userAdmin.toObject();

      res.json({
          message: 'Login successful',
          user: userData,
          token: token,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// System Admin Signup Route
app.post('/api/system-admin/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if email already exists
    const existingUser = await SystemAdminModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new system admin
    const newSystemAdmin = new SystemAdminModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newSystemAdmin.save();
    res.status(201).json({ message: 'System admin account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});






// System Admin Login Route
app.post('/api/system-admin/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      const systemAdmin = await SystemAdminModel.findOne({ email });

      console.log('System Admin:', systemAdmin);
      if (!systemAdmin) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      console.log('System Admin Password:', systemAdmin.password);
      console.log('Password from Request:', password);

      const isPasswordValid = await bcrypt.compare(password, systemAdmin.password);

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      const { password: hashedPassword, ...userData } = systemAdmin.toObject();

      res.json({ message: 'Login successful', user: userData });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});













// System Admin Login Route
app.post('/api/system-admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the system admin by email
    const systemAdmin = await SystemAdminModel.findOne({ email });

    if (!systemAdmin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, systemAdmin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Send back user data (excluding password)
    const { password: hashedPassword, ...userData } = systemAdmin.toObject();

    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});






























app.post('/register',upload.single('passportOrId'), async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      acceptedTerms
    } = req.body;
    const passportOrId = req.file ? req.file.path : null;
    // Validation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new userModel({
      firstName,
      middleName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      passportOrId, // In production, handle file upload separately
      acceptedTerms
    });

    await user.save();

    // Create and return JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user (protected route)
app.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin route example (protected + admin only)
app.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await userModel.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});










// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/AI_Tour_Guide')
  .then(() => console.log('The database connected successfully (local)'))
  .catch((error) => console.log('Error connecting to local database:', error));

// Start Server
const port = process.env.PORT || 2001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});