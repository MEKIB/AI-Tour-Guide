import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Autocomplete,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import * as MuiIcons from '@mui/icons-material';
import { debounce } from 'lodash';
import axios from 'axios';

const AddDetailedRoomAndAmenities = ({ onAddDetailedRoom }) => {
  const [newDetailedRoom, setNewDetailedRoom] = useState({
    type: '', // Room type (Single/Double)
    bathrooms: '',
    size: '',
  });
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState({ name: '', icon: '' });
  const [searchIcon, setSearchIcon] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const materialIcons = useMemo(() => {
    return Object.keys(MuiIcons).map((iconName) => ({
      name: iconName,
      icon: MuiIcons[iconName],
    }));
  }, []);

  const handleSearch = useCallback(
    debounce((value) => {
      setSearchIcon(value);
    }, 300),
    []
  );

  const filteredIcons = useMemo(() => {
    if (!searchIcon) return materialIcons.slice(0, 10);
    return materialIcons
      .filter((icon) => icon.name.toLowerCase().includes(searchIcon.toLowerCase()))
      .slice(0, 10);
  }, [searchIcon, materialIcons]);

  const handleAddAmenity = () => {
    if (newAmenity.name.trim() !== '' && newAmenity.icon) {
      setAmenities((prev) => [...prev, newAmenity]);
      setNewAmenity({ name: '', icon: '' });
    }
  };

  const handleRemoveAmenity = (index) => {
    setAmenities((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadAll = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await axios.post(
        'http://localhost:2000/api/rooms/upload',
        { ...newDetailedRoom, amenities },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);
      setSuccess('Room and amenities uploaded successfully');
      onAddDetailedRoom({ ...newDetailedRoom, amenities });
      setNewDetailedRoom({ type: '', bathrooms: '', size: '' });
      setAmenities([]);
    } catch (error) {
      console.error('Error uploading room and amenities:', error.response?.data || error.message);
      setError('Failed to upload room and amenities');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mb: 4, backgroundColor: '#1A1A1A', p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold' }}>
        Add Detailed Room Type (Single/Double)
      </Typography>

      {/* Room Type Dropdown */}
      <FormControl fullWidth sx={{ mb: 2, backgroundColor: '#2D2D2D', borderRadius: 1 }}>
        <InputLabel sx={{ color: '#EEEEEE' }}>Room Type</InputLabel>
        <Select
          value={newDetailedRoom.type}
          onChange={(e) => setNewDetailedRoom({ ...newDetailedRoom, type: e.target.value })}
          label="Room Type"
          sx={{ 
            color: '#EEEEEE', 
            '& .MuiSvgIcon-root': { color: '#00ADB5' }, // Dropdown icon color
            '& .MuiInputLabel-root': { color: '#EEEEEE' }, // Label color
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
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Double">Double</MenuItem>
        </Select>
      </FormControl>

      {/* Bathrooms Input */}
      <TextField
        fullWidth
        label="Bathrooms"
        variant="outlined"
        margin="normal"
        value={newDetailedRoom.bathrooms}
        onChange={(e) => setNewDetailedRoom({ ...newDetailedRoom, bathrooms: e.target.value })}
        placeholder="e.g., 2"
        sx={{ 
          backgroundColor: '#2D2D2D', 
          '& .MuiInputLabel-root': { color: '#EEEEEE' }, // Label color
          '& .MuiOutlinedInput-root': { 
            color: '#EEEEEE', // Input text color
            '& fieldset': { borderColor: '#00ADB5' }, // Border color
            '&:hover fieldset': { borderColor: '#00ADB5' }, // Hover border color
          },
        }}
      />

      {/* Size Input */}
      <TextField
        fullWidth
        label="Size"
        variant="outlined"
        margin="normal"
        value={newDetailedRoom.size}
        onChange={(e) => setNewDetailedRoom({ ...newDetailedRoom, size: e.target.value })}
        placeholder="e.g., 110 m²"
        sx={{ 
          backgroundColor: '#2D2D2D', 
          '& .MuiInputLabel-root': { color: '#EEEEEE' }, // Label color
          '& .MuiOutlinedInput-root': { 
            color: '#EEEEEE', // Input text color
            '& fieldset': { borderColor: '#00ADB5' }, // Border color
            '&:hover fieldset': { borderColor: '#00ADB5' }, // Hover border color
          },
        }}
      />

      {/* Add Amenities Section */}
      <Typography variant="h6" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold', mt: 2 }}>
        Add Amenities
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        {/* Amenity Name Input */}
        <TextField
          fullWidth
          label="Amenity Name"
          variant="outlined"
          value={newAmenity.name}
          onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
          sx={{ 
            backgroundColor: '#2D2D2D', 
            '& .MuiInputLabel-root': { color: '#EEEEEE' }, // Label color
            '& .MuiOutlinedInput-root': { 
              color: '#EEEEEE', // Input text color
              '& fieldset': { borderColor: '#00ADB5' }, // Border color
              '&:hover fieldset': { borderColor: '#00ADB5' }, // Hover border color
            },
          }}
        />

        {/* Icon Search Autocomplete */}
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
              sx={{ 
                backgroundColor: '#2D2D2D', 
                '& .MuiInputLabel-root': { color: '#EEEEEE' }, // Label color
                '& .MuiOutlinedInput-root': { 
                  color: '#EEEEEE', // Input text color
                  '& fieldset': { borderColor: '#00ADB5' }, // Border color
                  '&:hover fieldset': { borderColor: '#00ADB5' }, // Hover border color
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {React.createElement(option.icon)}
              {option.name}
            </Box>
          )}
          onChange={(_, value) => setNewAmenity({ ...newAmenity, icon: value?.name || '' })}
        />

        {/* Add Amenity Button */}
        <Button
          variant="contained"
          sx={{ backgroundColor: '#00ADB5', color: '#EEEEEE', '&:hover': { backgroundColor: '#008B8B' } }}
          onClick={handleAddAmenity}
        >
          Add Amenity
        </Button>
      </Box>

      {/* Amenities Chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {amenities.map((amenity, index) => {
          const IconComponent = MuiIcons[amenity.icon];
          return (
            <Chip
              key={index}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {IconComponent ? React.createElement(IconComponent) : null}
                  {amenity.name}
                </Box>
              }
              onDelete={() => handleRemoveAmenity(index)}
              sx={{ backgroundColor: '#00ADB5', color: '#EEEEEE' }}
            />
          );
        })}
      </Box>

      {/* Upload Button */}
      <Button
        variant="contained"
        onClick={handleUploadAll}
        sx={{
          mt: 2,
          backgroundColor: '#00ADB5',
          color: '#EEEEEE',
          '&:hover': { backgroundColor: '#008B8B' },
        }}
      >
        Upload Room and Amenities
      </Button>

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

export default AddDetailedRoomAndAmenities;