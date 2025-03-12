import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userRole, userEmail, userName, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole(null); // Clear the user role
    navigate('/'); // Redirect to the home page
  };

  // Determine the dashboard title based on the user role
  const dashboardTitle = userRole === 'system-admin' 
    ? 'System Admin Dashboard' 
    : userRole === 'hotel-admin' 
    ? 'Hotel Admin Dashboard' 
    : 'AI-Based Touring Guide System';

  return (
    <AppBar
      position="fixed" // Fix the Navbar at the top
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure Navbar is above Sidebar
        bgcolor: '#393E46', // Darker background for Navbar
        boxShadow: 3,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.5rem', color: '#00ADB5' }} // Accent color
        >
          {dashboardTitle}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {userRole ? (
            <>
              <Typography variant="body1" sx={{ mr: 2, color: '#EEEEEE' }}>
                Welcome, {userName} {/* Display the user's name */}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#EEEEEE' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#EEEEEE' }}
              >
             
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;