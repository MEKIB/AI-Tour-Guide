import mongoose from 'mongoose';

const roomTypeProperitesSchema = new mongoose.Schema({
  hotelAdminId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Single', 'Double'],
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 1,
  },
  size: {
    type: String,
    required: true, // e.g., "40 m²"
  },
  amenities: [
    {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RoomTypeProperites = mongoose.model('RoomTypeProperites', roomTypeProperitesSchema);
export default RoomTypeProperites;