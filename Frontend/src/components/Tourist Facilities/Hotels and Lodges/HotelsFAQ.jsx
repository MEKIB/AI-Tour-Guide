import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HotelFAQs = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        FAQs about AYA Addis Hotel
      </Typography>

      <Grid container spacing={3}>
        {/* Left Side: Four Accordions */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant="subtitle1" fontWeight="bold">What kind of breakfast is served at AYA Addis Hotel?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  A buffet breakfast with a variety of continental and local dishes is served.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                <Typography variant="subtitle1" fontWeight="bold">What type of room can I book at AYA Addis Hotel?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  We offer Standard Rooms, Deluxe Rooms, and Suites with varying amenities.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                <Typography variant="subtitle1" fontWeight="bold">What are the check-in and check-out times at AYA Addis Hotel?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Check-in: From 14:00 to 00:00. Check-out: From 07:00 to 12:00.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper elevation={2} sx={{ p: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                <Typography variant="subtitle1" fontWeight="bold">How much does it cost to stay at AYA Addis Hotel?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Prices vary based on dates and room type. Please check our booking page for current rates.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        {/* Right Side: Four Accordions */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
                <Typography variant="subtitle1" fontWeight="bold">Does AYA Addis Hotel have a restaurant on site?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Yes, we have an on-site restaurant serving breakfast, lunch, and dinner.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6a-content" id="panel6a-header">
                <Typography variant="subtitle1" fontWeight="bold">What is there to do at AYA Addis Hotel?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  We offer a fitness center, spa, and tour booking services.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel7a-content" id="panel7a-header">
                <Typography variant="subtitle1" fontWeight="bold">How far is AYA Addis Hotel from the centre of Addis Ababa?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  We are located approximately 5 kilometers from the city center.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper elevation={2} sx={{ p: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel8a-content" id="panel8a-header">
                <Typography variant="subtitle1" fontWeight="bold">Is AYA Addis Hotel popular with families?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Yes, we offer family-friendly amenities and services.
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