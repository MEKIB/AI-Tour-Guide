import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Tour Guide
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Link href="/" color="inherit" underline="none">
              Home
            </Link>
            <Link href="/about" color="inherit" underline="none">
              About
            </Link>
            <Link href="/contact" color="inherit" underline="none">
              Contact
            </Link>
            <Link href="/booking" color="inherit" underline="none">
              Booking
            </Link>
            <Link href="/account" color="inherit" underline="none">
              Account
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}