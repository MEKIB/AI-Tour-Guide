// src/components/ProfileManagement.jsx
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    facilityType: '',
    description: '',
    lat: '',
    long: '',
    images: [],
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:500/api/hotels/${id}`).then((response) => {
        setHotelData(response.data);
      });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData({
      ...hotelData,
      [name]: value,
    });
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
    setHotelData({
      ...hotelData,
      images: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', hotelData.name);
    formData.append('location', hotelData.location);
    formData.append('facilityType', hotelData.facilityType);
    formData.append('description', hotelData.description);
    formData.append('lat', hotelData.lat);
    formData.append('long', hotelData.long);
    if (id) {
      formData.append('id', id);
    }
    hotelData.images.forEach((image) => {
      if (image.file) {
        formData.append('images', image.file);
      }
    });

    try {
      await axios.post('http://localhost:500/api/hotels', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Hotel' : 'Add Hotel'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800 }}>
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
            />
          </Grid>
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