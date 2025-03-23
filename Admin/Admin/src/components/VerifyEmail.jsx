import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Get email from SignUp page
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:2000/api/verify-email', {
        email,
        code,
      });
      setLoading(false);
      alert(response.data.message); // "Account created successfully"
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  if (!email) {
    navigate('/signup'); // Redirect if no email is provided
    return null;
  }

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
        p: 3,
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
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, color: '#00ADB5' }}
          >
            Verify Your Email
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            A verification code has been sent to <strong>{email}</strong>. Please enter it below.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleVerify} sx={{ width: '100%' }}>
            <TextField
              label="Verification Code"
              variant="outlined"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                style: { color: '#EEEEEE' },
                sx: { bgcolor: '#393E46', borderRadius: 1 },
              }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />
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
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
            <Button
              fullWidth
              sx={{ mt: 2, color: '#00ADB5' }}
              onClick={() => navigate('/signup')}
            >
              Back to Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default VerifyEmail;