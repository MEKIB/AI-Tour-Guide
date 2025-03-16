import React, { useState } from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // Correct import for antd styles
import { Box, Typography, TextField, Button } from '@mui/material'; // Import MUI components for styling

const images = [
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Lalibela",
    description: "Explore the ancient rock-hewn churches of Lalibela, a UNESCO World Heritage Site.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Lake Tana",
    description: "Discover the serene beauty of Lake Tana and its historic monasteries.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Gondar",
    description: "Visit the castles of Gondar, known as the 'Camelot of Africa'.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Simien Mountains",
    description: "Hike through the stunning landscapes of the Simien Mountains.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Danakil Depression",
    description: "Explore one of the hottest and lowest places on Earth.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Axum",
    description: "Discover the ancient obelisks and history of Axum.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Harar",
    description: "Experience the vibrant culture and ancient walls of Harar.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Blue Nile Falls",
    description: "Witness the majestic beauty of the Blue Nile Falls.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Bale Mountains",
    description: "Explore the unique wildlife and landscapes of the Bale Mountains.",
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: "Debre Damo",
    description: "Visit the ancient monastery of Debre Damo.",
  },
];

function HomeCarousel() {
  const [whereTo, setWhereTo] = useState('');
  const [when, setWhen] = useState('');
  const [showNearby, setShowNearby] = useState(false); // Controls visibility of "Nearby" option

  const handleSearch = () => {
    if (whereTo.toLowerCase() === 'nearby') {
      alert('Searching for places nearby...');
      // Add logic to search nearby places
    } else {
      alert(`Searching for places in ${whereTo} on ${when}`);
      // Add logic to search for a specific destination
    }
  };

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

            {/* Compact Search Bar */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: '500px',
                backgroundColor: 'rgba(57, 62, 70, 0.8)', // #393E46 with opacity
                padding: '15px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'slideIn 1s ease-in-out', // Animation for search bar
              }}
            >
              {/* Where Input */}
              <Box sx={{ flex: 2, position: 'relative' }}>
                <TextField
                  fullWidth
                  placeholder="Where to?"
                  value={whereTo}
                  onChange={(e) => setWhereTo(e.target.value)}
                  onFocus={() => setShowNearby(true)}
                  onBlur={() => setTimeout(() => setShowNearby(false), 200)} // Delay to allow clicking "Nearby"
                  sx={{
                    bgcolor: '#EEEEEE',
                    borderRadius: '4px',
                  }}
                />
                {/* Nearby Option */}
                {showNearby && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: '#EEEEEE',
                      borderRadius: '4px',
                      marginTop: '5px',
                      padding: '10px',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#DDDDDD' },
                    }}
                    onClick={() => setWhereTo('Nearby')}
                  >
                    <Typography variant="body1" sx={{ color: '#222831' }}>
                      Nearby
                    </Typography>
                  </Box>
                )}
              </Box>
              {/* When Input */}
              <TextField
                fullWidth
                type="date"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                sx={{
                  bgcolor: '#EEEEEE',
                  borderRadius: '4px',
                  flex: 1,
                }}
              />
              {/* Search Button */}
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  bgcolor: '#00ADB5',
                  color: '#EEEEEE',
                  '&:hover': { bgcolor: '#0097A7' },
                  flex: 1,
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
        ))}
      </Carousel>

      {/* Define the fadeIn and slideIn animations */}
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
          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translate(-50%, -60%);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default HomeCarousel;