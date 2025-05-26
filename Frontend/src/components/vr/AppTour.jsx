import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import TourContext from "./TourContext";

function AppTour() {
  const { setSelectedDestination, selectedDestination } =
    useContext(TourContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Ensure context is ready and set default destination if needed
  useEffect(() => {
    if (setSelectedDestination) {
      // Set a default destination if none is selected
      if (!selectedDestination) {
        setSelectedDestination("Lalibela");
      }
      setIsLoading(false);
    }
  }, [setSelectedDestination, selectedDestination]);

  // Handle destination selection and navigation
  const handleDestinationSelect = (destination, path) => {
    setSelectedDestination(destination);
    navigate(path);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#393E46",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#393E46",
        color: "#fff",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Virtual Reality Tours
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 4 }}>
          Explore the stunning destinations of Amhara, Ethiopia, in immersive
          VR.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "#4A4E69",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Lalibela
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Discover the rock-hewn churches of Lalibela in a virtual
                experience.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleDestinationSelect("Lalibela", "/vr/lalibela")
                }
                sx={{ textTransform: "none" }}
              >
                Start VR Tour
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "#4A4E69",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Gonder
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Experience the historic castles of Gonder in immersive VR.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDestinationSelect("Gonder", "/vr/gonder")}
                sx={{ textTransform: "none" }}
              >
                Start VR Tour
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "#4A4E69",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Bahir Dar
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Tour the scenic Lake Tana and Blue Nile Falls in virtual
                reality.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleDestinationSelect("BahirDar", "/vr/bahirdar")
                }
                sx={{ textTransform: "none" }}
              >
                Start VR Tour
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AppTour;
