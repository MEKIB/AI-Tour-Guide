import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Avatar,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Person,
  Email,
  Phone,
  Cake,
  LocationOn,
  Lock,
  CreditCard,
  Notifications,
  Flight,
  Settings,
  Edit,
  Delete,
  Password,
  ArrowBack
} from '@mui/icons-material';

const Profile = ({ user, onUpdateProfile, onDeleteAccount, onUpdatePassword }) => {
  const [editField, setEditField] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    hometown: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();

  // Initialize form data with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob || '',
        hometown: user.hometown || ''
      });
    }
  }, [user]);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(formData);
      showSnackbar('Profile updated successfully!', 'success');
    }
    setEditField(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [editField]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showSnackbar('New passwords do not match!', 'error');
      return;
    }
    
    if (onUpdatePassword) {
      onUpdatePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordDialogOpen(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      showSnackbar('Password updated successfully!', 'success');
    }
  };

  const handleDeleteAccount = () => {
    if (onDeleteAccount) {
      onDeleteAccount();
      setDeleteDialogOpen(false);
      showSnackbar('Account deleted successfully!', 'info');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const menuItems = [
    { icon: <Person />, text: 'Personal information' },
    { icon: <Lock />, text: 'Login & Security' },
    { icon: <CreditCard />, text: 'Payment methods' },
    { icon: <Notifications />, text: 'Communication preferences' },
    { icon: <Flight />, text: 'Travel preferences' },
    { icon: <Settings />, text: 'Site preferences' }
  ];

  return (
    <Box sx={{ 
      backgroundColor: '#222831',
      minHeight: '100vh',
      padding: { xs: 2, md: 4 },
      color: '#EEEEEE'
    }}>
      <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Back button and header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: '#00ADB5', mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold', 
            color: '#00ADB5'
          }}>
            My Profile
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Left Navigation */}
          <Card sx={{ 
            backgroundColor: '#393E46',
            borderRadius: 2,
            width: { xs: '100%', md: 280 },
            height: 'fit-content'
          }}>
            <List>
              {menuItems.map((item, index) => (
                <React.Fragment key={item.text}>
                  <ListItem button sx={{ 
                    '&:hover': { backgroundColor: 'rgba(0, 173, 181, 0.1)' }
                  }}>
                    <ListItemIcon sx={{ color: '#00ADB5', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ 
                        sx: { 
                          color: '#EEEEEE',
                          fontWeight: item.text === 'Personal information' ? 'bold' : 'normal'
                        } 
                      }} 
                    />
                  </ListItem>
                  {index < menuItems.length - 1 && <Divider sx={{ backgroundColor: '#555' }} />}
                </React.Fragment>
              ))}
            </List>
          </Card>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            <Card sx={{ 
              backgroundColor: '#393E46',
              borderRadius: 2,
              mb: 3
            }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold',
                    color: '#00ADB5'
                  }}>
                    Personal information
                  </Typography>
                  {user?.profileImage ? (
                    <Avatar 
                      src={user.profileImage} 
                      sx={{ 
                        width: 56, 
                        height: 56 
                      }} 
                    />
                  ) : (
                    <Avatar sx={{ 
                      bgcolor: '#00ADB5',
                      width: 56,
                      height: 56,
                      fontSize: '1.5rem'
                    }}>
                      {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'UA'}
                    </Avatar>
                  )}
                </Box>

                {/* Profile fields with edit functionality */}
                {[
                  { field: 'name', label: 'Full name', icon: <Person /> },
                  { field: 'email', label: 'Email', icon: <Email />, readOnly: true },
                ].map(({ field, label, icon, readOnly }) => (
                  <Box key={field} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 2,
                    p: 2,
                    backgroundColor: 'rgba(0, 173, 181, 0.05)',
                    borderRadius: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Box sx={{ color: '#00ADB5', mr: 2 }}>
                        {icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ color: '#AAAAAA' }}>
                          {label}
                        </Typography>
                        {editField === field ? (
                          <TextField
                            value={formData[field] || ''}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                            sx={{ 
                              mt: 1,
                              '& .MuiInput-input': { color: '#EEEEEE' }
                            }}
                          />
                        ) : (
                          <Typography>
                            {formData[field] || 'Not provided'}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {!readOnly && (editField === field ? (
                      <Button 
                        onClick={handleSave}
                        sx={{ color: '#00ADB5', ml: 2 }}
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton 
                        onClick={() => handleEditClick(field)}
                        sx={{ color: '#00ADB5' }}
                      >
                        <Edit />
                      </IconButton>
                    ))}
                  </Box>
                ))}

                {/* Additional actions */}
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Password />}
                    onClick={() => setPasswordDialogOpen(true)}
                    sx={{
                      color: '#00ADB5',
                      borderColor: '#00ADB5',
                      mr: 2,
                      '&:hover': {
                        borderColor: '#00ADB5',
                        backgroundColor: 'rgba(0, 173, 181, 0.1)'
                      }
                    }}
                  >
                    Change Password
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={() => setDeleteDialogOpen(true)}
                    sx={{
                      color: '#ff5252',
                      borderColor: '#ff5252',
                      '&:hover': {
                        borderColor: '#ff5252',
                        backgroundColor: 'rgba(255, 82, 82, 0.1)'
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle sx={{ color: '#00ADB5' }}>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)} sx={{ color: '#EEEEEE' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpdatePassword} 
            sx={{ color: '#00ADB5' }}
            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ color: '#ff5252' }}>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: '#EEEEEE' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            sx={{ color: '#ff5252' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;