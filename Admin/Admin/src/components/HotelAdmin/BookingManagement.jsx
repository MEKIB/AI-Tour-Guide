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
  TextField,
  Button,
  Select,
  MenuItem,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const BookingManagement = () => {
  // Sample data with bookings in March 2025
  const [bookings, setBookings] = useState([
    {
      id: 1,
      guestName: 'John Doe',
      roomType: 'Standard',
      checkIn: '2025-03-19',
      checkOut: '2025-03-21',
      status: 'Booked', // Initial status
      paymentStatus: 'Confirmed',
    },
    {
      id: 2,
      guestName: 'Jane Smith',
      roomType: 'Deluxe',
      checkIn: '2025-03-20',
      checkOut: '2025-03-22',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 3,
      guestName: 'Alice Johnson',
      roomType: 'Suite',
      checkIn: '2025-03-18',
      checkOut: '2025-03-20',
      status: 'Checked-In', // Already checked in
      paymentStatus: 'Confirmed',
    },
    {
      id: 4,
      guestName: 'Bob Brown',
      roomType: 'Standard',
      checkIn: '2025-03-21',
      checkOut: '2025-03-23',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 5,
      guestName: 'Charlie Davis',
      roomType: 'Deluxe',
      checkIn: '2025-03-19',
      checkOut: '2025-03-20',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 6,
      guestName: 'David Wilson',
      roomType: 'Standard',
      checkIn: '2025-03-22',
      checkOut: '2025-03-24',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 7,
      guestName: 'Eva Green',
      roomType: 'Deluxe',
      checkIn: '2025-03-23',
      checkOut: '2025-03-25',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 8,
      guestName: 'Frank White',
      roomType: 'Suite',
      checkIn: '2025-03-24',
      checkOut: '2025-03-26',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 9,
      guestName: 'Grace Black',
      roomType: 'Standard',
      checkIn: '2025-03-25',
      checkOut: '2025-03-27',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 10,
      guestName: 'Henry Brown',
      roomType: 'Deluxe',
      checkIn: '2025-03-26',
      checkOut: '2025-03-28',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 11,
      guestName: 'Ivy Blue',
      roomType: 'Suite',
      checkIn: '2025-03-27',
      checkOut: '2025-03-29',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
    {
      id: 12,
      guestName: 'Jack Red',
      roomType: 'Standard',
      checkIn: '2025-03-28',
      checkOut: '2025-03-30',
      status: 'Booked',
      paymentStatus: 'Confirmed',
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date('2025-03-20')); // Default to March 20, 2025
  const [filterType, setFilterType] = useState('date'); // 'date', 'today', 'week', 'month', 'year'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'checked-in', 'not-checked-in'
  const [currentPage, setCurrentPage] = useState(1);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const itemsPerPage = 10;

  // Handle check-in confirmation
  const handleCheckIn = (id) => {
    setSelectedBookingId(id);
    setOpenConfirmDialog(true);
  };

  // Confirm check-in
  const confirmCheckIn = () => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === selectedBookingId ? { ...booking, status: 'Checked-In' } : booking
      )
    );
    setOpenConfirmDialog(false);
  };

  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  // Filter bookings based on the selected filter type
  const filteredBookings = bookings.filter((booking) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    // Filter by date range
    let dateFilterPassed = false;
    switch (filterType) {
      case 'date':
        dateFilterPassed = selectedDate >= checkInDate && selectedDate <= checkOutDate;
        break;
      case 'today':
        dateFilterPassed = today >= checkInDate && today <= checkOutDate;
        break;
      case 'week':
        dateFilterPassed = startOfWeek <= checkOutDate && endOfWeek >= checkInDate;
        break;
      case 'month':
        dateFilterPassed = startOfMonth <= checkOutDate && endOfMonth >= checkInDate;
        break;
      case 'year':
        dateFilterPassed = startOfYear <= checkOutDate && endOfYear >= checkInDate;
        break;
      default:
        dateFilterPassed = true;
    }

    // Filter by status
    let statusFilterPassed = false;
    switch (statusFilter) {
      case 'all':
        statusFilterPassed = true;
        break;
      case 'checked-in':
        statusFilterPassed = booking.status === 'Checked-In';
        break;
      case 'not-checked-in':
        statusFilterPassed = booking.status === 'Booked';
        break;
      default:
        statusFilterPassed = true;
    }

    return dateFilterPassed && statusFilterPassed;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, backgroundColor: '#222831', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#EEEEEE' }}>
          Booking Management
        </Typography>

        {/* Filter Controls */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            sx={{ backgroundColor: '#393E46', color: '#EEEEEE', width: '150px' }}
          >
            <MenuItem value="date">By Date</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>

          {filterType === 'date' && (
  <DatePicker
    label="Select Date"
    value={selectedDate}
    onChange={(newValue) => setSelectedDate(newValue)}
    renderInput={(params) => (
      <TextField
        {...params}
        sx={{
          backgroundColor: '#FF0000', // Light background for visibility
          borderRadius: 1,
          '& .MuiInputBase-input': {
            color: '#FF0000', // Red text for contrast
          },
          '& .MuiInputLabel-root': {
            color: '#FF0000', // Red label for contrast
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FF0000', // Red border for visibility
            },
            '&:hover fieldset': {
              borderColor: '#FF0000', // Red border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF0000', // Red border when focused
            },
          },
        }}
      />
    )}
  />
)}
          {/* Status Filter Buttons */}
          <Button
            variant={statusFilter === 'all' ? 'contained' : 'outlined'}
            onClick={() => setStatusFilter('all')}
            sx={{ backgroundColor: statusFilter === 'all' ? '#00ADB5' : '#393E46', color: '#EEEEEE' }}
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'checked-in' ? 'contained' : 'outlined'}
            onClick={() => setStatusFilter('checked-in')}
            sx={{ backgroundColor: statusFilter === 'checked-in' ? '#00ADB5' : '#393E46', color: '#EEEEEE' }}
          >
            Checked-In
          </Button>
          <Button
            variant={statusFilter === 'not-checked-in' ? 'contained' : 'outlined'}
            onClick={() => setStatusFilter('not-checked-in')}
            sx={{ backgroundColor: statusFilter === 'not-checked-in' ? '#00ADB5' : '#393E46', color: '#EEEEEE' }}
          >
            Not Checked-In
          </Button>
        </Box>

        {/* Bookings Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#393E46' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE' }}>Guest Name</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Room Type</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Check-In</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Check-Out</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Status</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Payment Status</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell sx={{ color: '#EEEEEE' }}>{booking.guestName}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{booking.roomType}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{booking.checkIn}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{booking.checkOut}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{booking.status}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{booking.paymentStatus}</TableCell>
                    <TableCell>
                      {booking.status === 'Booked' ? (
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: '#00ADB5', color: '#EEEEEE' }}
                          onClick={() => handleCheckIn(booking.id)}
                        >
                          Check-In
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: '#393E46', color: '#00ADB5' }} // Text color changed to #00ADB5
                          disabled
                        >
                          Checked-In
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} sx={{ color: '#EEEEEE', textAlign: 'center' }}>
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#EEEEEE', // Default text color for all pagination items
                },
                '& .Mui-selected': {
                  backgroundColor: '#00ADB5', // Background color for the active page
                  color: '#EEEEEE', // Text color for the active page
                  '&:hover': {
                    backgroundColor: '#00ADB5', // Hover background color for the active page
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Confirmation Dialog */}
        <Dialog open={openConfirmDialog} onClose={closeConfirmDialog}>
          <DialogTitle>Confirm Check-In</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to check in this guest?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirmDialog} sx={{ color: '#00ADB5' }}>
              Cancel
            </Button>
            <Button onClick={confirmCheckIn} sx={{ color: '#00ADB5' }}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingManagement;