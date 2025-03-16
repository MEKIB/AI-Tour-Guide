import React from 'react';
import { Box, Typography } from '@mui/material';

// New high-quality image from Unsplash
const heroImage = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

const HeroImage = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '300px', sm: '400px', md: '500px' }, // Responsive height
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Hotels and Lodges"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))', // Dark gradient overlay
        }}
      />

      {/* Centered Text */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          zIndex: 1,
          width: '100%',
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', // Stronger shadow for better readability
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // Responsive font size
          }}
        >
          Hotels and Lodges
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)', // Subtle shadow for subtext
            fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' }, // Responsive font size
          }}
        >
          Discover the Best Stays in Bahir Dar
        </Typography>
      </Box>

      {/* Bottom Gradient */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '60px',
          background: 'linear-gradient(rgba(0, 0, 0, 0.2), transparent)',
        }}
      />
    </Box>
  );
};

export default HeroImage;