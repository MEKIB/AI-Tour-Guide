import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch hotels from the backend (mock data for now)
  useEffect(() => {
    const mockHotels = [
      { id: 1, name: 'Hotel A', location: 'New York', status: 'approved' },
      { id: 2, name: 'Hotel B', location: 'Los Angeles', status: 'pending' },
      { id: 3, name: 'Hotel C', location: 'Chicago', status: 'approved' },
      { id: 4, name: 'Hotel D', location: 'Miami', status: 'pending' },
      { id: 5, name: 'Hotel E', location: 'San Francisco', status: 'approved' },
    ];
    setHotels(mockHotels);
  }, []);

  // Approve a hotel
  const approveHotel = (hotelId) => {
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === hotelId ? { ...hotel, status: 'approved' } : hotel
      )
    );
    alert(`Hotel ${hotelId} approved.`);
  };

  // Filter hotels based on search query
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        padding: 3,
        background: '#222831',
        minHeight: '100vh',
        color: '#EEEEEE',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: '#00ADB5', fontWeight: 'bold' }}>
        Hotel Management
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search hotels by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          mb: 3,
          background: '#393E46',
          borderRadius: 1,
          '& .MuiInputBase-input': {
            color: '#EEEEEE',
          },
          '& .MuiInputLabel-root': {
            color: '#EEEEEE',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#00ADB5',
            },
            '&:hover fieldset': {
              borderColor: '#00ADB5',
            },
          },
        }}
      />

      {/* Hotel Table */}
      <TableContainer component={Paper} sx={{ background: '#393E46', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: '#00ADB5', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.id}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.name}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{hotel.location}</TableCell>
                <TableCell sx={{ color: hotel.status === 'approved' ? '#00ADB5' : '#F37199', fontWeight: 'bold' }}>
                  {hotel.status}
                </TableCell>
                <TableCell>
                  {hotel.status === 'pending' && (
                    <Button
                      variant="contained"
                      onClick={() => approveHotel(hotel.id)}
                      sx={{
                        bgcolor: '#00ADB5',
                        color: '#EEEEEE',
                        '&:hover': { bgcolor: '#0097A7' },
                      }}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HotelManagement;