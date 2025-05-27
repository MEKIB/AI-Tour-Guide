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
  const [filteredHotels, setFilteredHotels] = useState(location.state?.filteredHotels || []);
  const [loading, setLoading] = useState(!location.state?.hotel || !location.state?.filteredHotels);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hotel if not in state
        if (!hotel) {
          const response = await axios.get(`http://localhost:2000/api/hotels/${id}`);
          console.log('Fetched hotel:', response.data.data);
          setHotel(response.data.data);
        }

        // Fetch filtered hotels if not in state
        if (!filteredHotels.length) {
          const criteria = JSON.parse(localStorage.getItem('filterCriteria') || '{}');
          console.log('Filter criteria from localStorage:', criteria);
          const { location = '', facilityType = '' } = criteria;
          if (!location && !facilityType) {
            console.warn('No filter criteria found in localStorage');
            setFilteredHotels([]);
            setLoading(false);
            return;
          }

          const response = await axios.get('http://localhost:2000/api/hotels', {
            params: {
              location: location === 'All Locations' ? '' : location,
              facilityType: facilityType === 'All Facility Types' ? '' : facilityType,
            },
          });

          console.log('Fetched filtered hotels:', response.data.data);

          const hotels = response.data.data.map((hotel) => ({
            id: hotel._id,
            name: hotel.name,
            location: hotel.location,
            image: hotel.images?.[0]?.url
              ? `http://localhost:2000${hotel.images[0].url}`
              : 'https://via.placeholder.com/400x200?text=No+Image+Available',
            rating: hotel.rating || 4.5,
            HotelAdminId: hotel.HotelAdminId,
          }));

          setFilteredHotels(hotels);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err.response?.data || err.message);
        if (!hotel) setHotel(null);
        if (!filteredHotels.length) setFilteredHotels([]);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchData();
  }, [id, hotel, filteredHotels.length, loading]);

  const hotelName = hotel?.name || 'Hotel';
  const hotelAdminId = hotel?.HotelAdminId;

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
      to={{
        pathname: '/filtered-hotels',
        state: { filteredHotels },
      }}
      key="filtered-hotels"
      underline="hover"
      color="#EEEEEE"
      sx={{ fontSize: '1rem', '&:hover': { color: '#00ADB5' } }}
    >
      Filtered Hotels
    </Link>,
    <Typography key="hotels-lodges" color="#00ADB5" sx={{ fontSize: '1rem' }}>
      {hotelName}
    </Typography>,
  ];

  if (loading || !hotel) {
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
      <HotelDetails hotelAdminId={hotelAdminId} />
      <Availability hotelAdminId={hotelAdminId} />
      <Facilities hotelAdminId={hotelAdminId} hotelName={hotelName} />
      <HouseRules hotelAdminId={hotelAdminId} />
    </Box>
  );
}

export default HotelsLodges;