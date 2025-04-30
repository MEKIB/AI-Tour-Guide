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
    enum: ['Single', 'Double'],
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
    required: true,
    min: 0,
  },
  childrenAges: [
    {
      type: Number,
      min: 0,
      max: 17,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;