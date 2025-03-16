import mongoose from "mongoose";
// Amenity Schema
const amenitySchema = new mongoose.Schema({
    name: String,
    description: String,
    icon: String,
  });
  
  const Amenity = mongoose.model('Amenity', amenitySchema);
export default Amenity;  