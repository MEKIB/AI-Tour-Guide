import React from "react";
import { Box, Typography } from "@mui/material";
import EventImage from "../../assets/events.jpg";
const EventsUpper = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
      }}
    >
      <img
        src={EventImage}
        alt="Hotels and Lodges"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 1,
          width: "100%",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{ textShadow: "2px 2px 4px #000000" }}
        >
          Events
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60px",
          background: "linear-gradient(rgba(0, 0, 0, 0.2), transparent)",
        }}
      />
    </Box>
  );
};

export default EventsUpper;

// ... (Rendering code remains the same)
