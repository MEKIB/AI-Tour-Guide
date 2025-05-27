import React, { useState, useEffect } from 'react';
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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const UnavailabilityManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [dialogData, setDialogData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Fetch room data from the API
  const fetchRoomTypes = async () => {
    try {
      console.log('Fetching room types from API at', new Date().toISOString());
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch('http://localhost:2000/api/room-type?t=' + Date.now(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const { data } = await response.json();
      console.log('Fetched room types:', JSON.stringify(data, null, 2));

      // Debug room numbers
      data.forEach((roomType, i) => {
        console.log(`RoomType ${i} (_id: ${roomType._id}, type: ${roomType.type}):`);
        roomType.roomNumbers.forEach((room, j) => {
          console.log(`  Room ${j}: number=${room.number}, full room=`, JSON.stringify(room, null, 2));
        });
      });

      // Transform data
      const transformedRooms = data.flatMap((roomType, typeIndex) =>
        roomType.roomNumbers.map((room, roomIndex) => {
          const roomNumber = room.number || `Unknown-${typeIndex}-${roomIndex}`;
          console.log(`Transforming room: type=${roomType.type}, number=${roomNumber}`);
          const unavailability = room.availability.map((avail) => {
            console.log(`Room ${roomNumber}, avail._id: ${avail._id}, avail.id: ${avail.id || 'undefined'}`);
            return {
              unavailabilityId: avail._id,
              unavailableFrom: new Date(avail.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
              unavailableTo: new Date(avail.endDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
            };
          });
          return {
            id: `${roomType._id}-${roomNumber}`,
            roomTypeId: roomType._id,
            roomNumber,
            roomType: roomType.type,
            price: `$${roomType.rate}`,
            unavailability,
          };
        })
      );
      console.log('Transformed rooms:', JSON.stringify(transformedRooms, null, 2));
      setRooms(transformedRooms);
    } catch (error) {
      console.error('Error fetching room types:', error);
      setSnackbar({ open: true, message: `Failed to fetch rooms: ${error.message}`, severity: 'error' });
    }
  };

  // Open confirmation dialog
  const handleOpenDialog = (action, data) => {
    console.log('Opening dialog with action:', action, 'data:', data);
    setDialogAction(action);
    setDialogData(data);
    setOpenDialog(true);
    if (action === 'addUnavailability') {
      setStartDate(null);
      setEndDate(null);
    }
  };

  // Close confirmation dialog
  const handleCloseDialog = () => {
    console.log('Closing dialog');
    setOpenDialog(false);
    setDialogAction(null);
    setDialogData({});
    setStartDate(null);
    setEndDate(null);
  };

  // Handle confirmed action
  const handleConfirmAction = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      if (dialogAction === 'addUnavailability') {
        const { roomTypeId, roomNumber } = dialogData;
        if (!startDate || !endDate || endDate < startDate) {
          setSnackbar({ open: true, message: 'Invalid date range', severity: 'error' });
          return;
        }
        console.log(`Adding unavailability for room ${roomNumber} from ${startDate} to ${endDate}`);
        const response = await fetch(
          `http://localhost:2000/api/room-types/${roomTypeId}/rooms/${roomNumber}/unavailability`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to add unavailability: ${response.status} ${response.statusText}`);
        }
        setSnackbar({ open: true, message: 'Unavailability period added successfully', severity: 'success' });
      } else if (dialogAction === 'deleteUnavailability') {
        const { roomTypeId, roomNumber, unavailabilityId } = dialogData;
        console.log(`Deleting unavailability period ${unavailabilityId} for room ${roomNumber}`);
        const response = await fetch(
          `http://localhost:2000/api/room-types/${roomTypeId}/rooms/${roomNumber}/unavailability/${unavailabilityId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to delete: ${response.status} ${response.statusText}`);
        }
        setSnackbar({ open: true, message: 'Unavailability period deleted successfully', severity: 'success' });
      } else if (dialogAction === 'deleteAllUnavailability') {
        const { roomTypeId, roomNumber } = dialogData;
        console.log(`Deleting all unavailability periods for room ${roomNumber}`);
        const response = await fetch(
          `http://localhost:2000/api/room-types/${roomTypeId}/rooms/${roomNumber}/unavailability`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to delete: ${response.status} ${response.statusText}`);
        }
        setSnackbar({ open: true, message: 'All unavailability periods deleted successfully', severity: 'success' });
      }
      await fetchRoomTypes();
    } catch (error) {
      console.error(`Error ${dialogAction}:`, error);
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    } finally {
      handleCloseDialog();
    }
  };

  // Handlers
  const handleAddUnavailability = (roomTypeId, roomNumber) => {
    console.log('Add unavailability clicked for room:', roomNumber);
    handleOpenDialog('addUnavailability', { roomTypeId, roomNumber });
  };

  const handleDeleteUnavailability = (roomTypeId, roomNumber, unavailabilityId) => {
    handleOpenDialog('deleteUnavailability', { roomTypeId, roomNumber, unavailabilityId });
  };

  const handleDeleteAllUnavailability = (roomTypeId, roomNumber) => {
    handleOpenDialog('deleteAllUnavailability', { roomTypeId, roomNumber });
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'info' });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  // Debug rooms array
  console.log('Rendering with rooms:', JSON.stringify(rooms, null, 2));
  rooms.forEach((room, i) => {
    console.log(`Room ${i}: id=${room.id}, roomNumber=${room.roomNumber}`);
  });

  return (
    <Box sx={{ p: 3, backgroundColor: '#222831', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#EEEEEE' }}>
        Unavailability Management
      </Typography>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogAction === 'addUnavailability' ? 'Set Unavailability Period' : 'Confirm Deletion'}
        </DialogTitle>
        <DialogContent>
          {dialogAction === 'addUnavailability' ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', mt: '16px' }}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => {
                    console.log('Start date selected:', newValue);
                    setStartDate(newValue);
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => {
                    console.log('End date selected:', newValue);
                    setEndDate(newValue);
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                  minDate={startDate}
                />
              </Box>
            </LocalizationProvider>
          ) : (
            <DialogContentText id="alert-dialog-description">
              {dialogAction === 'deleteUnavailability'
                ? 'Are you sure you want to delete this unavailability period?'
                : 'Are you sure you want to delete all unavailability periods for this room?'}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={dialogAction === 'addUnavailability' ? 'primary' : 'error'}
            disabled={dialogAction === 'addUnavailability' && (!startDate || !endDate || endDate < startDate)}
          >
            {dialogAction === 'addUnavailability' ? 'Add' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rooms Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: '#393E46' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#EEEEEE' }}>Room Type</TableCell>
              <TableCell sx={{ color: '#EEEEEE' }}>Rate</TableCell>
              <TableCell sx={{ color: '#EEEEEE' }}>Room Number</TableCell>
              <TableCell sx={{ color: '#EEEEEE' }}>Booked/Unavailable Periods</TableCell>
              <TableCell sx={{ color: '#EEEEEE' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell sx={{ color: '#EEEEEE' }}>{room.roomType}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{room.price}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>{room.roomNumber || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>
                    {room.unavailability.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {room.unavailability.map((unavail) => (
                          <li key={unavail.unavailabilityId} style={{ display: 'flex', alignItems: 'center' }}>
                            {`${unavail.unavailableFrom} - ${unavail.unavailableTo}`}
                            <IconButton
                              onClick={() =>
                                handleDeleteUnavailability(room.roomTypeId, room.roomNumber, unavail.unavailabilityId)
                              }
                              sx={{ color: '#FF4D4F', ml: '8px' }}
                              size="small"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'No unavailable periods'
                    )}
                  </TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>
                    <IconButton
                      onClick={() => handleAddUnavailability(room.roomTypeId, room.roomNumber)}
                      sx={{ color: '#4CAF50', mr: '8px', fontSize: '1.5rem' }}
                      size="medium"
                    >
                      <AddCircleOutlineIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteAllUnavailability(room.roomTypeId, room.roomNumber)}
                      sx={{ color: '#FF4D4F' }}
                      size="medium"
                    >
                      <DeleteIcon fontSize="medium" />
                    </IconButton>
                  </TableCell>
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
    </Box>
  );
};

export default UnavailabilityManagement;