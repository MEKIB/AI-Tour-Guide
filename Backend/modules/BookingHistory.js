import mongoose from "mongoose";

const bookingHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotelAdminId: { type: String, required: true },
  hotelName: { type: String, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'check-in', 'checked-out', 'cancelled'], // Updated statuses
    default: 'pending',
  },
  rating: { type: Number, min: 0, max: 5 },
  image: { type: String },
  guests: { type: Number, defdault: 1 },
  bookingCode: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model('BookingHistory', bookingHistorySchema);