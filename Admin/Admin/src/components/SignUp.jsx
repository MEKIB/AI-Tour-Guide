import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    passportId: null, // Store the file here
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null); // Store file preview URL

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate password and confirm password
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate file upload
    if (!formData.passportId) {
      setError('Please upload your Passport/ID');
      setLoading(false);
      return;
    }

    // Simulate account creation (replace with API call)
    setTimeout(() => {
      setLoading(false);
      alert('Account created successfully! Please log in.');
      navigate('/login');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        passportId: file,
      }));

      // Create a preview URL for the file
      const previewURL = URL.createObjectURL(file);
      setFilePreview(previewURL);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#222831', // Dark background
        color: '#EEEEEE', // Light text
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '80PX',
        p: 3,
        transform: 'translateX(400px)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '400px', // Adjust the max-width as needed
            mx: 'auto', // Center the box horizontally
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, color: '#00ADB5' }} // Accent color
          >
            Create Account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSignUp} sx={{ width: '100%' }}>
            {/* First Name */}
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />

            {/* Middle Name */}
            <TextField
              label="Middle Name"
              variant="outlined"
              fullWidth
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
            />

            {/* Last Name */}
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />

            {/* Location */}
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              name="location"
              value={formData.location}
              onChange={handleChange}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />

            {/* Email */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />

            {/* Password */}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />

            {/* Phone Number */}
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />

            {/* Passport/ID File Upload */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Passport/ID"
                type="file"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                  style: { color: '#EEEEEE' }, // Set label color to light gray
                }}
                inputProps={{ accept: 'image/*,.pdf' }} // Allow images and PDFs
                onChange={handleFileChange}
                sx={{ bgcolor: '#393E46', borderRadius: 1 }}
                InputProps={{ style: { color: '#EEEEEE' } }}
              />
              {filePreview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  {formData.passportId.type.startsWith('image/') ? (
                    <img
                      src={filePreview}
                      alt="Passport/ID Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: '#00ADB5' }}>
                      File uploaded: {formData.passportId.name}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            {/* Sign Up Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: '#00ADB5',
                color: '#EEEEEE',
                '&:hover': { bgcolor: '#0097A7' },
                fontWeight: 'bold',
                fontSize: '1rem',
                py: 2,
              }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            {/* Log In Button */}
            <Button
              fullWidth
              sx={{ mt: 2, color: '#00ADB5' }}
              onClick={() => navigate('/login')}
            >
              Already have an account? Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;