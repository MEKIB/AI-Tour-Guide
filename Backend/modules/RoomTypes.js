import mongoose from 'mongoose';

const roomTypeSchema = new mongoose.Schema({
  hotelAdminId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Single', 'Double'], // Align with RoomTypeProperites
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  },
  roomNumbers: [
    {
      number: {
        type: String,
        required: true,
      },
      availability: [
        {
          startDate: {
            type: Date,
            required: true,
          },
          endDate: {
            type: Date,
            required: true,
          },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);
export default RoomType;