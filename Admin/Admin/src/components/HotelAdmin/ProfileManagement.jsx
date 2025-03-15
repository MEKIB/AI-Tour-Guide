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

// Utility function to normalize decimal separators (replace commas with periods)
const normalizeDecimal = (value) => {
  return value.replace(/,/g, '.'); // Replace all commas with periods
};

const ProfileManagement = ({ hotelId }) => {
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
  const [message, setMessage] = useState(null); // For success/error messages
  const [error, setError] = useState(null); // For error handling

  // Fetch hotel data if hotelId is provided (for editing)
  useEffect(() => {
    if (hotelId) {
      fetchHotelData(hotelId);
    }
  }, [hotelId]);

  const fetchHotelData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:500/api/hotels/${id}`);
      const hotel = response.data;
      setHotelData({
        id: hotel._id,
        name: hotel.name,
        location: hotel.location,
        facilityType: hotel.facilityType,
        description: hotel.description,
        lat: normalizeDecimal(hotel.lat), // Normalize latitude
        long: normalizeDecimal(hotel.long), // Normalize longitude
        images: hotel.images || [], // Images from backend (with URL)
      });
      setMessage('Hotel data loaded successfully');
    } catch (err) {
      setError('Failed to fetch hotel data');
      console.error(err);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Normalize the input value (replace commas with periods)
    const normalizedValue = normalizeDecimal(value);

    // Validate latitude and longitude inputs
    if (name === 'lat') {
      const latValue = parseFloat(normalizedValue);
      if (isNaN(latValue) || latValue < -90 || latValue > 90) {
        setError('Latitude must be between -90 and 90 degrees');
        return; // Prevent updating state with invalid value
      }
    }

    if (name === 'long') {
      const longValue = parseFloat(normalizedValue);
      if (isNaN(longValue) || longValue < -180 || longValue > 180) {
        setError('Longitude must be between -180 and 180 degrees');
        return; // Prevent updating state with invalid value
      }
    }

    // Clear any previous error if the input is valid
    setError(null);

    // Update the state with the normalized value
    setHotelData({
      ...hotelData,
      [name]: normalizedValue,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const imagesArray = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file), // Temporary preview URL
        file, // Store file object for upload
      }));
      setHotelData({
        ...hotelData,
        images: [...hotelData.images, ...imagesArray],
      });
    }
  };

  // Handle image deletion
  const handleImageDelete = (index) => {
    const updatedImages = hotelData.images.filter((_, i) => i !== index);
    setHotelData({
      ...hotelData,
      images: updatedImages,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Normalize latitude and longitude values
    const normalizedLat = normalizeDecimal(hotelData.lat);
    const normalizedLong = normalizeDecimal(hotelData.long);

    const formData = new FormData();
    formData.append('name', hotelData.name);
    formData.append('location', hotelData.location);
    formData.append('facilityType', hotelData.facilityType);
    formData.append('description', hotelData.description);
    formData.append('lat', normalizedLat); // Use normalized latitude
    formData.append('long', normalizedLong); // Use normalized longitude
    if (hotelData.id) {
      formData.append('id', hotelData.id); // Include ID for updates
    }

    // Append new images (only those with a `file` property, not existing ones from DB)
    hotelData.images.forEach((image) => {
      if (image.file) {
        formData.append('images', image.file);
      }
    });

    try {
      const url = 'http://localhost:500/api/hotels';
      const method = hotelData.id ? 'put' : 'post'; // Use PUT for update, POST for create
      const response = await axios({
        method,
        url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(response.data.message);
      if (!hotelData.id) {
        // Reset form after successful creation
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
      setError('Failed to save hotel data');
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#393E46', color: '#EEEEEE', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#00ADB5' }}>
        {hotelId ? 'Edit Hotel Profile' : 'Create Hotel Profile'}
      </Typography>

      {/* Success/Error Messages */}
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
          {/* Hotel Name */}
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

          {/* Location */}
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

          {/* Facility Type */}
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
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ADB5',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ADB5',
                },
              }}
            >
              <MenuItem value="Hotels">Hotels</MenuItem>
              <MenuItem value="Resorts">Resorts</MenuItem>
              <MenuItem value="Villas">Villas</MenuItem>
              <MenuItem value="Guest Houses">Guest Houses</MenuItem>
            </Select>
          </Grid>

          {/* Latitude */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Latitude"
              name="lat"
              type="number"
              value={hotelData.lat}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              inputProps={{ min: -90, max: 90, step: 0.000001 }} // Restrict input range
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

          {/* Longitude */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Longitude"
              name="long"
              type="number"
              value={hotelData.long}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              inputProps={{ min: -180, max: 180, step: 0.000001 }} // Restrict input range
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

          {/* Description */}
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

          {/* Image Upload */}
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
                sx={{
                  bgcolor: '#00ADB5',
                  color: '#FFFFFF',
                  '&:hover': { bgcolor: '#0097A7' },
                }}
              >
                Upload Images
              </Button>
            </label>
          </Grid>

          {/* Image Preview */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {hotelData.images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Avatar
                    src={image.url.startsWith('blob:') ? image.url : `http://localhost:2001${image.url}`} // Handle local preview vs backend URL
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

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#00ADB5',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#0097A7' },
                mt: 2,
              }}
            >
              {hotelId ? 'Update Hotel' : 'Create Hotel'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfileManagement;