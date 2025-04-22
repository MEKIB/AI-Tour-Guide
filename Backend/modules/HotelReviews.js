import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  hotelAdminId: {
    type: String,
    required: true,
    ref: 'Hotel', // Reference to Hotel model if you have one
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to user

  user: {
    type: String,
    default: 'Anonymous',
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review