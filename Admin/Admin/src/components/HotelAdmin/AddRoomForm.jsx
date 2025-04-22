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
          headers: { Authorization: `Bearer ${token}` }
        });
        setRoomTypes(response.data.data);
      } catch (err) {
        setError('Failed to load existing room types');
      }
    };

    fetchRoomTypes();
  }, []);

  const handleAddRoom = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Basic validation
      if (!newRoom.type || !newRoom.rate || !newRoom.roomNumbers) {
        throw new Error('All fields are required');
      }

      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `${baseUrl}/api/room-types`,
        {
          type: newRoom.type,
          rate: Number(newRoom.rate),
          roomNumbers: newRoom.roomNumbers
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update local state and parent component
      setRoomTypes(prev => [...prev, response.data.data]);
      if (onRoomAdded) onRoomAdded(response.data.data);
      
      setSuccess('Room type added successfully!');
      setNewRoom({ type: '', rate: '', roomNumbers: '' });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add room type');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" sx={{ maxWidth: 600, mb: 4, backgroundColor: '#1A1A1A', p: 3, borderRadius: 2, boxShadow: 3 }}>
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
            <Box key={index} sx={{ 
              mb: 1, 
              p: 1.5,
              backgroundColor: '#393E46',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <Typography variant="body2" sx={{ color: '#00ADB5' }}>
                  {roomType.type} - ${roomType.rate}/night
                </Typography>
                <Typography variant="caption" sx={{ color: '#EEEEEE' }}>
                  Rooms: {roomType.roomNumbers.join(', ')}
                </Typography>
              </div>
            </Box>
          ))}
        </Box>
      )}

      {/* Add New Room Form */}
      <Typography variant="subtitle1" sx={{ color: '#EEEEEE', mb: 2 }}>
        Add New Room Type
      </Typography>

      <FormControl fullWidth sx={{ mb: 2, backgroundColor: '#2D2D2D', borderRadius: 1 }}>
        <InputLabel sx={{ color: '#EEEEEE' }}>Room Type</InputLabel>
        <Select
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
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
          <MenuItem value="Standard">Standard</MenuItem>
          <MenuItem value="Deluxe">Deluxe</MenuItem>
          <MenuItem value="Suite">Suite</MenuItem>
        </Select>
      </FormControl>

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
        placeholder="e.g., 101, 102, 103"
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

      <Button
        variant="contained"
        disabled={loading}
        sx={{
          mt: 2,
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

      {/* Notifications */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddRoomForm;