import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AbuneMelkezedekImage from "../../../assets/AbuneMelketsedeq1.jpg"; // Placeholder image path; replace with actual image

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

const AbuneMelkezedekMonasteryPage = () => {
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
          <span style={breadcrumbTextStyle}> / Abune Melkezedek Monastery</span>
        </div>
        <div style={heroStyle}>
          <img
            src={AbuneMelkezedekImage}
            alt="Abune Melkezedek Monastery"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Abune Melkezedek Monastery</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Found in North Shewa zone Mida Weremo Woreda, the Abune Melkezedek
            monastery is one of the unique and mesmerizing Orthodox churches in
            Ethiopia. The monastery is nestled under a magnificent escarpment
            and found 270 km away from Addis Ababa in Northern Shewa.
          </Typography>
          <Typography style={textStyle}>
            When you arrive at this Rock Hewn monastery, you will need to gather
            up the strength to go about 820 steps down to get to the monastery.
            Finally, you will reach to see such a magical view that makes you
            feel like it was worth the trouble.
          </Typography>
          <Typography style={textStyle}>
            You will get to see the astounding nature of the beautiful long
            waterfall that comes down from the top of the mountain just
            perfectly passing the monastery and enjoy the serenity. Then you
            will live in a day’s life of the monks.
          </Typography>
          <Typography style={textStyle}>
            After refreshing in your comfortable rooms provided by the
            monastery, take a tour of the history behind this place. Then you
            shall witness miracles of the promise of God to “Abune Melketsedek”
            as told by monks that “The body of anyone who is buried in this
            monastery will never decay.”
          </Typography>
          <Typography style={textStyle}>
            And without any preservative, miraculously the remains of the monks
            that died over 200 years ago still have hair, body parts still
            visible.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default AbuneMelkezedekMonasteryPage;
