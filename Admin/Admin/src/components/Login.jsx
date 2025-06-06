import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HotelIcon from '@mui/icons-material/Hotel';

const Login = ({ setUserRole, setUserEmail, setUserName, handleLogout }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    // Clear user data and token when component mounts
    handleLogout();
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, []);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setShowRoleSelection(false);
    setShowLoginForm(true);
  };

  const startLogoutTimer = () => {
    // Clear any existing timer
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    
    // Set new timer for 1 hour
    const timer = setTimeout(() => {
      handleAutoLogout();
    }, 60*60*10000); // 1 hour in milliseconds
    
    setLogoutTimer(timer);
  };

  const handleAutoLogout = () => {
    handleLogout();
    navigate('/login');
    setError('Your session has expired after 10 seconds. Please login again.');
    setShowRoleSelection(true);
    setShowLoginForm(false);
    setEmail('');
    setPassword('');
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
      const { user, token } = response.data;

      setUserRole(user.role || role);
      setUserEmail(user.email);
      setUserName(`${user.firstName || ''} ${user.lastName || ''}`.trim());
      localStorage.setItem('token', token);

      // Start the logout timer
      startLogoutTimer();

      navigate(`/${user.role || role}-dashboard`);
    } catch (err) {
      if (err.response?.data?.message) {
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
        p: 3,
        my: 10,
        marginLeft: '400px',
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
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 3, color: '#EEEEEE' }}>
                Select Your Role
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Card
                  sx={{
                    width: 150,
                    bgcolor: '#393E46',
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                >
                  <CardActionArea onClick={() => handleRoleSelect('system-admin')}>
                    <CardContent>
                      <AdminPanelSettingsIcon sx={{ fontSize: 50, color: '#00ADB5' }} />
                      <Typography variant="h6" sx={{ mt: 1, color: '#EEEEEE' }}>
                        System Admin
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card
                  sx={{
                    width: 150,
                    bgcolor: '#393E46',
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                >
                  <CardActionArea onClick={() => handleRoleSelect('hotel-admin')}>
                    <CardContent>
                      <HotelIcon sx={{ fontSize: 50, color: '#00ADB5' }} />
                      <Typography variant="h6" sx={{ mt: 1, color: '#EEEEEE' }}>
                        Hotel Admin
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Box>
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

              {role !== 'system-admin' && (
                <Button
                  fullWidth
                  sx={{ mt: 2, color: '#00ADB5' }}
                  onClick={() => navigate('/signup')}
                >
                  Don't have an account? Sign Up
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Login;