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
  Rating,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar
} from '@mui/material';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import AddIcon from '@mui/icons-material/Add';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

const HotelDetails = () => {
  const theme = useTheme();
  const location = useLocation();
  const [showAllImages, setShowAllImages] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const initialImageCount = 4;

  const [staticReviews, setStaticReviews] = useState({
    averageRating: 4.5,
    reviews: [
      {
        id: 1,
        user: "Traveler123",
        rating: 5,
        comment: "Excellent service and beautiful location! The rooms were spacious and clean.",
        date: "2023-08-15"
      },
      {
        id: 2,
        user: "AdventureSeeker",
        rating: 4,
        comment: "Great amenities, but the room service could be faster.",
        date: "2023-08-14"
      }
    ]
  });

  const defaultHotel = {
    name: "Luxury Resort & Spa",
    location: {
      address: "Tropical Island",
      lat: 1.3521,
      lng: 103.8198
    },
    description: `Experience ultimate luxury at our award-winning resort. Enjoy stunning ocean views from every room, 
    world-class dining, and our exclusive spa services. Perfect for both romantic getaways and family vacations.`,
    images: [
      "https://source.unsplash.com/random/800x600/?hotel",
      "https://source.unsplash.com/random/800x600/?resort",
      "https://source.unsplash.com/random/800x600/?pool",
      "https://source.unsplash.com/random/800x600/?luxury",
      "https://source.unsplash.com/random/800x600/?spa",
      "https://source.unsplash.com/random/800x600/?restaurant"
    ],
    facilities: [
      { name: "Free Wifi" },
      { name: "Swimming Pool" },
      { name: "Restaurant" },
      { name: "24-Hour Room Service" },
      { name: "Spa" },
      { name: "Fitness Center" }
    ]
  };

  const hotel = { ...defaultHotel, ...location.state?.hotel };

  const handleOpenReviews = () => setOpenReviews(true);
  const handleCloseReviews = () => {
    setOpenReviews(false);
    setNewReview({ user: '', rating: 0, comment: '' });
  };

  const calculateAverageRating = (reviews) => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length > 0 ? Number((total / reviews.length).toFixed(1)) : 0;
  };

  const handleReviewSubmit = () => {
    if (!newReview.comment.trim() || newReview.rating === 0) return;

    const updatedReviews = [{
      id: Date.now(),
      user: newReview.user.trim() || 'Anonymous',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    }, ...staticReviews.reviews];

    setStaticReviews({
      reviews: updatedReviews,
      averageRating: calculateAverageRating(updatedReviews)
    });

    setNewReview({ user: '', rating: 0, comment: '' });
  };

  const visibleImages = showAllImages ? hotel.images : hotel.images.slice(0, initialImageCount);
  const remainingImages = hotel.images.length - initialImageCount;

  const facilityIcons = {
    "Free Wifi": <WifiIcon />,
    "Swimming Pool": <PoolIcon />,
    "Restaurant": <RestaurantIcon />,
    "24-Hour Room Service": <RoomServiceIcon />,
    "Spa": <span>💆</span>,
    "Fitness Center": <span>🏋️</span>
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px'
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
      <Dialog open={openReviews} onClose={handleCloseReviews} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Guest Reviews</Typography>
          <IconButton onClick={handleCloseReviews}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Share Your Experience
            </Typography>
            <TextField
              fullWidth
              label="Your Name (optional)"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography>Your Rating:</Typography>
              <Rating
                value={newReview.rating}
                onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
                size="large"
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Your review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button 
              variant="contained" 
              onClick={handleReviewSubmit}
              disabled={!newReview.comment.trim() || newReview.rating === 0}
            >
              Submit Review
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            {staticReviews.reviews.map((review) => (
              <Box key={review.id} sx={{ mb: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                      {review.user[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {review.user}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={review.rating} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  {review.comment}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviews} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 1
        }}>
          {hotel.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon color="primary" />
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            {hotel.location.address}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: '12px', boxShadow: theme.shadows[2], overflow: 'hidden' }}>
            <ImageList variant="masonry" cols={3} gap={8} sx={{ m: 0 }}>
              {visibleImages.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image}
                    alt={`${hotel.name} - ${index + 1}`}
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








        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ borderRadius: '12px', boxShadow: theme.shadows[2], height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Hotel Facilities
                  </Typography>
                  <List dense sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1 }}>
                    {hotel.facilities.map((facility, index) => (
                      <ListItem key={index} sx={{ 
                        p: 1,
                        borderRadius: '6px',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}>
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                          {facilityIcons[facility.name] || <WifiIcon />}
                        </ListItemIcon>
                        <Typography variant="body1">{facility.name}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>



          {/* Property Highlights Card */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Property Highlights
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Breakfast info
                </Typography>
                <Typography variant="body2">Continental, Buffet</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  <span style={{ marginRight: 8 }}>🅿️</span>
                  Free private parking available at the hotel
                </Typography>
              </Box>
            </div>

            <Button 
              variant="contained" 
              fullWidth
              sx={{ mt: 2 }}
              component="a"
              href="#reserve" // Replace with your actual booking link
              target="_blank"
            >
              Reserve Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    














            <Grid item xs={12}>
              <Card 
                onClick={handleOpenReviews}
                sx={{
                  borderRadius: '12px',
                  boxShadow: theme.shadows[2],
                  p: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h2" sx={{ fontWeight: 700 }}>
                        {staticReviews.averageRating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        /5 Average
                      </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Rating
                        value={staticReviews.averageRating}
                        precision={0.1}
                        readOnly
                        size="large"
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {staticReviews.reviews.length} Guest Reviews
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>









        <Grid item xs={12} md={7}>
          <Card sx={{ 
            borderRadius: '12px',
            boxShadow: theme.shadows[2],
            mt: 3
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Property Description
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-line',
                  lineHeight: 1.7,
                  color: theme.palette.text.secondary
                }}
              >
                {hotel.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>








        {/* <Grid item xs={12}>
          <Card sx={{ borderRadius: '12px', boxShadow: theme.shadows[2], mt: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Location
              </Typography>
              
              <LoadScript
                googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
                loadingElement={<div style={{ height: '400px' }} />}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: hotel.location.lat, lng: hotel.location.lng }}
                  zoom={15}
                >
                  <Marker 
                    position={{ lat: hotel.location.lat, lng: hotel.location.lng }}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                      scaledSize: new window.google.maps.Size(40, 40)
                    }}
                  />
                </GoogleMap>
              </LoadScript>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <LocationOnIcon color="primary" />
                <Typography variant="h6">
                  {hotel.location.address}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}









    </Box>
  );
};

export default HotelDetails;