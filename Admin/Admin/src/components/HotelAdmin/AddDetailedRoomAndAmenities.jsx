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

const AddDetailedRoomAndAmenities = () => {
  const [newDetailedRoom, setNewDetailedRoom] = useState({
    type: '',
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

  const validateFields = () => {
    if (!newDetailedRoom.type || !newDetailedRoom.bathrooms || !newDetailedRoom.size) {
      setError('Please fill all room details');
      return false;
    }
    if (amenities.length === 0) {
      setError('Please add at least one amenity');
      return false;
    }
    if (isNaN(newDetailedRoom.bathrooms) || Number(newDetailedRoom.bathrooms) < 1) {
      setError('Bathrooms must be a number greater than 0');
      return false;
    }
    return true;
  };

  const handleUploadAll = async () => {
    if (!validateFields()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await axios.post(
        'http://localhost:2000/api/rooms/upload',
        { ...newDetailedRoom, amenities },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess('Room and amenities uploaded successfully');
      setNewDetailedRoom({ type: '', bathrooms: '', size: '' });
      setAmenities([]);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.message || 'Failed to upload room details');
    }
  };

  return (
    <Box
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
        Add Detailed Room Type
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
            '& .MuiSvgIcon-root': { color: '#00ADB5' },
            '& .MuiInputLabel-root': { color: '#EEEEEE' },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#2D2D2D',
                color: '#EEEEEE',
                '& .MuiMenuItem-root': {
                  '&:hover': { backgroundColor: '#393E46' },
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
        type="number"
        value={newDetailedRoom.bathrooms}
        onChange={(e) => setNewDetailedRoom({ ...newDetailedRoom, bathrooms: e.target.value })}
        placeholder="Number of bathrooms"
        sx={{
          backgroundColor: '#2D2D2D',
          '& .MuiInputLabel-root': { color: '#EEEEEE' },
          '& .MuiOutlinedInput-root': {
            color: '#EEEEEE',
            '& fieldset': { borderColor: '#00ADB5' },
            '&:hover fieldset': { borderColor: '#00ADB5' },
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
        placeholder="Room size in square meters"
        sx={{
          backgroundColor: '#2D2D2D',
          '& .MuiInputLabel-root': { color: '#EEEEEE' },
          '& .MuiOutlinedInput-root': {
            color: '#EEEEEE',
            '& fieldset': { borderColor: '#00ADB5' },
            '&:hover fieldset': { borderColor: '#00ADB5' },
          },
        }}
      />

      {/* Amenities Section */}
      <Typography variant="h6" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold', mt: 2 }}>
        Add Amenities
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Amenity Name"
          variant="outlined"
          value={newAmenity.name}
          onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
          sx={{
            backgroundColor: '#2D2D2D',
            '& .MuiInputLabel-root': { color: '#EEEEEE' },
            '& .MuiOutlinedInput-root': {
              color: '#EEEEEE',
              '& fieldset': { borderColor: '#00ADB5' },
              '&:hover fieldset': { borderColor: '#00ADB5' },
            },
          }}
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
              sx={{
                backgroundColor: '#2D2D2D',
                '& .MuiInputLabel-root': { color: '#EEEEEE' },
                '& .MuiOutlinedInput-root': {
                  color: '#EEEEEE',
                  '& fieldset': { borderColor: '#00ADB5' },
                  '&:hover fieldset': { borderColor: '#00ADB5' },
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

        <Button
          variant="contained"
          sx={{ backgroundColor: '#00ADB5', color: '#EEEEEE', '&:hover': { backgroundColor: '#008B8B' } }}
          onClick={handleAddAmenity}
        >
          Add
        </Button>
      </Box>

      {/* Display Added Amenities */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {amenities.map((amenity, index) => {
          const IconComponent = MuiIcons[amenity.icon];
          return (
            <Chip
              key={index}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {IconComponent && React.createElement(IconComponent)}
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
        fullWidth
        variant="contained"
        onClick={handleUploadAll}
        sx={{
          mt: 2,
          backgroundColor: '#00ADB5',
          color: '#EEEEEE',
          '&:hover': { backgroundColor: '#008B8B' },
        }}
      >
        Save Room Configuration
      </Button>

      {/* Notifications */}
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddDetailedRoomAndAmenities;