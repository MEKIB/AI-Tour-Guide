import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  Grid,
  IconButton,
  Modal,
  Button,
  Rating as MuiRating,
  CircularProgress,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import HotelReviews from './HotelReview';

// Fix for Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// MapComponent using vanilla Leaflet
const MapComponent = ({ lat, long, name, hotelLocation }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [lat || 11.59578, long || 37.38544],
      zoom: 15,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    // Add marker with popup
    L.marker([lat || 11.59578, long || 37.38544])
      .addTo(mapInstanceRef.current)
      .bindPopup(`
        <b>${name}</b><br>
        <span style="font-size: 12px;">${hotelLocation}</span>
      `)
      .openPopup();

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, long, name, hotelLocation]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

const HotelDetails = ({ hotelAdminId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState('');
  const baseUrl = 'http://localhost:2000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch hotel details
        const hotelResponse = await axios.get(`${baseUrl}/api/hotels/admin/${hotelAdminId}`);
        console.log('Hotel Response:', hotelResponse.data.data);
        setHotel(hotelResponse.data.data);

        // Fetch reviews
        setReviewsLoading(true);
        const reviewsResponse = await axios.get(`${baseUrl}/api/reviews/${hotelAdminId}`);
        setReviews(reviewsResponse.data.data);

      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load hotel details. Please try again later.');
      } finally {
        setLoading(false);
        setReviewsLoading(false);
      }
    };

    if (hotelAdminId) {
      fetchData();
    }
  }, [hotelAdminId]);

  // Calculate average rating
  const averageRating = reviews?.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const getRatingText = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    return rating > 0 ? "Average" : "No Ratings";
  };

  const ratingStyle = {
    color: '#EEEEEE',
    backgroundColor: '#00ADB5',
    borderRadius: 2,
    textAlign: 'center',
    display: 'block',
    padding: '8px',
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress sx={{ color: '#00ADB5' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h6">Hotel not found</Typography>
      </Box>
    );
  }

  const { name, description, location: hotelLocation, images = [], facilityType, lat, long } = hotel;

  const facilityIcons = {
    'Free Wifi': <WifiIcon />,
    'Swimming Pool': <PoolIcon />,
    'Restaurant': <StarIcon />,
    '24-Hour Room Service': <StarIcon />,
  };

  return (
    <Box sx={{ p: 5, px: 10, backgroundColor: '#222831', color: '#EEEEEE' }}>
      <Grid container spacing={3}>
        {/* Left side: Image gallery */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={1}>
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

            {/* Additional images */}
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
          </Grid>
        </Grid>

        {/* Right side: Details and reviews */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#393E46', color: '#EEEEEE', height: '100%' }}>
            <CardContent>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={8} sx={{ textAlign: 'right', pr: 2 }}>
                  <Typography variant="body2" sx={{ color: '#00ADB5' }}>
                    {getRatingText(averageRating)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#00ADB5' }}>
                    {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={ratingStyle}>
                  <Typography variant="h6">{averageRating.toFixed(1)}</Typography>
                  <MuiRating
                    value={averageRating}
                    readOnly
                    precision={0.1}
                    sx={{ color: '#EEEEEE', fontSize: '1rem' }}
                  />
                </Grid>
              </Grid>

              {/* Reviews Carousel */}
              <Box sx={{ maxWidth: 500, margin: 'auto' }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                  Guest Reviews
                </Typography>
                {reviewsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                    <CircularProgress sx={{ color: '#00ADB5' }} />
                  </Box>
                ) : reviews.length === 0 ? (
                  <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    No reviews yet
                  </Typography>
                ) : (
                  <Carousel
                    showThumbs={false}
                    autoPlay
                    infiniteLoop
                    renderIndicator={(onClickHandler, isSelected) => (
                      <span
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
                        role="button"
                        tabIndex={0}
                      />
                    )}
                  >
                    {reviews.map((review) => (
                      <Card key={review._id} sx={{ p: 2, backgroundColor: '#393E46', color: '#EEEEEE' }}>
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={1}>
                            <MuiRating
                              value={review.rating}
                              readOnly
                              precision={0.5}
                              sx={{ color: '#00ADB5', mr: 1 }}
                            />
                            <Typography variant="caption" sx={{ color: '#CCCCCC' }}>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Typography variant="body1" fontStyle="italic">
                            "{review.comment}"
                          </Typography>
                          <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 'bold', color: '#00ADB5' }}>
                            - {review.user || 'Anonymous Guest'}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Carousel>
                )}
                <HotelReviews hotelAdminId={hotelAdminId} />
              </Box>

              {/* Map */}
              <Box sx={{ mt: 2, height: 200, borderRadius: 2, overflow: 'hidden' }}>
                <MapComponent
                  lat={lat}
                  long={long}
                  name={name}
                  hotelLocation={hotelLocation}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Description and Reservation Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: '#393E46', color: '#EEEEEE' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>About {name}</Typography>
              <Typography variant="body1">{description}</Typography>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Facility Highlights</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon sx={{ color: '#00ADB5' }}>
                      {facilityIcons[facilityType] || <StarIcon />}
                    </ListItemIcon>
                    <Typography>{facilityType}</Typography>
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#393E46', color: '#EEEEEE' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Reserve Your Stay</Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    bgcolor: '#00ADB5',
                    '&:hover': { bgcolor: '#00838F' },
                    py: 1.5,
                    mb: 2
                  }}
                >
                  Check Availability
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    color: '#00ADB5',
                    borderColor: '#00ADB5',
                    '&:hover': { borderColor: '#00838F' }
                  }}
                >
                  Save to Wishlist
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Image Gallery Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxHeight: '90vh',
          bgcolor: '#393E46',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'hidden'
        }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 1,
              color: '#EEEEEE',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <CloseIcon />
          </IconButton>
          <Carousel
            showThumbs={false}
            infiniteLoop
            useKeyboardArrows
            dynamicHeight
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={`${baseUrl}${image.url}`}
                  alt={`Hotel ${name} - Image ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '80vh',
                    objectFit: 'contain',
                    background: '#222831'
                  }}
                />
              </div>
            ))}
          </Carousel>
        </Box>
      </Modal>
    </Box>
  );
};


export default HotelDetails;