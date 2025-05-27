import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Avatar,
  Stack,
  Paper,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

// Utility function to normalize decimal separators
const normalizeDecimal = (value) => String(value ?? '').replace(/,/g, '.');

const ProfileManagement = () => {
  const [hotelData, setHotelData] = useState({
    id: '',
    name: '',
    location: '',
    facilityType: '',
    description: '',
    lat: '',
    long: '',
    images: [],
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchHotelData();
  }, []);

  const fetchHotelData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }

      const response = await axios.get('http://localhost:2000/api/hotel/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const hotel = response.data;
      if (hotel && hotel._id) {
        setHotelData({
          id: hotel._id,
          name: hotel.name || '',
          location: hotel.location || '',
          facilityType: hotel.facilityType || '',
          description: hotel.description || '',
          lat: normalizeDecimal(hotel.lat ?? ''),
          long: normalizeDecimal(hotel.long ?? ''),
          images: hotel.images || [],
        });
        setIsEditing(true);
        setMessage('Hotel data loaded successfully');
      } else {
        setIsEditing(false);
        setMessage('No existing hotel data found. You can create a new profile.');
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setIsEditing(false);
        setMessage('No existing hotel data found. You can create a new profile.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch hotel data');
      }
      console.error('Fetch error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue = normalizeDecimal(value);

    if (name === 'lat') {
      const latValue = parseFloat(normalizedValue);
      if (isNaN(latValue) || latValue < -90 || latValue > 90) {
        setError('Latitude must be between -90 and 90 degrees');
        return;
      }
    }

    if (name === 'long') {
      const longValue = parseFloat(normalizedValue);
      if (isNaN(longValue) || longValue < -180 || longValue > 180) {
        setError('Longitude must be between -180 and 180 degrees');
        return;
      }
    }

    setError(null);
    setHotelData({ ...hotelData, [name]: normalizedValue });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const imagesArray = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        file,
      }));
      setHotelData({
        ...hotelData,
        images: [...hotelData.images, ...imagesArray],
      });
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = hotelData.images.filter((_, i) => i !== index);
    setHotelData({ ...hotelData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const normalizedLat = normalizeDecimal(hotelData.lat);
    const normalizedLong = normalizeDecimal(hotelData.long);

    const formData = new FormData();
    formData.append('name', hotelData.name);
    formData.append('location', hotelData.location);
    formData.append('facilityType', hotelData.facilityType);
    formData.append('description', hotelData.description);
    formData.append('lat', normalizedLat);
    formData.append('long', normalizedLong);
    if (hotelData.id) {
      formData.append('id', hotelData.id);
    }

    hotelData.images.forEach((image) => {
      if (image.file) {
        formData.append('images', image.file);
      }
    });

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }

      const response = await axios({
        method: 'post',
        url: 'http://localhost:2000/api/hotels',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      setMessage(response.data.message);
      if (!isEditing) {
        setHotelData({
          id: '',
          name: '',
          location: '',
          facilityType: '',
          description: '',
          lat: '',
          long: '',
          images: [],
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save hotel data');
      console.error('Submit error:', err);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#393E46', color: '#EEEEEE', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#00ADB5' }}>
        {isEditing ? 'Edit Hotel Profile' : 'Create Hotel Profile'}
      </Typography>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          bgcolor: '#FFFFFF',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Hotel Name"
              name="name"
              value={hotelData.name}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              sx={{
                '& .MuiInputBase-input': { color: '#222831' },
                '& .MuiInputLabel-root': { color: '#222831' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#00ADB5' },
                  '&:hover fieldset': { borderColor: '#00ADB5' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={hotelData.location}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              sx={{
                '& .MuiInputBase-input': { color: '#222831' },
                '& .MuiInputLabel-root': { color: '#222831' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#00ADB5' },
                  '&:hover fieldset': { borderColor: '#00ADB5' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="facility-type-label" sx={{ color: '#222831' }}>
              Facility Type
            </InputLabel>
            <Select
              fullWidth
              labelId="facility-type-label"
              name="facilityType"
              value={hotelData.facilityType}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              sx={{
                color: '#222831',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#00ADB5' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00ADB5' },
              }}
            >
              <MenuItem value="Hotels">Hotels</MenuItem>
              <MenuItem value="Resorts">Resorts</MenuItem>
              <MenuItem value="Lodges">Lodges</MenuItem>
              <MenuItem value="Guest Houses">Guest Houses</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Latitude"
              name="lat"
              type="text"
              value={hotelData.lat}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              sx={{
                '& .MuiInputBase-input': { color: '#222831' },
                '& .MuiInputLabel-root': { color: '#222831' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#00ADB5' },
                  '&:hover fieldset': { borderColor: '#00ADB5' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Longitude"
              name="long"
              type="text"
              value={hotelData.long}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              sx={{
                '& .MuiInputBase-input': { color: '#222831' },
                '& .MuiInputLabel-root': { color: '#222831' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#00ADB5' },
                  '&:hover fieldset': { borderColor: '#00ADB5' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={hotelData.description}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              multiline
              rows={6}
              required
              sx={{
                '& .MuiInputBase-input': { color: '#222831' },
                '& .MuiInputLabel-root': { color: '#222831' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#00ADB5' },
                  '&:hover fieldset': { borderColor: '#00ADB5' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel sx={{ color: '#222831' }}>Upload Images</InputLabel>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ bgcolor: '#00ADB5', color: '#FFFFFF', '&:hover': { bgcolor: '#0097A7' } }}
              >
                Upload Images
              </Button>
            </label>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {hotelData.images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Avatar
                    src={image.url.startsWith('blob:') ? image.url : `http://localhost:2000${image.url}`}
                    alt={image.name}
                    variant="rounded"
                    sx={{ width: 100, height: 100 }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      color: '#FFFFFF',
                      bgcolor: '#FF0000',
                      '&:hover': { bgcolor: '#CC0000' },
                    }}
                    onClick={() => handleImageDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#00ADB5', color: '#FFFFFF', '&:hover': { bgcolor: '#0097A7' }, mt: 2 }}
            >
              {isEditing ? 'Update Hotel' : 'Create Hotel'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfileManagement;