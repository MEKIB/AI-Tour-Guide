import React from 'react';
import { Box, Typography, Link, Grid, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '2rem 0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>About</Typography>
            <Link href="#" color="inherit" underline="hover">The Bureau</Link><br />
            <Link href="#" color="inherit" underline="hover">Our Management</Link><br />
            <Link href="#" color="inherit" underline="hover">Mandate and Responsibility</Link><br />
            <Link href="#" color="inherit" underline="hover">Archive (Publication)</Link><br />
            <Typography variant="body2" sx={{ mt: 1 }}>Follow us</Typography> {/* "Follow us" text */}
            <Box sx={{ display: 'flex' }}>
              <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
                <YouTubeIcon />
              </Link>
              <Link href="#" color="inherit" underline="none">
                <InstagramIcon />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Destinations</Typography>
            <Link href="#" color="inherit" underline="hover">World Heritage Sites</Link><br />
            <Link href="#" color="inherit" underline="hover">National Parks and Community Protected Area</Link><br />
            <Link href="#" color="inherit" underline="hover">Lakes, Hot Springs and Waterfalls</Link><br />
            <Link href="#" color="inherit" underline="hover">Religious Sites</Link><br />
            <Link href="#" color="inherit" underline="hover">Historical Landmarks</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Things to do</Typography>
            <Link href="#" color="inherit" underline="hover">Hiking and Trekking</Link><br />
            <Link href="#" color="inherit" underline="hover">Bird Watching</Link><br />
            <Link href="#" color="inherit" underline="hover">Fishing</Link><br />
            <Link href="#" color="inherit" underline="hover">Biking</Link><br />
            <Link href="#" color="inherit" underline="hover">Horseback Riding</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Contact us</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Kebele 16, Bahir Dar, Ethiopia</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                +251 582221050<br />
                +251 582201133<br />
                +251 582202650<br />
                +251 582221834
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                amhtour@ethionet.et<br />
                tourismarketing56@gmail.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;