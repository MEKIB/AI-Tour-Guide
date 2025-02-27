import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:2000/forgot-password', {
        email: email,
      });
      setMessage(response.data.message); // Display success message
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred.'); // Display error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Forgot Password
        </Typography>

        {message && (
          <Typography color="success" align="center" sx={{ mb: 2 }}>
            {message}
          </Typography>
        )}

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;