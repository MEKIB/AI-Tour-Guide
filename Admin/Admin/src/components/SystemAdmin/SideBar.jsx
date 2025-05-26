import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  People as UserManagementIcon,
  HowToReg as ApproveAdminIcon,
  AdminPanelSettings as HotelAdminIcon,
  Business as HotelManagementIcon,
  CalendarToday as BookingIcon,
  Payment as PaymentIcon,
  Settings as SystemSettingsIcon,
  AccountCircle as ProfileSettingsIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

const SideBar = ({ collapsed }) => {
  const [openAdminGroup, setOpenAdminGroup] = useState(false);
  const [openSettingsGroup, setOpenSettingsGroup] = useState(false);

  const handleAdminGroupClick = () => {
    setOpenAdminGroup(!openAdminGroup);
  };

  const handleSettingsGroupClick = () => {
    setOpenSettingsGroup(!openSettingsGroup);
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
        {/* Admin Management Group */}
        <ListItem
          button
          onClick={handleAdminGroupClick}
          sx={{
            '&:hover': { bgcolor: '#222831' },
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
            <HotelAdminIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Management" sx={{ color: '#00ADB5' }} />}
          {!collapsed && (openAdminGroup ? <ExpandLess sx={{ color: '#00ADB5' }} /> : <ExpandMore sx={{ color: '#00ADB5' }} />)}
        </ListItem>
        <Collapse in={openAdminGroup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* User Management */}
            <ListItem
              button
              component={Link}
              to="user-management"
              sx={{
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <UserManagementIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="User Management" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Approve Hotel Admin */}
            <ListItem
              button
              component={Link}
              to="approve-hotel-admin"
              sx={{
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <ApproveAdminIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Approve Hotel Admin" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Approved Hotel Admins */}
            <ListItem
              button
              component={Link}
              to="hotel-admin"
              sx={{
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <HotelAdminIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Hotel Admins" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Hotel Management */}
            <ListItem
              button
              component={Link}
              to="hotel-management"
              sx={{
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <HotelManagementIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Hotel Management" sx={{ color: '#00ADB5' }} />}
            </ListItem>
          </List>
        </Collapse>

        {/* System Operations Group */}
        <ListItem
          button
          onClick={handleSettingsGroupClick}
          sx={{
            '&:hover': { bgcolor: '#222831' },
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
            <SystemSettingsIcon sx={{ color: '#00ADB5' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="System Operations" sx={{ color: '#00ADB5' }} />}
          {!collapsed && (openSettingsGroup ? <ExpandLess sx={{ color: '#00ADB5' }} /> : <ExpandMore sx={{ color: '#00ADB5' }} />)}
        </ListItem>
        <Collapse in={openSettingsGroup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Booking Management */}
            <ListItem
              button
              component={Link}
              to="booking-management"
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

            {/* Payment Monitoring */}
            <ListItem
              button
              component={Link}
              to="payment-monitoring"
              sx={{
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <PaymentIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Payment Monitoring" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* System Settings */}
            <ListItem
              button
              component={Link}
              to="system-settings"
              sx={{
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <SystemSettingsIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="System Settings" sx={{ color: '#00ADB5' }} />}
            </ListItem>

            {/* Profile Settings */}
            <ListItem
              button
              component={Link}
              to="profile-settings"
              sx={{
                pl: collapsed ? 2 : 4,
                '&:hover': { bgcolor: '#222831' },
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                <ProfileSettingsIcon sx={{ color: '#00ADB5' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Profile Settings" sx={{ color: '#00ADB5' }} />}
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;