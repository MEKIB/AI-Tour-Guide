import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import JemaNigusMosqueImage from "../../../assets/JemaNigus.jpg"; // Placeholder image path; replace with actual image

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

const JemaNigusMosquePage = () => {
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
          <Link to="/religious-sites" style={breadcrumbLinkStyle}>
            Religious Sites
          </Link>
          <span style={breadcrumbTextStyle}> / Jema Nigus Mosque</span>
        </div>
        <div style={heroStyle}>
          <img
            src={JemaNigusMosqueImage}
            alt="Jema Nigus Mosque"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Jema Nigus Mosque</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Jema Nigus Mosque is found 20 km south of Salmeni, the town of
            Albuko district, and 37 km from Dessie. The great Muslim scholar,
            Haj Seid Mujahid, built the mosque in 1764.
          </Typography>
          <Typography style={textStyle}>
            Jema Nigus Mosque is the place where the birthday of Prophet
            Mohammed, Mawlid, was celebrated for the first time in Ethiopia and
            where thousands of Muslim pilgrims from different parts of Ethiopia
            and abroad gather every year to celebrate the holiday. It is
            celebrated colorfully by performing Muslim rituals for three
            consecutive days.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default JemaNigusMosquePage;
