import React from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Breadcrumbs,
  Link,
} from '@mui/material';

const FilteredHotels = () => {
  const location = useLocation();
  const filteredHotels = location.state?.filteredHotels || [];
  const navigate = useNavigate();

  const handleHotelClick = (hotel) => {
    navigate(`/hotel/${hotel.id}`, { state: { hotel: hotel } });
  };

  const breadcrumbItems = [
    <Link component={RouterLink} to="/" key="home" underline="hover" color="inherit" sx={{ fontSize: '1rem' }}>
      Home
    </Link>,
    <Link component={RouterLink} to="/hotelslocation" key="hotels-locations" underline="hover" color="inherit" sx={{ fontSize: '1rem' }}>
      Hotels and Locations
    </Link>,
    <Typography key="filtered-hotels" color="text.primary" sx={{ fontSize: '1rem' }}>
      Filtered Hotels
    </Typography>,
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom:'15px',
          color:'green'
        }}
      >
        {breadcrumbItems}
      </Breadcrumbs>

      <Grid container spacing={2}>
        {filteredHotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id}>
            <Card onClick={() => handleHotelClick(hotel)} style={{ cursor: 'pointer' }}>
              <CardMedia component="img" height="200" image={hotel.image} alt={hotel.name} />
              <CardContent>
                <Typography variant="h6" component="h3">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {filteredHotels.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" align="center">
              No hotels found matching your criteria.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FilteredHotels;