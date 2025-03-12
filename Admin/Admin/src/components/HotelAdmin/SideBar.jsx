import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Person as ProfileIcon,
  Hotel as RoomIcon,
  Book as BookingIcon,
  LocalOffer as PromotionIcon,
  RateReview as ReviewIcon,
} from '@mui/icons-material';

const SideBar = () => {
  return (
    <Drawer
      variant="permanent" // Fix the Sidebar on the left
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#393E46', // Dark background for Sidebar
          color: '#EEEEEE', // Light text for Sidebar
          position: 'fixed', // Fix the Sidebar
          top: 64, // Adjust top position to account for Navbar height
        },
      }}
    >
      <List>
        {/* Dashboard */}
        {/* <ListItem button component={Link} to="/hotel-admin-dashboard">
          <ListItemIcon>
            <HomeIcon sx={{ color: '#00ADB5' }} /> 
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem> */}

        {/* Profile Management */}
        <ListItem button component={Link} to="/hotel-admin-dashboard/profile">
          <ListItemIcon>
            <ProfileIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Profile Management" />
        </ListItem>

        {/* Room Management */}
        <ListItem button component={Link} to="/hotel-admin-dashboard/rooms">
          <ListItemIcon>
            <RoomIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Room Management" />
        </ListItem>

        {/* Booking Management */}
        <ListItem button component={Link} to="/hotel-admin-dashboard/bookings">
          <ListItemIcon>
            <BookingIcon  sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Booking Management" />
        </ListItem>

        {/* Booking Check */}
        <ListItem button component={Link} to="/hotel-admin-dashboard/check-booking">
          <ListItemIcon>
            <BookingIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Booking Check" />
        </ListItem>

        {/* Promotions */}
        <ListItem button component={Link} to="/hotel-admin-dashboard/promotions">
          <ListItemIcon>
            <PromotionIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Promotions" />
        </ListItem>

        {/* Reviews */}
        <ListItem button component={Link} to="/hotel-admin-dashboard/reviews">
          <ListItemIcon>
            <ReviewIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Reviews" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;