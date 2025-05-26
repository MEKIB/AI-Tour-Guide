import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  typeId: {
    type: String,
    enum: ["hospital", "clinic", "police_station"],
    required: true,
  },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

// Create a 2dsphere index for geospatial queries
serviceProviderSchema.index({ location: "2dsphere" });

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);

// Seed data
const seedServiceProviders = async () => {
  try {
    const existingProviders = await ServiceProvider.countDocuments();
    if (existingProviders > 0) {
      console.log("Service providers already seeded");
      return;
    }

    const providers = [
      // Lalibela: 1 hospital, 2 clinics, 1 police station
      {
        name: "Lalibela General Hospital",
        typeId: "hospital",
        city: "Lalibela",
        address: "Kebele Debre Sina, Lalibela",
        phoneNumber: "+251911123456",
        location: { type: "Point", coordinates: [39.0533, 12.0401] },
      },
      {
        name: "Mulatu Private Clinic",
        typeId: "clinic",
        city: "Lalibela",
        address: "Kebele Kurakur, Lalibela",
        phoneNumber: "+251912345678",
        location: { type: "Point", coordinates: [39.042, 12.032] },
      },
      {
        name: "Eshetu private Clinic",
        typeId: "clinic",
        city: "Lalibela",
        address: "Kebele Roha, Lalibela",
        phoneNumber: "+251913456789",
        location: { type: "Point", coordinates: [39.0487, 12.0292] },
      },
      {
        name: "Lalibela Main Police Station",
        typeId: "police_station",
        city: "Lalibela",
        address: "Near adebabay, Lalibela",
        phoneNumber: "+251910456789",
        location: { type: "Point", coordinates: [39.0426, 12.0226] },
      },
      // Bahir Dar: 3 hospitals, 3 clinics
      {
        name: "Felege Hiwot Referral Hospital",
        typeId: "hospital",
        city: "Bahir Dar",
        address: "Kebele 14, Bahir Dar",
        phoneNumber: "+251918123789",
        location: { type: "Point", coordinates: [37.3703, 11.6075] },
      },
      {
        name: "Gamby Teaching Hospital",
        typeId: "hospital",
        city: "Bahir Dar",
        address: "Kebele 10, Bahir Dar",
        phoneNumber: "+251917456123",
        location: { type: "Point", coordinates: [37.4012, 11.5943] },
      },
      {
        name: "Tibebe Ghion Specialized Hospital",
        typeId: "hospital",
        city: "Bahir Dar",
        address: "Kebele 14, Bahir Dar",
        phoneNumber: "+251919789012",
        location: { type: "Point", coordinates: [37.4005, 11.5258] },
      },
      {
        name: "Kidane Mihret Clinic",
        typeId: "clinic",
        city: "Bahir Dar",
        address: "Kebele 15, Bahir Dar",
        phoneNumber: "+251914567890",
        location: { type: "Point", coordinates: [37.3884, 11.5914] },
      },
      {
        name: "Zigba Clinic",
        typeId: "clinic",
        city: "Bahir Dar",
        address: "Kebele 3, Bahir Dar",
        phoneNumber: "+251915678901",
        location: { type: "Point", coordinates: [37.3742, 11.5923] },
      },
      {
        name: "Tana Clinic",
        typeId: "clinic",
        city: "Bahir Dar",
        address: "Near Lake Tana, Bahir Dar",
        phoneNumber: "+251916789012",
        location: { type: "Point", coordinates: [37.3682, 11.601] },
      },
      // Gonder: 2 hospitals, 2 police stations
      {
        name: "Gondar University Referral Hospital",
        typeId: "hospital",
        city: "Gonder",
        address: "Kebele 18, Gonder",
        phoneNumber: "+251916123456",
        location: { type: "Point", coordinates: [37.4667, 12.6167] },
      },
      {
        name: "Debark Hospital",
        typeId: "hospital",
        city: "Gonder",
        address: "Kebele 10, Gonder",
        phoneNumber: "+251915678123",
        location: { type: "Point", coordinates: [37.467, 12.617] },
      },
      {
        name: "Gonder Central Police Station",
        typeId: "police_station",
        city: "Gonder",
        address: "Near Fasil Ghebbi, Gonder",
        phoneNumber: "+251918456789",
        location: { type: "Point", coordinates: [37.4673, 12.6173] },
      },
      {
        name: "Kebele 15 Police Station",
        typeId: "police_station",
        city: "Gonder",
        address: "Kebele 15, Gonder",
        phoneNumber: "+251917890123",
        location: { type: "Point", coordinates: [37.4676, 12.6176] },
      },
    ];

    await ServiceProvider.insertMany(providers);
    console.log("Service providers seeded successfully");
  } catch (error) {
    console.error("Error seeding service providers:", error);
  }
};

// Auto-seed when module is imported (runs once when server starts)
seedServiceProviders();

export { ServiceProvider, seedServiceProviders };
