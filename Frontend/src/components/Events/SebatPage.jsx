import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Image2 from "../../assets/sebat.jpg";

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

const SebatPage = () => {
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
          <span style={breadcrumbTextStyle}> / Sebat</span>
        </div>
        <div style={heroStyle}>
          <img
            src={Image2}
            alt="Sebat bet Agew Horse Riding festival"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Sebat Bet Agew Horse Riding Festival</h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            With the decorations they put on their horses, and with a large
            number of horses gathering annually, attending the horsing events in
            the Amhara region is a lifetime experience. The Sebat Bet Agew Horse
            Riding Festival celebrates the rich equestrian culture of the Agew
            people, featuring beautifully adorned horses and skilled riders in a
            festive atmosphere.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default SebatPage;
