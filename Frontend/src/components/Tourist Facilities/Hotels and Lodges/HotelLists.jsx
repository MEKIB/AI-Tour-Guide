// HotelList.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import images from '../../../assets/Biking.jpg';
import HotelFilter from './FilterHotel';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import sky from '../../../assets/sky resort.jpeg'
import grand from '../../../assets/grand hotel.jpeg'
import unison from '../../../assets/unison.jpg'

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const mockHotels = [
      { id: 1, name: 'Hotel A', location: 'Hotels', facilityType: 'Gondar', image: images },
      { id: 2, name: 'Hotel B', location: 'Gondar', facilityType: 'Hotels', image: images },
      { id: 3, name: 'Hotel C', location: 'Bahir Dar', facilityType: 'Hotels', image: unison },
      { id: 4, name: 'Hotel D', location: 'Gondar', facilityType: 'Hotels', image: images },
      { id: 5, name: 'Hotel E', location: 'Bahir Dar', facilityType: 'Hotels', image: sky },
      { id: 6, name: 'Hotel F', location: 'Bahir Dar', facilityType: 'Hotels', image: grand },
    ];

    setHotels(mockHotels);
    setFilteredHotels(mockHotels);
    setLoading(false);
  }, []);

  const handleFilterSubmit = (location, facilityType) => {
    let filtered = hotels;

    if (location !== 'All Locations') {
      filtered = filtered.filter(hotel => hotel.location === location);
    }

    if (facilityType !== 'All Facility Types') {
      filtered = filtered.filter(hotel => hotel.facilityType === facilityType);
    }

    // Navigate to a new page with the filtered hotels
    navigate('/filtered-hotels', { state: { filteredHotels: filtered } });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6" color="text.secondary">Loading hotels...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6" color="error">Error: {error?.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <HotelFilter onApply={handleFilterSubmit} />
    </Box>
  );
};

export default HotelList;