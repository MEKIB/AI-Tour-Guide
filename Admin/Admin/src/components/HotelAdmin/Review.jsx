import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Rating,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Review = () => {
  const { hotelAdminId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${hotelAdminId}`);
        // Ensure reviews is always an array
        const fetchedReviews = Array.isArray(response.data.data) ? response.data.data : [];
        console.log('API response:', response.data); // Debug log
        setReviews(fetchedReviews);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [hotelAdminId]);

  // Calculate the total rating (average of all reviews)
  const totalRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
      : 0;

  // Total number of reviews
  const totalReviews = reviews.length;

  if (loading) {
    return (
      <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Typography variant="h6">Loading reviews...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Hotel Reviews
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating
            value={totalRating}
            precision={0.1}
            readOnly
            size="medium"
          />
          <Typography variant="body1" sx={{ color: '#777' }}>
            ({totalRating.toFixed(1)}) · {totalReviews} reviews
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#555' }}>
          Customer Reviews
        </Typography>
        {reviews.length === 0 ? (
          <Typography variant="body1" sx={{ color: '#777', textAlign: 'center' }}>
            No reviews available.
          </Typography>
        ) : (
          <List>
            {reviews.map((review) => (
              <React.Fragment key={review._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={review.user} src="/images/avatar.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {review.user || 'Anonymous'}
                        </Typography>
                        <Rating value={review.rating || 0} precision={0.5} readOnly />
                        <Typography variant="body2" sx={{ color: '#777' }}>
                          ({review.rating || 0})
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                          {review.comment || 'No comment provided'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#777', display: 'block', mt: 1 }}>
                          Reviewed on {review.date ? new Date(review.date).toLocaleDateString() : 'Unknown date'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default Review;