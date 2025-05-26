import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingCode: { type: String, required: true, unique: true },
  totalPrice: { type: Number, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'refunded'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model('Refund', refundSchema);