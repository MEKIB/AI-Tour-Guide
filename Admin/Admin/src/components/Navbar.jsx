import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu Icon

const Navbar = ({ userRole, userEmail, userName, setUserRole, collapsed, onToggleSidebar }) => {
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
        {/* Menu Icon (only shown on dashboard pages) */}
        {userRole && (
          <IconButton
            color="inherit"
            onClick={onToggleSidebar} // Toggle sidebar state
            sx={{ mr: 2, color: '#00ADB5' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Dashboard Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.5rem', color: '#00ADB5' }} // Accent color
        >
          {dashboardTitle}
        </Typography>

        {/* User Info and Logout Button */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {userRole ? (
            <>
              <Typography variant="body1" sx={{ mr: 2, color: '#EEEEEE' }}>
                Welcome, {userName} {/* Display the user's name */}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#EEEEEE', bgcolor: '#00ADB5' }}
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