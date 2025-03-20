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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, isBefore, isEqual, parseISO, format, isToday } from 'date-fns';

// Color palette
const colors = {
  dark: '#222831',
  darkGray: '#393E46',
  teal: '#00ADB5',
  light: '#EEEEEE',
};

const RoomManagement = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      type: 'Standard',
      rate: 100,
      roomNumbers: [
        {
          number: 'R101',
          availability: [], // Start with no unavailability
        },
      ],
    },
  ]);

  const [newRoom, setNewRoom] = useState({ type: '', rate: '', roomNumbers: '' });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [unavailabilityToDelete, setUnavailabilityToDelete] = useState(null);

  // Handle adding a new room type with room numbers
  const handleAddRoom = () => {
    if (newRoom.type && newRoom.rate && newRoom.roomNumbers) {
      const roomNumbersArray = newRoom.roomNumbers
        .split(',')
        .map((number) => number.trim())
        .filter((number) => number !== '');

      const newRoomType = {
        id: rooms.length + 1,
        type: newRoom.type,
        rate: newRoom.rate,
        roomNumbers: roomNumbersArray.map((number) => ({
          number,
          availability: [], // Start with no unavailability
        })),
      };

      setRooms([...rooms, newRoomType]);
      setNewRoom({ type: '', rate: '', roomNumbers: '' });
    }
  };

  // Open the availability dialog for a specific room number
  const handleOpenAvailabilityDialog = (roomTypeId, roomNumber) => {
    setSelectedRoom({ roomTypeId, roomNumber });
    setAvailabilityDialogOpen(true);
  };

  // Close the availability dialog
  const handleCloseAvailabilityDialog = () => {
    setAvailabilityDialogOpen(false);
    setSelectedRoom(null);
    setStartDate(null);
    setEndDate(null);
  };

  // Add unavailability for a specific date or range of dates
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
          room.id === selectedRoom.roomTypeId
            ? {
                ...room,
                roomNumbers: room.roomNumbers.map((rn) =>
                  rn.number === selectedRoom.roomNumber
                    ? {
                        ...rn,
                        availability: [
                          ...rn.availability.filter(
                            (av) => !datesToUpdate.includes(av.date) // Remove existing entries for the same dates
                          ),
                          ...datesToUpdate.map((date) => ({ date, available: false })), // Add new unavailability
                        ],
                      }
                    : rn
                ),
              }
            : room
        )
      );

      handleCloseAvailabilityDialog();
    }
  };

  // Delete a room number
  const handleDeleteRoomNumber = (roomTypeId, roomNumber) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomTypeId
          ? {
              ...room,
              roomNumbers: room.roomNumbers.filter((rn) => rn.number !== roomNumber),
            }
          : room
      )
    );
    setDeleteConfirmationOpen(false);
  };

  // Remove specific unavailability entry
  const handleRemoveUnavailability = (roomTypeId, roomNumber, date) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomTypeId
          ? {
              ...room,
              roomNumbers: room.roomNumbers.map((rn) =>
                rn.number === roomNumber
                  ? {
                      ...rn,
                      availability: rn.availability.filter((av) => av.date !== date),
                    }
                  : rn
              ),
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

  // Check if the room is unavailable for the current date
  const isRoomUnavailableToday = (roomNumber) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const room = rooms
      .flatMap((room) => room.roomNumbers)
      .find((rn) => rn.number === roomNumber);

    if (room) {
      const availability = room.availability.find((av) => av.date === today);
      return availability ? !availability.available : false;
    }
    return false;
  };

  // Open delete confirmation dialog
  const openDeleteConfirmation = (roomTypeId, roomNumber, date = null) => {
    setRoomToDelete({ roomTypeId, roomNumber });
    setUnavailabilityToDelete(date);
    setDeleteConfirmationOpen(true);
  };

  // Close delete confirmation dialog
  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setRoomToDelete(null);
    setUnavailabilityToDelete(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = () => {
    if (unavailabilityToDelete) {
      handleRemoveUnavailability(roomToDelete.roomTypeId, roomToDelete.roomNumber, unavailabilityToDelete);
    } else {
      handleDeleteRoomNumber(roomToDelete.roomTypeId, roomToDelete.roomNumber);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, backgroundColor: colors.dark, minHeight: '100vh', color: colors.light }}>
        <Typography variant="h4" gutterBottom sx={{ color: colors.teal }}>
          Room Management
        </Typography>
        <Box component="form" sx={{ maxWidth: 600, mb: 4 }}>
          <TextField
            fullWidth
            label="Room Type"
            variant="outlined"
            margin="normal"
            value={newRoom.type}
            onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
            sx={{ backgroundColor: colors.light, borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Rate"
            variant="outlined"
            margin="normal"
            type="number"
            value={newRoom.rate}
            onChange={(e) => setNewRoom({ ...newRoom, rate: e.target.value })}
            sx={{ backgroundColor: colors.light, borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Room Numbers (comma-separated)"
            variant="outlined"
            margin="normal"
            value={newRoom.roomNumbers}
            onChange={(e) => setNewRoom({ ...newRoom, roomNumbers: e.target.value })}
            placeholder="e.g., R101, R102, R103"
            sx={{ backgroundColor: colors.light, borderRadius: 1 }}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: colors.teal, color: colors.light, '&:hover': { backgroundColor: colors.darkGray } }}
            onClick={handleAddRoom}
          >
            Add Room Type
          </Button>
        </Box>

        {/* Room Details Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: colors.darkGray }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: colors.light }}>Room Type</TableCell>
                <TableCell sx={{ color: colors.light }}>Rate</TableCell>
                <TableCell sx={{ color: colors.light }}>Room Numbers</TableCell>
                <TableCell sx={{ color: colors.light }}>Availability</TableCell>
                <TableCell sx={{ color: colors.light }}>Booking Status (Today)</TableCell>
                <TableCell sx={{ color: colors.light }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <React.Fragment key={room.id}>
                  {room.roomNumbers.map((roomNumber, index) => (
                    <TableRow key={roomNumber.number}>
                      {index === 0 && (
                        <>
                          <TableCell rowSpan={room.roomNumbers.length} sx={{ color: colors.light }}>
                            {room.type}
                          </TableCell>
                          <TableCell rowSpan={room.roomNumbers.length} sx={{ color: colors.light }}>
                            ${room.rate}
                          </TableCell>
                        </>
                      )}
                      <TableCell sx={{ color: colors.light }}>{roomNumber.number}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          startIcon={<EventBusyIcon />}
                          onClick={() => handleOpenAvailabilityDialog(room.id, roomNumber.number)}
                          sx={{ color: colors.teal, borderColor: colors.teal }}
                        >
                          Manage Availability
                        </Button>
                        <Box sx={{ mt: 1 }}>
                          {groupDatesIntoRanges(
                            roomNumber.availability
                              .filter((av) => !av.available)
                              .map((av) => av.date)
                          ).map((range, idx) => (
                            <Box
                              key={idx}
                              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                              <Typography sx={{ color: colors.light }}>
                                {format(range.start, 'yyyy-MM-dd')} to {format(range.end, 'yyyy-MM-dd')}: Unavailable
                              </Typography>
                              <IconButton
                                size="small"
                                sx={{ color: colors.error }}
                                onClick={() => openDeleteConfirmation(room.id, roomNumber.number, format(range.start, 'yyyy-MM-dd'))}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={isRoomUnavailableToday(roomNumber.number) ? 'Unavailable' : 'Available'}
                          color={isRoomUnavailableToday(roomNumber.number) ? 'error' : 'success'}
                          sx={{ backgroundColor: isRoomUnavailableToday(roomNumber.number) ? colors.error : colors.teal, color: colors.light }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ color: colors.error }}
                          onClick={() => openDeleteConfirmation(room.id, roomNumber.number)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Availability Dialog */}
        <Dialog
          open={availabilityDialogOpen}
          onClose={handleCloseAvailabilityDialog}
          sx={{ '& .MuiPaper-root': { backgroundColor: colors.darkGray, color: colors.light } }}
        >
          <DialogTitle>Mark Unavailability</DialogTitle>
          <DialogContent>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" sx={{ backgroundColor: colors.light, borderRadius: 1 }} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" sx={{ backgroundColor: colors.light, borderRadius: 1 }} />}
              minDate={startDate}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAvailabilityDialog} sx={{ color: colors.light }}>
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
          onClose={closeDeleteConfirmation}
          sx={{ '& .MuiPaper-root': { backgroundColor: colors.darkGray, color: colors.light } }}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              {unavailabilityToDelete
                ? `Are you sure you want to remove unavailability for ${unavailabilityToDelete}?`
                : 'Are you sure you want to delete this room number?'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteConfirmation} sx={{ color: colors.light }}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirmation} sx={{ color: colors.error }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default RoomManagement;