import express from "express";
import { ServiceProvider } from "../modules/ServiceProvider.js";

const router = express.Router();

// Create a new service provider (no auth)
router.post("/", async (req, res) => {
  try {
    const { name, typeId, city, address, phoneNumber, longitude, latitude } =
      req.body;
    const serviceProvider = new ServiceProvider({
      name,
      typeId,
      city,
      address,
      phoneNumber,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    });
    await serviceProvider.save();
    res
      .status(201)
      .json({ message: "Service provider created", data: serviceProvider });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get nearby service providers by city (no auth)
router.get("/nearby", async (req, res) => {
  try {
    const { longitude, latitude, city } = req.query;
    if (!longitude || !latitude || !city) {
      return res
        .status(400)
        .json({ message: "Longitude, latitude, and city are required" });
    }
    const providers = await ServiceProvider.find({
      city,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
        },
      },
    });
    res.json({ message: "Nearby service providers fetched", data: providers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
