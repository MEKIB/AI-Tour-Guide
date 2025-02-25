import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const Availability = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [accommodationType, setAccommodationType] = useState('');

  const accommodationOptions = [
    'Aldgate Studio',
    'Aldgate Apartment',
    'Superior Studio',
    'Superior Apartment',
    'Penthouse Apartment',
    'Two-Bedroom Apartment',
    'Skyline - One Bed Apartment',
    'Skyline Studio',
    'Twin Accessible Apartment',
    'Standard Twin Room',
  ];

  const handleSearch = () => {
    console.log('Check-in Date:', checkInDate);
    console.log('Check-out Date:', checkOutDate);
    console.log('Adults:', adults);
    console.log('Children:', children);
    console.log('Rooms:', rooms);
    console.log('Accommodation Type:', accommodationType);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Select dates to see this property's availability and prices
      </Typography>

      <Typography variant="body2" gutterBottom>
        We Price Match
      </Typography>

      <Typography variant="body2" gutterBottom>
        Select dates to see this property's availability and prices
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={2}>
            <DatePicker
              label="Check-in date"
              value={checkInDate}
              onChange={(newValue) => setCheckInDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <DatePicker
              label="Check-out date"
              value={checkOutDate}
              onChange={(newValue) => setCheckOutDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <FormControl fullWidth>
              <InputLabel id="adults-label">Adults</InputLabel>
              <Select
                labelId="adults-label"
                id="adults"
                value={adults}
                label="Adults"
                onChange={(e) => setAdults(e.target.value)}
              >
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}>
            <FormControl fullWidth>
              <InputLabel id="children-label">Children</InputLabel>
              <Select
                labelId="children-label"
                id="children"
                value={children}
                label="Children"
                onChange={(e) => setChildren(e.target.value)}
              >
                {[...Array(5)].map((_, index) => (
                  <MenuItem key={index} value={index}>
                    {index}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}>
            <FormControl fullWidth>
              <InputLabel id="rooms-label">Rooms</InputLabel>
              <Select
                labelId="rooms-label"
                id="rooms"
                value={rooms}
                label="Rooms"
                onChange={(e) => setRooms(e.target.value)}
              >
                {[...Array(5)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="accommodation-label">Accommodation</InputLabel>
              <Select
                labelId="accommodation-label"
                id="accommodation"
                value={accommodationType}
                label="Accommodation"
                onChange={(e) => setAccommodationType(e.target.value)}
              >
                {accommodationOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" fullWidth onClick={handleSearch}>
              Search
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Please enter your dates to check availability.
            </Typography>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
};

export default Availability;