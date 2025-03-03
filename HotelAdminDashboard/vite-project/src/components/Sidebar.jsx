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

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItem button component={Link} to="/hotel-admin">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Profile Management */}
        <ListItem button component={Link} to="/hotel-admin/profile">
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="Profile Management" />
        </ListItem>

        {/* Room Management */}
        <ListItem button component={Link} to="/hotel-admin/rooms">
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText primary="Room Management" />
        </ListItem>

        {/* Booking Management */}
        <ListItem button component={Link} to="/hotel-admin/bookings">
          <ListItemIcon>
            <BookingIcon />
          </ListItemIcon>
          <ListItemText primary="Booking Management" />
        </ListItem>
        {/* Booking Management */}
        <ListItem button component={Link} to="/hotel-admin/check-booking">
          <ListItemIcon>
            <BookingIcon />
          </ListItemIcon>
          <ListItemText primary="Booking Check" />
        </ListItem>

        {/* Promotions */}
        <ListItem button component={Link} to="/hotel-admin/promotions">
          <ListItemIcon>
            <PromotionIcon />
          </ListItemIcon>
          <ListItemText primary="Promotions" />
        </ListItem>

        {/* Reviews */}
        <ListItem button component={Link} to="/hotel-admin/reviews">
          <ListItemIcon>
            <ReviewIcon />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;