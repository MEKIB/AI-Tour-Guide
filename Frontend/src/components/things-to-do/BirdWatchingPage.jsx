import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BirdWatchingImage from "../../assets/Bird watching.jpg";

const containerStyle = { width: "100%", padding: "20px" };
const breadcrumbStyle = { marginBottom: "20px" };
const breadcrumbLinkStyle = {
  color: "#00ADB5",
  textDecoration: "none",
  fontSize: "1rem",
};
const breadcrumbTextStyle = { color: "#EEEEEE", fontSize: "1rem" };
const heroStyle = {
  position: "relative",
  width: "100%",
  height: "500px",
  overflow: "hidden",
  borderRadius: "16px",
  marginBottom: "20px",
};
const heroImageStyle = { width: "100%", height: "100%", objectFit: "cover" };
const heroTitleStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#00ADB5",
  fontSize: "2.5rem",
  fontWeight: 600,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  textAlign: "center",
};
const contentStyle = {
  background: "rgba(57, 62, 70, 0.8)",
  padding: "20px",
  borderRadius: "16px",
  color: "#EEEEEE",
};
const textStyle = { fontSize: "1rem", lineHeight: "1.6", marginBottom: "15px" };

const BirdWatchingPage = () => {
  return (
    <Box
      sx={{
        background: "rgba(34, 40, 49, 0.8)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div style={containerStyle}>
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>
            Home
          </Link>
          <span style={breadcrumbTextStyle}> / </span>
          <Link to="/things-to-do" style={breadcrumbLinkStyle}>
            Things to Do
          </Link>
          <span style={breadcrumbTextStyle}> / Bird Watching</span>
        </div>
        <div style={heroStyle}>
          <img
            src={BirdWatchingImage}
            alt="Bird Watching"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Bird Watching</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Ethiopia has an immense potential for birding. With more than 962
            bird species, the country is a haven for bird watching. From the
            many spotted and identified places for birding in Ethiopia, some of
            the top birding sites are found in the Amhara region.
          </Typography>
          <Typography style={textStyle}>
            The Ankober escarpment near the capital, Addis Ababa, is one of the
            top birding hotspots in the country. With its endemic bird, Ankober
            Serin, the area is a perfect place for birdwatchers as it’s so close
            to the capital. The Lake Tana Biosphere Reserve area is also a place
            of wonder, and your binocular will be restless with the diverse
            dozens of bird species in the lake region.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default BirdWatchingPage;
