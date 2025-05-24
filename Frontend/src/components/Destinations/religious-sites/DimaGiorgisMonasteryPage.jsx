import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DimaGiorgisImage from "../../../assets/DimaGiorgis.jpg";

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

const DimaGiorgisMonasteryPage = () => {
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
          <span style={breadcrumbTextStyle}> / Dima Giorgis Monastery</span>
        </div>
        <div style={heroStyle}>
          <img
            src={DimaGiorgisImage}
            alt="Dima Giorgis Monastery"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Dima Giorgis Monastery</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Dima Giorgis monastery is said to be built in the 13th century
            during the reign of Emperor Amde Tsion. It is situated 10 kilometers
            east of the main road to Debre Work town, 124 kilometers far from
            Debre Markos, and 25 kilometers from Bichena. The founder of the
            monastery was a religious father first known as Bekimos and later as
            Tekeste Birhan.
          </Typography>
          <Typography style={textStyle}>
            Dima Giyorgis preserves invaluable ancient heritages, which had been
            donated by kings, courtiers, and religious people. The area is one
            of the main ‘Kine’ (religious poetry) schools in Ethiopia. The
            church is well known to be a setting for the famous author Hadis
            Alemayehu’s "Fikir Eskemekabir." Colorful annual religious festivals
            are held in Dima Giyorgis on December 16, March 18, and May 1.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default DimaGiorgisMonasteryPage;
