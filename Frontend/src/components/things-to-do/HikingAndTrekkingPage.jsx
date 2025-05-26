import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HikingImage from "../../assets/Hiking and trekking.jpg";

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

const HikingAndTrekkingPage = () => {
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
          <span style={breadcrumbTextStyle}> / Hiking and Trekking</span>
        </div>
        <div style={heroStyle}>
          <img
            src={HikingImage}
            alt="Hiking and Trekking"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Hiking and Trekking</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Amhara region boasts some of the world-class hiking and trekking
            destinations. The country’s premium trekking sites are found in this
            region. From the highest peak of Ethiopia, Ras Dejen, to the
            community-protected area of Menz Guassa, the mountains that are
            dubbed to be a water tanker, Guna and Choke, the mountain that
            protects the elusive Ethiopian wolf, and the third highest peak in
            Ethiopia, Abune Yoseph, are world-class hiking and trekking
            destinations.
          </Typography>
          <Typography style={textStyle}>
            Designated trekking packages are available, from easy to the tougher
            ones. Camping sites are also available on each trekking route.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default HikingAndTrekkingPage;
