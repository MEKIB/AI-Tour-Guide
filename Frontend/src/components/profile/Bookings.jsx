import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const Bookings = () => {
  // Sample booking data
  const bookings = [
    {
      id: 1,
      tour: "Visit Lalibela",
      date: "2023-10-15",
      status: "Confirmed",
    },
    {
      id: 2,
      tour: "Explore Gondar",
      date: "2023-11-20",
      status: "Pending",
    },
    {
      id: 3,
      tour: "Bahir Dar Lake Tour",
      date: "2023-12-05",
      status: "Cancelled",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Your Bookings
      </Typography>
      {bookings.map((booking) => (
        <Box
          key={booking.id}
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#EEEEEE",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {booking.tour}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Date:</strong> {booking.date}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Status:</strong> {booking.status}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => alert(`View details for booking ${booking.id}`)}
          >
            View Details
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => alert(`Cancel booking ${booking.id}`)}
          >
            Cancel
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default Bookings;