import mongoose from 'mongoose';
import BookingHistory from '../modules/BookingHistory';
// Utility function to generate booking code
const generateBookingCode = (options = {}) => {
  const { prefix = 'BOOK', size = 15, removePrefix = false } = options;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return removePrefix ? result : `${prefix}-${result}`;
};

// Endpoint to create booking history after successful payment
const createBookingHistory = async (req, res) => {
  try {
    const {
      userId,
      hotelAdminId,
      hotelName,
      roomType,
      roomNumber,
      checkInDate,
      checkOutDate,
      totalPrice,
      image,
      guests,
      tx_ref, // Transaction reference from frontend (optional)
    } = req.body;

    // Validate required fields
    if (!userId || !hotelAdminId || !hotelName || !roomType || !roomNumber || !checkInDate || !checkOutDate || !totalPrice) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(hotelAdminId)) {
      return res.status(400).json({ message: 'Invalid userId or hotelAdminId format' });
    }

    // Generate a unique booking code (use tx_ref if provided, else generate new)
    const bookingCode = tx_ref || generateBookingCode();

    // Create new booking history entry
    const bookingHistory = new BookingHistory({
      userId,
      hotelAdminId,
      hotelName,
      roomType,
      roomNumber,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPrice: parseFloat(totalPrice),
      image: image || 'https://via.placeholder.com/500x180?text=No+Image',
      guests: guests || 1,
      status: 'completed',
      bookingCode, // Store the booking code
    });

    // Save to database
    await bookingHistory.save();

    res.status(201).json({
      message: 'Booking history created successfully',
      data: bookingHistory,
    });
  } catch (error) {
    console.error('Error creating booking history:', error);
    if (error.code === 11000) { // Handle duplicate bookingCode
      return res.status(400).json({ message: 'Booking code already exists, please try again' });
    }
    res.status(500).json({
      message: error.message || 'Failed to create booking history',
    });
  }
};

export default createBookingHistory;