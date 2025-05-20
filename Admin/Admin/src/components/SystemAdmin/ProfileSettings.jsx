import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Input,
  Snackbar,
  Alert,
} from '@mui/material';
import { Close, PhotoCamera } from '@mui/icons-material';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '',
    profileImage: null,
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setNotification({
      open: true,
      message: 'Email updated successfully!',
      severity: 'success',
    });
    console.log('Updated Email:', profile.email);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setNotification({
      open: true,
      message: 'Password updated successfully!',
      severity: 'success',
    });
    console.log('Updated Password:', profile.password);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    setNotification({
      open: true,
      message: 'Profile image updated successfully!',
      severity: 'success',
    });
    console.log('Updated Profile Image:', profile.profileImage);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        padding: 3,
        background: '#222831',
        minHeight: '100vh',
        color: '#EEEEEE',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          background: '#393E46',
          borderRadius: 2,
          padding: 4,
          maxWidth: 600,
          width: '100%',
          boxShadow: '0 4px 20px rgba(0, 173, 181, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 4, color: '#00ADB5', fontWeight: 'bold', textAlign: 'center' }}
        >
          Profile Settings
        </Typography>

        {/* Email Update Form */}
        <Box component="form" onSubmit={handleEmailSubmit} sx={{ mb: 4 }}>
          <Typography sx={{ color: '#00ADB5', fontWeight: 'bold', mb: 1 }}>
            Update Email
          </Typography>
          <TextField
            fullWidth
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
              background: '#222831',
              borderRadius: 1,
              '& .MuiInputBase-input': { color: '#EEEEEE' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#00ADB5' },
                '&:hover fieldset': { borderColor: '#00ADB5' },
                '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#00ADB5',
              color: '#EEEEEE',
              borderRadius: 1,
              '&:hover': { bgcolor: '#0097A7' },
              width: '100%',
            }}
          >
            Update Email
          </Button>
        </Box>

        {/* Password Update Form */}
        <Box component="form" onSubmit={handlePasswordSubmit} sx={{ mb: 4 }}>
          <Typography sx={{ color: '#00ADB5', fontWeight: 'bold', mb: 1 }}>
            Update Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Enter new password"
            sx={{
              mb: 2,
              background: '#222831',
              borderRadius: 1,
              '& .MuiInputBase-input': { color: '#EEEEEE' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#00ADB5' },
                '&:hover fieldset': { borderColor: '#00ADB5' },
                '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#00ADB5',
              color: '#EEEEEE',
              borderRadius: 1,
              '&:hover': { bgcolor: '#0097A7' },
              width: '100%',
            }}
          >
            Update Password
          </Button>
        </Box>

        {/* Profile Image Update Form */}
        <Box component="form" onSubmit={handleImageSubmit} sx={{ mb: 4 }}>
          <Typography sx={{ color: '#00ADB5', fontWeight: 'bold', mb: 1 }}>
            Update Profile Image
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              sx={{ color: '#EEEEEE', mr: 2 }}
              startIcon={<PhotoCamera />}
            />
            {profile.profileImage && (
              <img
                src={profile.profileImage}
                alt="Profile Preview"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #00ADB5',
                }}
              />
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#00ADB5',
              color: '#EEEEEE',
              borderRadius: 1,
              '&:hover': { bgcolor: '#0097A7' },
              width: '100%',
            }}
          >
            Update Profile Image
          </Button>
        </Box>

        {/* Disabled Name Field */}
        <Box>
          <Typography sx={{ color: '#00ADB5', fontWeight: 'bold', mb: 1 }}>
            Name
          </Typography>
          <TextField
            fullWidth
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled
            sx={{
              mb: 2,
              background: '#222831',
              borderRadius: 1,
              '& .MuiInputBase-input': { color: '#EEEEEE' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#00ADB5' },
                '&:hover fieldset': { borderColor: '#00ADB5' },
                '&.Mui-focused fieldset': { borderColor: '#00ADB5' },
              },
            }}
          />
        </Box>

        {/* Notification */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ProfileSettings;