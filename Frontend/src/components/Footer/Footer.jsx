import React from 'react';
import { Box, Typography, Link, Grid, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

// Global Styles
const titleStyle = {
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  color: '#000000',
  fontSize: '18px',
};

const linkStyle = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: '12.5px',
  fontWeight: 500,
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': { color: '#008dff', textDecoration: 'underline', fontStyle: 'italic' },
};

const socialIconStyle = {
  fontSize: '28px',
  marginRight: '10px',
  transition: 'transform 0.3s ease, color 0.3s ease',
};

// Hover effects for social media icons
const socialStyles = {
  facebook: {
    color: '#1877F2',
    '&:hover': { color: '#165db6', transform: 'scale(1.2)' },
  },
  twitter: {
    color: '#1DA1F2',
    '&:hover': { color: '#0d95e8', transform: 'scale(1.2)' },
  },
  youtube: {
    color: '#FF0000',
    '&:hover': { color: '#cc0000', transform: 'scale(1.2)' },
  },
  instagram: {
    color: '#C13584',
    '&:hover': { transform: 'scale(1.2)' }, // Slight enlargement for a gradient effect
  },
};

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#bbbbbb', padding: '2rem 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={titleStyle}>
              About
            </Typography>
            <Link href="#" sx={linkStyle}>The Bureau</Link><br />
            <Link href="#" sx={linkStyle}>Our Management</Link><br />
            <Link href="#" sx={linkStyle}>Mandate and Responsibility</Link><br />
            <Link href="#" sx={linkStyle}>Archive (Publication)</Link><br />
            <Typography variant="body2" sx={{ mt: 1 }}>Follow us</Typography>
            <Box sx={{ display: 'flex', mt: 1 }}>
              <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon sx={{ ...socialIconStyle, ...socialStyles.facebook }} />
              </Link>
              <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon sx={{ ...socialIconStyle, ...socialStyles.twitter }} />
              </Link>
              <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon sx={{ ...socialIconStyle, ...socialStyles.youtube }} />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon sx={{ ...socialIconStyle, ...socialStyles.instagram }} />
              </Link>
            </Box>
          </Grid>

          {/* Destinations Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={titleStyle}>
              Destinations
            </Typography>
            <Link href="#" sx={linkStyle}>World Heritage Sites</Link><br />
            <Link href="#" sx={linkStyle}>National Parks</Link><br />
            <Link href="#" sx={linkStyle}>Lakes, Hot Springs and Waterfalls</Link><br />
            <Link href="#" sx={linkStyle}>Religious Sites</Link><br />
            <Link href="#" sx={linkStyle}>Historical Landmarks</Link>
          </Grid>

          {/* Tourist Facilities Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={titleStyle}>
              Tourist Facilities
            </Typography>
            <Link href="#" sx={linkStyle}>Flights</Link><br />
            <Link href="#" sx={linkStyle}>Hotels and Lodges</Link><br />
            <Link href="#" sx={linkStyle}>Tourist Information Centers</Link><br />
            <Link href="#" sx={linkStyle}>Other Service Providers</Link><br />
            <Link href="#" sx={linkStyle}>Events</Link>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={titleStyle}>
              Contact us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Kebele 16, Bahir Dar, Ethiopia</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                <Link href="tel:+251910741033" sx={linkStyle}>+251 910741033</Link><br />
                <Link href="tel:+251991801262" sx={linkStyle}>+251 991801262</Link><br />
                <Link href="tel:+251902797710" sx={linkStyle}>+251 902797710</Link><br />
                <Link href="tel:+251905487849" sx={linkStyle}>+251 905487849</Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                <Link href="mailto:aitourguide@gmail.com" sx={linkStyle}>aitourguide@gmail.com</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
