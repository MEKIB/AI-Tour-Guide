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
  Rating,
} from '@mui/material';

// Fallback placeholder image
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x200?text=No+Image+Available';

const FilteredHotels = () => {
  const location = useLocation();
  const filteredHotels = location.state?.filteredHotels || [];
  const navigate = useNavigate();

  // Log hotel data for debugging
  console.log('Filtered hotels:', filteredHotels);

  const sortedHotels = [...filteredHotels].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const handleHotelClick = (hotel) => {
    console.log('Navigating to hotel:', hotel);
    navigate(`/hotel/${hotel.id}`, { state: { hotel } });
  };

  // Handle image loading errors
  const handleImageError = (e) => {
    console.warn('Image failed to load:', e.target.src);
    e.target.src = PLACEHOLDER_IMAGE;
  };

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
    <Typography key="filtered-hotels" color="#00ADB5" sx={{ fontSize: '1rem' }}>
      Filtered Hotels
    </Typography>,
  ];

  return (
    <Box
      sx={{
        backgroundImage: `url(https://images.unsplash.com/photo-1564501049412-61c2a3083791)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Box sx={{ background: 'rgba(34, 40, 49, 0.8)', minHeight: '100vh', p: 3 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 3, color: '#EEEEEE' }}>
          {breadcrumbItems}
        </Breadcrumbs>

        <Grid container spacing={4}>
          {sortedHotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Card
                onClick={() => handleHotelClick(hotel)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: '#393E46',
                  color: '#EEEEEE',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)' },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 150, sm: 200 },
                    minHeight: 150, // Prevent collapse
                    width: '100%',
                    objectFit: 'cover',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                  image={hotel.image || PLACEHOLDER_IMAGE}
                  alt={hotel.name || 'Hotel Image'}
                  onError={handleImageError}
                />
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ color: '#00ADB5' }}>
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="#EEEEEE">
                    {hotel.location}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating
                      name="read-only"
                      value={hotel.rating || 0}
                      precision={0.1}
                      readOnly
                      sx={{ color: '#00ADB5' }}
                    />
                    <Typography variant="body2" color="#EEEEEE" sx={{ ml: 1 }}>
                      ({hotel.rating || 'N/A'})
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {sortedHotels.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" color="#EEEEEE" align="center" sx={{ mt: 4 }}>
                No hotels found matching your criteria.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default FilteredHotels;