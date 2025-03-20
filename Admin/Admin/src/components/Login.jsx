import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUserRole, setUserEmail, setUserName }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setShowRoleSelection(false);
    setShowLoginForm(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let apiUrl = '';

    if (role === 'system-admin') {
      apiUrl = 'http://localhost:2000/api/system-admin/login';
    } else if (role === 'hotel-admin') {
      apiUrl = 'http://localhost:2000/api/login';
    }

    try {
      const response = await axios.post(apiUrl, { email, password });
      const { user, token } = response.data; // Destructure token from response.data

      console.log('Logged in as:', user.role || role);
      setUserRole(user.role || role);
      setUserEmail(user.email);
      setUserName(`${user.firstName || ''} ${user.lastName || ''}`.trim());
      localStorage.setItem('token', token); // Store the token in local storage
      console.log(token)
      navigate(`/${user.role || role}-dashboard`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
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
            maxWidth: '400px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, color: '#00ADB5' }}
          >
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
            </Alert>
          )}

          {showRoleSelection && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="role-select-label" sx={{ color: '#EEEEEE' }}>Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                label="Role"
                onChange={(e) => handleRoleSelect(e.target.value)}
                sx={{ bgcolor: '#393E46', borderRadius: 1, color: '#EEEEEE' }}
              >
                <MenuItem value="system-admin">System Admin</MenuItem>
                <MenuItem value="hotel-admin">Hotel Admin</MenuItem>
              </Select>
            </FormControl>
          )}

          {showLoginForm && (
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
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Login;