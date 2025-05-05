import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
  CircularProgress,
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
  const [editMode, setEditMode] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [hasBothTypes, setHasBothTypes] = useState(false);
  const [roomProperties, setRoomProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const materialIcons = useMemo(() => {
    return Object.keys(MuiIcons).map((iconName) => ({
      name: iconName,
      icon: MuiIcons[iconName],
    }));
  }, []);

  // Fetch existing room properties on mount
  useEffect(() => {
    const fetchRoomProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:2000/api/rooms', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched room properties:', response.data.data);
        const fetchedProperties = response.data.data;
        setRoomProperties(fetchedProperties);

        // Check if both Single and Double exist
        const types = fetchedProperties.map((room) => room.type);
        const hasSingle = types.includes('Single');
        const hasDouble = types.includes('Double');
        const bothExist = hasSingle && hasDouble;
        setHasBothTypes(bothExist);

        // Auto-select first existing room type if both exist
        if (bothExist && fetchedProperties.length > 0) {
          const firstRoom = fetchedProperties[0];
          setEditMode(true);
          setSelectedRoomId(firstRoom._id);
          setNewDetailedRoom({
            type: firstRoom.type,
            bathrooms: firstRoom.bathrooms.toString(),
            size: firstRoom.size,
          });
          setAmenities(firstRoom.amenities);
        }
      } catch (err) {
        setError('Failed to load existing room properties');
      }
    };

    fetchRoomProperties();
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

  const handleAddRoom = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

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

      // Update local state
      const newRoomData = response.data.data;
      setRoomProperties((prev) => [...prev, newRoomData]);

      // Check if both types now exist
      const types = [...roomProperties, newRoomData].map((room) => room.type);
      const hasSingle = types.includes('Single');
      const hasDouble = types.includes('Double');
      setHasBothTypes(hasSingle && hasDouble);

      setSuccess('Room properties added successfully');
      setNewDetailedRoom({ type: '', bathrooms: '', size: '' });
      setAmenities([]);
      setEditMode(false);
      setSelectedRoomId('');
    } catch (error) {
      console.error('Add room error:', error);
      setError(error.response?.data?.message || 'Failed to add room properties');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRoom = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await axios.put(
        `http://localhost:2000/api/rooms/${selectedRoomId}`,
        { ...newDetailedRoom, amenities },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state
      const updatedRoom = response.data.data;
      setRoomProperties((prev) =>
        prev.map((room) => (room._id === updatedRoom._id ? updatedRoom : room))
      );

      setSuccess('Room properties updated successfully');
      setNewDetailedRoom({ type: '', bathrooms: '', size: '' });
      setAmenities([]);
      setEditMode(false);
      setSelectedRoomId('');
    } catch (error) {
      console.error('Update room error:', error);
      setError(error.response?.data?.message || 'Failed to update room properties');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedRoomId('');
    setNewDetailedRoom({ type: '', bathrooms: '', size: '' });
    setAmenities([]);
  };

  // Handle room type selection
  const handleRoomTypeChange = (e) => {
    const value = e.target.value;
    console.log('Selected room type:', value);

    if (value === 'New Type') {
      setEditMode(false);
      setSelectedRoomId('');
      setNewDetailedRoom({ type: '', bathrooms: '', size: '' });
      setAmenities([]);
    } else {
      const selectedRoom = roomProperties.find((room) => room._id === value);
      if (selectedRoom) {
        setEditMode(true);
        setSelectedRoomId(selectedRoom._id);
        setNewDetailedRoom({
          type: selectedRoom.type,
          bathrooms: selectedRoom.bathrooms.toString(),
          size: selectedRoom.size,
        });
        setAmenities(selectedRoom.amenities);
      } else {
        setEditMode(false);
        setSelectedRoomId('');
        setNewDetailedRoom({ type: value, bathrooms: '', size: '' });
        setAmenities([]);
      }
    }
  };

  // Determine available types for adding
  const availableTypes = [];
  if (!roomProperties.some((room) => room.type === 'Single')) {
    availableTypes.push('Single');
  }
  if (!roomProperties.some((room) => room.type === 'Double')) {
    availableTypes.push('Double');
  }

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

      {/* Existing Room Properties Preview */}
      {roomProperties.length > 0 && (
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#2D2D2D', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ color: '#EEEEEE', mb: 1 }}>
            Existing Room Properties:
          </Typography>
          {roomProperties.map((room, index) => (
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
                  {room.type} - {room.bathrooms} Bathrooms, {room.size}
                </Typography>
                <Typography variant="caption" sx={{ color: '#EEEEEE' }}>
                  Amenities: {room.amenities.map((a) => a.name).join(', ')}
                </Typography>
              </div>
            </Box>
          ))}
        </Box>
      )}

      {/* Add/Edit Room Form */}
      <Typography variant="subtitle1" sx={{ color: '#EEEEEE', mb: 2 }}>
        {editMode ? 'Edit Room Properties' : 'Add New Room Properties'}
      </Typography>

      {hasBothTypes && (
        <Typography variant="body2" sx={{ color: '#00ADB5', mb: 2 }}>
          All room types (Single and Double) have been added. You can only edit existing types.
        </Typography>
      )}

      <FormControl fullWidth sx={{ mb: 2, backgroundColor: '#2D2D2D', borderRadius: 1 }}>
        <InputLabel sx={{ color: '#EEEEEE' }}>Select Room Type</InputLabel>
        <Select
          value={selectedRoomId || newDetailedRoom.type}
          onChange={handleRoomTypeChange}
          label="Select Room Type"
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
          {!hasBothTypes && <MenuItem value="New Type">New Type</MenuItem>}
          {!hasBothTypes &&
            availableTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          {roomProperties.map((room) => (
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
        value={newDetailedRoom.type}
        onChange={(e) => setNewDetailedRoom({ ...newDetailedRoom, type: e.target.value })}
        disabled={editMode}
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
              }}
              onClick={handleUpdateRoom}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#EEEEEE' }} />
              ) : (
                'Update Room Properties'
              )}
            </Button>
            <Button
              variant="outlined"
              disabled={loading}
              sx={{
                borderColor: '#00ADB5',
                color: '#00ADB5',
                '&:hover': { borderColor: '#008B8B', color: '#008B8B' },
              }}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </>
        ) : (
          !hasBothTypes && (
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={handleAddRoom}
              sx={{
                backgroundColor: '#00ADB5',
                color: '#EEEEEE',
                '&:hover': { backgroundColor: '#008B8B' },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#EEEEEE' }} />
              ) : (
                'Save Room Configuration'
              )}
            </Button>
          )
        )}
      </Box>

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