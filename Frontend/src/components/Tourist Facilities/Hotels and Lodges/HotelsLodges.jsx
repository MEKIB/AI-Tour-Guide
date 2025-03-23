import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import HotelDetails from './HotelDetails';
import Availability from './Avaliability';
import Facilities from './Facilities';
import HouseRules from './HouseRules';

function HotelsLodges() {
  const { id } = useParams();
  const location = useLocation();
  const [hotel, setHotel] = useState(location.state?.hotel);

  useEffect(() => {
    if (!hotel) {
      const fetchHotel = async () => {
        try {
          const response = await axios.get(`http://localhost:2000/api/hotels/${id}`);
          setHotel(response.data.data);
        } catch (err) {
          console.error('Failed to fetch hotel:', err);
        }
      };
      fetchHotel();
    }
  }, [id, hotel]);

  const hotelName = hotel?.name || 'Hotel';
  const hotelAdminId = hotel?.HotelAdminId;

  const breadcrumbItems = [
    <Link component={RouterLink} to="/" key="home" underline="hover" color="#EEEEEE" sx={{ fontSize: '1rem', '&:hover': { color: '#00ADB5' } }}>
      Home
    </Link>,
    <Link component={RouterLink} to="/filtered-hotels" key="filtered-hotels" underline="hover" color="#EEEEEE" sx={{ fontSize: '1rem', '&:hover': { color: '#00ADB5' } }}>
      Filtered Hotels
    </Link>,
    <Typography key="hotels-lodges" color="#00ADB5" sx={{ fontSize: '1rem' }}>
      {hotelName}
    </Typography>,
  ];

  if (!hotel) {
    return (
      <Box sx={{ bgcolor: '#222831', color: '#EEEEEE', minHeight: '100vh', p: 3 }}>
        <Typography variant="h6">Loading hotel data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#222831', color: '#EEEEEE', minHeight: '100vh', p: 3 }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 3, color: '#EEEEEE' }}>
        {breadcrumbItems}
      </Breadcrumbs>
      <HotelDetails hotelAdminId={hotelAdminId}/>
      <Availability />
      <Facilities hotelAdminId={hotelAdminId} hotelName={hotelName} />
      <HouseRules hotelAdminId={hotelAdminId} />
    </Box>
  );
}

export default HotelsLodges;