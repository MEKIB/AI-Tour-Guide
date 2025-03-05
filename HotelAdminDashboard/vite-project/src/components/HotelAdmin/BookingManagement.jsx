import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      guestName: 'John Doe',
      roomType: 'Standard',
      checkIn: '2023-10-01',
      checkOut: '2023-10-05',
      status: 'Pending', // Booking status
      paymentStatus: 'Pending', // Payment status
    },
    {
      id: 2,
      guestName: 'Jane Smith',
      roomType: 'Deluxe',
      checkIn: '2023-10-10',
      checkOut: '2023-10-15',
      status: 'Pending', // Booking status
      paymentStatus: 'Confirmed', // Payment status
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Confirm booking status (only allowed if payment is confirmed)
  const handleConfirmBooking = (id) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'Confirmed' } : booking
      )
    );
  };

  // Cancel a booking
  const handleCancel = (id) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };

  // Open dialog to view booking details
  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Booking Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest Name</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Check-In</TableCell>
              <TableCell>Check-Out</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.guestName}</TableCell>
                <TableCell>{booking.roomType}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{booking.paymentStatus}</TableCell>
                <TableCell>
                  {/* Confirm Booking button (disabled if payment is not confirmed or booking is already confirmed) */}
                  <Button
                    color="primary"
                    onClick={() => handleConfirmBooking(booking.id)}
                    disabled={
                      booking.paymentStatus !== 'Confirmed' ||
                      booking.status === 'Confirmed'
                    }
                  >
                    Confirm Booking
                  </Button>
                  {/* Cancel button (disabled if booking is already confirmed) */}
                  <Button
                    color="error"
                    onClick={() => handleCancel(booking.id)}
                    disabled={booking.status === 'Confirmed'}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Booking Details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box>
              <TextField
                fullWidth
                label="Guest Name"
                value={selectedBooking.guestName}
                margin="normal"
                disabled
              />
              <TextField
                fullWidth
                label="Room Type"
                value={selectedBooking.roomType}
                margin="normal"
                disabled
              />
              <TextField
                fullWidth
                label="Check-In"
                value={selectedBooking.checkIn}
                margin="normal"
                disabled
              />
              <TextField
                fullWidth
                label="Check-Out"
                value={selectedBooking.checkOut}
                margin="normal"
                disabled
              />
              <TextField
                fullWidth
                label="Status"
                value={selectedBooking.status}
                margin="normal"
                disabled
              />
              <TextField
                fullWidth
                label="Payment Status"
                value={selectedBooking.paymentStatus}
                margin="normal"
                disabled
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingManagement;