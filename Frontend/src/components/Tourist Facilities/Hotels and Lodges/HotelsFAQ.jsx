import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { keyframes } from '@emotion/react';

// Color Palette
const colors = {
  dark: '#222831', // Dark Gray
  mediumDark: '#393E46', // Medium Gray
  primary: '#00ADB5', // Teal
  light: '#EEEEEE', // Light Gray
  black: '#000000', // Black
};

// Animation for hover effect
const hoverAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const HotelFAQs = () => {
  return (
    <Box sx={{ p: 4, bgcolor: colors.black, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', mb: 4, color: colors.primary, fontWeight: 700, fontSize: '2.5rem' }}
      >
        Frequently Asked Questions
      </Typography>

      <Grid container spacing={3}>
        {/* Left Side: Four Accordions */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: '8px',
              bgcolor: colors.dark,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                animation: `${hoverAnimation} 0.5s ease`,
              },
            }}
          >
            <Accordion sx={{ bgcolor: colors.mediumDark }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.light}>
                  What kind of breakfast is served at AYA Addis Hotel?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color={colors.light}>
                  AYA Addis Hotel offers a delicious buffet breakfast with a wide variety of options, including continental dishes like pastries, cereals, and fresh fruits, as well as local Ethiopian specialties such as injera, ful, and shiro. Our breakfast is served daily from 6:30 AM to 10:00 AM in our on-site restaurant.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: '8px',
              bgcolor: colors.dark,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                animation: `${hoverAnimation} 0.5s ease`,
              },
            }}
          >
            <Accordion sx={{ bgcolor: colors.mediumDark }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.light}>
                  What type of room can I book at AYA Addis Hotel?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color={colors.light}>
                  We offer a range of room types to suit your needs:
                  <ul>
                    <li><strong>Standard Rooms:</strong> Comfortable and cozy, perfect for solo travelers or couples.</li>
                    <li><strong>Deluxe Rooms:</strong> Spacious with additional amenities like a mini-fridge and a sitting area.</li>
                    <li><strong>Suites:</strong> Luxurious accommodations with separate living and sleeping areas, ideal for families or business travelers.</li>
                  </ul>
                  All rooms are equipped with modern amenities, including free Wi-Fi, flat-screen TVs, and en-suite bathrooms.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: '8px',
              bgcolor: colors.dark,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                animation: `${hoverAnimation} 0.5s ease`,
              },
            }}
          >
            <Accordion sx={{ bgcolor: colors.mediumDark }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.light}>
                  What are the check-in and check-out times at AYA Addis Hotel?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color={colors.light}>
                  Check-in time is from <strong>14:00 to 00:00</strong>, and check-out time is from <strong>07:00 to 12:00</strong>. Early check-in or late check-out may be available upon request, subject to availability and additional charges.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: '8px',
              bgcolor: colors.dark,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                animation: `${hoverAnimation} 0.5s ease`,
              },
            }}
          >
            <Accordion sx={{ bgcolor: colors.mediumDark }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.light}>
                  How much does it cost to stay at AYA Addis Hotel?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color={colors.light}>
                  Room rates at AYA Addis Hotel vary depending on the season, room type, and availability. On average, prices range from <strong>$80 per night for Standard Rooms</strong> to <strong>$200 per night for Suites</strong>. For the most accurate pricing, please visit our booking page or contact our reservations team.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        {/* Right Side: Four Accordions */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: '8px',
              bgcolor: colors.dark,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                animation: `${hoverAnimation} 0.5s ease`,
              },
            }}
          >
            <Accordion sx={{ bgcolor: colors.mediumDark }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.light}>
                  Does AYA Addis Hotel have a restaurant on site?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color={colors.light}>
                  Yes, AYA Addis Hotel features an on-site restaurant that serves a variety of dishes throughout the day. Our menu includes international cuisine as well as traditional Ethiopian dishes. The restaurant is open for breakfast, lunch, and dinner, and room service is also available for guests who prefer to dine in the comfort of their rooms.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: '8px',
              bgcolor: colors.dark,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                animation: `${hoverAnimation} 0.5s ease`,
              },
            }}
          >
            <Accordion sx={{ bgcolor: colors.mediumDark }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.light}>
                  What is there to do at AYA Addis Hotel?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color={colors.light}>
                  AYA Addis Hotel offers a variety of amenities and activities for guests to enjoy, including:
                  <ul>
                    <li><strong>Fitness Center:</strong> Stay active with our fully equipped gym.</li>
                    <li><strong>Spa Services:</strong> Relax with a massage or facial treatment.</li>
                    <li><strong>Tour Booking:</strong> Explore Addis Ababa with our guided tours and excursions.</li>
                    <li><strong>Swimming Pool:</strong> Take a refreshing dip in our outdoor pool.</li>
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: '8px',
              bgcolor: colors.dark,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                animation: `${hoverAnimation} 0.5s ease`,
              },
            }}
          >
            <Accordion sx={{ bgcolor: colors.mediumDark }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                aria-controls="panel7a-content"
                id="panel7a-header"
              >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.light}>
                  How far is AYA Addis Hotel from the centre of Addis Ababa?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color={colors.light}>
                  AYA Addis Hotel is conveniently located just <strong>5 kilometers</strong> from the city center, making it easy to explore popular attractions such as the National Museum, Merkato, and Holy Trinity Cathedral. We also offer shuttle services for guests who need transportation to and from the city center.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: '8px',
              bgcolor: colors.dark,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                animation: `${hoverAnimation} 0.5s ease`,
              },
            }}
          >
            <Accordion sx={{ bgcolor: colors.mediumDark }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                aria-controls="panel8a-content"
                id="panel8a-header"
              >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.light}>
                  Is AYA Addis Hotel popular with families?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color={colors.light}>
                  Absolutely! AYA Addis Hotel is a family-friendly destination with amenities designed to make your stay comfortable and enjoyable. We offer:
                  <ul>
                    <li>Family rooms with extra beds.</li>
                    <li>A children’s play area.</li>
                    <li>Kid-friendly menu options at our restaurant.</li>
                    <li>Babysitting services upon request.</li>
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HotelFAQs;