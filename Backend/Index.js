import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import Hotel from './modules/Hotel.js'; // Ensure correct path
import Amenity from './modules/Facilities.js'; // Ensure correct path
import HotelRules from './modules/HotelRules.js'; // Ensure correct path
import HotelAdminList from './modules/HotelAdminList.js'; // Ensure correct path
import router from './Routes/Routes.js'; // Ensure correct path
import ApprovedHotelAdmin from './modules/ApprovedHotelAdminLists.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Create/Update Hotel
app.post('/api/hotels', upload.array('images', 10), async (req, res) => {
  try {
    const { name, location, facilityType, description, lat, long, id } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        name: file.filename,
        url: `/uploads/${file.filename}`,
      }));
    }

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid hotel ID' });
      }
      await Hotel.findByIdAndUpdate(id, {
        name,
        location,
        facilityType,
        description,
        lat,
        long,
        images,
      });
      res.json({ message: 'Hotel updated successfully' });
    } else {
      const newHotel = new Hotel({
        name,
        location,
        facilityType,
        description,
        lat,
        long,
        images,
      });
      await newHotel.save();
      res.json({ message: 'Hotel created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Hotel by ID
app.get('/api/hotels/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid hotel ID' });
    }
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all amenities
app.get('/api/amenities', async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.json(amenities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new amenity
app.post('/api/amenities', async (req, res) => {
  const amenity = new Amenity({
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
  });

  try {
    const newAmenity = await amenity.save();
    res.status(201).json(newAmenity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add/Update Hotel Rules
app.post('/api/hotel-rules', async (req, res) => {
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

    const existingRules = await HotelRules.findOne({});
    if (existingRules) {
      await HotelRules.findOneAndUpdate(
        {},
        {
          checkIn,
          checkOut,
          cancellationPolicy,
          childPolicies,
          cotAndExtraBedPolicies,
          noAgeRestriction,
          petsAllowed,
          acceptedCards,
        }
      );
      res.json({ message: 'Hotel rules updated successfully' });
    } else {
      const newHotelRules = new HotelRules({
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
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});








































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

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Prepare file data
      const passportId = {
        name: req.files.passportId[0].filename,
        url: `/uploads/${req.files.passportId[0].filename}`,
      };
      const tradeLicense = {
        name: req.files.tradeLicense[0].filename,
        url: `/uploads/${req.files.tradeLicense[0].filename}`,
      };
      const managerId = {
        name: req.files.managerId[0].filename,
        url: `/uploads/${req.files.managerId[0].filename}`,
      };

      // Create new user
      const newHotelAdmin = new HotelAdminList({
        firstName,
        middleName,
        lastName,
        location,
        email,
        password: hashedPassword,
        phoneNumber,
        passportId,
        tradeLicense,
        managerId,
        agreedToTerms: true,
      });

      await newHotelAdmin.save();
      res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

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
    } else if (locationLower.includes('Gonder')) {
      rangeStart = 300;
      rangeEnd = 400;
    } else if (locationLower.includes('lalibela')) {
      rangeStart = 400;
      rangeEnd = 500;
    } else {
      return res.status(400).json({ message: 'Location not supported for hotel admin ID assignment' });
    }

    // Find the highest existing hotelAdminId in the range
    const existingAdmins = await ApprovedHotelAdmin.find({
      hotelAdminId: { $gte: rangeStart, $lte: rangeEnd },
    }).sort({ hotelAdminId: -1 }).limit(1);

    hotelAdminId = existingAdmins.length > 0 ? existingAdmins[0].hotelAdminId + 1 : rangeStart;
    if (hotelAdminId > rangeEnd) {
      return res.status(400).json({ message: `No available hotel admin IDs in range ${rangeStart}-${rangeEnd}` });
    }

    // Update approval status and assign hotelAdminId
    hotelAdmin.isApproved = true;
    hotelAdmin.hotelAdminId = hotelAdminId;
    await hotelAdmin.save();

    // Save to ApprovedHotelAdmin collection
    const approvedHotelAdmin = new ApprovedHotelAdmin({
      firstName: hotelAdmin.firstName,
      middleName: hotelAdmin.middleName,
      lastName: hotelAdmin.lastName,
      location: hotelAdmin.location,
      email: hotelAdmin.email,
      phoneNumber: hotelAdmin.phoneNumber,
      passportId: hotelAdmin.passportId,
      tradeLicense: hotelAdmin.tradeLicense,
      managerId: hotelAdmin.managerId,
      hotelAdminId,
      approvedAt: new Date(),
    });
    await approvedHotelAdmin.save();

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




















































app.use(router);

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