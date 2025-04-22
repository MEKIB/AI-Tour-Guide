import mongoose from 'mongoose';

const roomTypeSchemas = new mongoose.Schema({
  hotelAdminId: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Standard', 'Deluxe', 'Suite', 'Single', 'Double']
  },
  rate: Number,
  roomNumbers: [{
    number: String,
    availability: [Date]
  }],
  details: {
    bathrooms: Number,
    size: String,
    amenities: [{
      name: String,
      icon: String
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RoomTypeProperites= mongoose.model('RoomTypeDetails', roomTypeSchemas);

export default RoomTypeProperites