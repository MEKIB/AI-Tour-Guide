import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, isBefore, isEqual, parseISO, format } from 'date-fns';

// Define the color palette
const colors = {
  dark: '#222831',
  darkGray: '#393E46',
  teal: '#00ADB5',
  light: '#EEEEEE',
  error: '#FF0000', // Add an error color if needed
};

// Sample room data (one room number per ID)
const sampleRooms = [
  {
    id: 1,
    type: 'Single',
    rate: 100,
    roomNumber: 'R101',
    availability: [
      { date: '2023-10-15', available: false }, // Sample unavailability
      { date: '2023-10-16', available: false },
    ],
  },
  {
    id: 2,
    type: 'Double',
    rate: 200,
    roomNumber: 'R201',
    availability: [
      { date: '2023-10-20', available: false }, // Sample unavailability
    ],
  },
  {
    id: 3,
    type: 'Single',
    rate: 150,
    roomNumber: 'R301',
    availability: [
      { date: '2023-10-25', available: false }, // Sample unavailability
      { date: '2023-10-26', available: false },
    ],
  },
  {
    id: 4,
    type: 'Double',
    rate: 250,
    roomNumber: 'R401',
    availability: [
      { date: '2023-10-30', available: false }, // Sample unavailability
    ],
  },
];

const UnavailabilityManagement = () => {
  const [rooms, setRooms] = useState(sampleRooms); // Use sample data
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [unavailabilityToDelete, setUnavailabilityToDelete] = useState({ roomId: null, date: null });
  const [roomTypeFilter, setRoomTypeFilter] = useState(''); // Room type filter state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const roomsPerPage = 10; // Number of rooms per page

  // Handle adding unavailability for a specific date or range of dates
  const handleAddUnavailability = () => {
    if (selectedRoom && startDate) {
      const dateString = startDate.toISOString().split('T')[0];

      const datesToUpdate = [];
      if (endDate) {
        let currentDate = startDate;
        while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
          datesToUpdate.push(currentDate.toISOString().split('T')[0]);
          currentDate = addDays(currentDate, 1);
        }
      } else {
        datesToUpdate.push(dateString); // Handle single date selection
      }

      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === selectedRoom.id
            ? {
                ...room,
                availability: [
                  ...room.availability.filter(
                    (av) => !datesToUpdate.includes(av.date) // Remove existing entries for the same dates
                  ),
                  ...datesToUpdate.map((date) => ({ date, available: false })), // Add new unavailability
                ],
              }
            : room
        )
      );

      setAvailabilityDialogOpen(false);
    }
  };

  // Remove specific unavailability entry or all unavailability for a room
  const handleRemoveUnavailability = () => {
    const { roomId, date } = unavailabilityToDelete;
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              availability: date
                ? room.availability.filter((av) => av.date !== date) // Delete specific date
                : [], // Delete all unavailability
            }
          : room
      )
    );
    setDeleteConfirmationOpen(false);
  };

  // Group consecutive dates into ranges
  const groupDatesIntoRanges = (dates) => {
    if (dates.length === 0) return [];

    const sortedDates = dates
      .map((date) => parseISO(date))
      .sort((a, b) => a - b);

    const ranges = [];
    let startDate = sortedDates[0];
    let endDate = sortedDates[0];

    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = sortedDates[i];
      const previousDate = sortedDates[i - 1];

      if (isEqual(currentDate, addDays(previousDate, 1))) {
        endDate = currentDate;
      } else {
        ranges.push({ start: startDate, end: endDate });
        startDate = currentDate;
        endDate = currentDate;
      }
    }

    ranges.push({ start: startDate, end: endDate });

    return ranges;
  };

  // Filter rooms by type
  const filteredRooms = roomTypeFilter
    ? rooms.filter((room) => room.type === roomTypeFilter)
    : rooms;

  // Pagination logic
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Change page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredRooms.length / roomsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, backgroundColor: colors.dark, minHeight: '100vh', color: colors.light }}>
        <Typography variant="h4" gutterBottom sx={{ color: colors.teal }}>
          Unavailability Management
        </Typography>

        {/* Room Type Filter */}
        <FormControl fullWidth sx={{ mb: 3, maxWidth: 300 }}>
          <InputLabel id="room-type-filter-label">Room Type</InputLabel>
          <Select
            labelId="room-type-filter-label"
            value={roomTypeFilter}
            onChange={(e) => {
              setRoomTypeFilter(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            label="Room Type"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Double">Double</MenuItem>
          </Select>
        </FormControl>

        {/* Room Details Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: colors.darkGray }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: colors.light }}>Room Type</TableCell>
                <TableCell sx={{ color: colors.light }}>Rate</TableCell>
                <TableCell sx={{ color: colors.light }}>Room Number</TableCell>
                <TableCell sx={{ color: colors.light }}>Availability</TableCell>
                <TableCell sx={{ color: colors.light }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell sx={{ color: colors.light }}>{room.type}</TableCell>
                  <TableCell sx={{ color: colors.light }}>${room.rate}</TableCell>
                  <TableCell sx={{ color: colors.light }}>{room.roomNumber}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      startIcon={<EventBusyIcon />}
                      onClick={() => {
                        setSelectedRoom(room);
                        setAvailabilityDialogOpen(true);
                      }}
                      sx={{ color: colors.teal, borderColor: colors.teal }}
                    >
                      Manage Availability
                    </Button>
                    <Box sx={{ mt: 1 }}>
                      {groupDatesIntoRanges(
                        room.availability
                          .filter((av) => !av.available)
                          .map((av) => av.date)
                      ).map((range, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ color: colors.light }}>
                            {format(range.start, 'yyyy-MM-dd')} to {format(range.end, 'yyyy-MM-dd')}: Unavailable
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{ color: colors.error }}
                            onClick={() => {
                              setUnavailabilityToDelete({
                                roomId: room.id,
                                date: format(range.start, 'yyyy-MM-dd'),
                              });
                              setDeleteConfirmationOpen(true);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: colors.error }}
                      onClick={() => {
                        setUnavailabilityToDelete({
                          roomId: room.id,
                          date: null, // Delete all unavailability for this room
                        });
                        setDeleteConfirmationOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{ mx: 1, color: colors.light }}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredRooms.length / roomsPerPage)}
            sx={{ mx: 1, color: colors.light }}
          >
            Next
          </Button>
        </Box>

        {/* Availability Dialog */}
        <Dialog
          open={availabilityDialogOpen}
          onClose={() => setAvailabilityDialogOpen(false)}
          sx={{ '& .MuiPaper-root': { backgroundColor: colors.darkGray, color: colors.light } }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Mark Unavailability</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 3 }}>
              <Grid container spacing={2} sx={{ mb: 20 }}> {/* Add 20px bottom margin */}
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    slotProps={{ textField: { fullWidth: true, margin: 'normal', sx: { backgroundColor: colors.light, borderRadius: 1 } } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    slotProps={{ textField: { fullWidth: true, margin: 'normal', sx: { backgroundColor: colors.light, borderRadius: 1 } } }}
                    minDate={startDate}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAvailabilityDialogOpen(false)} sx={{ color: colors.light }}>
              Cancel
            </Button>
            <Button onClick={handleAddUnavailability} sx={{ color: colors.teal }}>
              Mark Unavailable
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmationOpen}
          onClose={() => setDeleteConfirmationOpen(false)}
          sx={{ '& .MuiPaper-root': { backgroundColor: colors.darkGray, color: colors.light } }}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove{' '}
              {unavailabilityToDelete.date
                ? `unavailability for the date ${unavailabilityToDelete.date}`
                : `all unavailability for room ${selectedRoom?.roomNumber}`}
              ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmationOpen(false)} sx={{ color: colors.light }}>
              Cancel
            </Button>
            <Button onClick={handleRemoveUnavailability} sx={{ color: colors.error }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default UnavailabilityManagement;