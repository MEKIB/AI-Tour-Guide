import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // Correct import for antd styles
import lalibela from '../../../assets/lalibela-1.jpg';
import laketana from '../../../assets/lake_tana.jpg';
import gonder from '../../../assets/Gondar-1.jpg';
import { Box, Typography } from '@mui/material'; // Import MUI components for styling

const images = [
  {
    src: lalibela,
    title: "Lalibela",
    description: "Explore the ancient rock-hewn churches of Lalibela, a UNESCO World Heritage Site.",
  },
  {
    src: laketana,
    title: "Lake Tana",
    description: "Discover the serene beauty of Lake Tana and its historic monasteries.",
  },
  {
    src: gonder,
    title: "Gondar",
    description: "Visit the castles of Gondar, known as the 'Camelot of Africa'.",
  },
];

function HomeCarousel() {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      <Carousel autoplay effect="fade" dots={true} dotPosition="bottom">
        {images.map((image, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100%', height: '500px' }}>
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }} // Fallback image
            />
            {/* Caption Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                backgroundColor: 'rgba(34, 40, 49, 0.7)', // #222831 with opacity
                color: '#EEEEEE', // Text color
                textAlign: 'center',
                animation: 'fadeIn 1.5s ease-in-out', // Animation for caption
              }}
            >
              <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: '10px' }}>
                {image.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
                {image.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>

      {/* Define the fadeIn animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default HomeCarousel;