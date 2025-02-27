import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Alert,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  LinearProgress,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff, LocationOn } from '@mui/icons-material';
import axios from 'axios'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });
  const [alert, setAlert] = useState(null);
  const navigate=useNavigate()

  const [validation, setValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUpperCase: false,
    hasLowerCase: false,
    passwordsMatch: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const locations = ['New York', 'London', 'Tokyo', 'Paris', 'Dubai', 'Sydney', 'Other'];

  const validatePassword = (password, confirmPassword) => {
    const newValidation = {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      passwordsMatch: password === confirmPassword && password !== ''
    };
    setValidation(newValidation);
    return newValidation;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password' || name === 'confirmPassword') {
      validatePassword(
        name === 'password' ? value : formData.password,
        name === 'confirmPassword' ? value : formData.confirmPassword
      );
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const getStrengthColor = () => {
    const strength = Object.values(validation).filter(Boolean).length;
    if (strength < 2) return 'error';
    if (strength < 4) return 'warning';
    return 'success';
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\+?[0-9]{7,15}$/;
  
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number';
  
    const passwordValid = Object.values(validation).every(Boolean);
    if (!passwordValid) newErrors.password = 'Password does not meet requirements';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
          const response = await axios.post('http://localhost:2000/register', formData);
          console.log('Registration successful:', response.data);
          setAlert({ type: 'success', message: 'Registration successful!' });
          navigate('/login'); // Or wherever you want to redirect
      } catch (error) {
          console.error('Registration failed:', error.response); // Log the full response
          if (error.response && error.response.data && error.response.data.message) {
              setErrors({ general: error.response.data.message }); // Display backend message
          } else {
              setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
              setErrors({ general: 'Registration failed. Please try again.' });
          }
      }
  }
  };
 
  
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Create Account
        </Typography>




      {/* Display the Alert component here */}
      {alert && <Alert severity={alert.type} sx={{ mb: 2 }}>{alert.message}</Alert>}

        
        
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Username */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.username && touched.username}
                helperText={touched.username && errors.username}
              />
            </Grid>

            {/* Name Fields */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.firstName && touched.firstName}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.lastName && touched.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.location && touched.location}>
                <InputLabel>Location</InputLabel>
                <Select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  startAdornment={
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  }
                >
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
                {errors.location && touched.location && (
                  <FormHelperText>{errors.location}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email && touched.email}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.phone && touched.phone}
                helperText={touched.phone && errors.phone}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={formData.showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password && touched.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          showPassword: !prev.showPassword
                        }))}
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Box sx={{ mt: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={Object.values(validation).filter(Boolean).length * 20} 
                  color={getStrengthColor()}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Box sx={{ mt: 1, pl: 1 }}>
                  <Typography variant="caption" color={validation.minLength ? 'success.main' : 'error.main'}>
                    ✓ 8+ characters
                  </Typography>
                  <Typography variant="caption" display="block" color={validation.hasUpperCase ? 'success.main' : 'error.main'}>
                    ✓ Uppercase letter
                  </Typography>
                  <Typography variant="caption" display="block" color={validation.hasLowerCase ? 'success.main' : 'error.main'}>
                    ✓ Lowercase letter
                  </Typography>
                  <Typography variant="caption" display="block" color={validation.hasNumber ? 'success.main' : 'error.main'}>
                    ✓ Number
                  </Typography>
                  <Typography variant="caption" display="block" color={validation.hasSpecialChar ? 'success.main' : 'error.main'}>
                    ✓ Special character
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={formData.showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password && touched.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          showConfirmPassword: !prev.showConfirmPassword
                        }))}
                      >
                        {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Box sx={{ mt: 2, pl: 1 }}>
                <Typography variant="caption" color={validation.passwordsMatch ? 'success.main' : 'error.main'}>
                  {validation.passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </Typography>
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </Grid>

            {/* Login Link */}
            <Grid item xs={12}>
            <Typography variant="body2" align="center">
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="primary" component="span">
                       Log in
                    </Typography>
                </Link>
            </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;