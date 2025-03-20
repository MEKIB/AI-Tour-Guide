import mongoose, { model } from "mongoose";
// Hotel Schema
const hotelSchema = new mongoose.Schema({
    HotelAdminId:{type:String,required:true},
    name: { type: String, required: true },
    location: { type: String, required: true },
    facilityType: { type: String, required: true },
    description: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    images: [{ name: String, url: String }],
  });
  
  const Hotel = mongoose.model('Hotel', hotelSchema);
  
  export default Hotel