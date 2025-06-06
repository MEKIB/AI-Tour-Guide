import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
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
import Reservation from "./modules/Reservation.js";
import HotelAdminList from "./modules/HotelAdminList.js";
import ApprovedHotelAdmin from "./modules/ApprovedHotelAdminLists.js";
import SystemAdminModel from "./modules/SystemAdminLists.js";
import userModel from "./modules/User.js";
import { authMiddleware, adminMiddleware } from "./Routes/middleware.js";
import BookingHistory from "./modules/BookingHistory.js";
import Refund from "./modules/Refund.js";
import serviceProviderRoutes from "./Routes/serviceProviderRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "Uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(UploadsDir);
}
app.use("/Uploads", express.static(uploadsDir));
console.log("Serving static files from:", uploadsDir);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "./Uploads/",
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

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Hotel Routes
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
          url: `/Uploads/${file.filename}`,
        }));
      }

      const email = req.user.email;
      const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
      if (!approvedAdmin) {
        return res.status(404).json({ message: "Hotel admin not found" });
      }

      const hotelAdminId = approvedAdmin.hotelAdminId;

      const existingHotel = await Hotel.findOne({ HotelAdminId: hotelAdminId });
      if (existingHotel) {
        const updatedHotel = await Hotel.findOneAndUpdate(
          { HotelAdminId: hotelAdminId },
          {
            name,
            location,
            facilityType,
            description,
            lat,
            long,
            images: images.length > 0 ? images : existingHotel.images,
          },
          { new: true }
        );
        res.json({ message: "Hotel updated successfully", data: updatedHotel });
      } else {
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
      console.error("Error in /api/hotels:", error);
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

app.get("/api/hotels", async (req, res) => {
  try {
    const { location, facilityType } = req.query;
    const query = {};
    if (location && location !== "All Locations") {
      query.location = { $regex: location, $options: "i" };
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

app.get("/api/hotels/:hotelAdminId", async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      HotelAdminId: req.params.hotelAdminId,
    });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res
      .status(200)
      .json({ message: "Hotel fetched successfully", data: hotel });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Amenity Routes
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

app.post("/api/amenities", verifyToken, async (req, res) => {
  try {
    const { amenities } = req.body;
    if (!Array.isArray(amenities)) {
      return res
        .status(400)
        .json({ message: 'Request body must contain an "amenities" array' });
    }

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

// Hotel Rules Routes
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

    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;
    console.log(`The approved hotel admin ID: ${hotelAdminId}`);

    const existingRules = await HotelRules.findOne({ hotelAdminId });

    if (existingRules) {
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
        { new: true }
      );
      res.json({ message: "Hotel rules updated successfully" });
    } else {
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

app.get("/api/hotel-rules", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }

    const hotelAdminId = approvedAdmin.hotelAdminId;
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

// Room Type Routes
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

// POST /api/room-types
app.post("/api/room-types", verifyToken, getHotelAdminId, async (req, res) => {
  try {
    const { type, rate, roomNumbers } = req.body;
    if (!type || !rate || !roomNumbers) {
      return res
        .status(400)
        .json({ message: "Type, rate, and room numbers are required" });
    }

    // Validate type
    if (!["Single", "Double"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Room type must be Single or Double" });
    }

    const numbersArray = roomNumbers
      .split(",")
      .map((num) => num.trim().toUpperCase())
      .filter((num) => num !== "");

    if (numbersArray.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one room number required" });
    }

    // Check if both types already exist
    const existingTypes = await RoomType.find({
      hotelAdminId: req.hotelAdminId,
    });
    if (existingTypes.length >= 2) {
      return res
        .status(400)
        .json({ message: "Both Single and Double room types already exist" });
    }

    // Check for duplicate type
    const existingType = await RoomType.findOne({
      hotelAdminId: req.hotelAdminId,
      type,
    });

    if (existingType) {
      return res.status(400).json({ message: "Room type already exists" });
    }

    const newRoomType = new RoomType({
      hotelAdminId: req.hotelAdminId,
      type,
      rate: parseFloat(rate),
      roomNumbers: numbersArray.map((number) => ({
        number,
        availability: [],
      })),
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

// GET /api/room-types
app.get("/api/room-types", verifyToken, getHotelAdminId, async (req, res) => {
  try {
    const roomTypes = await RoomType.find({ hotelAdminId: req.hotelAdminId });
    res.json({ data: roomTypes });
  } catch (error) {
    console.error("Error fetching room types:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/room-types/:id
app.put(
  "/api/room-types/:id",
  verifyToken,
  getHotelAdminId,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { type, rate, roomNumbers } = req.body;

      if (!type || !rate || !roomNumbers) {
        return res
          .status(400)
          .json({ message: "Type, rate, and room numbers are required" });
      }

      // Validate type
      if (!["Single", "Double"].includes(type)) {
        return res
          .status(400)
          .json({ message: "Room type must be Single or Double" });
      }

      const numbersArray = roomNumbers
        .split(",")
        .map((num) => num.trim().toUpperCase())
        .filter((num) => num !== "");

      if (numbersArray.length === 0) {
        return res
          .status(400)
          .json({ message: "At least one room number required" });
      }

      // Check if another room type with the same type exists (excluding this room)
      const existingType = await RoomType.findOne({
        hotelAdminId: req.hotelAdminId,
        type,
        _id: { $ne: id },
      });

      if (existingType) {
        return res.status(400).json({ message: "Room type already exists" });
      }

      const updatedRoomType = await RoomType.findOneAndUpdate(
        { _id: id, hotelAdminId: req.hotelAdminId },
        {
          type,
          rate: parseFloat(rate),
          roomNumbers: numbersArray.map((number) => ({
            number,
            availability: [], // Preserve existing availability or reset
          })),
        },
        { new: true }
      );

      if (!updatedRoomType) {
        return res.status(404).json({ message: "Room type not found" });
      }

      res.json({
        message: "Room type updated successfully",
        data: updatedRoomType,
      });
    } catch (error) {
      console.error("Error updating room type:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

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

// POST /api/rooms/upload
app.post("/api/rooms/upload", verifyToken, async (req, res) => {
  try {
    const { type, bathrooms, size, amenities } = req.body;
    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }
    const hotelAdminId = approvedAdmin.hotelAdminId;

    if (
      !type ||
      !bathrooms ||
      !size ||
      !amenities ||
      !Array.isArray(amenities)
    ) {
      return res.status(400).json({
        message: "Type, bathrooms, size, and amenities array are required",
      });
    }

    // Validate type
    if (!["Single", "Double"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Room type must be Single or Double" });
    }

    // Check if both types already exist
    const existingProperties = await RoomTypeProperites.find({ hotelAdminId });
    if (existingProperties.length >= 2) {
      return res.status(400).json({
        message: "Both Single and Double room properties already exist",
      });
    }

    const roomType = await RoomType.findOne({ hotelAdminId, type });
    if (!roomType) {
      return res.status(400).json({
        message: `Room type ${type} not found. Please add it via /api/room-types first.`,
      });
    }

    const existingTypeProperties = await RoomTypeProperites.findOne({
      hotelAdminId,
      type,
    });
    if (existingTypeProperties) {
      return res
        .status(400)
        .json({ message: `Properties for room type ${type} already exist` });
    }

    const newRoomProperties = new RoomTypeProperites({
      hotelAdminId,
      type,
      bathrooms: parseInt(bathrooms),
      size,
      amenities,
    });

    await newRoomProperties.save();

    res.status(201).json({
      message: "Room properties and amenities uploaded successfully",
      data: newRoomProperties,
    });
  } catch (error) {
    console.error("Error uploading room properties:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/rooms
app.get("/api/rooms", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin)
      return res.status(404).json({ message: "Hotel admin not found" });

    const rooms = await RoomTypeProperites.find({
      hotelAdminId: approvedAdmin.hotelAdminId,
    });

    res.json({ data: rooms });
  } catch (error) {
    console.error("Error fetching room properties:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/rooms/by-hotel/:hotelAdminId
app.get("/by-hotel/:hotelAdminId", async (req, res) => {
  try {
    const rooms = await RoomTypeProperites.find({
      hotelAdminId: req.params.hotelAdminId,
    });

    res.json({ data: rooms });
  } catch (error) {
    console.error("Error fetching room properties by hotel:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/rooms/:id
app.put("/api/rooms/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, bathrooms, size, amenities } = req.body;
    const email = req.user.email;
    const approvedAdmin = await ApprovedHotelAdmin.findOne({ email });
    if (!approvedAdmin) {
      return res.status(404).json({ message: "Hotel admin not found" });
    }
    const hotelAdminId = approvedAdmin.hotelAdminId;

    if (
      !type ||
      !bathrooms ||
      !size ||
      !amenities ||
      !Array.isArray(amenities)
    ) {
      return res.status(400).json({
        message: "Type, bathrooms, size, and amenities array are required",
      });
    }

    // Validate type
    if (!["Single", "Double"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Room type must be Single or Double" });
    }

    // Check if room type exists in RoomType
    const roomType = await RoomType.findOne({ hotelAdminId, type });
    if (!roomType) {
      return res.status(400).json({
        message: `Room type ${type} not found. Please add it via /api/room-types first.`,
      });
    }

    // Check if another room type with the same type exists (excluding this room)
    const existingTypeProperties = await RoomTypeProperites.findOne({
      hotelAdminId,
      type,
      _id: { $ne: id },
    });
    if (existingTypeProperties) {
      return res
        .status(400)
        .json({ message: `Properties for room type ${type} already exist` });
    }

    const updatedRoomProperties = await RoomTypeProperites.findOneAndUpdate(
      { _id: id, hotelAdminId },
      {
        type,
        bathrooms: parseInt(bathrooms),
        size,
        amenities,
      },
      { new: true }
    );

    if (!updatedRoomProperties) {
      return res.status(404).json({ message: "Room properties not found" });
    }

    res.json({
      message: "Room properties updated successfully",
      data: updatedRoomProperties,
    });
  } catch (error) {
    console.error("Error updating room properties:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/reservations", verifyToken, async (req, res) => {
  try {
    const {
      hotelAdminId,
      userId,
      roomType,
      roomNumber,
      checkInDate,
      checkOutDate,
      adults,
      children,
      childrenAges,
    } = req.body;

    console.log("Reservation request received:", {
      hotelAdminId,
      userId,
      roomType,
      roomNumber,
      checkInDate,
      checkOutDate,
    });

    if (
      !hotelAdminId ||
      !userId ||
      !roomType ||
      !roomNumber ||
      !checkInDate ||
      !checkOutDate ||
      !adults
    ) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    if (userId !== req.user.id) {
      console.log("Unauthorized: userId mismatch", {
        userId,
        tokenUserId: req.user.id,
      });
      return res.status(403).json({
        message: "Unauthorized: userId does not match authenticated user",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkIn >= checkOut) {
      console.log("Invalid dates:", { checkIn, checkOut });
      return res
        .status(400)
        .json({ message: "Check-out date must be after check-in date" });
    }

    const roomTypeDoc = await RoomType.findOne({
      hotelAdminId,
      type: roomType,
    });
    if (!roomTypeDoc) {
      console.log("Room type not found:", roomType);
      return res
        .status(404)
        .json({ message: `Room type ${roomType} not found` });
    }

    const room = roomTypeDoc.roomNumbers.find((r) => r.number === roomNumber);
    if (!room) {
      console.log("Room number not found:", roomNumber);
      return res
        .status(404)
        .json({ message: `Room number ${roomNumber} not found` });
    }

    const isBooked = room.availability.some((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return (
        (checkIn >= bookingStart && checkIn < bookingEnd) ||
        (checkOut > bookingStart && checkOut <= bookingEnd) ||
        (checkIn <= bookingStart && checkOut >= bookingEnd)
      );
    });

    if (isBooked) {
      console.log("Room already booked:", roomNumber);
      return res.status(400).json({
        message: `Room ${roomNumber} is already booked for the selected dates`,
      });
    }

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = roomTypeDoc.rate * nights;
    console.log("Calculated price:", {
      nights,
      rate: roomTypeDoc.rate,
      totalPrice,
    });

    const reservation = new Reservation({
      hotelAdminId,
      userId,
      roomType,
      roomNumber,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults,
      children: children || 0,
      childrenAges: childrenAges || [],
      totalPrice,
    });

    room.availability.push({ startDate: checkIn, endDate: checkOut });
    await roomTypeDoc.save();
    await reservation.save();

    console.log("Reservation created:", reservation._id);
    res.status(201).json({
      message: "Reservation created successfully",
      data: reservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/reservations/user", verifyToken, async (req, res) => {
  console.log(`Fetching reservations for userId: ${req.query.userId}`);
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query parameter is required" });
    }
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }
    const reservations = await Reservation.find({ userId });
    console.log("Reservations found:", reservations);
    res.status(200).json({
      message: "Reservations fetched successfully",
      data: reservations,
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE endpoint to cancel a reservation
app.delete("/api/reservations/:id", verifyToken, async (req, res) => {
  console.log(`Attempting to delete reservation with ID: ${req.params.id}`);
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query parameter is required" });
    }

    const reservationId = req.params.id;

    // Validate reservation ID format
    if (!reservationId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid reservation ID format:", reservationId);
      return res.status(400).json({ message: "Invalid reservation ID format" });
    }

    // Find the reservation
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      console.log("Reservation not found:", reservationId);
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Verify user authorization
    if (reservation.userId.toString() !== req.user.id) {
      console.log("Unauthorized: userId mismatch", {
        reservationUserId: reservation.userId,
        tokenUserId: req.user.id,
      });
      return res.status(403).json({
        message: "Unauthorized: You can only delete your own reservations",
      });
    }

    // Find the room type document
    const roomTypeDoc = await RoomType.findOne({
      hotelAdminId: reservation.hotelAdminId,
      type: reservation.roomType,
    });

    if (!roomTypeDoc) {
      console.log("Room type not found:", reservation.roomType);
      return res
        .status(404)
        .json({ message: `Room type ${reservation.roomType} not found` });
    }

    // Find the specific room
    const room = roomTypeDoc.roomNumbers.find(
      (r) => r.number === reservation.roomNumber
    );
    if (!room) {
      console.log("Room number not found:", reservation.roomNumber);
      return res
        .status(404)
        .json({ message: `Room number ${reservation.roomNumber} not found` });
    }

    // Remove the availability entry
    room.availability = room.availability.filter((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return !(
        bookingStart.getTime() ===
          new Date(reservation.checkInDate).getTime() &&
        bookingEnd.getTime() === new Date(reservation.checkOutDate).getTime()
      );
    });

    // Save the updated room type document
    await roomTypeDoc.save();

    // Delete the reservation
    await Reservation.deleteOne({ _id: reservationId });

    console.log("Reservation deleted successfully:", reservationId);
    res.status(200).json({
      message: "Reservation cancelled successfully",
      data: { reservationId },
    });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Review Routes
app.get("/api/reviews/:hotelAdminId/average", async (req, res) => {
  try {
    const reviews = await Review.find({
      hotelAdminId: req.params.hotelAdminId,
    });
    if (reviews.length === 0) {
      return res
        .status(200)
        .json({ message: "No reviews found", data: { averageRating: 0 } });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);

    res.status(200).json({
      message: "Average rating fetched successfully",
      data: { averageRating },
    });
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/reviews", verifyToken, async (req, res) => {
  const { hotelAdminId, user, rating, comment } = req.body;

  try {
    if (!hotelAdminId || !rating || !comment) {
      return res
        .status(400)
        .json({ message: "hotelAdminId, rating, and comment are required" });
    }

    const existingReview = await Review.findOne({
      hotelAdminId,
      userId: req.user.id,
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
      userId: req.user.id,
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

    if (review.userId.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }

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
      userId: req.user.id,
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


// Room Availability Route
app.get("/api/rooms/available/:hotelAdminId", async (req, res) => {
  try {
    const { checkInDate, checkOutDate } = req.query;
    console.log("Request params:", {
      hotelAdminId: req.params.hotelAdminId,
      checkInDate,
      checkOutDate,
    });

    if (!checkInDate || !checkOutDate) {
      return res
        .status(400)
        .json({ message: "Check-in and check-out dates are required" });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    console.log("Parsed dates:", { checkIn, checkOut });

    if (checkIn >= checkOut) {
      return res
        .status(400)
        .json({ message: "Check-out date must be after check-in date" });
    }

    const roomTypes = await RoomType.find({
      hotelAdminId: req.params.hotelAdminId,
    });
    console.log("Room types found:", roomTypes);

    if (!roomTypes.length) {
      return res.status(200).json({ message: "No rooms found", data: [] });
    }

    const roomProperties = await RoomTypeProperites.find({
      hotelAdminId: req.params.hotelAdminId,
    });
    console.log("Room properties found:", roomProperties);

    const availableRooms = roomTypes.flatMap((roomType) => {
      const properties =
        roomProperties.find((p) => p.type === roomType.type) || {};
      console.log(
        `Processing room type: ${roomType.type}, Properties:`,
        properties
      );

      return roomType.roomNumbers
        .filter((room) => {
          const isAvailable = !room.availability.some((booking) => {
            const bookingStart = new Date(booking.startDate);
            const bookingEnd = new Date(booking.endDate);
            console.log(`Checking room ${room.number} booking:`, {
              bookingStart,
              bookingEnd,
            });

            return (
              (checkIn >= bookingStart && checkIn < bookingEnd) ||
              (checkOut > bookingStart && checkOut <= bookingEnd) ||
              (checkIn <= bookingStart && checkOut >= bookingEnd)
            );
          });
          console.log(`Room ${room.number} is available: ${isAvailable}`);
          return isAvailable;
        })
        .map((room) => ({
          id: `${roomType._id}-${room.number}`,
          type: roomType.type,
          roomNumber: room.number,
          price: roomType.rate,
          bathrooms: properties.bathrooms || 1,
          size: properties.size || "Unknown",
          amenities: properties.amenities || [],
        }));
    });

    console.log("Available rooms:", availableRooms);
    res.json({ data: availableRooms });
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

      const existingUser = await HotelAdminList.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

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
            url: `/Uploads/${req.files.passportId[0].filename}`,
          },
          tradeLicense: {
            name: req.files.tradeLicense[0].filename,
            url: `/Uploads/${req.files.tradeLicense[0].filename}`,
          },
          managerId: {
            name: req.files.managerId[0].filename,
            url: `/Uploads/${req.files.managerId[0].filename}`,
          },
          agreedToTerms: true,
        },
      });

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(storedData.data.password, salt);

    const newHotelAdmin = new HotelAdminList({
      ...storedData.data,
      password: hashedPassword,
    });

    await newHotelAdmin.save();
    verificationCodes.delete(email);
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Hotel Admin Routes
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

    let hotelAdminId;
    const locationLower = hotelAdmin.location.toLowerCase();
    let rangeStart, rangeEnd;

    if (locationLower.includes("bahir dar")) {
      rangeStart = 100;
      rangeEnd = 200;
    } else if (locationLower.includes("gonder")) {
      rangeStart = 700;
      rangeEnd = 900;
    } else if (locationLower.includes("lalibela")) {
      rangeStart = 400;
      rangeEnd = 500;
    } else {
      return res.status(400).json({
        message: "Location not supported for hotel admin ID assignment",
      });
    }

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

    await HotelAdminList.findByIdAndDelete(id);

    res.json({
      message: `Hotel admin ${hotelAdmin.email} approved successfully with ID ${hotelAdminId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/approved-hotel-admins", async (req, res) => {
  try {
    const approvedAdmins = await ApprovedHotelAdmin.find();
    res.json(approvedAdmins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

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

// Login Routes
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAdmin = await ApprovedHotelAdmin.findOne({ email });

    if (!userAdmin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

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

app.post("/api/system-admin/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const existingUser = await SystemAdminModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

// System Admin Login
app.post("/api/system-admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("System admin login attempt:", email); // Debug
    const systemAdmin = await SystemAdminModel.findOne({ email });

    if (!systemAdmin) {
      console.log("System admin not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      systemAdmin.password
    );
    if (!isPasswordValid) {
      // Removed the extra closing parenthesis here
      console.log("Invalid password for:", email);
      return res.status(401).json({ message: "Invalid email or password" }); // Removed the duplicate return
    }

    // Generate JWT token
    const payload = {
      id: systemAdmin._id.toString(),
      email: systemAdmin.email,
      role: "admin", // Explicitly set to 'admin' for adminMiddleware
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("Generated token:", token); // Debug

    // Exclude password from response
    const { password: hashedPassword, ...userData } = systemAdmin.toObject();

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.post("/api/signupuser", upload.single("passportOrId"), async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, phone, password, confirmPassword, agreedToTerms } = req.body;
    const passportOrId = req.file; // Multer populates this

    // Log incoming data for debugging
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    // Validate inputs
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !passportOrId || !agreedToTerms) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store only the file path or name in verificationCodes
    verificationCodes.set(email, {
      data: {
        firstName,
        middleName,
        lastName,
        email,
        phone,
        password,
        passportOrId: passportOrId.path || passportOrId.filename, // Store file path
        acceptedTerms: agreedToTerms === "true" || agreedToTerms === true, // Handle both string and boolean
      },
      code,
    });

    // Send verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      text: `Your verification code is: ${code}`,
    });

    res.status(200).json({ message: "Verification code sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// /api/verify-email-user route
app.post("/api/verify-email-user", async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: "Email and verification code are required" });
    }

    const storedData = verificationCodes.get(email);
    if (!storedData || storedData.code !== code) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(storedData.data.password, salt);

    const newUser = new userModel({
      ...storedData.data,
      password: hashedPassword,
    });

    await newUser.save();
    verificationCodes.delete(email);
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        middleName: user.middleName,
        passportOrId: user.passportOrId,
        phone: user.phone,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        middleName: user.middleName,
        passportOrId: user.passportOrId,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 const resetTokens = new Map();
// Forgot Password Route (updated to include HTML email)
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Store the reset token with an expiry
    resetTokens.set(resetToken, {
      userId: user._id,
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
    });

    // Send reset email with clickable link
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`; // Adjust to your frontend URL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}\nThis link will expire in 1 hour.`,
      html: `
        <p>You requested a password reset.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #00ADB5; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reset Password Route
app.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'New password is required' });
    }

    // Verify the reset token
    const tokenData = resetTokens.get(token);
    if (!tokenData || tokenData.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      resetTokens.delete(token);
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Find the user
    const user = await userModel.findById(tokenData.userId);
    if (!user) {
      resetTokens.delete(token);
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Clean up the token
    resetTokens.delete(token);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all users (accessible only to system admins)
app.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json(
      users.map((user) => ({
        id: user._id,
        name: `${user.firstName} ${
          user.middleName ? user.middleName + " " : ""
        }${user.lastName}`,
        email: user.email,
        phoneNumber: user.phone,
        idPassport: user.passportOrId,
        status: user.status,
        idPassportImage: user.passportOrId, // Adjust if full URL is needed
      }))
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Server error occurred while fetching users",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST /api/change-password - Update user's password
app.post('/api/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate inputs
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: 'New password does not meet requirements' });
    }

    // Verify current password
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/me - Delete authenticated user's account
app.delete('/api/me', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});




// Delete a user (accessible only to system admins)
app.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({
      message: "Server error occurred while removing user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/AI_Tour_Guide")
  .then(() => console.log("The database connected successfully (local)"))
  .catch((error) => console.log("Error connecting to local database:", error));

// Chapa API configuration
const CHAPA_API_KEY = "CHASECK_TEST-3vf0YrtySMXfPDsAYB2nEIe4Z8OOB7uD";
const CHAPA_API_URL = "https://api.chapa.co/v1/transaction/initialize";

// Endpoint to initialize Chapa transaction
app.post("/api/chapa/initialize", async (req, res) => {
  try {
    const response = await axios.post(CHAPA_API_URL, req.body, {
      headers: {
        Authorization: `Bearer ${CHAPA_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Chapa API error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message:
        error.response?.data?.message || "Failed to initialize transaction",
    });
  }
});

// Endpoint to verify Chapa transaction
app.get("/api/chapa/verify/:tx_ref", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${req.params.tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_API_KEY}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Chapa verification error:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Failed to verify transaction",
    });
  }
});

// Endpoint to process Chapa refund
app.post("/api/chapa/refund/:tx_ref", async (req, res) => {
  console.log("Refund endpoint called with tx_ref:", req.params.tx_ref);
  console.log("Request body:", req.body);
  try {
    const { reason, amount, meta } = req.body;
    console.log("Sending refund request to Chapa API:", {
      tx_ref: req.params.tx_ref,
      reason,
      amount,
      meta,
    });
    const response = await axios.post(
      `https://api.chapa.co/v1/refund/${req.params.tx_ref}`,
      {
        reason,
        amount,
        meta,
      },
      {
        headers: {
          Authorization: `Bearer ${CHAPA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Chapa refund response:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Chapa refund error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Failed to process refund",
    });
  }
});

// Endpoint to update Refund status by bookingCode
app.put("/api/refunds/update/:bookingCode", async (req, res) => {
  const { bookingCode } = req.params;
  console.log(
    `[${new Date().toLocaleString("en-US", {
      timeZone: "Africa/Nairobi",
    })}] Refund update endpoint called with bookingCode: ${bookingCode}`
  );

  try {
    // Update Refund document status to 'refunded'
    const updatedRefund = await Refund.findOneAndUpdate(
      { bookingCode },
      { $set: { status: "refunded", updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedRefund) {
      console.warn(`No Refund document found for bookingCode: ${bookingCode}`);
      return res.status(404).json({
        message: "Refund document not found for the provided booking code",
      });
    }

    console.log(
      `Refund status updated to 'refunded' for bookingCode: ${bookingCode}`
    );
    res.status(200).json({
      message: "Refund status updated successfully",
      data: updatedRefund,
    });
  } catch (error) {
    console.error(
      `Error updating refund for bookingCode: ${bookingCode}:`,
      error.message
    );
    res.status(500).json({
      message: "Failed to update refund status",
    });
  }
});

// Utility function to generate booking code
const generateBookingCode = (options = {}) => {
  const { prefix = "BOOK", size = 15, removePrefix = false } = options;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return removePrefix ? result : `${prefix}-${result}`;
};

// Endpoint to create booking history after successful payment
app.post("/api/bookingHistory/create", verifyToken, async (req, res) => {
  try {
    const {
      userId,
      hotelAdminId,
      hotelName,
      roomType,
      roomNumber,
      checkInDate,
      checkOutDate,
      totalPrice,
      image,
      guests,
      tx_ref, // Transaction reference from frontend (optional)
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !hotelAdminId ||
      !hotelName ||
      !roomType ||
      !roomNumber ||
      !checkInDate ||
      !checkOutDate ||
      !totalPrice
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Validate ObjectId format for userId only
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Validate hotelAdminId as a non-empty string
    if (typeof hotelAdminId !== "string" || !hotelAdminId.trim()) {
      return res.status(400).json({ message: "Invalid hotelAdminId format" });
    }

    // Validate that userId matches the token's user
    if (req.user.id !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: User ID does not match token" });
    }

    // Fetch user to get email
    const user = await userModel.findById(userId).select("email firstName");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique booking code (use tx_ref if provided, else generate new)
    const bookingCode = tx_ref || generateBookingCode();

    // Create new booking history entry
    const bookingHistory = new BookingHistory({
      userId,
      hotelAdminId, // Store as string, e.g., "102"
      hotelName,
      roomType,
      roomNumber,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPrice: parseFloat(totalPrice),
      image: image || "https://via.placeholder.com/500x180?text=No+Image",
      guests: guests || 1,
      status: "check-in",
      bookingCode, // Store the booking code
    });

    // Save to database
    await bookingHistory.save();

    // Send confirmation email to the user
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Booking Confirmation - Visit Amhara",
        html: `
          <h2>Booking Confirmation</h2>
          <p>Dear ${user.firstName},</p>
          <p>Thank you for your booking with Visit Amhara! Here are your booking details:</p>
          <ul>
            <li><strong>Booking Code:</strong> ${bookingCode}</li>
            <li><strong>Hotel:</strong> ${hotelName}</li>
            <li><strong>Room Type:</strong> ${roomType}</li>
            <li><strong>Room Number:</strong> ${roomNumber}</li>
            <li><strong>Check-in Date:</strong> ${new Date(
              checkInDate
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}</li>
            <li><strong>Check-out Date:</strong> ${new Date(
              checkOutDate
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}</li>
            <li><strong>Total Price:</strong> ETB ${parseFloat(totalPrice).toFixed(
              2
            )}</li>
            <li><strong>Guests:</strong> ${guests || 1}</li>
          </ul>
          <p>We look forward to welcoming you! If you have any questions, please contact our support team.</p>
          <p>Best regards,<br/>Visit Amhara Team</p>
        `,
      });
      console.log(`Confirmation email sent to ${user.email}`);
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Note: We don't fail the booking if the email fails, but log it
    }

    res.status(201).json({
      message: "Booking history created successfully",
      data: bookingHistory,
    });
  } catch (error) {
    console.error("Error creating booking history:", error);
    if (error.code === 11000) {
      // Handle duplicate bookingCode
      return res
        .status(400)
        .json({ message: "Booking code already exists, please try again" });
    }
    res.status(500).json({
      message: error.message || "Failed to create booking history",
    });
  }
});

// Endpoint to fetch booking history for a user
app.get("/api/bookingHistory/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the JWT token by verifyToken middleware

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Fetch booking history for the user
    const bookingHistory = await BookingHistory.find({ userId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean(); // Convert to plain JavaScript objects for faster processing

    if (!bookingHistory || bookingHistory.length === 0) {
      return res.status(200).json({
        message: "No booking history found for this user",
        data: [],
      });
    }

    // Transform data to match frontend expectations
    const formattedBookings = bookingHistory.map((booking) => ({
      id: booking._id.toString(),
      hotelName: booking.hotelName,
      roomType: booking.roomType,
      checkIn: new Date(booking.checkInDate).toISOString().split("T")[0], // Format as YYYY-MM-DD
      checkOut: new Date(booking.checkOutDate).toISOString().split("T")[0], // Format as YYYY-MM-DD
      roomNumber: booking.roomNumber,
      guests: booking.guests || 1,
      totalPrice: booking.totalPrice,
      status: booking.status,
      rating: booking.rating || null,
      image:
        booking.image || "https://via.placeholder.com/300x200?text=No+Image",
      hotelAdminId: booking.hotelAdminId, // String, e.g., "102"
      bookingCode: booking.bookingCode,
    }));

    res.status(200).json({
      message: "Booking history retrieved successfully",
      data: formattedBookings,
    });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({
      message: error.message || "Failed to fetch booking history",
    });
  }
});

// Endpoint to fetch booking by booking code
app.get(
  "/api/bookingHistory/code/:bookingCode",
  verifyToken,
  async (req, res) => {
    try {
      const { bookingCode } = req.params;

      // Validate booking code
      if (
        !bookingCode ||
        typeof bookingCode !== "string" ||
        !bookingCode.trim()
      ) {
        return res.status(400).json({ message: "Invalid booking code" });
      }

      // Find booking by booking code
      const booking = await BookingHistory.findOne({ bookingCode }).lean();

      if (!booking) {
        return res
          .status(404)
          .json({ message: "No booking found with this code" });
      }

      // Format the response to match frontend expectations
      const formattedBooking = {
        id: booking._id.toString(),
        hotelName: booking.hotelName,
        roomType: booking.roomType,
        roomNumber: booking.roomNumber,
        checkInDate: new Date(booking.checkInDate).toISOString().split("T")[0],
        checkOutDate: new Date(booking.checkOutDate)
          .toISOString()
          .split("T")[0],
        guests: booking.guests || 1,
        totalPrice: booking.totalPrice,
        status: booking.status,
        rating: booking.rating || null,
        image:
          booking.image || "https://via.placeholder.com/300x200?text=No+Image",
        hotelAdminId: booking.hotelAdminId,
        bookingCode: booking.bookingCode,
        // Add user details if needed (e.g., fetch user name from User model)
        userName: "Unknown", // Replace with actual user lookup if needed
        passport: "N/A", // Add passport field to schema if required
      };

      res.status(200).json({
        message: "Booking retrieved successfully",
        data: formattedBooking,
      });
    } catch (error) {
      console.error("Error fetching booking by code:", error);
      res.status(500).json({
        message: error.message || "Failed to fetch booking",
      });
    }
  }
);

// Endpoint to update booking status
app.patch(
  "/api/bookingHistory/:bookingCode/status",
  verifyToken,
  async (req, res) => {
    try {
      const { bookingCode } = req.params;
      const { status } = req.body;

      // Validate status
      if (
        !["pending", "checked-in", "checked-out", "cancelled"].includes(status)
      ) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      // Find and update booking
      const booking = await BookingHistory.findOneAndUpdate(
        { bookingCode },
        { status },
        { new: true, runValidators: true }
      ).lean();

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Format response
      const formattedBooking = {
        id: booking._id.toString(),
        hotelName: booking.hotelName,
        roomType: booking.roomType,
        roomNumber: booking.roomNumber,
        checkInDate: new Date(booking.checkInDate).toISOString().split("T")[0],
        checkOutDate: new Date(booking.checkOutDate)
          .toISOString()
          .split("T")[0],
        guests: booking.guests || 1,
        totalPrice: booking.totalPrice,
        status: booking.status,
        rating: booking.rating || null,
        image:
          booking.image || "https://via.placeholder.com/300x200?text=No+Image",
        hotelAdminId: booking.hotelAdminId,
        bookingCode: booking.bookingCode,
        userName: "Unknown", // Replace with actual user lookup if needed
        passport: "N/A", // Add if required
      };

      res.status(200).json({
        message: "Booking status updated successfully",
        data: formattedBooking,
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({
        message: error.message || "Failed to update booking status",
      });
    }
  }
);

// app.patch('/api/bookingHistory/:id/cancel', verifyToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid booking ID format' });
//     }

//     const booking = await BookingHistory.findById(id);
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     if (booking.userId.toString() !== userId) {
//       return res.status(403).json({ message: 'Unauthorized: You cannot cancel this booking' });
//     }

//     if (booking.status === 'cancelled') {
//       return res.status(400).json({ message: 'Booking is already cancelled' });
//     }

//     if (booking.status !== 'completed') {
//       return res.status(400).json({ message: 'Only upcoming bookings can be cancelled' });
//     }

//     booking.status = 'cancelled';
//     await booking.save();

//     res.status(200).json({
//       message: 'Booking cancelled successfully',
//       data: booking,
//     });
//   } catch (error) {
//     console.error('Error cancelling booking:', error);
//     res.status(500).json({
//       message: error.message || 'Failed to cancel booking',
//     });
//   }
// });

// Endpoint to fetch authenticated hotel admin's hotelAdminId
app.get(
  "/api/hotel-admin/me",
  verifyToken,
  getHotelAdminId,
  async (req, res) => {
    try {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Received request for /api/hotel-admin/me`
      );
      const hotelAdminId = req.hotelAdminId;
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Returning hotelAdminId: ${hotelAdminId}`
      );
      res.status(200).json({
        message: "Hotel admin ID retrieved successfully",
        data: { hotelAdminId },
      });
    } catch (error) {
      console.error(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Error fetching hotel admin ID:`,
        error
      );
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Endpoint to fetch booking history by hotelAdminId
app.get("/api/bookings/:hotelAdminId", verifyToken, async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/bookings/${req.params.hotelAdminId}`
    );
    const { hotelAdminId } = req.params;

    // Validate hotelAdminId
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Validating hotelAdminId: ${hotelAdminId}`
    );
    if (!hotelAdminId || typeof hotelAdminId !== "string") {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Invalid hotelAdminId format: ${hotelAdminId}`
      );
      return res.status(400).json({ message: "Invalid hotelAdminId format" });
    }

    // Fetch booking history
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying BookingHistory for hotelAdminId: ${hotelAdminId}`
    );
    const bookings = await BookingHistory.find({ hotelAdminId })
      .select(
        "userId hotelName roomType roomNumber checkInDate checkOutDate totalPrice status guests bookingCode"
      )
      .sort({ createdAt: -1 })
      .lean();

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Found ${bookings.length} bookings for hotelAdminId: ${hotelAdminId}`
    );
    if (!bookings || bookings.length === 0) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] No bookings found for hotelAdminId: ${hotelAdminId}`
      );
      return res.status(200).json({
        message: "No bookings found for this hotel admin",
        data: [],
      });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending response with ${bookings.length} bookings`
    );
    res.status(200).json({
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error fetching bookings:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to fetch user details by userId (no authentication required)
app.get("/api/users/:userId", async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/user/${req.params.userId}`
    );
    const { userId } = req.params;

    // Validate userId
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Validating userId: ${userId}`
    );
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Invalid userId format: ${userId}`
      );
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Fetch user details
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying User for userId: ${userId}`
    );
    const user = await userModel
      .findById(userId)
      .select("firstName middleName lastName email phone passportOrId")
      .lean();

    if (!user) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] User not found for userId: ${userId}`
      );
      return res.status(404).json({ message: "User not found" });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending user data for userId: ${userId}`
    );
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error fetching user:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

// Debug endpoint to list all bookings or users
app.post("/api/bookings/debug", verifyToken, async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/bookings/debug`
    );
    const { action } = req.body;

    if (action === "list_bookings") {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Listing all bookings`
      );
      const allBookings = await BookingHistory.find()
        .select(
          "hotelAdminId userId bookingCode status checkInDate checkOutDate"
        )
        .lean();
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Found ${allBookings.length} bookings`
      );
      return res.status(200).json({
        message: "All bookings retrieved",
        data: allBookings,
      });
    }

    if (action === "list_users") {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Listing all users`
      );
      const allUsers = await User.find()
        .select("_id firstName lastName email")
        .lean();
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Found ${allUsers.length} users`
      );
      return res.status(200).json({
        message: "All users retrieved",
        data: allUsers,
      });
    }

    console.warn(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Invalid debug action: ${action}`
    );
    return res.status(400).json({
      message: 'Invalid action. Use "list_bookings" or "list_users".',
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error in debug endpoint:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

//to search for a booking by booking code
app.get("/api/bookings/code/:bookingCode", verifyToken, async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/bookings/code/${req.params.bookingCode}`
    );
    const { bookingCode } = req.params;

    // Validate bookingCode
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Validating bookingCode: ${bookingCode}`
    );
    if (!bookingCode || typeof bookingCode !== "string") {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Invalid bookingCode format: ${bookingCode}`
      );
      return res.status(400).json({ message: "Invalid booking code" });
    }

    // Fetch booking
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying BookingHistory for bookingCode: ${bookingCode}`
    );
    const booking = await BookingHistory.findOne({ bookingCode })
      .select(
        "hotelAdminId userId hotelName roomType roomNumber checkInDate checkOutDate totalPrice status guests bookingCode"
      )
      .lean();

    if (!booking) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Booking not found for bookingCode: ${bookingCode}`
      );
      return res.status(404).json({ message: "Booking not found", data: null });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending booking data for bookingCode: ${bookingCode}`
    );
    res.status(200).json({
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error fetching booking:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

// endpoint to update the booking status
app.put(
  "/api/bookings/update-status/:bookingCode",
  verifyToken,
  getHotelAdminId,
  async (req, res) => {
    try {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Received request for /api/bookings/update-status/${
          req.params.bookingCode
        }`
      );
      const { bookingCode } = req.params;
      const { status } = req.body;
      const hotelAdminId = req.hotelAdminId;

      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Validating bookingCode: ${bookingCode}`
      );
      if (!bookingCode || typeof bookingCode !== "string") {
        console.warn(
          `[${new Date().toLocaleString("en-US", {
            timeZone: "Africa/Nairobi",
          })}] Invalid bookingCode format: ${bookingCode}`
        );
        return res.status(400).json({ message: "Invalid booking code" });
      }

      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Validating status: ${status}`
      );
      if (!status || typeof status !== "string") {
        console.warn(
          `[${new Date().toLocaleString("en-US", {
            timeZone: "Africa/Nairobi",
          })}] Invalid status format: ${status}`
        );
        return res.status(400).json({ message: "Invalid status" });
      }

      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Querying BookingHistory for bookingCode: ${bookingCode}`
      );
      const booking = await BookingHistory.findOne({ bookingCode });
      if (!booking) {
        console.log(
          `[${new Date().toLocaleString("en-US", {
            timeZone: "Africa/Nairobi",
          })}] Booking not found for bookingCode: ${bookingCode}`
        );
        return res.status(404).json({ message: "Booking not found" });
      }

      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Comparing hotelAdminId: booking ${
          booking.hotelAdminId
        } vs token ${hotelAdminId}`
      );
      if (String(booking.hotelAdminId) !== String(hotelAdminId)) {
        console.error(
          `[${new Date().toLocaleString("en-US", {
            timeZone: "Africa/Nairobi",
          })}] Authorization failed - ID mismatch: ${String(
            booking.hotelAdminId
          )} !== ${String(hotelAdminId)}`
        );
        return res
          .status(403)
          .json({ message: "Unauthorized to update this booking" });
      }

      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Updating status to: ${status}`
      );
      booking.status = status;
      await booking.save();

      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Booking status updated successfully`
      );
      res.status(200).json({
        message: "Booking status updated successfully",
        data: {
          bookingCode: booking.bookingCode,
          newStatus: booking.status,
          hotelAdminId: booking.hotelAdminId,
        },
      });
    } catch (error) {
      console.error(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Error updating booking status:`,
        error
      );
      res.status(500).json({ message: "Server error" });
    }
  }
);

// to cancel a booking
// Endpoint to cancel a booking
app.patch(
  "/api/bookingHistory/:bookingCode/cancel",
  verifyToken,
  async (req, res) => {
    try {
      const timestamp = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      });
      console.log(
        `[${timestamp}] Received request for /api/bookingHistory/${req.params.bookingCode}/cancel`
      );
      console.log(
        `[${timestamp}] Request headers:`,
        JSON.stringify(req.headers)
      );
      console.log(`[${timestamp}] Request params:`, JSON.stringify(req.params));
      console.log(`[${timestamp}] Request body:`, JSON.stringify(req.body));
      console.log(`[${timestamp}] User from token:`, JSON.stringify(req.user));

      const { bookingCode } = req.params;
      const userId = req.user.id;

      console.log(
        `[${timestamp}] Step 1: Validating bookingCode: ${bookingCode}`
      );
      if (!bookingCode || typeof bookingCode !== "string") {
        console.warn(
          `[${timestamp}] Invalid bookingCode format: ${bookingCode}`
        );
        return res.status(400).json({ message: "Invalid booking code" });
      }

      console.log(
        `[${timestamp}] Step 2: Querying BookingHistory for bookingCode: ${bookingCode}`
      );
      const booking = await BookingHistory.findOne({ bookingCode });
      console.log(
        `[${timestamp}] Step 2: Booking found:`,
        booking ? JSON.stringify(booking) : "null"
      );
      if (!booking) {
        console.log(
          `[${timestamp}] Step 2: Booking not found for bookingCode: ${bookingCode}`
        );
        return res.status(404).json({ message: "Booking not found" });
      }

      console.log(
        `[${timestamp}] Step 3: Comparing userId: booking ${booking.userId} vs token ${userId}`
      );
      if (String(booking.userId) !== String(userId)) {
        console.error(
          `[${timestamp}] Step 3: Authorization failed - userId mismatch: ${String(
            booking.userId
          )} !== ${String(userId)}`
        );
        return res
          .status(403)
          .json({ message: "Unauthorized to cancel this booking" });
      }

      console.log(
        `[${timestamp}] Step 4: Checking booking status: ${booking.status}`
      );
      if (booking.status === "cancelled") {
        console.warn(
          `[${timestamp}] Step 4: Booking already cancelled: ${bookingCode}`
        );
        return res
          .status(400)
          .json({ message: "Booking is already cancelled" });
      }

      console.log(
        `[${timestamp}] Step 5: Validating checkOut: ${booking.checkOutDate}`
      );
      if (!booking.checkOutDate) {
        console.warn(
          `[${timestamp}] Step 5: Missing checkOut for bookingCode: ${bookingCode}`
        );
        return res.status(400).json({
          message: "Cannot cancel booking with missing check-out date",
        });
      }
      const checkOutDate = new Date(booking.checkOutDate);
      console.log(
        `[${timestamp}] Step 5: Parsed checkOutDate: ${checkOutDate}, Valid: ${!isNaN(
          checkOutDate.getTime()
        )}`
      );
      if (isNaN(checkOutDate.getTime())) {
        console.warn(
          `[${timestamp}] Step 5: Invalid checkOut for bookingCode: ${bookingCode}, checkOut: ${booking.checkOutDate}`
        );
        return res.status(400).json({
          message: "Cannot cancel booking with invalid check-out date",
        });
      }

      checkOutDate.setHours(23, 59, 59, 999); // End of check-out day
      const now = new Date();
      console.log(
        `[${timestamp}] Step 6: Comparing checkOut ${checkOutDate} vs now ${now}`
      );
      if (checkOutDate <= now) {
        console.warn(
          `[${timestamp}] Step 6: Booking cannot be cancelled - check-out date passed: ${bookingCode}`
        );
        return res
          .status(400)
          .json({ message: "Cannot cancel a completed booking" });
      }

      console.log(
        `[${timestamp}] Step 7: Updating status to cancelled for bookingCode: ${bookingCode}`
      );
      booking.status = "cancelled";
      await booking.save();
      console.log(
        `[${timestamp}] Step 7: Booking after update:`,
        JSON.stringify(booking)
      );
      console.log(
        `[${timestamp}] Step 8: Creating refund record for bookingCode: ${bookingCode}`
      );
      try {
        const refund = new Refund({
          userId: booking.userId,
          bookingCode: booking.bookingCode,
          totalPrice: booking.totalPrice,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          status: "pending",
        });
        await refund.save();
        console.log(
          `[${timestamp}] Step 9: Refund created:`,
          JSON.stringify(refund, null, 2)
        );
      } catch (refundError) {
        console.error(
          `[${timestamp}] Step 10: Failed to create refund for bookingCode: ${bookingCode}`,
          refundError
        );
        console.warn(
          `[${timestamp}] Step 11: Proceeding with cancellation despite refund creation error`
        );
      }
      console.log(`[${timestamp}] Step 12: Booking cancelled successfully`);
      res.status(200).json({
        message: "Booking cancelled successfully",
        data: {
          bookingCode: booking.bookingCode,
          status: booking.status,
        },
      });
    } catch (error) {
      console.error(`[${timestamp}] Error cancelling booking:`, error);
      console.error(
        `[${timestamp}] Error details:`,
        JSON.stringify(error, null, 2)
      );
      res.status(500).json({ message: "Server error" });
    }
  }
);

//ask refund part
// Fetch Booking by bookingCode
app.get("/api/booking/:bookingCode", verifyToken, async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/booking/${req.params.bookingCode}`
    );
    const { bookingCode } = req.params;
    const userId = req.user.id;

    // Validate bookingCode
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Validating bookingCode: ${bookingCode}`
    );
    if (!bookingCode || typeof bookingCode !== "string") {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Invalid bookingCode format: ${bookingCode}`
      );
      return res.status(400).json({ message: "Invalid bookingCode format" });
    }

    // Fetch booking details
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying BookingHistory for bookingCode: ${bookingCode}`
    );
    const booking = await BookingHistory.findOne({ bookingCode })
      .select("userId bookingCode totalPrice status checkInDate checkOutDate")
      .lean();

    if (!booking) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Booking not found for bookingCode: ${bookingCode}`
      );
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify booking belongs to user
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Verifying userId match for bookingCode: ${bookingCode}`
    );
    if (booking.userId.toString() !== userId) {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Unauthorized access for bookingCode: ${bookingCode}`
      );
      return res.status(403).json({
        message: "Unauthorized: Booking does not belong to this user",
      });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending booking data for bookingCode: ${bookingCode}`
    );
    res.status(200).json({
      message: "Booking retrieved successfully",
      data: {
        bookingCode: booking.bookingCode,
        userId: booking.userId,
        totalPrice: booking.totalPrice,
        status: booking.status,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
      },
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error fetching booking:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

// Request Refund
app.post("/api/askrefunds", verifyToken, async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/askrefunds`
    );
    const { bookingCode } = req.body;
    const userId = req.user.id;

    // Validate bookingCode
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Validating bookingCode: ${bookingCode}`
    );
    if (!bookingCode || typeof bookingCode !== "string") {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Invalid bookingCode format: ${bookingCode}`
      );
      return res.status(400).json({ message: "Invalid bookingCode format" });
    }

    // Fetch booking details
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying BookingHistory for bookingCode: ${bookingCode}`
    );
    const booking = await BookingHistory.findOne({ bookingCode })
      .select("userId bookingCode totalPrice status checkInDate checkOutDate")
      .lean();

    if (!booking) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Booking not found for bookingCode: ${bookingCode}`
      );
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify booking belongs to user
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Verifying userId match for bookingCode: ${bookingCode}`
    );
    if (booking.userId.toString() !== userId) {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Unauthorized access for bookingCode: ${bookingCode}`
      );
      return res.status(403).json({
        message: "Unauthorized: Booking does not belong to this user",
      });
    }

    // Check if booking status is exactly "check-in"
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Checking booking status for bookingCode: ${bookingCode}`
    );
    if (booking.status !== "check-in") {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Refund not allowed, booking status is: ${
          booking.status
        } for bookingCode: ${bookingCode}`
      );
      return res.status(400).json({
        message: "Refund only allowed for bookings with check-in status",
      });
    }

    // Check if refund request already exists
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Checking for existing refund for bookingCode: ${bookingCode}`
    );
    const existingRefund = await Refund.findOne({ bookingCode }).lean();
    if (existingRefund) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Refund already requested for bookingCode: ${bookingCode}`
      );
      return res
        .status(400)
        .json({ message: "Refund request already submitted for this booking" });
    }

    // Create new refund record
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Creating new refund for bookingCode: ${bookingCode}`
    );
    const refund = new Refund({
      userId: booking.userId,
      bookingCode: booking.bookingCode,
      totalPrice: booking.totalPrice,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      status: "pending",
    });

    await refund.save();
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Refund saved for bookingCode: ${bookingCode}`
    );

    // Update BookingHistory status to 'cancelled'
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Updating BookingHistory status to 'cancelled' for bookingCode: ${bookingCode}`
    );
    const updatedBooking = await BookingHistory.findOneAndUpdate(
      { bookingCode },
      { $set: { status: "cancelled", updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedBooking) {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] BookingHistory document not found for bookingCode: ${bookingCode}`
      );
      return res.status(404).json({
        message:
          "Refund request submitted, but booking history record not found",
        data: {
          userId: refund.userId,
          bookingCode: refund.bookingCode,
          totalPrice: refund.totalPrice,
          checkInDate: refund.checkInDate,
          checkOutDate: refund.checkOutDate,
          status: refund.status,
        },
      });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] BookingHistory status updated to 'cancelled' for bookingCode: ${bookingCode}`
    );

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending refund response for bookingCode: ${bookingCode}`
    );
    res.status(201).json({
      message: "Refund request submitted successfully",
      data: {
        userId: refund.userId,
        bookingCode: refund.bookingCode,
        totalPrice: refund.totalPrice,
        checkInDate: refund.checkInDate,
        checkOutDate: refund.checkOutDate,
        status: refund.status,
      },
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error processing refund:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

// New Endpoint: Fetch Refunds by User ID
app.get("/api/refunds/user", verifyToken, async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/refunds/user`
    );
    const userId = req.user.id;

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Validating userId: ${userId}`
    );
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Invalid userId format: ${userId}`
      );
      return res.status(400).json({ message: "Invalid userId format" });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying Refund for userId: ${userId}`
    );
    const refunds = await Refund.find({ userId })
      .select("bookingCode totalPrice status")
      .lean();

    if (!refunds || refunds.length === 0) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] No refunds found for userId: ${userId}`
      );
      return res.status(404).json({ message: "No refunds found" });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending refund data for userId: ${userId}`
    );
    res.status(200).json({
      message: "Refunds retrieved successfully",
      data: refunds,
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error fetching refunds:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

//  search by booking code in the system admin
// Search for a booking by booking code
app.get("/api/systembookings/code/:bookingCode", async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/systembookings/code/${
        req.params.bookingCode
      }`
    );
    const { bookingCode } = req.params;

    // Validate bookingCode
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Validating bookingCode: ${bookingCode}`
    );
    if (!bookingCode || typeof bookingCode !== "string") {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Invalid bookingCode format: ${bookingCode}`
      );
      return res.status(400).json({ message: "Invalid booking code" });
    }

    // Fetch booking
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying BookingHistory for bookingCode: ${bookingCode}`
    );
    const booking = await BookingHistory.findOne({ bookingCode })
      .select(
        "hotelAdminId userId hotelName roomType roomNumber checkInDate checkOutDate totalPrice status guests bookingCode createdAt"
      )
      .lean();

    if (!booking) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Booking not found for bookingCode: ${bookingCode}`
      );
      return res.status(404).json({ message: "Booking not found", data: null });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending booking data for bookingCode: ${bookingCode}`
    );
    res.status(200).json({
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error fetching booking:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch user details by userId (no authentication required)
app.get("/api/systemusers/:userId", async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/systemusers/${req.params.userId}`
    );
    const { userId } = req.params;

    // Validate userId
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Validating userId: ${userId}`
    );
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.warn(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] Invalid userId format: ${userId}`
      );
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Fetch user details
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying User for userId: ${userId}`
    );
    const user = await userModel
      .findById(userId)
      .select("firstName middleName lastName email phone passportOrId")
      .lean();

    if (!user) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] User not found for userId: ${userId}`
      );
      return res.status(404).json({ message: "User not found" });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending user data for userId: ${userId}`
    );
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error fetching user:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

//refund fatch for system admin
// Fetch all refunds
app.get("/api/refunds", async (req, res) => {
  try {
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Received request for /api/refunds`
    );

    // Fetch all refunds
    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Querying all refunds`
    );
    const refunds = await Refund.find()
      .select(
        "userId bookingCode totalPrice checkInDate checkOutDate status createAt"
      )
      .lean();

    if (!refunds || refunds.length === 0) {
      console.log(
        `[${new Date().toLocaleString("en-US", {
          timeZone: "Africa/Nairobi",
        })}] No refunds found`
      );
      return res.status(404).json({ message: "No refunds found", data: [] });
    }

    console.log(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Sending refund data`
    );
    res.status(200).json({
      message: "Refunds retrieved successfully",
      data: refunds,
    });
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      })}] Error fetching refunds:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

//to fatch the hotel for the system  admin dasshboard
// GET /hotels - Fetch all hotels
app.get("/hotels", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log("Fetching hotels for user:", req.user.email); // Debug
    const hotels = await Hotel.find().lean(); // Use lean() for performance
    console.log("Hotels fetched:", hotels.length); // Debug
    res.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /hotels/:id - Delete a hotel by ID
app.delete("/hotels/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log("Deleting hotel ID:", req.params.id); // Debug
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      console.log("Hotel not found:", req.params.id);
      return res.status(404).json({ message: "Hotel not found" });
    }
    console.log("Hotel deleted:", hotel.name); // Debug
    res.json({ message: `Hotel ${hotel.name} deleted successfully` });
  } catch (error) {
    console.error("Error deleting hotel:", error);
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
  "Debre Birhan Selassie Church",
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
"Lal: I'm here to assist μόνο with Amhara tourism-related queries. Please ask about destinations, hotels, travel planning, or cultural insights in the Amhara region."
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

  // Primary Error: Missing '||' operator
  if (!message || typeof message !== "string") {
    // Should be: if (!message || typeof message !== "string")
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
      model: "tunedModels/chatbot-winxtow04ge9ecmcje31wqu55ua2zgkz",
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
    // Secondary Error: Missing '||' operator in error logging
    console.error(
      "Google Generative AI Error:",
      error.response?.data || error.message || error // Should be: error.response?.data || error.message || error
    );
    res.status(500).json({ error: "Failed to get response from the model" });
  }
});
// Service Provider Routes
// Service Provider Routes
app.use("/api/service-providers", serviceProviderRoutes);
// Start Server
const port = process.env.PORT || 2001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
