import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setNotification({
        open: true,
        message: 'All fields are required',
        severity: 'error',
      });
      return;
    }

    // Password validation
    if (formData.password.length < 8) {
      setNotification({
        open: true,
        message: 'Password must be at least 8 characters long',
        severity: 'error',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:2000/api/system-admin/signup', formData);
      setNotification({
        open: true,
        message: response.data.message,
        severity: 'success',
      });
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Failed to create admin account',
        severity: 'error',
      });
    }
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
        alignItems: 'center',
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
          Create System Admin
        </Typography>

        <Box component="div" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Typography sx={{ color: '#00ADB5', fontWeight: 'bold', mb: 1 }}>
            First Name
          </Typography>
          <TextField
            fullWidth
            type="text"
            name="firstName"
            value={formData.firstName}
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

          <Typography sx={{ color: '#00ADB5', fontWeight: 'bold', mb: 1 }}>
            Last Name
          </Typography>
          <TextField
            fullWidth
            type="text"
            name="lastName"
            value={formData.lastName}
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

          <Typography sx={{ color: '#00ADB5', fontWeight: 'bold', mb: 1 }}>
            Email
          </Typography>
          <TextField
            fullWidth
            type="email"
            name="email"
            value={formData.email}
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

          <Typography sx={{ color: '#00ADB5', fontWeight: 'bold', mb: 1 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            name="password"
            value={formData.password}
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
            type="button"
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: '#00ADB5',
              color: '#EEEEEE',
              borderRadius: 1,
              '&:hover': { bgcolor: '#0097A7' },
              width: '100%',
              mt: 2,
            }}
          >
            Create Admin Account
          </Button>
        </Box>

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