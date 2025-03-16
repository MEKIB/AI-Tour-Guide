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
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#393E46',
          color: '#EEEEEE',
          position: 'fixed',
          top: 64,
        },
      }}
    >
      <List>
        {/* User Management */}
        <ListItem button component={Link} to="user-management">
          <ListItemIcon>
            <ProfileIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="User Management" />
        </ListItem>

        {/* Approve Hotel Admin */}
        <ListItem button component={Link} to="approve-hotel-admin">
          <ListItemIcon>
            <ProfileIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Approve Hotel Admin" />
        </ListItem>

          {/* Approved Hotel Admins */}
          <ListItem button component={Link} to="hotel-admin">
          <ListItemIcon>
            <ProfileIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Hotel Admins" />
        </ListItem>

        {/* Hotel Management */}
        <ListItem button component={Link} to="hotel-management">
          <ListItemIcon>
            <RoomIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Hotel Management" />
        </ListItem>

        {/* Booking Management */}
        <ListItem button component={Link} to="booking-management">
          <ListItemIcon>
            <BookingIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Booking Management" />
        </ListItem>

        {/* Payment Monitoring */}
        <ListItem button component={Link} to="payment-monitoring">
          <ListItemIcon>
            <BookingIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Payment Monitoring" />
        </ListItem>

        {/* System Settings */}
        <ListItem button component={Link} to="system-settings">
          <ListItemIcon>
            <BookingIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="System Settings" />
        </ListItem>

        {/* Profile Settings */}
        <ListItem button component={Link} to="profile-settings">
          <ListItemIcon>
            <BookingIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#00ADB5' }} primary="Profile Settings" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;