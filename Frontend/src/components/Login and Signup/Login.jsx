import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme for consistent styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Pink
    },
    background: {
      default: '#f0f2f5', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // Gradient background
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 500,
            p: 4,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
              {isLogin ? 'Login' : 'Register'}
            </Typography>
            <form>
              {!isLogin && (
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  sx={{ mb: 2 }}
                />
              )}
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s',
                  },
                }}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </form>
            <Button
              onClick={toggleForm}
              fullWidth
              sx={{
                mt: 3,
                color: 'primary.main',
                textTransform: 'none',
                fontSize: '0.9rem',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'secondary.main',
                },
              }}
            >
              {isLogin
                ? 'Need an account? Register here.'
                : 'Already have an account? Login here.'}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default LoginRegister;