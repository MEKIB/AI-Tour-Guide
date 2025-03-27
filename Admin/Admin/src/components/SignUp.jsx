import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Alert, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    passportId: null,
    tradeLicense: null,
    managerId: null,
    agreedToTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  const agreementFile = '/path/to/agreement.pdf'; // Replace with actual path or URL

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.passportId || !formData.tradeLicense || !formData.managerId) {
      setError('Please upload all required documents');
      setLoading(false);
      return;
    }

    if (!formData.agreedToTerms) {
      setError('You must agree to the terms and conditions');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('middleName', formData.middleName);
    data.append('lastName', formData.lastName);
    data.append('location', formData.location);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('passportId', formData.passportId);
    data.append('tradeLicense', formData.tradeLicense);
    data.append('managerId', formData.managerId);
    data.append('agreedToTerms', formData.agreedToTerms);

    try {
      const response = await axios.post('http://localhost:2000/api/signup', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      alert(response.data.message); // "Verification code sent to your email"
      navigate('/verify-email', { state: { email: formData.email } }); // Pass email to verification page
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to send verification code');
    }
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
      if (fieldName === 'passportId') {
        const previewURL = URL.createObjectURL(file);
        setFilePreview(previewURL);
      }
    }
  };

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
        marginTop: '80px',
        p: 3,
        marginLeft: 19,
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
              <Grid item xs={12} md={6}>
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
                    sx: { bgcolor: '#393E46', borderRadius: 1 },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
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
                    sx: { bgcolor: '#393E46', borderRadius: 1 },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                />
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
                    sx: { bgcolor: '#393E46', borderRadius: 1 },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
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
                    sx: { bgcolor: '#393E46', borderRadius: 1 },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                    sx: { bgcolor: '#393E46', borderRadius: 1 },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
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
                    sx: { bgcolor: '#393E46', borderRadius: 1 },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
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
                    sx: { bgcolor: '#393E46', borderRadius: 1 },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
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
                    sx: { bgcolor: '#393E46', borderRadius: 1 },
                  }}
                  InputLabelProps={{ style: { color: '#EEEEEE' } }}
                  required
                />
              </Grid>
            </Grid>

            {/* File Uploads */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="Passport/ID"
                    type="file"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true, style: { color: '#EEEEEE' } }}
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
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="Hotel Trade License"
                    type="file"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true, style: { color: '#EEEEEE' } }}
                    inputProps={{ accept: 'image/*,.pdf' }}
                    onChange={(e) => handleFileChange(e, 'tradeLicense')}
                    sx={{ bgcolor: '#393E46', borderRadius: 1 }}
                    InputProps={{ style: { color: '#EEEEEE' } }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="Manager ID"
                    type="file"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true, style: { color: '#EEEEEE' } }}
                    inputProps={{ accept: 'image/*,.pdf' }}
                    onChange={(e) => handleFileChange(e, 'managerId')}
                    sx={{ bgcolor: '#393E46', borderRadius: 1 }}
                    InputProps={{ style: { color: '#EEEEEE' } }}
                  />
                </Box>
              </Grid>
            </Grid>

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
              {loading ? 'Sending Verification...' : 'Sign Up'}
            </Button>
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