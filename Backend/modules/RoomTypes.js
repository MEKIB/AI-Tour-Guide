import mongoose from 'mongoose';

const roomTypeSchema = new mongoose.Schema({
  hotelAdminId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Standard', 'Deluxe', 'Suite']
  },
  rate: {
    type: Number,
    required: true,
    min: 0
  },
  roomNumbers: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RoomType= mongoose.model('RoomType', roomTypeSchema);
export default RoomType