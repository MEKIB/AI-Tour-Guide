import React from 'react';
import { Box, Typography } from '@mui/material';
import heroImage from '../../../assets/Bahirdar.jpg' // Import your image

const HeroImage = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
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
        <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ textShadow: '2px 2px 4px #000000' }}>
          Hotels and Lodges
        </Typography>
      </Box>
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


// Example usage (in the SAME file):

const MyPage = () => {
  // No imageUrl variable here anymore! It's passed directly.
  return (
    <div>
      <HeroImage imageUrl={heroImage} /> {/* Pass the imported image */}
      <Typography variant="body1" sx={{p: 2}}>
        Welcome to our site! Explore a wide variety of hotels and lodges for your next adventure.
        We offer a curated selection of accommodations to suit every taste and budget.
      </Typography>
    </div>
  );
};

// ... (Rendering code remains the same)