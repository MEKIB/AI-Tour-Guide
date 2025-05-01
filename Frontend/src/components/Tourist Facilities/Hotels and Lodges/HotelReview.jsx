import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HotelReviews = ({ hotelAdminId }) => {
  const [openReviews, setOpenReviews] = useState(false);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const [existingReviewId, setExistingReviewId] = useState(null);
  const [openLoginPrompt, setOpenLoginPrompt] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:2000';

  const handleOpenReviews = async () => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('HotelReviews.js: handleOpenReviews - token:', token);
    console.log('HotelReviews.js: handleOpenReviews - storedUser:', storedUser);

    const isLoggedIn = !!token;
    if (!isLoggedIn) {
      console.log('HotelReviews.js: handleOpenReviews - No token found, opening login prompt');
      setOpenLoginPrompt(true);
      return;
    }

    try {
      console.log('HotelReviews.js: handleOpenReviews - Fetching review for hotelAdminId:', hotelAdminId);
      const response = await axios.get(
        `${baseUrl}/api/reviews/user/${hotelAdminId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('HotelReviews.js: handleOpenReviews - API response:', response.data);

      if (response.data.data) {
        const existingReview = response.data.data;
        setNewReview({
          user: existingReview.user,
          rating: existingReview.rating,
          comment: existingReview.comment,
        });
        setExistingReviewId(existingReview._id);
        console.log('HotelReviews.js: handleOpenReviews - Existing review found:', existingReview);
      } else {
        console.log('HotelReviews.js: handleOpenReviews - No existing review found');
      }
    } catch (error) {
      console.error('HotelReviews.js: handleOpenReviews - Error fetching review:', error);
      console.log('HotelReviews.js: handleOpenReviews - Error response:', error.response?.data);
      if (error.response?.status === 401) {
        console.log('HotelReviews.js: handleOpenReviews - Invalid token, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setOpenLoginPrompt(true);
      } else if (error.response?.status !== 404) {
        console.error('HotelReviews.js: handleOpenReviews - Unexpected error:', error.message);
      }
    }
    setOpenReviews(true);
  };

  const handleCloseReviews = () => {
    setOpenReviews(false);
    setNewReview({ user: '', rating: 0, comment: '' });
    setExistingReviewId(null);
    console.log('HotelReviews.js: handleCloseReviews - Closed review dialog');
  };

  const handleReviewSubmit = async () => {
    if (!newReview.comment.trim() || newReview.rating === 0) {
      console.log('HotelReviews.js: handleReviewSubmit - Invalid review data:', newReview);
      setSnackbarMessage('Please provide a rating and comment.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const token = localStorage.getItem('token');
    console.log('HotelReviews.js: handleReviewSubmit - token:', token);
    console.log('HotelReviews.js: handleReviewSubmit - Submitting review:', newReview);

    try {
      const reviewData = {
        hotelAdminId,
        user: newReview.user || 'Anonymous',
        rating: newReview.rating,
        comment: newReview.comment,
      };

      if (existingReviewId) {
        console.log('HotelReviews.js: handleReviewSubmit - Updating review with ID:', existingReviewId);
        const response = await axios.put(
          `${baseUrl}/api/reviews/${existingReviewId}`,
          reviewData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('HotelReviews.js: handleReviewSubmit - Update response:', response.data);
        setSnackbarMessage('Review updated successfully!');
        setSnackbarSeverity('success');
      } else {
        console.log('HotelReviews.js: handleReviewSubmit - Creating new review');
        const response = await axios.post(
          `${baseUrl}/api/reviews`,
          reviewData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('HotelReviews.js: handleReviewSubmit - Create response:', response.data);
        setSnackbarMessage('Review submitted successfully!');
        setSnackbarSeverity('success');
      }

      setSnackbarOpen(true);
      handleCloseReviews();
    } catch (error) {
      console.error('HotelReviews.js: handleReviewSubmit - Review submission failed:', error);
      console.log('HotelReviews.js: handleReviewSubmit - Error response:', error.response?.data);
      if (error.response?.status === 401) {
        console.log('HotelReviews.js: handleReviewSubmit - Invalid token, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setOpenLoginPrompt(true);
        setSnackbarMessage('Session expired. Please log in again.');
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage(error.response?.data?.message || 'Failed to submit review.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    }
  };

  const handleCloseLoginPrompt = () => {
    setOpenLoginPrompt(false);
    console.log('HotelReviews.js: handleCloseLoginPrompt - Closed login prompt');
  };

  const handleLoginRedirect = () => {
    handleCloseLoginPrompt();
    navigate('/login');
    console.log('HotelReviews.js: handleLoginRedirect - Redirecting to login');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    console.log('HotelReviews.js: handleSnackbarClose - Closed snackbar');
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#222831', color: '#EEEEEE' }}>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2, color: '#00ADB5', borderColor: '#00ADB5' }}
        onClick={handleOpenReviews}
      >
        {existingReviewId ? 'Edit Review' : 'Add Review'}
      </Button>

      <Dialog open={openReviews} onClose={handleCloseReviews} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#393E46', color: '#EEEEEE' }}>
          <Typography variant="h5">{existingReviewId ? 'Edit Your Review' : 'Add Your Review'}</Typography>
          <IconButton onClick={handleCloseReviews}>
            <CloseIcon sx={{ color: '#EEEEEE' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#393E46', color: '#EEEEEE' }}>
          <Box sx={{ p: 2, border: `1px solid #00ADB5`, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Share Your Experience
            </Typography>
            <TextField
              fullWidth
              label="Your Name (optional)"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              sx={{ mb: 2, bgcolor: '#222831', color: '#EEEEEE', input: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
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
              sx={{ mb: 2, bgcolor: '#222831', color: '#EEEEEE', input: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
            />
            <Button
              variant="contained"
              onClick={handleReviewSubmit}
              disabled={!newReview.comment.trim() || newReview.rating === 0}
              sx={{ bgcolor: '#00ADB5', color: '#EEEEEE', '&:hover': { bgcolor: '#00838F' } }}
            >
              {existingReviewId ? 'Update Review' : 'Submit Review'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openLoginPrompt} onClose={handleCloseLoginPrompt}>
        <DialogTitle sx={{ bgcolor: '#393E46', color: '#EEEEEE' }}>
          Login Required
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#393E46', color: '#EEEEEE' }}>
          <Typography>
            You need to be logged in to add or edit a review. Please log in to continue.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#393E46' }}>
          <Button onClick={handleCloseLoginPrompt} sx={{ color: '#EEEEEE' }}>
            Cancel
          </Button>
          <Button
            onClick={handleLoginRedirect}
            variant="contained"
            sx={{ bgcolor: '#00ADB5', color: '#EEEEEE', '&:hover': { bgcolor: '#00838F' } }}
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HotelReviews;