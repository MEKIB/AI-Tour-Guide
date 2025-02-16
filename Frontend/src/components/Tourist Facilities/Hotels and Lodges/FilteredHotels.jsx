// FilteredHotels.js (Create a new component for the filtered hotels page)
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const FilteredHotels = () => {
  const location = useLocation(); // Get the location object
  const filteredHotels = location.state?.filteredHotels || []; // Access the filtered hotels

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Filtered Hotels</Typography>
      <Grid container spacing={2}>
        {filteredHotels.map(hotel => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id}>
            <Card>
              <CardMedia component="img" height="200" image={hotel.image} alt={hotel.name} />
              <CardContent>
                <Typography variant="h6" component="h3">{hotel.name}</Typography>
                <Typography variant="body2" color="text.secondary">{hotel.location}</Typography>
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