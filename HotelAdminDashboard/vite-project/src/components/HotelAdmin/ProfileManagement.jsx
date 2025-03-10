import React, { useState } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileManagement = () => {
  // State to manage form inputs
  const [hotelData, setHotelData] = useState({
    id: 1, // This can be auto-generated or fetched from the backend
    name: '',
    location: '',
    facilityType: '',
    description: '',
    lat: '',
    long: '',
    images: [], // Array to store uploaded images
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData({
      ...hotelData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const imagesArray = Array.from(files).map((file) => {
        return {
          name: file.name,
          url: URL.createObjectURL(file), // Create a preview URL for the image
          file, // Store the file object for later upload
        };
      });
      setHotelData({
        ...hotelData,
        images: [...hotelData.images, ...imagesArray], // Add new images to the existing ones
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hotel Data Submitted:', hotelData);
    // Here, you can send the data to the backend or update the state
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile Management
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800 }}>
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
            />
          </Grid>

          {/* Facility Type */}
          <Grid item xs={12} md={6}>
            <InputLabel id="facility-type-label">Facility Type</InputLabel>
            <Select
              fullWidth
              labelId="facility-type-label"
              name="facilityType"
              value={hotelData.facilityType}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
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
              value={hotelData.lat}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
            />
          </Grid>

          {/* Longitude */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Longitude"
              name="long"
              value={hotelData.long}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
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
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <InputLabel>Upload Images</InputLabel>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
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
                    src={image.url}
                    alt={image.name}
                    variant="rounded"
                    sx={{ width: 100, height: 100 }}
                  />
                  <IconButton
                    sx={{ position: 'absolute', top: 0, right: 0 }}
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
              color="primary"
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileManagement;