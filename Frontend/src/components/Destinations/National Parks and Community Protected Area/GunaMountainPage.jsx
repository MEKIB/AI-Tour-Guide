import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import GunaMountainImage from "../../../assets/Guna.jpg";

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};

const breadcrumbStyle = {
  marginBottom: "20px",
};

const breadcrumbLinkStyle = {
  color: "#00ADB5",
  textDecoration: "none",
  fontSize: "1rem",
};

const breadcrumbTextStyle = {
  color: "#EEEEEE",
  fontSize: "1rem",
};

const heroStyle = {
  position: "relative",
  width: "100%",
  height: "400px",
  overflow: "hidden",
  borderRadius: "16px",
  marginBottom: "20px",
};

const heroImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

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

const textStyle = {
  fontSize: "1rem",
  lineHeight: "1.6",
  marginBottom: "15px",
};

const GunaMountainPage = () => {
  return (
    <Box sx={{ background: "rgba(34, 40, 49, 0.8)", minHeight: "100vh" }}>
      <div style={containerStyle}>
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>
            Home
          </Link>
          <span style={breadcrumbTextStyle}> / </span>
          <Link to="/national-parks" style={breadcrumbLinkStyle}>
            National Parks
          </Link>
          <span style={breadcrumbTextStyle}> / Guna Mountain</span>
        </div>
        <div style={heroStyle}>
          <img
            src={GunaMountainImage}
            alt="Guna Mountain"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Guna Mountain</h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            Located southeast of the town of Debere Tabor, the mountain chain of
            Guna is stretched between 3400-4231 meters above sea level. The
            mountain is the source of the two big rivers that feed Lake Tana;
            Rib and Gumara, 40 small rivers and 72 springs. Guna is one of
            Africa’s most unique wetland ecosystems and the source of 50% of
            Ethiopia’s freshwater. Apart from the Gelada baboons and many bird
            species, there is a claim that the Ethiopian wolf is also found in
            this mountain. The Lake Tana catchment is the source of the Blue
            Nile River, which, after joining with the White Nile in Khartoum,
            flows through Sudan to Egypt. This makes Mt. Guna an area of
            significant international importance. Millions of local communities
            directly depend on the catchment and its resources for their
            livelihoods.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default GunaMountainPage;
