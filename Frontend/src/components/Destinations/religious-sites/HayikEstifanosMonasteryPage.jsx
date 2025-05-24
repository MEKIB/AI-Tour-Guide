import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HayikEstifanosImage from "../../../assets/HayqEstifanos.jpg"; // Placeholder image path; replace with actual image

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

const HayikEstifanosMonasteryPage = () => {
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
          <span style={breadcrumbTextStyle}> / Hayik Estifanos Monastery</span>
        </div>
        <div style={heroStyle}>
          <img
            src={HayikEstifanosImage}
            alt="Hayik Estifanos Monastery"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Hayik Estifanos Monastery</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Hayik Estifanos Monastery is believed to be first founded as a
            church during the reign of Emperor Dil Naod (916-926) by the
            Egyptian Aba Selama, who was the archbishop of the Ethiopian
            Orthodox Church, and later elevated to a monastery in the 13th
            century. It is one of the most historically iconic and paramount
            monasteries in Ethiopia.
          </Typography>
          <Typography style={textStyle}>
            The monastery houses different priceless antiquities donated by
            various Emperors, holy articles, and several parchment manuscripts,
            as well as different stone and wooden carved tablets that are
            displayed in the museum. Taking a look at the lake stretched
            surrounding the monastery, the attractive natural landscape, birds
            flying down to the lake in search of their food and to the trees,
            flocking over the lake, and fishers’ stylish rowing over the water
            together make visitors feel an exceptionally splendid pleasure.
          </Typography>
          <Typography style={textStyle}>
            Recently, the number of domestic and foreign tourists coming to the
            site is increasing. Hence, there are currently two standardized
            recreational resorts giving services by the shore of the lake. The
            monastery lies on the peninsula and can be reached on foot from the
            town. Women are not permitted to enter the monastery but may visit
            the adjacent nunnery of Margebeta Giorgis, which was reputedly
            founded about 800 years ago.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default HayikEstifanosMonasteryPage;
