import React, { useState, useEffect } from 'react';
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
  Grid,
  IconButton,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';

const HotelDetails = ({ hotelAdminId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = 'http://localhost:2000'; // Adjust if your backend runs on a different port/domain

  const [staticReviews, setStaticReviews] = useState({
    averageRating: 4.5,
    reviews: [
      { id: 1, user: "Traveler123", rating: 5, comment: "Excellent service and beautiful location!", date: "2023-08-15" },
      { id: 2, user: "AdventureSeeker", rating: 4, comment: "Great amenities, but room service could be faster.", date: "2023-08-14" },
    ],
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/hotels/admin/${hotelAdminId}`);
        console.log('Hotel Data:', response.data.data); // For debugging
        setHotel(response.data.data);
      } catch (error) {
        console.error('Failed to fetch hotel details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hotelAdminId) {
      fetchHotelDetails();
    }
  }, [hotelAdminId]);

  if (loading) {
    return <Typography variant="h6">Loading hotel details...</Typography>;
  }

  if (!hotel) {
    return <Typography variant="h6">Hotel not found.</Typography>;
  }

  const { name, description, location: hotelLocation, images = [], facilityType } = hotel;

  const facilityIcons = {
    'Free Wifi': <WifiIcon />,
    'Swimming Pool': <PoolIcon />,
    'Restaurant': <StarIcon />,
    '24-Hour Room Service': <StarIcon />,
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    return "Average";
  };

  const ratingStyle = {
    color: 'red',
    backgroundColor: '#00ADB5',
    borderRadius: 2,
    textAlign: 'center',
    display: 'block',
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
      date: new Date().toISOString().split('T')[0],
    }, ...staticReviews.reviews];

    const newAverageRating = calculateAverageRating(updatedReviews);

    setStaticReviews({
      reviews: updatedReviews,
      averageRating: newAverageRating,
    });

    setNewReview({ user: '', rating: 0, comment: '' });
  };

  return (
    <Box sx={{ p: 5, px: 10, backgroundColor: '#222831', color: '#EEEEEE' }}>
      <Grid container spacing={3}>
        {/* Left side: Image gallery */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={1}>
            {/* First row */}
            <Grid item xs={8} sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="500"
                image={images[0]?.url ? `${baseUrl}${images[0].url}` : '/placeholder.jpg'}
                alt={`Hotel ${name} image 1`}
                sx={{ cursor: 'pointer', borderRadius: 2 }}
                onClick={handleOpenModal}
              />
            </Grid>
            <Grid item xs={4} container spacing={1} direction="column">
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  height="245"
                  image={images[1]?.url ? `${baseUrl}${images[1].url}` : '/placeholder.jpg'}
                  alt={`Hotel ${name} image 2`}
                  sx={{ cursor: 'pointer', width: '100%', borderRadius: 2 }}
                  onClick={handleOpenModal}
                />
              </Grid>
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  height="245"
                  image={images[2]?.url ? `${baseUrl}${images[2].url}` : '/placeholder.jpg'}
                  alt={`Hotel ${name} image 3`}
                  sx={{ cursor: 'pointer', width: '100%', borderRadius: 2 }}
                  onClick={handleOpenModal}
                />
              </Grid>
            </Grid>

            {/* Second row with five images */}
            {images.slice(3, 9).map((image, index) => (
              <Grid item xs={2} key={index} sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="120"
                  image={image?.url ? `${baseUrl}${image.url}` : '/placeholder.jpg'}
                  alt={`Hotel ${name} image ${index + 4}`}
                  sx={{ cursor: 'pointer', borderRadius: 2 }}
                  onClick={handleOpenModal}
                />
              </Grid>
            ))}
            {images.length > 9 && (
              <Grid item xs={2} sx={{ position: 'relative', cursor: 'pointer' }} onClick={handleOpenModal}>
                <CardMedia
                  component="img"
                  height="120"
                  image={images[9]?.url ? `${baseUrl}${images[9].url}` : '/placeholder.jpg'}
                  alt={`Hotel ${name} image 10`}
                  sx={{ width: '100%', filter: 'brightness(50%)', borderRadius: 2 }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#EEEEEE',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {hotelLocation}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    +{images.length - 9} More
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Right side: Hotel details */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#393E46', color: '#EEEEEE', height: '100%' }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={8} container direction="column" spacing={1} sx={{ color: '#00ADB5', textAlign: 'right', display: 'block', paddingRight: 5 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {getRatingText(staticReviews.averageRating)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {staticReviews.reviews.length} reviews
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4} container direction="column" sx={ratingStyle}>
                  <Grid item xs={12} sx={{ flex: 1 }}>
                    <Typography variant="body2">{staticReviews.averageRating}</Typography>
                    <Typography variant="body2">⭐</Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* Review Section */}
              <Box sx={{ maxWidth: 500, margin: 'auto', textAlign: 'center', mt: 2 }}>
                <Typography variant="h5" gutterBottom>
                  What Our Guests Loved
                </Typography>
                <Carousel
                  showThumbs={false}
                  autoPlay
                  infiniteLoop
                  renderIndicator={(onClickHandler, isSelected, index, label) => (
                    <li
                      style={{
                        backgroundColor: isSelected ? '#00ADB5' : '#CCCCCC',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        display: 'inline-block',
                        margin: '0 5px',
                        cursor: 'pointer',
                      }}
                      onClick={onClickHandler}
                      onKeyDown={onClickHandler}
                      role="button"
                      tabIndex={0}
                      aria-label={`${label} ${index + 1}`}
                    />
                  )}
                >
                  {staticReviews.reviews.map((guest, index) => (
                    <Card key={index} sx={{ p: 2, boxShadow: 3, backgroundColor: '#393E46', color: '#EEEEEE' }}>
                      <CardContent>
                        <Typography variant="body1" fontStyle="italic">
                          "{guest.comment}"
                        </Typography>
                        <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 'bold' }}>
                          - {guest.user}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Carousel>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2, color: '#00ADB5', borderColor: '#00ADB5' }}
                onClick={handleOpenReviews}
              >
                Add Review
              </Button>

              {/* Map Placeholder */}
              <Box sx={{ mt: 2, height: 200, backgroundColor: '#222831', borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body1">Map Placeholder</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* New row below the left and right sides */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Description and Reservation */}
        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: '#393E46', color: '#EEEEEE' }}>
            <CardContent>
              <Typography variant="h5">Description</Typography>
              <Typography variant="body2">{description}</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Property Highlights</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>{facilityIcons[facilityType] || <StarIcon sx={{ color: '#00ADB5' }} />}</ListItemIcon>
                    <Typography>{facilityType}</Typography>
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reservation Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#393E46', color: '#EEEEEE' }}>
            <CardContent>
              <Typography variant="h5">Reserve</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Availability not specified
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: '#00ADB5', color: '#EEEEEE', '&:hover': { bgcolor: '#00838F' } }}
              >
                Reserve Now
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2, color: '#00ADB5', borderColor: '#00ADB5' }}
              >
                Save Property
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for displaying all images in a carousel */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxHeight: '90%',
            backgroundColor: '#393E46',
            padding: 2,
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 2 }}>
            <IconButton onClick={handleCloseModal} sx={{ color: '#EEEEEE' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              showStatus={false}
              renderIndicator={(onClickHandler, isSelected, index, label) => (
                <li
                  style={{
                    backgroundColor: isSelected ? '#00ADB5' : '#CCCCCC',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    display: 'inline-block',
                    margin: '0 5px',
                    cursor: 'pointer',
                  }}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label} ${index + 1}`}
                />
              )}
            >
              {images.map((image, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="500"
                    image={image?.url ? `${baseUrl}${image.url}` : '/placeholder.jpg'}
                    alt={`Hotel ${name} image ${index + 1}`}
                    sx={{ width: 'auto', maxHeight: '80vh', borderRadius: 2, zIndex: 2 }}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Modal>

      {/* Dialog for adding and viewing reviews */}
      <Dialog open={openReviews} onClose={handleCloseReviews} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#393E46', color: '#EEEEEE' }}>
          <Typography variant="h5">Guest Reviews</Typography>
          <IconButton onClick={handleCloseReviews}>
            <CloseIcon sx={{ color: '#EEEEEE' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#393E46', color: '#EEEEEE' }}>
          <Box sx={{ mb: 3, p: 2, border: `1px solid #00ADB5`, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Share Your Experience
            </Typography>
            <TextField
              fullWidth
              label="Your Name (optional)"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              sx={{ mb: 2, bgcolor: '#222831', color: '#EEEEEE' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography>Your Rating:</Typography>
              <Rating
                value={newReview.rating}
                onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
                size="large"
                sx={{ color: '#00ADB5' }}
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
              sx={{ mb: 2, bgcolor: '#222831', color: '#EEEEEE' }}
            />
            <Button
              variant="contained"
              onClick={handleReviewSubmit}
              disabled={!newReview.comment.trim() || newReview.rating === 0}
              sx={{ bgcolor: '#00ADB5', color: '#EEEEEE', '&:hover': { bgcolor: '#00838F' } }}
            >
              Submit Review
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            {staticReviews.reviews.map((review) => (
              <Box key={review.id} sx={{ mb: 2, p: 2, bgcolor: '#222831', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#00ADB5' }}>
                      {review.user[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {review.user}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={review.rating} size="small" readOnly sx={{ color: '#00ADB5' }} />
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
        <DialogActions sx={{ bgcolor: '#393E46' }}>
          <Button onClick={handleCloseReviews} sx={{ color: '#EEEEEE' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelDetails;