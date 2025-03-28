import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Image5 from "../../assets/meskel.jpg";

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};
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
  height: "400px",
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

const MeskelPage = () => {
  return (
    <Box sx={{ background: "rgba(34, 40, 49, 0.8)", minHeight: "100vh" }}>
      <div style={containerStyle}>
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>
            Home
          </Link>
          <span style={breadcrumbTextStyle}> / </span>
          <Link to="/events" style={breadcrumbLinkStyle}>
            Events
          </Link>
          <span style={breadcrumbTextStyle}> / Meskel</span>
        </div>
        <div style={heroStyle}>
          <img
            src={Image5}
            alt="Meskel/the finding of the true cross/"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Meskel (The Finding of the True Cross)</h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            When the Ethiopian mountains turn to a verdant meadow after the
            rainy season, Ethiopians celebrate one of the colorful festivals of
            the year: Meskel. This Christian holiday commemorates the finding of
            the True Cross, featuring bonfires, traditional dances, and communal
            feasts across the Amhara region.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default MeskelPage;
