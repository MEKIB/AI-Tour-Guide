// modules/ApprovedHotelAdmin.js
import mongoose from 'mongoose';

const approvedHotelAdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
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
  hotelAdminId: { type: Number, required: true, unique: true },
  approvedAt: { type: Date, default: Date.now },
});

const ApprovedHotelAdmin=mongoose.model("Approved Hotel Admin",approvedHotelAdminSchema)

export default ApprovedHotelAdmin;