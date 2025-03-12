import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import SideBar from './SideBar'; // Ensure the import path is correct

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#393E46', minHeight: '100vh' }}>
      {/* Sidebar */}
 

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#393E46', // Dark background
          color: '#EEEEEE', // Light text
          marginRight: '240px', // Adjust for the SideBar width
        }}
      >
    
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#393E46', // Darker background for cards
                color: '#EEEEEE', // Light text
                borderRadius: 2,
                boxShadow: 3,
                height: '100%',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00ADB5' }}>
                Total Rooms
              </Typography>
              <Typography variant="h4">123</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#393E46',
                color: '#EEEEEE',
                borderRadius: 2,
                boxShadow: 3,
                height: '100%',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00ADB5' }}>
                Bookings
              </Typography>
              <Typography variant="h4">45</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#393E46',
                color: '#EEEEEE',
                borderRadius: 2,
                boxShadow: 3,
                height: '100%',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00ADB5' }}>
                Revenue
              </Typography>
              <Typography variant="h4">$5,678</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;