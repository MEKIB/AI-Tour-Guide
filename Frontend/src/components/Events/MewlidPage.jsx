import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Image3 from "../../assets/mewlid.jpg";

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

const MewlidPage = () => {
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
          <span style={breadcrumbTextStyle}> / Mewlid</span>
        </div>
        <div style={heroStyle}>
          <img src={Image3} alt="Mewlid" style={heroImageStyle} />
          <h1 style={heroTitleStyle}>Mewlid</h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            Welcome to a place where Mewlid, the birth of Prophet Mohammed, is
            celebrated in a colorful and astounding fashion. This vibrant
            Islamic festival in the Amhara region features processions, prayers,
            and communal gatherings, showcasing the deep cultural and religious
            heritage of the local Muslim community.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default MewlidPage;
