import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ userRole, userEmail, userName, setUserRole, collapsed, onToggleSidebar }) => {
  const navigate = useNavigate();

  console.log('Navbar props:', { userRole, userEmail, userName }); // Debug props

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  const dashboardTitle =
    userRole === 'system-admin'
      ? 'System Admin Dashboard'
      : userRole === 'hotel-admin'
      ? 'Hotel Admin Dashboard'
      : 'AI-Based Touring Guide System';

  const handleTitleClick = () => {
    if (!userRole) {
      navigate('/');
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: '#393E46',
        boxShadow: 3,
      }}
    >
      <Toolbar>
        {userRole && (
          <IconButton
            color="inherit"
            onClick={onToggleSidebar}
            sx={{ mr: 2, color: '#F37199' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          onClick={handleTitleClick}
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#00ADB5',
            cursor: !userRole ? 'pointer' : 'default',
          }}
        >
          {dashboardTitle}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {userRole ? (
            <>
              <Typography variant="body1" sx={{ mr: 2, color: '#EEEEEE' }}>
                Welcome, {userName || userEmail || 'User'}
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
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#EEEEEE' }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;