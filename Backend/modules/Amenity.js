import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema({
  hotelAdminId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AmenityFacilities= mongoose.model('AmenityDetails', amenitySchema);
export default AmenityFacilities