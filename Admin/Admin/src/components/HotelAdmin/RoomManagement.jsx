import React, { useState, useMemo, useCallback } from 'react';
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
  Chip,
  Autocomplete,
  Snackbar,
  Alert,
} from '@mui/material';
import * as MuiIcons from '@mui/icons-material'; // Import all Material Icons
import { debounce } from 'lodash'; // For debouncing the search input
import axios from 'axios'; // For making HTTP requests

// Color palette
const colors = {
  dark: '#222831',
  darkGray: '#393E46',
  teal: '#00ADB5',
  light: '#EEEEEE',
  background: '#1A1A1A', // Darker background for contrast
  inputBackground: '#2D2D2D', // Darker background for input fields
  inputText: '#EEEEEE', // Light text color for input fields
  inputBorder: '#00ADB5', // Teal border for input fields
  success: '#00C853', // Green for success
  error: '#FF4444', // Red for errors
};

// Get all Material Icons as an array of { name, icon }
const materialIcons = Object.keys(MuiIcons).map((iconName) => ({
  name: iconName,
  icon: MuiIcons[iconName], // Dynamically get the icon component
}));

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
  const [newDetailedRoom, setNewDetailedRoom] = useState({
    type: '',
    bathrooms: '',
    size: '',
  });
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState({ name: '', icon: '' });
  const [searchIcon, setSearchIcon] = useState('');
  const [success, setSuccess] = useState(''); // Success message
  const [error, setError] = useState(''); // Error message

  // Debounced search function
  const handleSearch = useCallback(
    debounce((value) => {
      setSearchIcon(value);
    }, 300),
    []
  );

  // Filtered icons based on search input
  const filteredIcons = useMemo(() => {
    if (!searchIcon) return materialIcons.slice(0, 10); // Show first 10 icons by default
    return materialIcons
      .filter((icon) => icon.name.toLowerCase().includes(searchIcon.toLowerCase()))
      .slice(0, 10); // Limit to 10 results
  }, [searchIcon]);

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

  // Handle adding a new detailed room type
  const handleAddDetailedRoom = () => {
    if (newDetailedRoom.type && newDetailedRoom.bathrooms && newDetailedRoom.size && amenities.length > 0) {
      const newDetailedRoomType = {
        id: rooms.length + 1,
        type: newDetailedRoom.type,
        details: {
          bathrooms: newDetailedRoom.bathrooms,
          size: newDetailedRoom.size,
          amenities: amenities,
        },
      };

      setRooms([...rooms, newDetailedRoomType]);
      setNewDetailedRoom({
        type: '',
        bathrooms: '',
        size: '',
      });
      setAmenities([]); // Clear amenities after adding
    }
  };

  // Handle adding a new amenity
  const handleAddAmenity = () => {
    if (newAmenity.name.trim() !== '' && newAmenity.icon) {
      setAmenities((prev) => [...prev, newAmenity]);
      setNewAmenity({ name: '', icon: '' }); // Reset form
    }
  };

  // Handle removing an amenity
  const handleRemoveAmenity = (index) => {
    setAmenities((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle uploading all amenities at once
  const handleUploadAmenities = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await axios.post(
        'http://localhost:2000/api/amenities/upload',
        { amenities }, // Send the entire list of amenities
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);
      setSuccess('All amenities uploaded successfully');
    } catch (error) {
      console.error('Error uploading amenities:', error.response?.data || error.message);
      setError('Failed to upload amenities');
    }
  };

  // Custom styles for input fields
  const inputStyles = {
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    borderRadius: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: colors.inputBorder,
      },
      '&:hover fieldset': {
        borderColor: colors.teal,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.teal,
      },
    },
    '& .MuiInputLabel-root': {
      color: colors.inputText,
    },
    '& .MuiInputBase-input': {
      color: colors.inputText,
    },
  };

  return (
    <Box sx={{ p: 3, backgroundColor: colors.background, minHeight: '90vh', color: colors.light }}>
      <Typography variant="h4" gutterBottom sx={{ color: colors.teal, fontWeight: 'bold' }}>
        Room Management
      </Typography>

      {/* Form for adding new room type */}
      <Box component="form" sx={{ maxWidth: 600, mb: 4, backgroundColor: colors.darkGray, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: colors.teal, fontWeight: 'bold' }}>
          Add New Room Type
        </Typography>
        <TextField
          fullWidth
          label="Room Type"
          variant="outlined"
          margin="normal"
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label="Rate"
          variant="outlined"
          margin="normal"
          type="number"
          value={newRoom.rate}
          onChange={(e) => setNewRoom({ ...newRoom, rate: e.target.value })}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label="Room Numbers (comma-separated)"
          variant="outlined"
          margin="normal"
          value={newRoom.roomNumbers}
          onChange={(e) => setNewRoom({ ...newRoom, roomNumbers: e.target.value })}
          placeholder="e.g., R101, R102, R103"
          sx={inputStyles}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: colors.teal, color: colors.light, '&:hover': { backgroundColor: colors.darkGray } }}
          onClick={handleAddRoom}
        >
          Add Room Type
        </Button>
      </Box>

      {/* Form for adding detailed room type */}
      <Box component="form" sx={{ maxWidth: 600, mb: 4, backgroundColor: colors.darkGray, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: colors.teal, fontWeight: 'bold' }}>
          Add Detailed Room Type (Single/Double)
        </Typography>
        <TextField
          fullWidth
          label="Room Type (Single/Double)"
          variant="outlined"
          margin="normal"
          value={newDetailedRoom.type}
          onChange={(e) => setNewDetailedRoom({ ...newDetailedRoom, type: e.target.value })}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label="Bathrooms"
          variant="outlined"
          margin="normal"
          value={newDetailedRoom.bathrooms}
          onChange={(e) => setNewDetailedRoom({ ...newDetailedRoom, bathrooms: e.target.value })}
          placeholder="e.g., 2"
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label="Size"
          variant="outlined"
          margin="normal"
          value={newDetailedRoom.size}
          onChange={(e) => setNewDetailedRoom({ ...newDetailedRoom, size: e.target.value })}
          placeholder="e.g., 110 m²"
          sx={inputStyles}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: colors.teal, color: colors.light, '&:hover': { backgroundColor: colors.darkGray } }}
          onClick={handleAddDetailedRoom}
        >
          Add Detailed Room Type
        </Button>
      </Box>

      {/* Separate Amenities Section */}
      <Box sx={{ maxWidth: 600, mb: 4, backgroundColor: colors.darkGray, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: colors.teal, fontWeight: 'bold' }}>
          Add Amenities
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Amenity Name"
            variant="outlined"
            value={newAmenity.name}
            onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
            sx={inputStyles}
          />
          <Autocomplete
            fullWidth
            options={filteredIcons}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Icon"
                variant="outlined"
                onChange={(e) => handleSearch(e.target.value)}
                sx={inputStyles}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {React.createElement(option.icon)} {/* Dynamically render the icon */}
                {option.name}
              </Box>
            )}
            onChange={(_, value) => setNewAmenity({ ...newAmenity, icon: value?.name || '' })}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: colors.teal, color: colors.light, '&:hover': { backgroundColor: colors.darkGray } }}
            onClick={handleAddAmenity}
          >
            Add Amenity
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {amenities.map((amenity, index) => {
            const IconComponent = MuiIcons[amenity.icon]; // Dynamically get the icon component
            return (
              <Chip
                key={index}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {IconComponent ? React.createElement(IconComponent) : null} {/* Render the icon */}
                    {amenity.name}
                  </Box>
                }
                onDelete={() => handleRemoveAmenity(index)}
                sx={{ backgroundColor: colors.teal, color: colors.light }}
              />
            );
          })}
        </Box>
        {/* Upload All Amenities Button */}
        <Button
          variant="contained"
          onClick={handleUploadAmenities}
          sx={{
            mt: 2,
            backgroundColor: colors.success,
            color: colors.light,
            '&:hover': { backgroundColor: '#008B8B' },
          }}
        >
          Upload All Amenities
        </Button>
      </Box>

      {/* Display the list of rooms */}
      <TableContainer component={Paper} sx={{ mt: 4, backgroundColor: colors.darkGray, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: colors.teal, fontWeight: 'bold' }}>Room Type</TableCell>
              <TableCell sx={{ color: colors.teal, fontWeight: 'bold' }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell sx={{ color: colors.light }}>{room.type}</TableCell>
                <TableCell sx={{ color: colors.light }}>
                  {room.details ? (
                    <Box>
                      <Typography>Bathrooms: {room.details.bathrooms}</Typography>
                      <Typography>Size: {room.details.size}</Typography>
                      <Typography>
                        Amenities:{' '}
                        {room.details.amenities.map((amenity, index) => {
                          const IconComponent = MuiIcons[amenity.icon]; // Dynamically get the icon component
                          return (
                            <span key={index}>
                              {IconComponent ? React.createElement(IconComponent) : null} {/* Render the icon */}
                              {amenity.name}
                              {index < room.details.amenities.length - 1 ? ', ' : ''}
                            </span>
                          );
                        })}
                      </Typography>
                    </Box>
                  ) : (
                    'No details'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for Success and Error Messages */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RoomManagement;