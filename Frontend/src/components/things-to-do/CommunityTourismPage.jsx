import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CommunityImage from "../../assets/community.jpg";

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

const CommunityTourismPage = () => {
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
          <span style={breadcrumbTextStyle}> / Community Tourism</span>
        </div>
        <div style={heroStyle}>
          <img
            src={CommunityImage}
            alt="Community Tourism"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Community Tourism</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            The Amhara region has several community-managed sites that showcase
            their way of life for visitors. From mind-boggling TESFA community
            tourism guesthouses in Meket Wollo to the community guesthouse of
            Menz Guassa Community Conservation Area and Abune Yoseph Mountains,
            from the Wofwosha community guesthouse in Ankober area to Mulu
            Eco-Lodge in Gojjam; the region is ideal and a perfect spot for
            community tourism. The unique community of Aweramba, 80 km east of
            Lake Tana, is the right place for visitors who seek a truly unique
            community tourism experience. New community guesthouses are also
            constructed around Janamora, the part of the Semien Mountains
            National Park.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default CommunityTourismPage;
