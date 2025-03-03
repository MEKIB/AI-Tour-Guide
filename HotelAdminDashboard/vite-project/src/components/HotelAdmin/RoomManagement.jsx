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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, isBefore, isEqual, parseISO, format, isToday } from 'date-fns';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      type: 'Standard',
      rate: 100,
      roomNumbers: [
        {
          number: 'R101',
          availability: [
            { date: '2023-10-01', available: false },
            { date: '2023-10-02', available: false },
            { date: '2025-01-31', available: false },
            { date: '2025-02-01', available: false },
            { date: '2025-02-02', available: false },
            { date: '2025-02-03', available: false },
            { date: '2025-02-04', available: false },
          ],
        },
      ],
    },
  ]);

  const [newRoom, setNewRoom] = useState({ type: '', rate: '', roomNumbers: '' });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);

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
          availability: [],
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
        datesToUpdate.push(dateString);
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
                          ...rn.availability,
                          ...datesToUpdate.map((date) => ({ date, available: false })),
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

  // Toggle availability for a specific date
  const toggleAvailability = (roomTypeId, roomNumber, date) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomTypeId
          ? {
              ...room,
              roomNumbers: room.roomNumbers.map((rn) =>
                rn.number === roomNumber
                  ? {
                      ...rn,
                      availability: rn.availability.map((av) =>
                        av.date === date ? { ...av, available: !av.available } : av
                      ),
                    }
                  : rn
              ),
            }
          : room
      )
    );
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

  // Check if the room is booked for the current date
  const isRoomBookedToday = (roomNumber) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
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
          />
          <TextField
            fullWidth
            label="Rate"
            variant="outlined"
            margin="normal"
            type="number"
            value={newRoom.rate}
            onChange={(e) => setNewRoom({ ...newRoom, rate: e.target.value })}
          />
          <TextField
            fullWidth
            label="Room Numbers (comma-separated)"
            variant="outlined"
            margin="normal"
            value={newRoom.roomNumbers}
            onChange={(e) => setNewRoom({ ...newRoom, roomNumbers: e.target.value })}
            placeholder="e.g., R101, R102, R103"
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddRoom}>
            Add Room Type
          </Button>
        </Box>

        {/* Room Details Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Type</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Room Numbers</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Booking Status (Today)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <React.Fragment key={room.id}>
                  {room.roomNumbers.map((roomNumber, index) => (
                    <TableRow key={roomNumber.number}>
                      {index === 0 && (
                        <>
                          <TableCell rowSpan={room.roomNumbers.length}>{room.type}</TableCell>
                          <TableCell rowSpan={room.roomNumbers.length}>${room.rate}</TableCell>
                        </>
                      )}
                      <TableCell>{roomNumber.number}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenAvailabilityDialog(room.id, roomNumber.number)}
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
                              <Typography>
                                {format(range.start, 'yyyy-MM-dd')} to {format(range.end, 'yyyy-MM-dd')}: Unavailable
                              </Typography>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                  let currentDate = range.start;
                                  while (isBefore(currentDate, range.end) || isEqual(currentDate, range.end)) {
                                    handleRemoveUnavailability(room.id, roomNumber.number, format(currentDate, 'yyyy-MM-dd'));
                                    currentDate = addDays(currentDate, 1);
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {isRoomBookedToday(roomNumber.number) ? 'Booked' : 'Available'}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteRoomNumber(room.id, roomNumber.number)}
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
        >
          <DialogTitle>Mark Unavailability</DialogTitle>
          <DialogContent>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              minDate={startDate}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAvailabilityDialog}>Cancel</Button>
            <Button onClick={handleAddUnavailability} color="primary">
              Mark Unavailable
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default RoomManagement;