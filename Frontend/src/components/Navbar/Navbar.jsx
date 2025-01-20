import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

export default function ButtonAppBar() {
  const [anchorElTourist, setAnchorElTourist] = useState(null);
  const [anchorElAbout, setAnchorElAbout] = useState(null);
  const [anchorElDestination, setAnchorElDestination] = useState(null);

  const handleOpenTourist = (event) => {
    setAnchorElTourist(event.currentTarget);
  };

  const handleCloseTourist = () => {
    setAnchorElTourist(null);
  };

  const handleOpenAbout = (event) => {
    setAnchorElAbout(event.currentTarget);
  };

  const handleCloseAbout = () => {
    setAnchorElAbout(null);
  };

  const handleOpenDestination = (event) => {
    setAnchorElDestination(event.currentTarget);
  };

  const handleCloseDestination = () => {
    setAnchorElDestination(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Tour Guide
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Link
              id="destination-button"
              aria-haspopup="true"
              aria-controls="destination-menu"
              onClick={handleOpenDestination}
              color="inherit"
              underline="none"
            >
              Destinations
            </Link>
            <Menu
              id="destination-menu"
              anchorEl={anchorElDestination}
              open={Boolean(anchorElDestination)}
              onClose={handleCloseDestination}
              MenuListProps={{
                'aria-labelledby': 'destination-button',
              }}
      
            >
              <MenuItem onClick={handleCloseDestination}>World Heritage Sites</MenuItem>
              <MenuItem onClick={handleCloseDestination}>National Parks and Community Protected Area</MenuItem>
              <MenuItem onClick={handleCloseDestination}>Lakes, Hot Springs and Water Falls</MenuItem>
              <MenuItem onClick={handleCloseDestination}>Religious Sites</MenuItem>
              <MenuItem onClick={handleCloseDestination}>Historical Landmarks</MenuItem>
            </Menu>
            <Link href="/" color="inherit" underline="none">
              Things to do
            </Link>
            <Link
              id="tourist-button"
              aria-haspopup="true"
              aria-controls="tourist-menu"
              onClick={handleOpenTourist}
              color="inherit"
              underline="none"
            >
              Tourist Facilities
            </Link>
            <Menu
              id="tourist-menu"
              anchorEl={anchorElTourist}
              open={Boolean(anchorElTourist)}
              onClose={handleCloseTourist}
              MenuListProps={{
                'aria-labelledby': 'tourist-button',
              }}
            >
              <MenuItem onClick={handleCloseTourist}>Flights</MenuItem>
              <MenuItem onClick={handleCloseTourist}>Hotels and Lodges</MenuItem>
              <MenuItem onClick={handleCloseTourist}>Tourist Information Centers</MenuItem>
              <MenuItem onClick={handleCloseTourist}>Other Service Providers</MenuItem>
            </Menu>
            <Link href="/" color="inherit" underline="none">
              Events
            </Link>
            <Link href="/" color="inherit" underline="none">
              News
            </Link>
            <Link
              id="about-button"
              aria-haspopup="true"
              aria-controls="about-menu"
              onClick={handleOpenAbout}
              color="inherit"
              underline="none"
            >
              About
            </Link>
            <Menu
              id="about-menu"
              anchorEl={anchorElAbout}
              open={Boolean(anchorElAbout)}
              onClose={handleCloseAbout}
              MenuListProps={{
                'aria-labelledby': 'about-button',
              }}
            >
              <MenuItem onClick={handleCloseAbout}>Amhara Region</MenuItem>
              <MenuItem onClick={handleCloseAbout}>The Bureau</MenuItem>
              <MenuItem onClick={handleCloseAbout}>Our Management</MenuItem>
              <MenuItem onClick={handleCloseAbout}>Mandate and Responsibility</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}