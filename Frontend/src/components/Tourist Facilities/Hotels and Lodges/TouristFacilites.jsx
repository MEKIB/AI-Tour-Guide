import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Avatar
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const mockHotels = [
  {
    id: 1,
    name: "AI-Powered Smart Hotel",
    image: "https://source.unsplash.com/random/800x600?hotel",
    description: "Experience tomorrow's technology today with our AI concierge service",
    rooms: [
      { type: "Smart Room", price: 189, amenities: ["AI Assistant", "Smart Controls", "VR Setup"] },
      { type: "Executive Suite", price: 299, amenities: ["Workspace", "Meeting Room Access", "Premium AI"] },
    ]
  },
  {
    id: 2,
    name: "Eco Future Hotel",
    image: "https://source.unsplash.com/random/800x600?eco-hotel",
    description: "Sustainable living with AI-driven energy management",
    rooms: [
      { type: "Eco Pod", price: 149, amenities: ["Solar Powered", "Eco AI Guide", "Green Kit"] },
      { type: "Nature Suite", price: 249, amenities: ["Organic Bath", "Garden Access", "Eco Tours"] },
    ]
  }
];

const BookingPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({ checkIn: null, checkOut: null, guests: 1 });
  const [confirmation, setConfirmation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleBookingSubmit = () => {
    // Mock confirmation data (without QR code)
    const mockConfirmation = {
      code: `BOOKING-${Math.floor(100000 + Math.random() * 900000)}`,
      hotel: selectedRoom.hotel.name,
      room: selectedRoom.room.type,
      dates: bookingInfo
    };

    setConfirmation(mockConfirmation);
    setOpenDialog(false);
    alert('Booking completed successfully!');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
        AI Tour Guide Hotel Booking
      </Typography>

      {!confirmation ? (
        <Grid container spacing={4}>
          {mockHotels.map((hotel) => (
            <Grid item xs={12} key={hotel.id}>
              <Card sx={{ borderRadius: 4 }}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <Avatar
                      src={hotel.image}
                      variant="square"
                      sx={{ width: '100%', height: 250 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {hotel.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {hotel.description}
                      </Typography>

                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        {hotel.rooms.map((room) => (
                          <Grid item xs={12} sm={6} key={room.type}>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  {room.type}
                                </Typography>
                                <Typography variant="h5" color="primary" paragraph>
                                  ${room.price}/night
                                </Typography>
                                {room.amenities.map((amenity) => (
                                  <Typography key={amenity} variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <span>✓</span> {amenity}
                                  </Typography>
                                ))}
                                <Button
                                  fullWidth
                                  variant="contained"
                                  sx={{ mt: 2 }}
                                  onClick={() => {
                                    setSelectedRoom({ hotel, room });
                                    setOpenDialog(true);
                                  }}
                                >
                                  Book Now
                                </Button>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ maxWidth: 500, margin: '0 auto', p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Booking Confirmed!
          </Typography>
          <Typography variant="body1" align="center">
            Confirmation Code: {confirmation.code}
          </Typography>
           <Typography variant="body1" align="center">
            Hotel: {confirmation.hotel}
          </Typography>
           <Typography variant="body1" align="center">
            Room: {confirmation.room}
          </Typography>
           <Typography variant="body1" align="center">
            Check-in: {confirmation.dates.checkIn.toLocaleDateString()}
          </Typography>
           <Typography variant="body1" align="center">
            Check-out: {confirmation.dates.checkOut.toLocaleDateString()}
          </Typography>
        </Card>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Complete Your Booking</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ pt: 2 }}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Check-in Date"
                value={bookingInfo.checkIn}
                onChange={(newValue) => setBookingInfo({ ...bookingInfo, checkIn: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Check-out Date"
                value={bookingInfo.checkOut}
                onChange={(newValue) => setBookingInfo({ ...bookingInfo, checkOut: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Guests"
                type="number"
                value={bookingInfo.guests}
                onChange={(e) => setBookingInfo({ ...bookingInfo, guests: e.target.value })}
                inputProps={{ min: 1, max: 8 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleBookingSubmit}
            disabled={!bookingInfo.checkIn || !bookingInfo.checkOut}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingPage;