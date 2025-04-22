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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HotelReviews = ({ hotelAdminId }) => {
  const [openReviews, setOpenReviews] = useState(false);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const [existingReviewId, setExistingReviewId] = useState(null);
  const [openLoginPrompt, setOpenLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:2000';

  const handleOpenReviews = async () => {
    const isLoggedIn = !!localStorage.getItem('token');
    if (!isLoggedIn) {
      setOpenLoginPrompt(true);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${baseUrl}/api/reviews/user/${hotelAdminId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.data) {
        const existingReview = response.data.data;
        setNewReview({
          user: existingReview.user,
          rating: existingReview.rating,
          comment: existingReview.comment,
        });
        setExistingReviewId(existingReview._id);
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error fetching review:', error);
      }
    }
    setOpenReviews(true);
  };

  const handleCloseReviews = () => {
    setOpenReviews(false);
    setNewReview({ user: '', rating: 0, comment: '' });
    setExistingReviewId(null);
  };

  const handleReviewSubmit = async () => {
    if (!newReview.comment.trim() || newReview.rating === 0) return;

    try {
      const token = localStorage.getItem('token');
      const reviewData = {
        hotelAdminId,
        user: newReview.user || 'Anonymous',
        rating: newReview.rating,
        comment: newReview.comment,
      };

      if (existingReviewId) {
        await axios.put(
          `${baseUrl}/api/reviews/${existingReviewId}`,
          reviewData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${baseUrl}/api/reviews`,
          reviewData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      handleCloseReviews();
    } catch (error) {
      console.error('Review submission failed:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  };

  const handleCloseLoginPrompt = () => setOpenLoginPrompt(false);
  const handleLoginRedirect = () => {
    handleCloseLoginPrompt();
    navigate('/login');
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
    </Box>
  );
};

export default HotelReviews;