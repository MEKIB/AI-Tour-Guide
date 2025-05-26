import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { Delete, Close } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css'; // Slick styles
import 'slick-carousel/slick/slick-theme.css'; // Slick theme

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedHotelImages, setSelectedHotelImages] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const navigate = useNavigate();
  const BACKEND_API_URL = 'http://localhost:2000';

  // Decode JWT token to check role
  const getUserRole = (token) => {
    console.log('Decoding token:', token); // Debug
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded payload:', payload); // Debug
      return payload.role;
    } catch (error) {
      console.error('Error decoding token:', error.message); // Debug
      return null;
    }
  };

  // Fetch hotels from backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        console.log('Starting fetchHotels'); // Debug
        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token); // Debug

        if (!token) {
          console.log('No token found'); // Debug
          setNotification({
            open: true,
            message: 'Please log in to view hotels',
            severity: 'error',
          });
          navigate('/admin/login');
          return;
        }

        const role = getUserRole(token);
        console.log('User role:', role); // Debug
        if (role !== 'admin' && role !== 'system-admin') {
          console.log('Non-admin user detected'); // Debug
          setNotification({
            open: true,
            message: 'Admin access required',
            severity: 'error',
          });
          navigate('/');
          return;
        }

        console.log('Sending GET request to:', `${BACKEND_API_URL}/api/hotels`); // Debug
        const response = await axios.get(`${BACKEND_API_URL}/api/hotels`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API response:', response.data); // Debug
        const fetchedHotels = Array.isArray(response.data.data) ? response.data.data : [];
        console.log('Hotels fetched:', fetchedHotels); // Debug
        setHotels(fetchedHotels);
      } catch (error) {
        console.error('Fetch error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        }); // Debug
        setNotification({
          open: true,
          message: error.response?.data?.message || 'Failed to fetch hotels',
          severity: 'error',
        });
        setHotels([]);
        if (error.response?.status === 401) {
          console.log('401 Unauthorized, redirecting to login'); // Debug
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setNotification({
            open: true,
            message: 'Session expired. Please log in again.',
            severity: 'error',
          });
          navigate('/admin/login');
        }
      }
    };
    fetchHotels();
  }, [navigate]);

  // Open delete confirmation dialog
  const openDeleteDialog = (hotel) => {
    console.log('Opening delete dialog for hotel:', hotel.name); // Debug
    setHotelToDelete(hotel);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    console.log('Closing delete dialog'); // Debug
    setHotelToDelete(null);
    setDeleteDialogOpen(false);
  };

  // Delete hotel
  const deleteHotel = async () => {
    try {
      console.log('Deleting hotel:', hotelToDelete.name, 'ID:', hotelToDelete._id); // Debug
      const token = localStorage.getItem('token');
      console.log('Token for delete:', token); // Debug

      if (!token) {
        console.log('No token for delete'); // Debug
        setNotification({
          open: true,
          message: 'Please log in to perform this action',
          severity: 'error',
        });
        navigate('/admin/login');
        return;
      }

      console.log('Sending DELETE request to:', `${BACKEND_API_URL}/api/hotels/${hotelToDelete._id}`); // Debug
      await axios.delete(`${BACKEND_API_URL}/api/hotels/${hotelToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Hotel deleted successfully'); // Debug
      setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== hotelToDelete._id));
      setNotification({
        open: true,
        message: `Hotel ${hotelToDelete.name} deleted successfully.`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Delete error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      }); // Debug
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Failed to delete hotel',
        severity: 'error',
      });
      if (error.response?.status === 401) {
        console.log('401 Unauthorized on delete, redirecting'); // Debug
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setNotification({
          open: true,
          message: 'Session expired. Please log in again.',
          severity: 'error',
        });
        navigate('/admin/login');
      }
    } finally {
      closeDeleteDialog();
    }
  };

  // Open image slider dialog
  const openImageDialog = (images) => {
    console.log('Opening image dialog for images:', images); // Debug
    setSelectedHotelImages(images || []);
    setImageDialogOpen(true);
  };

  // Close image slider dialog
  const closeImageDialog = () => {
    console.log('Closing image dialog'); // Debug
    setSelectedHotelImages([]);
    setImageDialogOpen(false);
  };

  // Close notification
  const handleCloseNotification = () => {
    console.log('Closing notification'); // Debug
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Filter hotels based on search query
  const filteredHotels = Array.isArray(hotels)
    ? hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  console.log('Filtered hotels:', filteredHotels.length); // Debug

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };

  return (
    <Box
      sx={{
        padding: 3,
        background: '#222831',
        minHeight: '100vh',
        color: '#EEEEEE',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: '#00ADB5', fontWeight: 'bold' }}>
        Hotel Management
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search hotels by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          mb: 3,
          background: '#393E46',
          borderRadius: 1,
          '& .MuiInputBase-input': {
            color: '#EEEEEE',
          },
          '& .MuiInputLabel-root': {
            color: '#EEEEEE',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#00ADB5',
            },
            '&:hover fieldset': {
              borderColor: '#00ADB5',
            },
          },
        }}
      />

      {/* Hotel Table */}
      <TableContainer component={Paper} sx={{ background: '#393E46', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Hotel Admin ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Facility Type</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Latitude</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Longitude</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Images</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHotels.map((hotel) => (
              <TableRow key={hotel._id}>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel._id}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.HotelAdminId}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.name}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.location}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.facilityType}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.description}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.lat}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.long}</TableCell>
              <TableCell sx={{ color: '#EEEEEE' }}>
  {hotel.images && hotel.images.length > 0 ? (
    <Box
      sx={{
        position: 'relative',
        width: 60,
        height: 60,
        cursor: 'pointer',
      }}
      onClick={() => openImageDialog(hotel.images.map(img => ({
        ...img,
        url: `http://localhost:2000${img.url}`
      })))}
    >
      <img
        src={`http://localhost:2000${hotel.images[0].url}`}
        alt={hotel.images[0].name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 4,
        }}
      />
      {hotel.images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#EEEEEE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          +{hotel.images.length - 1}
        </Box>
      )}
    </Box>
  ) : (
    'No images'
  )}
</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => openDeleteDialog(hotel)}
                    startIcon={<Delete />}
                    sx={{
                      bgcolor: '#00ADB5',
                      color: '#EEEEEE',
                      '&:hover': { bgcolor: '#0097A7' },
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#393E46',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#393E46',
            color: '#00ADB5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Delete Hotel
          </Typography>
          <Button
            onClick={closeDeleteDialog}
            sx={{
              minWidth: 0,
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Close />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#393E46', color: '#EEEEEE', py: 2 }}>
          <Typography sx={{ color: '#EEEEEE' }}>
            Are you sure you want to delete {hotelToDelete?.name}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#393E46', py: 1.5 }}>
          <Button
            onClick={closeDeleteDialog}
            sx={{
              border: '1px solid #00ADB5',
              color: '#00ADB5',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 173, 181, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteHotel}
            sx={{
              backgroundColor: '#00ADB5',
              color: '#EEEEEE',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#0097A7',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Slider Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={closeImageDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#393E46',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#393E46',
            color: '#00ADB5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Hotel Images
          </Typography>
          <Button
            onClick={closeImageDialog}
            sx={{
              minWidth: 0,
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Close />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#393E46', py: 2 }}>
          {selectedHotelImages.length > 0 ? (
            <Slider {...sliderSettings}>
              {selectedHotelImages.map((img, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <img
                    src={img.url}
                    alt={img.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '500px',
                      objectFit: 'contain',
                      borderRadius: 8,
                      margin: '0 auto',
                    }}
                  />
                  <Typography sx={{ color: '#EEEEEE', mt: 1 }}>{img.name}</Typography>
                </Box>
              ))}
            </Slider>
          ) : (
            <Typography sx={{ color: '#EEEEEE' }}>No images available</Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HotelManagement;