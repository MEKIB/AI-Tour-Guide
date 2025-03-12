import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

// Animation for the hero text
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #222831, #393E46)', // Gradient background
        color: '#EEEEEE', // Light text
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'80px',
        marginLeft:'20px',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Hero Section */}
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', md: '2rem' }, // Reduced text size
              mb: 3,
              color: '#00ADB5', // Accent color for the heading
              animation: `${fadeIn} 1s ease-in-out`, // Fade-in animation
            }}
          >
            Welcome to Our Hotel Management System
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' }, // Reduced text size
              mb: 5,
              color: '#EEEEEE', // Light text
              opacity: 0.8,
              animation: `${fadeIn} 1.5s ease-in-out`, // Fade-in animation
            }}
          >
            Streamline your hotel operations with our powerful management tools
          </Typography>

          {/* Call to Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              mb: 8,
              animation: `${fadeIn} 2s ease-in-out`, // Fade-in animation
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: '#00ADB5',
                color: '#EEEEEE',
                '&:hover': { bgcolor: '#0097A7' },
                fontWeight: 'bold',
                fontSize: '0.875rem', // Reduced text size
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              Login 
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                borderColor: '#00ADB5',
                color: '#00ADB5',
                '&:hover': { borderColor: '#0097A7', color: '#0097A7' },
                fontWeight: 'bold',
                fontSize: '0.875rem', // Reduced text size
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Features Section */}
          <Grid
            container
            spacing={4}
            sx={{ mb: 8, animation: `${fadeIn} 2.5s ease-in-out` }} // Fade-in animation
          >
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#393E46', // Darker background for cards
                  color: '#EEEEEE', // Light text
                  borderRadius: 2,
                  boxShadow: 3,
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#00ADB5', fontSize: '1.25rem' }} // Reduced text size
                >
                  Easy Booking Management
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>
                  Manage reservations, check-ins, and check-outs seamlessly with our intuitive system.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#393E46',
                  color: '#EEEEEE',
                  borderRadius: 2,
                  boxShadow: 3,
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#00ADB5', fontSize: '1.25rem' }} // Reduced text size
                >
                  Real-Time Analytics
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>
                  Get insights into your hotel's performance with real-time data and reports.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#393E46',
                  color: '#EEEEEE',
                  borderRadius: 2,
                  boxShadow: 3,
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#00ADB5', fontSize: '1.25rem' }} // Reduced text size
                >
                  Multi-User Support
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>
                  Assign roles to your team and manage permissions for system admins and hotel admins.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Footer Section */}
          <Typography
  variant="body2"
  sx={{ color: '#EEEEEE', opacity: 0.7, mt: 4, fontSize: '0.75rem' }} // Reduced text size
>
  © {new Date().getFullYear()} Hotel Management System. All rights reserved.
</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;