import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const AddRoomForm = ({ onRoomAdded }) => {
  const [newRoom, setNewRoom] = useState({ type: '', rate: '', roomNumbers: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [hasBothTypes, setHasBothTypes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const baseUrl = 'http://localhost:2000';

  // Fetch existing room types on mount
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/api/room-types`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched room types:', response.data.data);
        const fetchedRoomTypes = response.data.data;
        setRoomTypes(fetchedRoomTypes);

        // Check if both Single and Double exist
        const types = fetchedRoomTypes.map((room) => room.type);
        const hasSingle = types.includes('Single');
        const hasDouble = types.includes('Double');
        const bothExist = hasSingle && hasDouble;
        setHasBothTypes(bothExist);

        // Auto-select first existing room type if both exist
        if (bothExist && fetchedRoomTypes.length > 0) {
          const firstRoom = fetchedRoomTypes[0];
          setEditMode(true);
          setSelectedRoomId(firstRoom._id);
          setNewRoom({
            type: firstRoom.type,
            rate: firstRoom.rate.toString(),
            roomNumbers: firstRoom.roomNumbers.map((r) => r.number).join(', '),
          });
        }
      } catch (err) {
        setError('Failed to load existing room types');
      }
    };

    fetchRoomTypes();
  }, []);

  // Handle room type selection
  const handleRoomTypeChange = (e) => {
    const value = e.target.value;
    console.log('Selected room type:', value);

    if (value === 'New Type') {
      setEditMode(false);
      setSelectedRoomId('');
      setNewRoom({ type: '', rate: '', roomNumbers: '' });
    } else {
      const selectedRoom = roomTypes.find((room) => room._id === value);
      if (selectedRoom) {
        setEditMode(true);
        setSelectedRoomId(selectedRoom._id);
        setNewRoom({
          type: selectedRoom.type,
          rate: selectedRoom.rate.toString(),
          roomNumbers: selectedRoom.roomNumbers.map((r) => r.number).join(', '),
        });
      } else {
        setEditMode(false);
        setSelectedRoomId('');
        setNewRoom({ type: value, rate: '', roomNumbers: '' });
      }
    }
  };

  const handleAddRoom = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validation
      if (!newRoom.type || !newRoom.rate || !newRoom.roomNumbers) {
        throw new Error('All fields are required');
      }

      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${baseUrl}/api/room-types`,
        {
          type: newRoom.type,
          rate: Number(newRoom.rate),
          roomNumbers: newRoom.roomNumbers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state and parent component
      const newRoomData = response.data.data;
      setRoomTypes((prev) => [...prev, newRoomData]);
      if (onRoomAdded) onRoomAdded(newRoomData);

      // Check if both types now exist
      const types = [...roomTypes, newRoomData].map((room) => room.type);
      const hasSingle = types.includes('Single');
      const hasDouble = types.includes('Double');
      setHasBothTypes(hasSingle && hasDouble);

      setSuccess('Room type added successfully!');
      setNewRoom({ type: '', rate: '', roomNumbers: '' });
      setEditMode(false);
      setSelectedRoomId('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add room type');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRoom = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validation
      if (!newRoom.type || !newRoom.rate || !newRoom.roomNumbers) {
        throw new Error('All fields are required');
      }

      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${baseUrl}/api/room-types/${selectedRoomId}`,
        {
          type: newRoom.type,
          rate: Number(newRoom.rate),
          roomNumbers: newRoom.roomNumbers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state
      const updatedRoom = response.data.data;
      setRoomTypes((prev) =>
        prev.map((room) => (room._id === updatedRoom._id ? updatedRoom : room))
      );
      if (onRoomAdded) onRoomAdded(updatedRoom);

      setSuccess('Room type updated successfully!');
      setNewRoom({ type: '', rate: '', roomNumbers: '' });
      setEditMode(false);
      setSelectedRoomId('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update room type');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedRoomId('');
    setNewRoom({ type: '', rate: '', roomNumbers: '' });
  };

  // Determine available types for adding
  const availableTypes = [];
  if (!roomTypes.some((room) => room.type === 'Single')) {
    availableTypes.push('Single');
  }
  if (!roomTypes.some((room) => room.type === 'Double')) {
    availableTypes.push('Double');
  }

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 600,
        mb: 4,
        backgroundColor: '#1A1A1A',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold' }}>
        Room Management
      </Typography>

      {/* Existing Room Types Preview */}
      {roomTypes.length > 0 && (
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#2D2D2D', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ color: '#EEEEEE', mb: 1 }}>
            Existing Room Types:
          </Typography>
          {roomTypes.map((roomType, index) => (
            <Box
              key={index}
              sx={{
                mb: 1,
                p: 1.5,
                backgroundColor: '#393E46',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant="body2" sx={{ color: '#00ADB5' }}>
                  {roomType.type} - ${roomType.rate}/night
                </Typography>
                <Typography variant="caption" sx={{ color: '#EEEEEE' }}>
                  Rooms: {roomType.roomNumbers.map((r) => r.number).join(', ')}
                </Typography>
              </div>
            </Box>
          ))}
        </Box>
      )}

      {/* Add/Edit Room Form */}
      <Typography variant="subtitle1" sx={{ color: '#EEEEEE', mb: 2 }}>
        {editMode ? 'Edit Room Type' : 'Add New Room Type'}
      </Typography>

      {hasBothTypes && (
        <Typography variant="body2" sx={{ color: '#00ADB5', mb: 2 }}>
          All room types (Single and Double) have been added. You can only edit existing types.
        </Typography>
      )}

      <FormControl fullWidth sx={{ mb: 2, backgroundColor: '#2D2D2D', borderRadius: 1 }}>
        <InputLabel sx={{ color: '#EEEEEE' }}>Select Room Type</InputLabel>
        <Select
          value={selectedRoomId || newRoom.type}
          onChange={handleRoomTypeChange}
          sx={{
            color: '#EEEEEE',
            '& .MuiSvgIcon-root': { color: '#00ADB5' },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#2D2D2D',
                '& .MuiMenuItem-root': {
                  color: '#EEEEEE',
                  '&:hover': { backgroundColor: '#393E46' },
                },
              },
            },
          }}
        >
          {!hasBothTypes && <MenuItem value="New Type">New Type</MenuItem>}
          {!hasBothTypes &&
            availableTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          {roomTypes.map((room) => (
            <MenuItem key={room._id} value={room._id}>
              {room.type} (Edit)
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Room Type Name"
        variant="outlined"
        margin="normal"
        value={newRoom.type}
        onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
        disabled={editMode}
        sx={{
          backgroundColor: '#2D2D2D',
          borderRadius: 1,
          '& .MuiInputLabel-root': { color: '#EEEEEE' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#00ADB5' },
            '&:hover fieldset': { borderColor: '#00ADB5' },
            '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
          },
          '& .MuiInputBase-input': { color: '#EEEEEE' },
        }}
      />

      <TextField
        fullWidth
        label="Rate per Night ($)"
        variant="outlined"
        margin="normal"
        type="number"
        value={newRoom.rate}
        onChange={(e) => setNewRoom({ ...newRoom, rate: e.target.value })}
        sx={{
          backgroundColor: '#2D2D2D',
          borderRadius: 1,
          '& .MuiInputLabel-root': { color: '#EEEEEE' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#00ADB5' },
            '&:hover fieldset': { borderColor: '#00ADB5' },
            '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
          },
          '& .MuiInputBase-input': { color: '#EEEEEE' },
        }}
      />

      <TextField
        fullWidth
        label="Room Numbers (comma-separated)"
        variant="outlined"
        margin="normal"
        value={newRoom.roomNumbers}
        onChange={(e) => setNewRoom({ ...newRoom, roomNumbers: e.target.value })}
        placeholder="e.g., R101, R102, R103"
        sx={{
          backgroundColor: '#2D2D2D',
          borderRadius: 1,
          '& .MuiInputLabel-root': { color: '#EEEEEE' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#00ADB5' },
            '&:hover fieldset': { borderColor: '#00ADB5' },
            '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
          },
          '& .MuiInputBase-input': { color: '#EEEEEE' },
        }}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        {editMode ? (
          <>
            <Button
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: '#00ADB5',
                color: '#EEEEEE',
                '&:hover': { backgroundColor: '#008B8B' },
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: 1,
              }}
              onClick={handleUpdateRoom}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#EEEEEE' }} />
              ) : (
                'Update Room Type'
              )}
            </Button>
            <Button
              variant="outlined"
              disabled={loading}
              sx={{
                borderColor: '#00ADB5',
                color: '#00ADB5',
                '&:hover': { borderColor: '#008B8B', color: '#008B8B' },
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: 1,
              }}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </>
        ) : (
          !hasBothTypes && (
            <Button
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: '#00ADB5',
                color: '#EEEEEE',
                '&:hover': { backgroundColor: '#008B8B' },
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: 1,
              }}
              onClick={handleAddRoom}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#EEEEEE' }} />
              ) : (
                'Add Room Type'
              )}
            </Button>
          )
        )}
      </Box>

      {/* Notifications */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddRoomForm;