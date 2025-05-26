import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AmbaGiorgisImage from "../../../assets/debre_maryam.jpg";

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

const ZozAmbaGyorgisPage = () => {
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
          <span style={breadcrumbTextStyle}> / Zoz Amba Gyorgis</span>
        </div>
        <div style={heroStyle}>
          <img
            src={AmbaGiorgisImage}
            alt="Zoz Amba Gyorgis"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Zoz Amba Gyorgis</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Zoz Amba is located 130 km away from Gondar through Arbaya and 170
            km from Bahir Bar via Addis Zemen and Ebinat, which takes one to a
            small town called Gohala. After one and a half hours hiking from
            Gohala, there is Zoz Amba hilltop that provides a panoramic distant
            view of Lalibela, Sekota, and the Tekeze watershed in the east,
            Ebinat, Wogera, the suburbs of Gondar and Denkez in the west, and
            the Semien Mountains in the north.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default ZozAmbaGyorgisPage;
