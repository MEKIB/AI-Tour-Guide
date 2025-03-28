import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Image8 from "../../assets/fasika.jpg";

const containerStyle = {
  width: "100%",
  maxWidth: "1400px",
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

const FasikaPage = () => {
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
          <span style={breadcrumbTextStyle}> / Fasika</span>
        </div>
        <div style={heroStyle}>
          <img
            src={Image8}
            alt="Fasika (Ethiopian Easter)"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Fasika (Ethiopian Easter)</h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            Fasika, or Ethiopian Easter, is one of the most significant
            religious celebrations in Ethiopia. Marked by a long fasting period
            and culminating in a grand midnight mass, it is a deeply spiritual
            event observed by millions. The Amhara region comes alive with
            church services, feasting, and communal celebrations, reflecting the
            profound faith of the Ethiopian Orthodox community.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default FasikaPage;
