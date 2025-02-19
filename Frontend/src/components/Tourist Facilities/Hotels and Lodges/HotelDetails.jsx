import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemIcon,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HotelDetails = () => {
  const theme = useTheme();
  const location = useLocation();
  const hotel = location.state?.hotel;
  const [showAllImages, setShowAllImages] = useState(false);
  const initialImageCount = 4;

  if (!hotel) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="h6">Hotel not found.</Typography>
      </Box>
    );
  }

  const { 
    name,
    location: hotelLocation,
    description,
    images = [],
    facilities = []
  } = hotel;

  const visibleImages = showAllImages ? images : images.slice(0, initialImageCount);
  const remainingImages = images.length - initialImageCount;

  const facilityIcons = {
    "Free Wifi": <WifiIcon />,
    "Swimming Pool": <PoolIcon />,
    "Restaurant": <RestaurantIcon />,
    "24-Hour Room Service": <RoomServiceIcon />,
  };

  return (
    <Box sx={{ 
      p: 3,
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Hotel Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 1
        }}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon color="primary" />
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            {hotelLocation}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Image Gallery */}
        <Grid item xs={12} md={7}>
          <Card sx={{ 
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: theme.shadows[2]
          }}>
            <ImageList
              variant="masonry"
              cols={3}
              gap={8}
              sx={{ m: 0 }}
            >
              {visibleImages.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image}
                    alt={`${name} - ${index + 1}`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </ImageListItem>
              ))}
              
              {!showAllImages && remainingImages > 0 && (
                <ImageListItem key="show-more">
                  <Box
                    sx={{
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                      cursor: 'pointer',
                      border: `2px dashed ${theme.palette.divider}`,
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                        borderColor: theme.palette.primary.main
                      }
                    }}
                    onClick={() => setShowAllImages(true)}
                  >
                    <AddIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                    <Typography variant="body1" color="primary">
                      +{remainingImages} More Photos
                    </Typography>
                  </Box>
                </ImageListItem>
              )}
            </ImageList>
          </Card>
        </Grid>

        {/* Facilities Section */}
        <Grid item xs={12} md={5}>
          <Card sx={{ 
            borderRadius: '12px',
            boxShadow: theme.shadows[2],
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ 
                fontWeight: 600,
                mb: 2,
                color: theme.palette.text.primary
              }}>
                Facilities
              </Typography>
              <List dense sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 1
              }}>
                {facilities.map((facility, index) => (
                  <ListItem key={index} sx={{ 
                    p: 1,
                    borderRadius: '6px',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      {facilityIcons[facility.name] || <WifiIcon />}
                    </ListItemIcon>
                    <Typography variant="body1">
                      {facility.name}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Description Section - Below Left Grid */}
        <Grid item xs={12} md={7}>
          <Card sx={{ 
            borderRadius: '12px',
            boxShadow: theme.shadows[2],
            mt: 3
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ 
                fontWeight: 600,
                mb: 2,
                color: theme.palette.text.primary
              }}>
                Property Description
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-line',
                  lineHeight: 1.7,
                  color: theme.palette.text.secondary,
                  fontSize: '1rem'
                }}
              >
                {description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HotelDetails;