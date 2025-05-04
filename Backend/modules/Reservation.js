import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  hotelAdminId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roomType: {
    type: String,
    required: true,
    enum: ['Single', 'Double'], // Adjust as needed
  },
  roomNumber: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
    min: 1,
  },
  children: {
    type: Number,
    default: 0,
  },
  childrenAges: {
    type: [Number],
    default: [],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Reservation', reservationSchema);