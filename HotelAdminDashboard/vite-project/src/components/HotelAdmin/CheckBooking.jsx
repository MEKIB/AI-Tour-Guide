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
} from '@mui/material';

const CheckBooking = () => {
  // Sample booking data (replace with real data from your backend)
  const [bookings, setBookings] = useState([
    {
      id: 1,
      guestName: 'John Doe',
      passportId: 'A12345678',
      roomNumber: 'R101',
      bookingCode: 'BOOK123',
      checkIn: '2023-10-01',
      checkOut: '2023-10-05',
      status: 'Confirmed',
    },
    {
      id: 2,
      guestName: 'Jane Smith',
      passportId: 'B87654321',
      roomNumber: 'R102',
      bookingCode: 'BOOK456',
      checkIn: '2023-10-10',
      checkOut: '2023-10-15',
      status: 'Pending',
    },
  ]);

  // State for search input (booking code)
  const [bookingCode, setBookingCode] = useState('');

  // State for search results
  const [searchResult, setSearchResult] = useState(null);

  // Handle search
  const handleSearch = () => {
    // Find the booking with the matching booking code
    const result = bookings.find(
      (booking) => booking.bookingCode.toLowerCase() === bookingCode.toLowerCase()
    );

    // Update the search result
    setSearchResult(result || null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Check Booking by Code
      </Typography>

      {/* Search Form */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Booking Code"
          value={bookingCode}
          onChange={(e) => setBookingCode(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 2 }}>
          Search
        </Button>
      </Box>

      {/* Search Results */}
      {searchResult ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Guest Name</TableCell>
                <TableCell>Passport/ID</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Booking Code</TableCell>
                <TableCell>Check-In</TableCell>
                <TableCell>Check-Out</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{searchResult.guestName}</TableCell>
                <TableCell>{searchResult.passportId}</TableCell>
                <TableCell>{searchResult.roomNumber}</TableCell>
                <TableCell>{searchResult.bookingCode}</TableCell>
                <TableCell>{searchResult.checkIn}</TableCell>
                <TableCell>{searchResult.checkOut}</TableCell>
                <TableCell>{searchResult.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {bookingCode ? 'No booking found with the provided code.' : 'Enter a booking code to search.'}
        </Typography>
      )}
    </Box>
  );
};

export default CheckBooking;