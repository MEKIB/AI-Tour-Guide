import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Search } from '@mui/icons-material';

const BookingManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [booking, setBooking] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Mock booking data (replace with API call in production)
  const mockBookings = [
    {
      code: 'BK-ABC123456789012',
      userName: 'John Doe',
      passport: 'AB1234567',
      hotel: 'Hotel A',
      checkInStatus: 'Not Checked In',
      checkInDate: '2025-06-01',
      checkOutDate: '2025-06-05',
      totalPrice: 500,
    },
    {
      code: 'BK-XYZ987654321098',
      userName: 'Jane Smith',
      passport: 'CD9876543',
      hotel: 'Hotel B',
      checkInStatus: 'Checked In',
      checkInDate: '2025-07-10',
      checkOutDate: '2025-07-15',
      totalPrice: 750,
    },
  ];

  // Generate booking code (assumed to be called during booking, e.g., in PaymentModal.jsx)
  const generateBookingCode = (options = {}) => {
    const { prefix = 'BK', size = 15, removePrefix = false } = options;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < size; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return removePrefix ? result : `${prefix}-${result}`;
  };

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setNotification({
        open: true,
        message: 'Please enter a booking code.',
        severity: 'warning',
      });
      setBooking(null);
      return;
    }

    // Simulate API call (replace with actual fetch in production)
    const foundBooking = mockBookings.find(
      (b) => b.code.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (foundBooking) {
      setBooking(foundBooking);
      setNotification({
        open: true,
        message: 'Booking found.',
        severity: 'success',
      });
    } else {
      setBooking(null);
      setNotification({
        open: true,
        message: 'No booking found with this code.',
        severity: 'error',
      });
    }
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        padding: 3,
        background: '#222831',
        minHeight: '100vh',
        color: '#EEEEEE',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: '#00ADB5', fontWeight: 'bold' }}>
        Booking Management
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Enter booking code (e.g., BK-ABC123456789012)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            background: '#393E46',
            borderRadius: 1,
            '& .MuiInputBase-input': {
              color: '#EEEEEE',
            },
            '& .MuiInputLabel-root': {
              color: '#EEEEEE',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#00ADB5',
              },
              '&:hover fieldset': {
                borderColor: '#00ADB5',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00ADB5',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<Search />}
          sx={{
            bgcolor: '#00ADB5',
            color: '#EEEEEE',
            borderRadius: 1,
            '&:hover': { bgcolor: '#0097A7' },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Booking Details */}
      {booking ? (
        <TableContainer component={Paper} sx={{ background: '#393E46', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Booking Code</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>User Name</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Passport</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Hotel</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-In Status</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-In Date</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-Out Date</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.code}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.userName}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.passport}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.hotel}</TableCell>
                <TableCell sx={{ color: booking.checkInStatus === 'Checked In' ? '#00ADB5' : '#ff6b6b' }}>
                  {booking.checkInStatus}
                </TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.checkInDate}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.checkOutDate}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>${booking.totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ color: '#EEEEEE', textAlign: 'center', mt: 4 }}>
          {searchQuery && !booking ? 'No booking found with this code.' : 'Enter a booking code to view details.'}
        </Typography>
      )}

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingManagement;