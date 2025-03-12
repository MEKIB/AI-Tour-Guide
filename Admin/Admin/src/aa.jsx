import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography, Box, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, IconButton } from '@mui/material';
import { Lock, Person, Hotel, Dashboard, Close } from '@mui/icons-material';

// Main App Component
export default function App() {
  const [auth, setAuth] = useState(false);
  const [openModal, setOpenModal] = useState(null); // 'login' or 'signup'

  return (
    <Router>
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Hotel sx={{ mr: 1 }} />
            Hotel System
          </Typography>
          
          {auth ? (
            <Button color="inherit" onClick={() => setAuth(false)}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => setOpenModal('login')}>
                <Lock sx={{ mr: 1 }} /> Login
              </Button>
              <Button color="inherit" onClick={() => setOpenModal('signup')}>
                <Person sx={{ mr: 1 }} /> Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <AuthModal open={openModal} onClose={() => setOpenModal(null)} setAuth={setAuth} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/system-admin" element={<SystemAdminDashboard />} />
        <Route path="/hotel-admin" element={<HotelAdminDashboard />} />
      </Routes>
    </Router>
  );
}

// Authentication Modal Component
const AuthModal = ({ open, onClose, setAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('hotel_admin');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth(true);
    onClose();
    // Redirect based on role (mock implementation)
    navigate(role === 'system_admin' ? '/system-admin' : '/hotel-admin');
  };

  return (
    <Dialog open={!!open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {open === 'login' ? 'Login' : 'Sign Up'}
        <IconButton onClick={onClose}><Close /></IconButton>
      </DialogTitle>
      
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            required
          />
          
          {open === 'signup' && (
            <Select
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              margin="dense"
            >
              <MenuItem value="system_admin">System Admin</MenuItem>
              <MenuItem value="hotel_admin">Hotel Admin</MenuItem>
            </Select>
          )}

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3, mb: 2 }}
          >
            {open === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Home Page Component
const HomePage = () => (
  <Container>
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Hotel Management System
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Streamline your hotel operations with our comprehensive solution
      </Typography>
    </Box>

    <Grid container spacing={4} sx={{ py: 4 }}>
      {['Room Management', 'Booking System', 'Analytics'].map((feature) => (
        <Grid item xs={12} md={4} key={feature}>
          <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
            <CardContent>
              <Dashboard sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>{feature}</Typography>
              <Typography color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Dashboard Components (Placeholders)
const SystemAdminDashboard = () => (
  <Container>
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        <Dashboard sx={{ mr: 2 }} />
        System Admin Dashboard
      </Typography>
      {/* Add admin-specific content here */}
    </Box>
  </Container>
);

const HotelAdminDashboard = () => (
  <Container>
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        <Hotel sx={{ mr: 2 }} />
        Hotel Admin Dashboard
      </Typography>
      {/* Add hotel admin content here */}
    </Box>
  </Container>
);