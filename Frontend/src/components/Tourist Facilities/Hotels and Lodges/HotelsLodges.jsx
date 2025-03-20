import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HotelDetails from './HotelDetails';
import Availability from './Avaliability';
import Facilities from './Facilities';
import HouseRules from './HouseRules';

function HotelsLodges() {
  const location = useLocation();
  const hotel = location.state?.hotel; // Get hotel data from location state
  const hotelName = hotel?.name || "Hotel";

  // Breadcrumb Items
  const breadcrumbItems = [
    <Link
      component={RouterLink}
      to="/"
      key="home"
      underline="hover"
      color="#EEEEEE"
      sx={{ fontSize: '1rem', '&:hover': { color: '#00ADB5' } }}
    >
      Home
    </Link>,
    <Link
      component={RouterLink}
      to="/hotelslocation"
      key="hotels-locations"
      underline="hover"
      color="#EEEEEE"
      sx={{ fontSize: '1rem', '&:hover': { color: '#00ADB5' } }}
    >
      Hotels and Locations
    </Link>,
    <Link
      component={RouterLink}
      to="/filtered-hotels"
      key="filtered-hotels"
      underline="hover"
      color="#EEEEEE"
      sx={{ fontSize: '1rem', '&:hover': { color: '#00ADB5' } }}
    >
      Filtered Hotels
    </Link>,
    <Link
      component={RouterLink}
      to={`/hotel/${hotel?.id}`}
      key="hotels-lodges"
      underline="hover"
      color="#EEEEEE"
      sx={{ fontSize: '1rem', '&:hover': { color: '#00ADB5' } }}
    >
      Hotels and Lodges
    </Link>,
    ...(hotel ? [
      <Typography key="hotel-name" color="#00ADB5" sx={{ fontSize: '1rem' }}>
        {hotel.name}
      </Typography>
    ] : [])
  ];

  return (
    <Box sx={{ bgcolor: '#222831', color: '#EEEEEE', minHeight: '100vh', p: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          color: '#EEEEEE',
        }}
      >
        {breadcrumbItems}
      </Breadcrumbs>

      {/* Hotel Details */}
      <HotelDetails hotel={hotel} />

      {/* Availability */}
      <Availability />

      {/* Facilities */}
      <Facilities hotelName={hotelName} />

      {/* House Rules */}
      <HouseRules />
    </Box>
  );
}

export default HotelsLodges;