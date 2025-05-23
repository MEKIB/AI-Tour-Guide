import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Review from "./modules/HotelReviews.js";
import Hotel from "./modules/Hotel.js";
import RoomType from "./modules/RoomTypes.js";
import Amenity from "./modules/Facilities.js";
import RoomTypeProperites from "./modules/RoomTypeProperites.js";
import AmenityFacilities from "./modules/Amenity.js";
import HotelRules from "./modules/HotelRules.js";
import HotelAdminList from "./modules/HotelAdminList.js";
import ApprovedHotelAdmin from "./modules/ApprovedHotelAdminLists.js";
import SystemAdminModel from "./modules/SystemAdminLists.js";
import userModel from "./modules/User.js";
import { authMiddleware, adminMiddleware } from "./Routes/middleware.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/uploads", express.static(uploadsDir));
console.log("Serving static files from:", uploadsDir);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png) and PDFs are allowed"));
  },
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

app.post(
  "/api/hotels",
  verifyToken,
  upload.array("images", 10),
  async (req, res) => {
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
        return res.status(404).json({ message: "Hotel admin not found" });
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
        res.json({ message: "Hotel updated successfully", data: updatedHotel });
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
        res.json({ message: "Hotel created successfully", data: newHotel });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

app.get("/api/hotel/admin", verifyToken, async (req, res) => {
  console.log("Request received at /api/hotel/admin");
  try {
    const email = req.user.email;

    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email: email });

    if (!approvedAdmin) {
      console.log("Hotel admin not found");
      return res.status(404).json({ message: "Hotel admin not found" });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;
    console.log("HotelAdminId from ApprovedAdmin:", hotelAdminId);

    const hotel = await Hotel.findOne({ HotelAdminId: hotelAdminId });

    if (!hotel) {
      console.log("Hotel not found for hotelAdminId:", hotelAdminId);
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    console.error("Error in /api/hotel/admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch Hotels with Filters (Public Route)
app.get("/api/hotels", async (req, res) => {
  try {
    const { location, facilityType } = req.query;

    // Build query object
    const query = {};
    if (location && location !== "All Locations") {
      query.location = { $regex: location, $options: "i" }; // Case-insensitive search
    }
    if (facilityType && facilityType !== "All Facility Types") {
      query.facilityType = facilityType;
    }

    const hotels = await Hotel.find(query);
    if (!hotels.length) {
      return res.status(200).json({ message: "No hotels found", data: [] });
    }

    res.json({ message: "Hotels fetched successfully", data: hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/hotels/admin/:hotelAdminId - Get hotel by hotelAdminId
app.get("/api/hotels/admin/:hotelAdminId", async (req, res) => {
  try {
    const { hotelAdminId } = req.params;

    const hotel = await Hotel.findOne({ HotelAdminId: hotelAdminId });

    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found for this admin ID" });
    }

    res.json({ data: hotel });
  } catch (error) {
    console.error("Error fetching hotel by admin ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET: Fetch Amenities for the Hotel Admin
app.get("/api/amenities", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;
    const amenityDoc = await Amenity.findOne({ hotelAdminId });
    if (!amenityDoc || !amenityDoc.amenities.length) {
      return res.status(200).json({ message: "No amenities found", data: [] });
    }

    res.json({
      message: "Amenities fetched successfully",
      data: amenityDoc.amenities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST: Add or Update Amenities
app.post("/api/amenities", verifyToken, async (req, res) => {
  try {
    const { amenities } = req.body; // Expect an array of amenities

    if (!Array.isArray(amenities)) {
      return res
        .status(400)
        .json({ message: 'Request body must contain an "amenities" array' });
    }

    // Validate each amenity object
    for (const amenity of amenities) {
      if (!amenity.name || !amenity.description || !amenity.icon) {
        return res.status(400).json({
          message: "Each amenity must have name, description, and icon fields",
        });
      }
    }

    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
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
      res.json({
        message: "Amenities updated successfully",
        data: updatedAmenityDoc.amenities,
      });
    } else {
      // Create new amenities document
      const newAmenityDoc = new Amenity({
        hotelAdminId,
        amenities,
      });
      await newAmenityDoc.save();
      res.json({
        message: "Amenities created successfully",
        data: newAmenityDoc.amenities,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET: Fetch Amenities by HotelAdminId (Public Route)
app.get("/api/amenities/by-hotel", async (req, res) => {
  try {
    const { hotelAdminId } = req.query;

    if (!hotelAdminId) {
      return res.status(400).json({ message: "HotelAdminId is required" });
    }

    const amenityDoc = await Amenity.findOne({ hotelAdminId });
    if (!amenityDoc || !amenityDoc.amenities.length) {
      return res.status(200).json({ message: "No amenities found", data: [] });
    }

    res.json({
      message: "Amenities fetched successfully",
      data: amenityDoc.amenities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST: Add or Update Hotel Rules (Protected Route with Token Verification)
app.post("/api/hotel-rules", verifyToken, async (req, res) => {
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
      return res.status(404).json({ message: "Hotel admin not found" });
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
      res.json({ message: "Hotel rules updated successfully" });
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
      res.json({ message: "Hotel rules created successfully" });
      console.log("Hotel rules created successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET: Fetch Hotel Rules (Protected Route with Token Verification)
app.get("/api/hotel-rules", verifyToken, async (req, res) => {
  try {
    // Extract email from the decoded token
    const email = req.user.email;

    // Find the hotelAdminId from ApprovedHotelAdmin model
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;

    // Fetch existing rules
    const rules = await HotelRules.findOne({ hotelAdminId });
    if (!rules) {
      return res.status(200).json({ message: "No rules found", data: null });
    }

    res.json({ message: "Hotel rules fetched successfully", data: rules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET: Fetch Hotel Rules by HotelAdminId (Public Route)
app.get("/api/hotel-rules/by-hotel", async (req, res) => {
  try {
    const { hotelAdminId } = req.query;

    if (!hotelAdminId) {
      return res.status(400).json({ message: "HotelAdminId is required" });
    }

    const rules = await HotelRules.findOne({ hotelAdminId });
    if (!rules) {
      return res.status(200).json({ message: "No rules found", data: null });
    }

    res.json({ message: "Hotel rules fetched successfully", data: rules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Middleware to get hotelAdminId from token
const getHotelAdminId = async (req, res, next) => {
  try {
    const admin = await ApprovedHotelAdmin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }
    req.hotelAdminId = admin.hotelAdminId;
    next();
  } catch (error) {
    console.error("Error fetching hotel admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new room type
app.post("/api/room-types", verifyToken, getHotelAdminId, async (req, res) => {
  try {
    const { type, rate, roomNumbers } = req.body;

    // Validation
    if (!type || !rate || !roomNumbers) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Split and clean room numbers
    const numbersArray = roomNumbers
      .split(",")
      .map((num) => num.trim().toUpperCase())
      .filter((num) => num !== "");

    if (numbersArray.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one room number required" });
    }

    // Check for existing room type
    const existingType = await RoomType.findOne({
      hotelAdminId: req.hotelAdminId,
      type: type,
    });

    if (existingType) {
      return res.status(400).json({ message: "Room type already exists" });
    }

    // Create new room type
    const newRoomType = new RoomType({
      hotelAdminId: req.hotelAdminId,
      type,
      rate: parseFloat(rate),
      roomNumbers: numbersArray,
    });

    await newRoomType.save();

    res.status(201).json({
      message: "Room type added successfully",
      data: newRoomType,
    });
  } catch (error) {
    console.error("Error creating room type:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all room types for hotel admin
app.get("/api/room-types", verifyToken, getHotelAdminId, async (req, res) => {
  try {
    const roomTypes = await RoomType.find({ hotelAdminId: req.hotelAdminId });
    res.json({ data: roomTypes });
  } catch (error) {
    console.error("Error fetching room types:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all room types
app.get("/", verifyToken, getHotelAdminId, async (req, res) => {
  try {
    const rooms = await RoomTypeProperites.find({
      hotelAdminId: req.hotelAdminId,
    });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new room type
app.post("/", verifyToken, getHotelAdminId, async (req, res) => {
  try {
    const { type, rate, roomNumbers, details } = req.body;

    const newRoom = new RoomTypeProperites({
      hotelAdminId: req.hotelAdminId,
      type,
      rate,
      roomNumbers: roomNumbers?.map((num) => ({
        number: num.trim(),
        availability: [],
      })),
      details,
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Bulk upload amenities
app.post("/upload", verifyToken, getHotelAdminId, async (req, res) => {
  try {
    const { amenities } = req.body;

    const amenitiesWithHotelId = amenities.map((amenity) => ({
      hotelAdminId: req.hotelAdminId,
      ...amenity,
    }));

    const result = await AmenityFacilities.insertMany(amenitiesWithHotelId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all amenities
app.get("/", verifyToken, getHotelAdminId, async (req, res) => {
  try {
    const amenities = await AmenityFacilities.find({
      hotelAdminId: req.hotelAdminId,
    });
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Email transporter setup (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email
    pass: process.env.EMAIL_PASS, // Your Gmail app password (not regular password)
  },
});

// Temporary storage for verification codes (in-memory, use Redis or DB in production)
const verificationCodes = new Map();

// Signup Route
app.post(
  "/api/signup",
  upload.fields([
    { name: "passportId", maxCount: 1 },
    { name: "tradeLicense", maxCount: 1 },
    { name: "managerId", maxCount: 1 },
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
        return res
          .status(400)
          .json({ message: "All required fields must be provided" });
      }

      if (
        !req.files ||
        !req.files.passportId ||
        !req.files.tradeLicense ||
        !req.files.managerId
      ) {
        return res
          .status(400)
          .json({ message: "All required documents must be uploaded" });
      }

      if (agreedToTerms !== "true") {
        return res
          .status(400)
          .json({ message: "You must agree to the terms and conditions" });
      }

      // Check if email already exists
      const existingUser = await HotelAdminList.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Generate a 6-digit verification code
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
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
        subject: "Email Verification Code",
        text: `Your verification code is: ${verificationCode}. Please enter this code to complete your signup.`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Verification code sent to your email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Verify Email Route
app.post("/api/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "Email and verification code are required" });
    }

    const storedData = verificationCodes.get(email);
    if (!storedData || storedData.code !== code) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
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
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get All Hotel Admins (only pending ones)
app.get("/api/hotel-admins", async (req, res) => {
  try {
    const hotelAdmins = await HotelAdminList.find({ isApproved: false }).select(
      "-password"
    );
    res.json(hotelAdmins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Hotel Admin by ID
app.get("/api/hotel-admins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid hotel admin ID" });
    }
    const hotelAdmin = await HotelAdminList.findById(id).select("-password");
    if (!hotelAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }
    res.json(hotelAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Approve Hotel Admin and Assign HotelAdminId
app.post("/api/hotel-admins/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid hotel admin ID" });
    }
    const hotelAdmin = await HotelAdminList.findById(id);
    if (!hotelAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }

    // Assign hotelAdminId based on location
    let hotelAdminId;
    const locationLower = hotelAdmin.location.toLowerCase();
    let rangeStart, rangeEnd;

    if (locationLower.includes("bahir dar")) {
      rangeStart = 100;
      rangeEnd = 200;
    } else if (locationLower.includes("gonder")) {
      rangeStart = 300;
      rangeEnd = 400;
    } else if (locationLower.includes("lalibela")) {
      rangeStart = 400;
      rangeEnd = 500;
    } else {
      return res.status(400).json({
        message: "Location not supported for hotel admin ID assignment",
      });
    }

    // Find the highest existing hotelAdminId in the range (check both collections)
    const existingApprovedAdmins = await ApprovedHotelAdmin.find({
      hotelAdminId: { $gte: rangeStart, $lte: rangeEnd },
    })
      .sort({ hotelAdminId: -1 })
      .limit(1);

    const existingPendingAdmins = await HotelAdminList.find({
      hotelAdminId: { $gte: rangeStart, $lte: rangeEnd },
    })
      .sort({ hotelAdminId: -1 })
      .limit(1);

    const highestId = Math.max(
      existingApprovedAdmins.length > 0
        ? existingApprovedAdmins[0].hotelAdminId
        : rangeStart - 1,
      existingPendingAdmins.length > 0
        ? existingPendingAdmins[0].hotelAdminId
        : rangeStart - 1
    );

    hotelAdminId = highestId + 1;

    if (hotelAdminId > rangeEnd) {
      return res.status(400).json({
        message: `No available hotel admin IDs in range ${rangeStart}-${rangeEnd}`,
      });
    }

    // Save to ApprovedHotelAdmin collection
    const approvedHotelAdmin = new ApprovedHotelAdmin({
      firstName: hotelAdmin.firstName,
      middleName: hotelAdmin.middleName,
      lastName: hotelAdmin.lastName,
      location: hotelAdmin.location,
      email: hotelAdmin.email,
      password: hotelAdmin.password,
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

    res.json({
      message: `Hotel admin ${hotelAdmin.email} approved successfully with ID ${hotelAdminId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get All Approved Hotel Admins
app.get("/api/approved-hotel-admins", async (req, res) => {
  try {
    const approvedAdmins = await ApprovedHotelAdmin.find();
    res.json(approvedAdmins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove Approved Hotel Admin by ID
app.delete("/api/approved-hotel-admins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid hotel admin ID" });
    }
    const result = await ApprovedHotelAdmin.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }
    res.json({ message: "Hotel admin removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route (with JWT Authorization)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userAdmin = await ApprovedHotelAdmin.findOne({ email });

    console.log("User:", userAdmin);
    if (!userAdmin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User Password:", userAdmin.password);
    console.log("Password from Request:", password);

    const isPasswordValid = await bcrypt.compare(password, userAdmin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: userAdmin._id, email: userAdmin.email, role: "hotel-admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: hashedPassword, ...userData } = userAdmin.toObject();

    res.json({
      message: "Login successful",
      user: userData,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// System Admin Signup Route
app.post("/api/system-admin/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check if email already exists
    const existingUser = await SystemAdminModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
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
    res
      .status(201)
      .json({ message: "System admin account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// System Admin Login Route
app.post("/api/system-admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the system admin by email
    const systemAdmin = await SystemAdminModel.findOne({ email });

    if (!systemAdmin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      systemAdmin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Send back user data (excluding password)
    const { password: hashedPassword, ...userData } = systemAdmin.toObject();

    res.json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/register", upload.single("passportOrId"), async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      acceptedTerms,
    } = req.body;
    const passportOrId = req.file ? req.file.path : null;

    // Validation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
      passportOrId,
      acceptedTerms,
    });

    await user.save();

    // Return success response without token
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user (protected route)
app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin route example (protected + admin only)
app.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/reviews", verifyToken, async (req, res) => {
  const { hotelAdminId, user, rating, comment } = req.body;

  try {
    // Validate required fields
    if (!hotelAdminId || !rating || !comment) {
      return res
        .status(400)
        .json({ message: "hotelAdminId, rating, and comment are required" });
    }

    // Check if the user already has a review for this hotel
    const existingReview = await Review.findOne({
      hotelAdminId,
      userId: req.user.id, // Changed to req.user.id
    });

    if (existingReview) {
      return res.status(400).json({
        message:
          "You have already reviewed this hotel. Use PUT to update your review.",
        reviewId: existingReview._id,
      });
    }

    const newReview = new Review({
      hotelAdminId,
      userId: req.user.id, // Changed to req.user.id
      user: user || "Anonymous",
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", data: savedReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put("/api/reviews/:reviewId", verifyToken, async (req, res) => {
  const { user, rating, comment } = req.body;

  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Ensure the review belongs to the user
    if (review.userId.toString() !== req.user.id.toString()) {
      // Changed to req.user.id
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }

    // Update fields only if provided
    review.user = user || review.user;
    review.rating = rating !== undefined ? rating : review.rating;
    review.comment = comment || review.comment;

    const updatedReview = await review.save();
    res
      .status(200)
      .json({ message: "Review updated successfully", data: updatedReview });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/reviews/user/:hotelAdminId", verifyToken, async (req, res) => {
  try {
    const review = await Review.findOne({
      hotelAdminId: req.params.hotelAdminId,
      userId: req.user.id, // Changed to req.user.id
    });

    if (!review) {
      return res
        .status(404)
        .json({ message: "No review found for this user and hotel" });
    }

    res.status(200).json({ data: review });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET all reviews for a specific hotelAdminId (for display purposes)
app.get("/api/reviews/:hotelAdminId", async (req, res) => {
  try {
    const reviews = await Review.find({
      hotelAdminId: req.params.hotelAdminId,
    });
    res.status(200).json({ data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// CHATBOT COMPONENTS

import { GoogleGenerativeAI } from "@google/generative-ai";
import natural from "natural";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY);

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

const allowedKeywords = [
  "amhara",
  "tourism",
  "destination",
  "hotel",
  "book hotel",
  "travel",
  "plan travel",
  "itinerary",
  "lalibela",
  "gondar",
  "bahir dar",
  "rock-hewn churches",
  "castles",
  "lake tana",
  "monastery",
  "tedbabe mariam",
  " Debre Birhan Selassie Church",
  "attractions",
  "sightseeing",
  "culture",
  "history",
  "food",
  "traditional food",
  "transportation",
  "weather",
  "best time to visit",
  "guide",
  "tour guide",
  "language",
  "amharic",
  "festival",
  "timkat",
  "meskel",
  "accommodation",
  "stay",
  "room",
  "price",
  "cost",
  "budget",
  "luxury",
  "amenities",
  "rules",
  "check-in",
  "check-out",
  "cancellation",
  "review",
  "rating",
].map(stemmer.stem);

const greetings = [
  "hi",
  "hello",
  "hey",
  "good morning",
  "good afternoon",
  "good evening",
  "how are you",
  "hey there",
  "hi there",
  "what's up",
  "greetings",
  "salutations",
  "okay",
  "k",
  "bye",
  "thank you",
  "thanks",
  "thanks a lot",
  "appreciate it",
  "much appreciated",
  "thank you so much",
  "cheers",
  "great job",
  "well done",
  "good work",
  "awesome",
  "you are helpful",
  "that helps",
];

const SYSTEM_PROMPT = `
You are Lal, a helpful assistant for Amhara tourism in Ethiopia.
Only answer questions related to tourist destinations, hotels, travel planning, cultural insights, historical sites, local food, transportation, weather, festivals, accommodations, and related topics in the Amhara region.
Greet users politely if they say "Hi", "Hello", "Good morning", etc., with a response like "Hello! How can I assist you with Amhara tourism today?"
If asked anything outside these topics, respond with:
"Lal: I'm here to assist only with Amhara tourism-related queries. Please ask about destinations, hotels, travel planning, or cultural insights in the Amhara region."
Always prefix your responses with "Lal:" to identify yourself.
`;

const isRelevant = (message) => {
  const lower = message.toLowerCase();

  if (greetings.some((g) => lower.includes(g))) return true;

  const tokens = tokenizer.tokenize(lower).map(stemmer.stem);
  return tokens.some((token) => allowedKeywords.includes(token));
};

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    console.error("Chatbot Error: Invalid message input");
    return res.status(400).json({ error: "Invalid message input" });
  }

  if (!isRelevant(message)) {
    console.log("Chatbot: Irrelevant message received:", message);
    return res.json({
      reply:
        "Lal: I'm here to assist only with Amhara tourism-related queries. Please ask about destinations, hotels, travel planning, or cultural insights in the Amhara region.",
    });
  }

  try {
    console.log("Chatbot Request Received:", message);

    const model = genAI.getGenerativeModel({
      model: "tunedModels/chatbot-2xxfmjqzyzhm",
    });

    console.log("Sending request to Google Generative AI...");
    const response = await model.generateContent(
      `${SYSTEM_PROMPT}\n\nUser: ${message}`
    );

    let reply = response.response.text();
    console.log("Chatbot Reply:", reply);

    if (!reply.startsWith("Lal:")) {
      reply = `Lal: ${reply}`;
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error(
      "Google Generative AI Error:",
      error.response?.data || error.message || error
    );
    res.status(500).json({ error: "Failed to get response from the model" });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/AI_Tour_Guide")
  .then(() => console.log("The database connected successfully (local)"))
  .catch((error) => console.log("Error connecting to local database:", error));

// Start Server
const port = process.env.PORT || 2001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
