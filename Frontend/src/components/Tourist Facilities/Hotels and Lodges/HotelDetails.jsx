// HotelDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';

const HotelDetails = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;

  if (!hotel) {
    return <Typography variant="h6">Hotel not found.</Typography>;
  }

  // Hotel details are now directly from the hotel object
  const { description, facilities, reviews } = hotel; // Destructure for easier access

    const facilityIcons = { // Map facility names to icons.
        "Free Wifi": <WifiIcon />,
        "Swimming Pool": <PoolIcon />,
        "Restaurant": <StarIcon />,
        "24-Hour Room Service": <StarIcon />,
        // Add more mappings as needed
    };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardMedia component="img" height="400" image={hotel.image} alt={hotel.name} />
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>{hotel.name}</Typography>
          <Typography variant="h6" gutterBottom>Location: {hotel.location}</Typography>

          {description && ( // Conditional rendering for description
            <>
              <Typography variant="h5" gutterBottom>Description</Typography>
              <Typography variant="body1" gutterBottom>{description}</Typography>
            </>
          )}

          {facilities && facilities.length > 0 && ( // Conditional rendering for facilities
            <>
              <Typography variant="h5" gutterBottom>Facilities</Typography>
              <List>
                {facilities.map((facility, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{facilityIcons[facility.name] || <StarIcon/>}</ListItemIcon> {/* Display the icon or default */}
                    <Typography variant="body1">{facility.name}</Typography>
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {reviews && reviews.length > 0 && ( // Conditional rendering for reviews
            <>
              <Typography variant="h5" gutterBottom>Reviews</Typography>
              {reviews.map((review, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body1">{review.user}</Typography>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2">{review.comment}</Typography>
                </Box>
              ))}
            </>
          )}

        </CardContent>
      </Card>
      {/* Add booking functionality here */}
    </Box>
  );
};

export default HotelDetails;