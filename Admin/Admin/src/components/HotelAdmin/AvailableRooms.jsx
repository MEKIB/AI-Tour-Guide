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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AvailableRooms = () => {
  // Sample data for available rooms
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: '101',
      roomType: 'Single Room',
      price: '$100',
      availableFrom: '2025-03-19',
      availableTo: '2025-03-21',
    },
    {
      id: 2,
      roomNumber: '102',
      roomType: 'Double Room',
      price: '$150',
      availableFrom: '2025-03-20',
      availableTo: '2025-03-22',
    },
    {
      id: 3,
      roomNumber: '103',
      roomType: 'Single Room',
      price: '$100',
      availableFrom: '2025-03-18',
      availableTo: '2025-03-20',
    },
    {
      id: 4,
      roomNumber: '104',
      roomType: 'Double Room',
      price: '$150',
      availableFrom: '2025-03-21',
      availableTo: '2025-03-23',
    },
    {
      id: 5,
      roomNumber: '105',
      roomType: 'Single Room',
      price: '$100',
      availableFrom: '2025-03-19',
      availableTo: '2025-03-20',
    },
    {
      id: 6,
      roomNumber: '106',
      roomType: 'Double Room',
      price: '$150',
      availableFrom: '2025-03-22',
      availableTo: '2025-03-24',
    },
    {
      id: 7,
      roomNumber: '107',
      roomType: 'Single Room',
      price: '$100',
      availableFrom: '2025-03-23',
      availableTo: '2025-03-25',
    },
    {
      id: 8,
      roomNumber: '108',
      roomType: 'Double Room',
      price: '$150',
      availableFrom: '2025-03-24',
      availableTo: '2025-03-26',
    },
    {
      id: 9,
      roomNumber: '109',
      roomType: 'Single Room',
      price: '$100',
      availableFrom: '2025-03-25',
      availableTo: '2025-03-27',
    },
    {
      id: 10,
      roomNumber: '110',
      roomType: 'Double Room',
      price: '$150',
      availableFrom: '2025-03-26',
      availableTo: '2025-03-28',
    },
    {
      id: 11,
      roomNumber: '111',
      roomType: 'Single Room',
      price: '$100',
      availableFrom: '2025-03-27',
      availableTo: '2025-03-29',
    },
    {
      id: 12,
      roomNumber: '112',
      roomType: 'Double Room',
      price: '$150',
      availableFrom: '2025-03-28',
      availableTo: '2025-03-30',
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date('2025-03-20')); // Default to March 20, 2025
  const [filterType, setFilterType] = useState('date'); // 'date', 'today', 'week', 'month', 'year'
  const [roomTypeFilter, setRoomTypeFilter] = useState('all'); // 'all', 'Single Room', 'Double Room'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter rooms based on the selected filter type and room type
  const filteredRooms = rooms.filter((room) => {
    const availableFromDate = new Date(room.availableFrom);
    const availableToDate = new Date(room.availableTo);
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
        dateFilterPassed = selectedDate >= availableFromDate && selectedDate <= availableToDate;
        break;
      case 'today':
        dateFilterPassed = today >= availableFromDate && today <= availableToDate;
        break;
      case 'week':
        dateFilterPassed = startOfWeek <= availableToDate && endOfWeek >= availableFromDate;
        break;
      case 'month':
        dateFilterPassed = startOfMonth <= availableToDate && endOfMonth >= availableFromDate;
        break;
      case 'year':
        dateFilterPassed = startOfYear <= availableToDate && endOfYear >= availableFromDate;
        break;
      default:
        dateFilterPassed = true;
    }

    // Filter by room type
    let roomTypeFilterPassed = false;
    switch (roomTypeFilter) {
      case 'all':
        roomTypeFilterPassed = true;
        break;
      case 'Single Room':
      case 'Double Room':
        roomTypeFilterPassed = room.roomType === roomTypeFilter;
        break;
      default:
        roomTypeFilterPassed = true;
    }

    return dateFilterPassed && roomTypeFilterPassed;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, backgroundColor: '#222831', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#EEEEEE' }}>
          Available Rooms
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
                    backgroundColor: '#EEEEEE', // Light background for visibility
                    borderRadius: 1,
                    '& .MuiInputBase-input': {
                      color: '#00ADB5', // Green text for contrast
                    },
                    '& .MuiInputLabel-root': {
                      color: '#00ADB5', // Green label for contrast
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#00ADB5', // Green border for visibility
                      },
                      '&:hover fieldset': {
                        borderColor: '#00ADB5', // Green border on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00ADB5', // Green border when focused
                      },
                    },
                  }}
                />
              )}
            />
          )}

          {/* Room Type Filter */}
          <Select
            value={roomTypeFilter}
            onChange={(e) => setRoomTypeFilter(e.target.value)}
            sx={{ backgroundColor: '#393E46', color: '#EEEEEE', width: '150px' }}
          >
            <MenuItem value="all">All Room Types</MenuItem>
            <MenuItem value="Single Room">Single Room</MenuItem>
            <MenuItem value="Double Room">Double Room</MenuItem>
          </Select>
        </Box>

        {/* Rooms Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#393E46' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE' }}>Room Number</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Room Type</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Price</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Available From</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Available To</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRooms.length > 0 ? (
                paginatedRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell sx={{ color: '#EEEEEE' }}>{room.roomNumber}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{room.roomType}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{room.price}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{room.availableFrom}</TableCell>
                    <TableCell sx={{ color: '#EEEEEE' }}>{room.availableTo}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ color: '#EEEEEE', textAlign: 'center' }}>
                    No rooms found.
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
      </Box>
    </LocalizationProvider>
  );
};

export default AvailableRooms;