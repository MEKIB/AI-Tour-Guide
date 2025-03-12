import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HotelDetails from './HotelDetails';
import Availability from './Avaliability';
import Facilities from './Facilities';
import HouseRules from './HouseRules';

function HotelsLodges() {
  const location = useLocation();
  const hotel = location.state?.hotel; // Get hotel data from location state
  const hotelName = hotel?.name || "Hotel";
  const breadcrumbItems = [
    <Link component={RouterLink} to="/" key="home" underline="hover" color="inherit" sx={{ fontSize: '1rem' }}>
      Home
    </Link>,
    <Link component={RouterLink} to="/hotelslocation" key="hotels-locations" underline="hover" color="inherit" sx={{ fontSize: '1rem' }}>
      Hotels and Locations
    </Link>,
    <Link component={RouterLink} to="/filtered-hotels" key="filtered-hotels" underline="hover" color="inherit" sx={{ fontSize: '1rem' }}>
      Filtered Hotels
    </Link>,
    <Link component={RouterLink} to={`/hotel/${hotel?.id}`} key="hotels-lodges" underline="hover" color="inherit" sx={{ fontSize: '1rem' }}>
      Hotels and Lodges
    </Link>,
    ...(hotel ? [<Typography key="hotel-name" color="text.primary" sx={{ fontSize: '1rem' }}>{hotel.name}</Typography>] : [])
  ];

  return (
    <>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px',
          color: 'green',
        }}
      >
        {breadcrumbItems}
      </Breadcrumbs>
     <HotelDetails hotel={hotel} /> 
     <Availability/>
     <Facilities hotelName={hotelName}/>
     <HouseRules/>
    </>
  );
}

export default HotelsLodges;