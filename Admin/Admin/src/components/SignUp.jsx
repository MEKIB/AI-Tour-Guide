import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Alert, Grid } from '@mui/material';
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
    passportId: null, // Store Passport/ID file
    tradeLicense: null, // Store Hotel Trade License file
    managerId: null, // Store Manager ID file
    agreedToTerms: false, // Store agreement checkbox state
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null); // For Passport/ID preview

  // Predefined agreement file (stored in the system)
  const agreementFile = '/path/to/agreement.pdf'; // Replace with the actual path to your agreement file

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

    // Validate file uploads
    if (!formData.passportId || !formData.tradeLicense || !formData.managerId) {
      setError('Please upload all required documents');
      setLoading(false);
      return;
    }

    // Validate agreement checkbox
    if (!formData.agreedToTerms) {
      setError('You must agree to the terms and conditions');
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

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: file,
      }));

      // Create a preview URL for Passport/ID (optional)
      if (fieldName === 'passportId') {
        const previewURL = URL.createObjectURL(file);
        setFilePreview(previewURL);
      }
    }
  };

  // Open the agreement file in a new tab
  const handleViewAgreement = () => {
    window.open(agreementFile, '_blank');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#222831',
        color: '#EEEEEE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '80PX',
        p: 3,
        marginLeft:19,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, color: '#00ADB5' }}
          >
            Create Account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSignUp} sx={{ width: '100%' }}>
            {/* Agreement Section */}
            <Box sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body1" sx={{ color: '#EEEEEE', mb: 2 }}>
                Before proceeding, please read and agree to the terms and conditions.
              </Typography>
              <Button
                variant="outlined"
                sx={{ color: '#00ADB5', borderColor: '#00ADB5' }}
                onClick={handleViewAgreement}
              >
                View Agreement
              </Button>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      agreedToTerms: e.target.checked,
                    }))
                  }
                  required
                />
                <Typography variant="body2" sx={{ ml: 1, color: '#EEEEEE' }}>
                  I agree to the terms and conditions
                </Typography>
              </Box>
            </Box>

            {/* Two-Column Layout */}
            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                {/* First Name */}
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: { color: '#EEEEEE' },
                    sx: {
                      bgcolor: '#393E46',
                      borderRadius: 1,
                      '&:focus': { bgcolor: '#00ADB5' }, // Change bg color on focus
                    },
                  }}
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
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: { color: '#EEEEEE' },
                    sx: {
                      bgcolor: '#393E46',
                      borderRadius: 1,
                      '&:focus': { bgcolor: '#00ADB5' }, // Change bg color on focus
                    },
                  }}
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
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: { color: '#EEEEEE' },
                    sx: {
                      bgcolor: '#393E46',
                      borderRadius: 1,
                      '&:focus': { bgcolor: '#00ADB5' }, // Change bg color on focus
                    },
                  }}
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
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: { color: '#EEEEEE' },
                    sx: {
                      bgcolor: '#393E46',
                      borderRadius: 1,
                      '&:focus': { bgcolor: '#00ADB5' }, // Change bg color on focus
                    },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                {/* Email */}
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: { color: '#EEEEEE' },
                    sx: {
                      bgcolor: '#393E46',
                      borderRadius: 1,
                      '&:focus': { bgcolor: '#00ADB5' }, // Change bg color on focus
                    },
                  }}
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
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: { color: '#EEEEEE' },
                    sx: {
                      bgcolor: '#393E46',
                      borderRadius: 1,
                      '&:focus': { bgcolor: '#00ADB5' }, // Change bg color on focus
                    },
                  }}
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
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: { color: '#EEEEEE' },
                    sx: {
                      bgcolor: '#393E46',
                      borderRadius: 1,
                      '&:focus': { bgcolor: '#00ADB5' }, // Change bg color on focus
                    },
                  }}
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
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: { color: '#EEEEEE' },
                    sx: {
                      bgcolor: '#393E46',
                      borderRadius: 1,
                      '&:focus': { bgcolor: '#00ADB5' }, // Change bg color on focus
                    },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
              </Grid>
            </Grid>

            {/* File Uploads */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {/* Passport/ID File Upload */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="Passport/ID"
                    type="file"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: '#EEEEEE' },
                    }}
                    inputProps={{ accept: 'image/*,.pdf' }}
                    onChange={(e) => handleFileChange(e, 'passportId')}
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
              </Grid>

              <Grid item xs={12} md={6}>
                {/* Hotel Trade License File Upload */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="Hotel Trade License"
                    type="file"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: '#EEEEEE' },
                    }}
                    inputProps={{ accept: 'image/*,.pdf' }}
                    onChange={(e) => handleFileChange(e, 'tradeLicense')}
                    sx={{ bgcolor: '#393E46', borderRadius: 1 }}
                    InputProps={{ style: { color: '#EEEEEE' } }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                {/* Manager ID File Upload */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="Manager ID"
                    type="file"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: '#EEEEEE' },
                    }}
                    inputProps={{ accept: 'image/*,.pdf' }}
                    onChange={(e) => handleFileChange(e, 'managerId')}
                    sx={{ bgcolor: '#393E46', borderRadius: 1 }}
                    InputProps={{ style: { color: '#EEEEEE' } }}
                  />
                </Box>
              </Grid>
            </Grid>

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
                mt: 3,
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