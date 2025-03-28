import React, { useState } from 'react'; // Add useState import
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Person as ProfileIcon,
  Hotel as RoomIcon,
  Book as BookingIcon,
  LocalOffer as PromotionIcon,
  RateReview as ReviewIcon,
  Info as DetailsIcon,
  Spa as AmenitiesIcon,
  Rule as RulesIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

const SideBar = ({ collapsed }) => {
  const [openManagementGroup, setOpenManagementGroup] = useState(false); // State for Management dropdown
  const [openHotelGroup, setOpenHotelGroup] = useState(false); // State for Hotel dropdown

  const handleManagementGroupClick = () => {
    setOpenManagementGroup(!openManagementGroup); // Toggle Management dropdown
  };

  const handleHotelGroupClick = () => {
    setOpenHotelGroup(!openHotelGroup); // Toggle Hotel dropdown
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 100 : 240, // Adjust width based on collapsed state
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 100 : 240, // Adjust width based on collapsed state
          boxSizing: 'border-box',
          bgcolor: '#393E46', // Dark background for Sidebar
          color: '#EEEEEE', // Light text for Sidebar
          position: 'fixed', // Fix the Sidebar
          top: 64, // Adjust top position to account for Navbar height
          transition: 'width 0.3s ease', // Smooth transition for width
        },
      }}
    >
      <List>
        {/* Group: Profile, Room, and Booking Management */}
        <ListItem button onClick={handleManagementGroupClick} sx={{ '&:hover': { bgcolor: '#222831' } }}>
          <ListItemIcon>
            <ProfileIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Management" sx={{ color: '#00ADB5' }} />}
          {openManagementGroup ? <ExpandLess sx={{ color: '#00ADB5' }} /> : <ExpandMore sx={{ color: '#00ADB5' }} />}
        </ListItem>
        <Collapse in={openManagementGroup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Profile Management */}
            <ListItem button component={Link} to="hotel-profile" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <ProfileIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Profile Management" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Room Management */}
            
            <ListItem button component={Link} to="rooms" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <RoomIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Room Management" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            <ListItem button component={Link} to="room-amenties" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <RoomIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Room Type and Amenties" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Booking Management */}
            <ListItem button component={Link} to="bookings" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <BookingIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Booking Management" sx={{ color: '#00ADB5' }} />}
            </ListItem>

             {/* Booking UnavailabilityManagement */}
             <ListItem button component={Link} to="hotel-anavailability" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <BookingIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Room Unavailability" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Amenities */}
            <ListItem button component={Link} to="amenties" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <AmenitiesIcon sx={{ color: '#00ADB5' }} /> {/* Updated icon for Amenities */}
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Amenities" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Hotel Rules */}
            <ListItem button component={Link} to="hotel-rules" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <RulesIcon sx={{ color: '#00ADB5' }} /> {/* Updated icon for Hotel Rules */}
              </ListItemIcon>
              {!collapsed && <ListItemText primary=" Add Hotel Rules" sx={{ color: '#00ADB5' }} />}
            </ListItem>
          </List>
        </Collapse>

        {/* Group: Hotel Details, Amenities, and Rules */}
        <ListItem button onClick={handleHotelGroupClick} sx={{ '&:hover': { bgcolor: '#222831' } }}>
          <ListItemIcon>
            <DetailsIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Hotel" sx={{ color: '#00ADB5' }} />}
          {openHotelGroup ? <ExpandLess sx={{ color: '#00ADB5' }} /> : <ExpandMore sx={{ color: '#00ADB5' }} />}
        </ListItem>
        <Collapse in={openHotelGroup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Hotel Details */}
            <ListItem button component={Link} to="hotel-details" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <DetailsIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Hotel Details" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Amenities */}
            <ListItem button component={Link} to="amenties-detail" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <AmenitiesIcon sx={{ color: '#00ADB5' }} /> {/* Updated icon for Amenities */}
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Amenities" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Hotel Rules */}
            <ListItem button component={Link} to="hotel-rule-detail" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <RulesIcon sx={{ color: '#00ADB5' }} /> {/* Updated icon for Hotel Rules */}
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Hotel Rules" sx={{ color: '#00ADB5' }} />}
            </ListItem>

              {/* Hotel rooms */}
              <ListItem button component={Link} to="hotel-room" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <RulesIcon sx={{ color: '#00ADB5' }} /> {/* Updated icon for Hotel Rules */}
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Available Rooms" sx={{ color: '#00ADB5' }} />}
            </ListItem>
            

            {/* Hotel Review */}
            <ListItem button component={Link} to="hotel-review" sx={{ pl: collapsed ? 3 : 4, '&:hover': { bgcolor: '#222831' } }}>
              <ListItemIcon>
                <RulesIcon sx={{ color: '#00ADB5' }} /> {/* Updated icon for Hotel Rules */}
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Hotel Review " sx={{ color: '#00ADB5' }} />}
            </ListItem>
          </List>
        </Collapse>

        {/* Booking Check */}
        <ListItem button component={Link} to="/hotel-admin-dashboard/check-booking" sx={{ '&:hover': { bgcolor: '#222831' } }}>
          <ListItemIcon>
            <BookingIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Booking Check" sx={{ color: '#00ADB5' }} />}
        </ListItem>

        {/* Promotions */}
        <ListItem button component={Link} to="/hotel-admin-dashboard/promotions" sx={{ '&:hover': { bgcolor: '#222831' } }}>
          <ListItemIcon>
            <PromotionIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Promotions" sx={{ color: '#00ADB5' }} />}
        </ListItem>

       

         {/* Profile Setting */}
         <ListItem button component={Link} to="profile" sx={{ '&:hover': { bgcolor: '#222831' } }}>
          <ListItemIcon>
            <ReviewIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Profile" sx={{ color: '#00ADB5' }} />}
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;