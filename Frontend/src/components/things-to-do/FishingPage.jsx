import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FishingImage from "../../assets/Fishing.jpg";

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

const FishingPage = () => {
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
          <span style={breadcrumbTextStyle}> / Fishing</span>
        </div>
        <div style={heroStyle}>
          <img src={FishingImage} alt="Fishing" style={heroImageStyle} />
          <h1 style={heroTitleStyle}>Fishing</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            With the abundant number of water bodies, especially lakes, fishing
            is an integral part of the life of the people in this region.
            Fishing in this region is probably one of the most ancient on the
            planet level. The fishing in the largest lake of Ethiopia, Lake
            Tana, is a reminder of the practice of fishing during the ancient
            Egyptian period.
          </Typography>
          <Typography style={textStyle}>
            Fishers with a papyrus reed boat, like the ancient Egyptians, are
            still practicing the oldest fishing technique in Lake Tana. This
            will be an ideal opportunity for any travelers to experience what
            Ethiopian fishermen around this area have been practicing for
            millennia. The Tekezze hydroelectric power dam has also brought an
            immense potential for fishing, in which travelers can appreciate
            both the fishing activities and the stellar topography of the area.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default FishingPage;
