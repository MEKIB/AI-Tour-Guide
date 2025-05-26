import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HorsebackImage from "../../assets/horseback.jpg";

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

const HorsebackRidingPage = () => {
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
          <span style={breadcrumbTextStyle}> / Horseback Riding</span>
        </div>
        <div style={heroStyle}>
          <img
            src={HorsebackImage}
            alt="Horseback Riding"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Horseback Riding</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            For the mass people who have been living in this region, the horse
            is an integral part in the life of the people. From war to annual
            religious festivals and from mourning ceremonies to wedding horses
            play an important role. The region boasts some of the colorful and
            astonishing horse riding ceremonies. The annual horse riding
            ceremony of the Agew Sebat Bet by the end of January and Merqorios
            ceremony at Debere Tabor by the beginning of February is a
            must-not-miss horsing event in Ethiopia. Apart from that, travelers
            can ride horses at Semien Mountains National Park, Menz Guassa
            Community Conservation Area, and the Guna Mountains while
            appreciating the marvelous landscape.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default HorsebackRidingPage;
