import React, { useState } from 'react';
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
  Block as UnavailableIcon,
  Home as HotelIcon,
  Bed as RoomTypeIcon,
  Star as ReviewStarIcon,
  ExpandLess,
  ExpandMore,
  Settings as SettingsIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const SideBar = ({ collapsed }) => {
  const [openManagementGroup, setOpenManagementGroup] = useState(false);
  const [openHotelGroup, setOpenHotelGroup] = useState(false);

  const handleManagementGroupClick = () => {
    setOpenManagementGroup(!openManagementGroup);
  };

  const handleHotelGroupClick = () => {
    setOpenHotelGroup(!openHotelGroup);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 80 : 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : 240,
          boxSizing: 'border-box',
          bgcolor: '#393E46',
          color: '#EEEEEE',
          position: 'fixed',
          top: 64,
          transition: 'width 0.3s ease',
        },
      }}
    >
      <List>
        {/* Management Group */}
        <ListItem 
          button 
          onClick={handleManagementGroupClick} 
          sx={{ 
            '&:hover': { bgcolor: '#222831' },
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
            <SettingsIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Management" sx={{ color: '#00ADB5' }} />}
          {!collapsed && (openManagementGroup ? 
            <ExpandLess sx={{ color: '#00ADB5' }} /> : 
            <ExpandMore sx={{ color: '#00ADB5' }} />)}
        </ListItem>
        <Collapse in={openManagementGroup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Profile Management */}
            <ListItem 
              button 
              component={Link} 
              to="hotel-profile" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <ProfileIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Profile Management" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Room Management */}
            <ListItem 
              button 
              component={Link} 
              to="rooms" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <RoomIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Room Management" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Room Type and Amenities */}
            <ListItem 
              button 
              component={Link} 
              to="room-amenties" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <RoomTypeIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Room Type and Amenities" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Booking Management */}
            <ListItem 
              button 
              component={Link} 
              to="bookings" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <BookingIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Booking Management" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Room Unavailability */}
            <ListItem 
              button 
              component={Link} 
              to="hotel-anavailability" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <UnavailableIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Room Unavailability" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Amenities */}
            <ListItem 
              button 
              component={Link} 
              to="amenties" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <AmenitiesIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Amenities" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Hotel Rules */}
            <ListItem 
              button 
              component={Link} 
              to="hotel-rules" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <RulesIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Add Hotel Rules" sx={{ color: '#00ADB5' }} />}
            </ListItem>
          </List>
        </Collapse>

        {/* Hotel Group */}
        <ListItem 
          button 
          onClick={handleHotelGroupClick} 
          sx={{ 
            '&:hover': { bgcolor: '#222831' },
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
            <HotelIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Hotel" sx={{ color: '#00ADB5' }} />}
          {!collapsed && (openHotelGroup ? 
            <ExpandLess sx={{ color: '#00ADB5' }} /> : 
            <ExpandMore sx={{ color: '#00ADB5' }} />)}
        </ListItem>
        <Collapse in={openHotelGroup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Hotel Details */}
            <ListItem 
              button 
              component={Link} 
              to="hotel-details" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <DetailsIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Hotel Details" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Amenities Detail */}
            <ListItem 
              button 
              component={Link} 
              to="amenties-detail" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <AmenitiesIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Amenities" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Hotel Rules Detail */}
            <ListItem 
              button 
              component={Link} 
              to="hotel-rule-detail" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <RulesIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Hotel Rules" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Available Rooms */}
            <ListItem 
              button 
              component={Link} 
              to="hotel-room" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <RoomIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Available Rooms" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Hotel Review */}
            <ListItem 
              button 
              component={Link} 
              to="hotel-review" 
              sx={{ 
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <ReviewStarIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Hotel Review" sx={{ color: '#00ADB5' }} />}
            </ListItem>
          </List>
        </Collapse>

        {/* Booking Check */}
        <ListItem 
          button 
          component={Link} 
          to="/hotel-admin-dashboard/check-booking" 
          sx={{ 
            '&:hover': { bgcolor: '#222831' },
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
            <CalendarIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Booking Check" sx={{ color: '#00ADB5' }} />}
        </ListItem>

        {/* Promotions */}
        <ListItem 
          button 
          component={Link} 
          to="/hotel-admin-dashboard/promotions" 
          sx={{ 
            '&:hover': { bgcolor: '#222831' },
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
            <PromotionIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Promotions" sx={{ color: '#00ADB5' }} />}
        </ListItem>

        {/* Profile */}
        <ListItem 
          button 
          component={Link} 
          to="profile" 
          sx={{ 
            '&:hover': { bgcolor: '#222831' },
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
            <ProfileIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Profile" sx={{ color: '#00ADB5' }} />}
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;