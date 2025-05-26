import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
  Paper,
  styled,
} from '@mui/material';
import axios from 'axios';

// Import the background image and fallback image
import backgroundImage from '../../../assets/homepage/bahirdar.jpg';
import fallbackImage from '../../../assets/homepage/gonder1.jpg';

const ALL_LOCATIONS = 'All Locations';
const ALL_FACILITY_TYPES = 'All Facility Types';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x200?text=No+Image+Available';
const BACKEND_URL = 'http://localhost:2000';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(57, 62, 70, 0.8)',
  border: '1px solid rgba(238, 238, 238, 0.1)',
  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.2)',
  color: '#EEEEEE',
}));

const HotelFilter = () => {
  const locations = [ALL_LOCATIONS, 'Bahir Dar', 'Gondar', 'Lalibela'];
  const facilityTypes = [ALL_FACILITY_TYPES, 'Hotels', 'Lodges', 'Restaurants'];

  const [selectedLocation, setSelectedLocation] = useState(ALL_LOCATIONS);
  const [selectedFacilityType, setSelectedFacilityType] = useState(ALL_FACILITY_TYPES);
  const navigate = useNavigate();

  const handleLocationChange = (event) => setSelectedLocation(event.target.value);
  const handleFacilityTypeChange = (event) => setSelectedFacilityType(event.target.value);

  const handleApplyFilters = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/hotels', {
        params: {
          location: selectedLocation === ALL_LOCATIONS ? '' : selectedLocation,
          facilityType: selectedFacilityType === ALL_FACILITY_TYPES ? '' : selectedFacilityType,
        },
      });

      console.log('API response:', response.data.data);

      const filteredHotels = response.data.data.map((hotel) => {
        const imageUrl = hotel.images?.[0]?.url
          ? `${BACKEND_URL}${hotel.images[0].url}`
          : PLACEHOLDER_IMAGE;
        console.log('Hotel image URL:', imageUrl);
        return {
          id: hotel._id,
          name: hotel.name,
          location: hotel.location,
          image: imageUrl,
          rating: hotel.rating || 4.5,
          HotelAdminId: hotel.HotelAdminId,
        };
      });

      // Save filter criteria to localStorage
      localStorage.setItem(
        'filterCriteria',
        JSON.stringify({
          location: selectedLocation,
          facilityType: selectedFacilityType,
        })
      );

      navigate('/filtered-hotels', { state: { filteredHotels } });
    } catch (error) {
      console.error('Error fetching hotels:', error.response?.data || error.message);
      navigate('/filtered-hotels', { state: { filteredHotels: [] } });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // Fallback background image if primary image fails to load
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${fallbackImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          display: backgroundImage ? 'none' : 'block', // Show fallback only if primary fails
        },
      }}
      onError={(e) => {
        e.target.style.backgroundImage = `url(${fallbackImage})`; // Fallback for background
      }}
    >
      <StyledPaper>
        <Box sx={{ minWidth: 300, maxWidth: 400 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 3, fontWeight: 'bold', color: '#00ADB5', textAlign: 'center' }}
          >
            Find Your Perfect Stay
          </Typography>

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 1, color: '#EEEEEE', fontWeight: '500' }}>
            Location
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="location-filter-label" sx={{ color: '#EEEEEE' }}>
              Select Location
            </InputLabel>
            <Select
              labelId="location-filter-label"
              id="location-filter"
              value={selectedLocation}
              onChange={handleLocationChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#00ADB5' },
                  '&:hover fieldset': { borderColor: '#00ADB5' },
                  '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
                },
                '& .MuiSelect-icon': { color: '#EEEEEE' },
                color: '#EEEEEE',
              }}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location} sx={{ color: '#222831' }}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 1, color: '#EEEEEE', fontWeight: '500' }}>
            Facility Type
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="facility-type-filter-label" sx={{ color: '#EEEEEE' }}>
              Select Facility Type
            </InputLabel>
            <Select
              labelId="facility-type-filter-label"
              id="facility-type-filter"
              value={selectedFacilityType}
              onChange={handleFacilityTypeChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#00ADB5' },
                  '&:hover fieldset': { borderColor: '#00ADB5' },
                  '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
                },
                '& .MuiSelect-icon': { color: '#EEEEEE' },
                color: '#EEEEEE',
              }}
            >
              {facilityTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ color: '#222831' }}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleApplyFilters}
              sx={{
                textTransform: 'none',
                bgcolor: '#00ADB5',
                color: '#EEEEEE',
                '&:hover': { bgcolor: '#0097A7' },
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              Search Hotels
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default HotelFilter;