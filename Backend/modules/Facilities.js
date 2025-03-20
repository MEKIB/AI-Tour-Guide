import mongoose from "mongoose";

// Amenity Schema
const amenitySchema = new mongoose.Schema({
  hotelAdminId: {
    type: String,
    required: true,
  },
  amenities: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
});

const Amenity = mongoose.model('Amenity', amenitySchema);
export default Amenity;