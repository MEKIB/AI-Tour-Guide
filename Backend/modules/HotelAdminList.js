// modules/HotelAdminList.js
import mongoose from 'mongoose';

const hotelAdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  passportId: {
    name: String,
    url: String,
  },
  tradeLicense: {
    name: String,
    url: String,
  },
  managerId: {
    name: String,
    url: String,
  },
  agreedToTerms: { type: Boolean, required: true },
  isApproved: { type: Boolean, default: false },
  hotelAdminId: { type: Number, unique: true, sparse: true }, // Added hotelAdminId
  createdAt: { type: Date, default: Date.now },
});


  const HotelAdminList=mongoose.model("HotelAdminLists",hotelAdminSchema)

  export default HotelAdminList