import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const AddRoomForm = ({ onAddRoom }) => {
  const [newRoom, setNewRoom] = useState({ type: '', rate: '', roomNumbers: '' });

  const handleAddRoom = () => {
    if (newRoom.type && newRoom.rate && newRoom.roomNumbers) {
      onAddRoom(newRoom);
      setNewRoom({ type: '', rate: '', roomNumbers: '' });
    }
  };

  return (
    <Box component="form" sx={{ maxWidth: 600, mb: 4, backgroundColor: '#1A1A1A', p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold' }}>
        Add New Room Type
      </Typography>

      {/* Room Type Dropdown */}
      <FormControl fullWidth sx={{ mb: 2, backgroundColor: '#2D2D2D', borderRadius: 1 }}>
        <InputLabel sx={{ color: '#EEEEEE' }}>Room Type</InputLabel>
        <Select
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
          label="Room Type"
          sx={{ 
            color: '#EEEEEE', 
            '& .MuiSvgIcon-root': { color: '#00ADB5' }, // Dropdown icon color
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#2D2D2D', // Dropdown modal background color
                color: '#EEEEEE', // Dropdown text color
                '& .MuiMenuItem-root': {
                  color: '#EEEEEE', // Menu item text color
                  '&:hover': {
                    backgroundColor: '#393E46', // Hover background color
                  },
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

      {/* Rate Input */}
      <TextField
        fullWidth
        label="Rate"
        variant="outlined"
        margin="normal"
        type="number"
        value={newRoom.rate}
        onChange={(e) => setNewRoom({ ...newRoom, rate: e.target.value })}
        sx={{
          backgroundColor: '#2D2D2D',
          borderRadius: 1,
          '& .MuiInputLabel-root': { color: '#EEEEEE' }, // Label color
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#00ADB5' }, // Border color
            '&:hover fieldset': { borderColor: '#00ADB5' }, // Hover border color
            '&.Mui-focused fieldset': { borderColor: '#00ADB5' }, // Focus border color
          },
          '& .MuiInputBase-input': { color: '#EEEEEE' }, // Input text color
        }}
      />

      {/* Room Numbers Input */}
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
          '& .MuiInputLabel-root': { color: '#EEEEEE' }, // Label color
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#00ADB5' }, // Border color
            '&:hover fieldset': { borderColor: '#00ADB5' }, // Hover border color
            '&.Mui-focused fieldset': { borderColor: '#00ADB5' }, // Focus border color
          },
          '& .MuiInputBase-input': { color: '#EEEEEE' }, // Input text color
        }}
      />

      {/* Add Room Button */}
      <Button
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#00ADB5',
          color: '#EEEEEE',
          '&:hover': { backgroundColor: '#008B8B' }, // Hover color
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: 1,
        }}
        onClick={handleAddRoom}
      >
        Add Room Type
      </Button>
    </Box>
  );
};

export default AddRoomForm;