import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AshetonMaryamImage from "../../../assets/AshetonMaryam.jpg"; // Placeholder image path; replace with actual image

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

const AshetonMaryamPage = () => {
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
          <span style={breadcrumbTextStyle}> / Asheton Maryam</span>
        </div>
        <div style={heroStyle}>
          <img
            src={AshetonMaryamImage}
            alt="Asheton Maryam"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Asheton Maryam</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            In comparison to the extraordinary rock-hewn churches of Lalibela,
            the architecture of Asheton Maryam may seem relatively simple.
            However, the true appeal of this monastery is the spectacular
            mountain scenery in which it is found.
          </Typography>
          <Typography style={textStyle}>
            As you make the ascent climb towards the monastery, the views become
            increasingly impressive. At the trailhead, there are views down
            towards central Lalibela and the rock-hewn churches. The trail then
            passes through small rural villages and continues to follow the
            narrow, winding paths higher and higher until finally reaching
            Asheton Maryam. The climb is long, but incredibly rewarding.
          </Typography>
          <Typography style={textStyle}>
            The monastery is still in active use, with a priest living there
            full time to welcome worshippers and visitors. There are many sacred
            items found at Asheton Maryam, including crosses and a Bible
            illustrated with colorful, intricate drawings, presented by the
            priest for visitors to see.
          </Typography>
          <Typography style={textStyle}>
            The monastery can be accessed by a roughly 5-hour hike straight from
            Lalibela, making it a popular goal for a day trip. As the hike can
            be challenging at times, it is possible to do a part of the journey
            by mule, if preferred. Alternatively, visitors can drive to a nearby
            car park and complete the final 30-minute climb on foot. By starting
            the hike from the car park, visitors will then be able to pair the
            trip with a longer trek onto the escarpment for an overnight stay at
            the beautiful Hudad Lodge.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default AshetonMaryamPage;
