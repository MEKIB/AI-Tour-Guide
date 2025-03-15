import React from 'react';
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

const Review = () => {
  // Sample reviews data (replace with actual data from your backend or context)
  const reviews = [
    {
      id: 1,
      user: 'Alice Johnson',
      rating: 4.5,
      comment: 'Great hotel with excellent service! The view from the room was amazing.',
      date: '2023-10-01',
    },
    {
      id: 2,
      user: 'Bob Smith',
      rating: 3.8,
      comment: 'Good experience overall, but the breakfast could be better.',
      date: '2023-09-25',
    },
    {
      id: 3,
      user: 'Charlie Brown',
      rating: 5,
      comment: 'Absolutely fantastic! Will definitely come back.',
      date: '2023-09-20',
    },
  ];

  // Calculate the total rating (average of all reviews)
  const totalRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Total number of reviews
  const totalReviews = reviews.length;

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hotel Reviews Header with Total Rating and Total Reviews */}
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
        {/* Review List */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#555' }}>
          Customer Reviews
        </Typography>
        <List>
          {reviews.map((review) => (
            <React.Fragment key={review.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={review.user} src="/images/avatar.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {review.user}
                      </Typography>
                      <Rating value={review.rating} precision={0.5} readOnly />
                      <Typography variant="body2" sx={{ color: '#777' }}>
                        ({review.rating})
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                        {review.comment}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#777', display: 'block', mt: 1 }}>
                        Reviewed on {review.date}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Review;