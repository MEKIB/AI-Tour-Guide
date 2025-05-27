import React, { useState } from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css';
import { Box, Typography, TextField, Button } from '@mui/material';

// Import local images with unique names
import bahirdarImage1 from '../../../assets/homepage/bahirdar.jpg';
import gonderImage1 from '../../../assets/homepage/gonder.jpg';
import fallbackImage from '../../../assets/homepage/gonder1.jpg';
import gonderImage2 from '../../../assets/homepage/gonder2.jpg';
import lalibelaImage1 from '../../../assets/homepage/lalibela.jpg';
import lalibelaImage2 from '../../../assets/homepage/lalibela1.jpg';
import lalibelaImage3 from '../../../assets/homepage/lalibela2.jpg';
import tanaImage1 from '../../../assets/homepage/tana.jpg';
import tanaImage2 from '../../../assets/homepage/tana1.jpg';
import tisabayImage1 from '../../../assets/homepage/tisabay.jpg';
import tisabayImage2 from '../../../assets/homepage/tisabay1.jpg';
import tisabayImage3 from '../../../assets/homepage/tisabay2.jpg';

const images = [
  {
    src: lalibelaImage1,
    title: 'Lalibela',
    description: 'Explore the ancient rock-hewn churches of Lalibela, a UNESCO World Heritage Site.',
  },
  {
    src: tanaImage1,
    title: 'Lake Tana',
    description: 'Discover the serene beauty of Lake Tana and its historic monasteries.',
  },
  {
    src: gonderImage1,
    title: 'Gondar',
    description: "Visit the castles of Gondar, known as the 'Camelot of Africa'.",
  },
  {
    src: gonderImage2,
    title: 'Gondar Castles',
    description: 'Another view of the historic castles in the city of Gondar.',
  },
  {
    src: lalibelaImage2,
    title: 'Lalibela Churches',
    description: 'More stunning views of Lalibela’s rock-hewn churches.',
  },
  {
    src: lalibelaImage3,
    title: 'Lalibela Heritage',
    description: 'Explore the spiritual and architectural heritage of Lalibela.',
  },
  {
    src: tanaImage2,
    title: 'Lake Tana Monasteries',
    description: 'Visit the historic monasteries on the islands of Lake Tana.',
  },
  {
    src: tisabayImage1,
    title: 'Blue Nile Falls',
    description: 'Witness the majestic beauty of the Blue Nile Falls at Tis Abay.',
  },
  {
    src: tisabayImage2,
    title: 'Tis Abay Falls',
    description: 'Another view of the stunning Blue Nile Falls.',
  },
  {
    src: tisabayImage3,
    title: 'Tis Abay Landscape',
    description: 'Explore the natural beauty surrounding Tis Abay.',
  },
  {
    src: bahirdarImage1,
    title: 'Bahir Dar',
    description: 'Experience the vibrant culture and lakeside charm of Bahir Dar.',
  },
 
];

function HomeCarousel() {
  const [whereTo, setWhereTo] = useState('');
  const [when, setWhen] = useState('');
  const [showNearby, setShowNearby] = useState(false);

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
              alt={image.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
            {/* Caption Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                backgroundColor: 'rgba(34, 40, 49, 0.7)',
                color: '#EEEEEE',
                textAlign: 'center',
                animation: 'fadeIn 1.5s ease-in-out',
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
                backgroundColor: 'rgba(57, 62, 70, 0.8)',
                padding: '15px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'slideIn 1s ease-in-out',
              }}
            >
              <Box sx={{ flex: 2, position: 'relative' }}>
                <TextField
                  fullWidth
                  placeholder="Where to?"
                  value={whereTo}
                  onChange={(e) => setWhereTo(e.target.value)}
                  onFocus={() => setShowNearby(true)}
                  onBlur={() => setTimeout(() => setShowNearby(false), 200)}
                  sx={{
                    bgcolor: '#EEEEEE',
                    borderRadius: '4px',
                  }}
                />
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