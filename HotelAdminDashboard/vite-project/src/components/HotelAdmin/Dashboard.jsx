import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hotel Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Profile Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Management
              </Typography>
              <Typography variant="body2" gutterBottom>
                Update your hotel's profile, description, and images.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/hotel-admin/profile"
              >
                Manage Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Room Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Room Management
              </Typography>
              <Typography variant="body2" gutterBottom>
                Add, update, or remove room types and rates.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/hotel-admin/rooms"
              >
                Manage Rooms
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Booking Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Booking Management
              </Typography>
              <Typography variant="body2" gutterBottom>
                View and manage bookings made through the platform.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/hotel-admin/bookings"
              >
                Manage Bookings
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;