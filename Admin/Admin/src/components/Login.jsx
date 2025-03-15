import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock user data (replace with actual authentication logic)
const users = [
  { email: 'systemadmin@example.com', password: 'system123', role: 'system-admin', name: 'Zelalem Tadese Admas' },
  { email: 'hoteladmin@example.com', password: 'hotel123', role: 'hotel-admin', name: 'Zelalem Tadese Admas' },
];

const Login = ({ setUserRole, setUserEmail, setUserName }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Find the user in the mock data
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      console.log('Logged in as:', user.role); // Debugging line
      setUserRole(user.role); // Set the user role
      setUserEmail(user.email); // Set the user email
      setUserName(user.name); // Set the user name
      navigate(`/${user.role}-dashboard`); // Redirect to the appropriate dashboard
    } else {
      setError('Invalid email or password'); // Show error message
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
            maxWidth: '400px', // Fixed width for the form
            mx: 'auto', // Center the box horizontally
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, color: '#00ADB5' }} // Accent color
          >
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 4, bgcolor: '#393E46', borderRadius: 1 }}
              InputProps={{ style: { color: '#EEEEEE' } }}
              InputLabelProps={{ style: { color: '#EEEEEE' } }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#00ADB5',
                color: '#EEEEEE',
                '&:hover': { bgcolor: '#0097A7' },
                fontWeight: 'bold',
                fontSize: '1rem',
                py: 2,
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              sx={{ mt: 2, color: '#00ADB5' }}
              onClick={() => navigate('/signup')}
            >
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;