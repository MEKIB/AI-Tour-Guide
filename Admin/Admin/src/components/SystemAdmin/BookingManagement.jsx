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
import axios from 'axios';

const BookingManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [booking, setBooking] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Handle search by booking code
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setNotification({
        open: true,
        message: 'Please enter a booking code.',
        severity: 'warning',
      });
      setBooking(null);
      return;
    }

    try {
      const response = await axios.get(`/api/bookingHistory/code/${searchQuery.trim()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
      });

      setBooking(response.data.data);
      setNotification({
        open: true,
        message: 'Booking found.',
        severity: 'success',
      });
    } catch (error) {
      setBooking(null);
      setNotification({
        open: true,
        message: error.response?.data?.message || 'No booking found with this code.',
        severity: 'error',
      });
    }
  };

  // Handle check-in/check-out
  const handleStatusUpdate = async (newStatus) => {
    if (!booking) return;

    try {
      const response = await axios.patch(
        `/api/bookingHistory/${booking.bookingCode}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setBooking(response.data.data);
      setNotification({
        open: true,
        message: `Booking ${newStatus} successfully.`,
        severity: 'success',
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || `Failed to update booking to ${newStatus}.`,
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
            '& .MuiInputBase-input': { color: '#EEEEEE' },
            '& .MuiInputLabel-root': { color: '#EEEEEE' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#00ADB5' },
              '&:hover fieldset': { borderColor: '#00ADB5' },
              '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
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
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-In Date</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Check-Out Date</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Total Price</TableCell>
                <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.bookingCode}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.userName}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.passport}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.hotelName}</TableCell>
                <TableCell
                  sx={{
                    color:
                      booking.status === 'checked-in'
                        ? '#00ADB5'
                        : booking.status === 'checked-out'
                        ? '#4CAF50'
                        : booking.status === 'cancelled'
                        ? '#ff6b6b'
                        : '#FFC107',
                  }}
                >
                  {booking.status}
                </TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.checkInDate}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{booking.checkOutDate}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>${booking.totalPrice}</TableCell>
                <TableCell>
                  {booking.status === 'pending' && (
                    <Button
                      variant="contained"
                      onClick={() => handleStatusUpdate('checked-in')}
                      sx={{
                        bgcolor: '#00ADB5',
                        color: '#EEEEEE',
                        mr: 1,
                        '&:hover': { bgcolor: '#0097A7' },
                      }}
                    >
                      Check In
                    </Button>
                  )}
                  {booking.status === 'checked-in' && (
                    <Button
                      variant="contained"
                      onClick={() => handleStatusUpdate('checked-out')}
                      sx={{
                        bgcolor: '#4CAF50',
                        color: '#EEEEEE',
                        '&:hover': { bgcolor: '#45A049' },
                      }}
                    >
                      Check Out
                    </Button>
                  )}
                </TableCell>
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
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingManagement;