import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BikingImage from "../../assets/Biking.jpg";

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

const BikingPage = () => {
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
          <span style={breadcrumbTextStyle}> / Biking</span>
        </div>
        <div style={heroStyle}>
          <img src={BikingImage} alt="Biking" style={heroImageStyle} />
          <h1 style={heroTitleStyle}>Biking</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            With its dramatic topography and scenery, Ethiopia is a haven for
            biking. The Amhara Region, where mountains and deep valleys combined
            with a nice mix of asphalt and gravel roads, is one of the best fits
            for mountain biking adventure tours in Ethiopia.
          </Typography>
          <Typography style={textStyle}>
            Accompanied by experienced local tour guides, biking in this part of
            Ethiopia is a multi-faceted adventure where one can discover the
            natural and cultural beauty of the Amhara region. Recently, two
            biking programs were conducted in the Ankober escarpment and the
            gorge of the Jemma River valley. Bike through the mountains, which
            are perched above 3,000 meters above sea level, and appreciate the
            stunning views and breathtaking downhill rides.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default BikingPage;
