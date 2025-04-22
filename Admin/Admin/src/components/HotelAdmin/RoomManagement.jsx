// RoomManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Autocomplete,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import * as MuiIcons from '@mui/icons-material';
import axios from 'axios';

const colors = {
  dark: '#222831',
  darkGray: '#393E46',
  teal: '#00ADB5',
  light: '#EEEEEE',
  background: '#1A1A1A',
  inputBackground: '#2D2D2D',
  success: '#00C853',
  error: '#FF4444'
};

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [newRoom, setNewRoom] = useState({ type: '', rate: '', roomNumbers: '' });
  const [newDetailedRoom, setNewDetailedRoom] = useState({
    type: '',
    bathrooms: '',
    size: '',
  });
  const [newAmenity, setNewAmenity] = useState({ name: '', icon: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const baseUrl = 'http://localhost:2000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Fetch rooms
        const roomsRes = await axios.get(`${baseUrl}/api/rooms`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch amenities
        const amenitiesRes = await axios.get(`${baseUrl}/api/amenities`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setRooms(roomsRes.data);
        setAmenities(amenitiesRes.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRoom = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`${baseUrl}/api/rooms`, {
        type: newRoom.type,
        rate: Number(newRoom.rate),
        roomNumbers: newRoom.roomNumbers.split(',').map(n => n.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRooms([...rooms, response.data]);
      setNewRoom({ type: '', rate: '', roomNumbers: '' });
      setSuccess('Room type added successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add room');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAmenities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.post(`${baseUrl}/api/amenities/upload`, { amenities }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Amenities uploaded successfully');
      setAmenities([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload amenities');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: colors.background, minHeight: '90vh', color: colors.light }}>
      {/* Add Room Form */}
      <Box component="form" sx={{ mb: 4, backgroundColor: colors.darkGray, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: colors.teal, mb: 2 }}>
          Add New Room Type
        </Typography>
        
        <TextField
          label="Room Type"
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
          sx={{ mb: 2, width: '100%', backgroundColor: colors.inputBackground }}
        />
        
        <TextField
          label="Rate"
          type="number"
          value={newRoom.rate}
          onChange={(e) => setNewRoom({ ...newRoom, rate: e.target.value })}
          sx={{ mb: 2, width: '100%', backgroundColor: colors.inputBackground }}
        />
        
        <TextField
          label="Room Numbers (comma-separated)"
          value={newRoom.roomNumbers}
          onChange={(e) => setNewRoom({ ...newRoom, roomNumbers: e.target.value })}
          sx={{ mb: 2, width: '100%', backgroundColor: colors.inputBackground }}
        />
        
        <Button 
          onClick={handleAddRoom}
          variant="contained"
          disabled={loading}
          sx={{ backgroundColor: colors.teal }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Room Type'}
        </Button>
      </Box>

      {/* Amenities Section */}
      <Box sx={{ mb: 4, backgroundColor: colors.darkGray, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: colors.teal, mb: 2 }}>
          Manage Amenities
        </Typography>
        
        {/* Amenity Inputs */}
        <Button 
          onClick={handleUploadAmenities}
          variant="contained"
          disabled={loading}
          sx={{ backgroundColor: colors.success, mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload Amenities'}
        </Button>
      </Box>

      {/* Rooms Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: colors.darkGray }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: colors.teal }}>Type</TableCell>
              <TableCell sx={{ color: colors.teal }}>Rate</TableCell>
              <TableCell sx={{ color: colors.teal }}>Room Numbers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room._id}>
                <TableCell sx={{ color: colors.light }}>{room.type}</TableCell>
                <TableCell sx={{ color: colors.light }}>${room.rate}</TableCell>
                <TableCell sx={{ color: colors.light }}>
                  {room.roomNumbers?.map(r => r.number).join(', ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Notifications */}
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

export default RoomManagement;