import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import YemrehanaKrestosImage from "../../../assets/Yemrehanne-Kristos.jpg"; // Placeholder image path; replace with actual image

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

const YemrehanaKrestosMonasteryPage = () => {
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
          <span style={breadcrumbTextStyle}>
            {" "}
            / Yemrehana Krestos Monastery
          </span>
        </div>
        <div style={heroStyle}>
          <img
            src={YemrehanaKrestosImage}
            alt="Yemrehana Krestos Monastery"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Yemrehana Krestos Monastery</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            The Yemrehana Krestos Monastery is one of the most well-preserved
            examples of Aksumite Christian heritage. Around 40 kilometers
            outside Lalibela, the church pre-dates the more popular churches in
            the center of town. Yemrehana Krestos was also built up to 80 years
            before the rock-hewn churches in central Lalibela.
          </Typography>
          <Typography style={textStyle}>
            Unlike the churches in the centre of town, Yemrehana Krestos was not
            excavated from the rock face, having been built more conventionally.
            It was constructed from layers of stone and wood panels, expertly
            designed to prevent the monastery from sinking into the marshy
            ground beneath. This design contributes to the monastery’s
            characterful aesthetic.
          </Typography>
          <Typography style={textStyle}>
            The gravitas of the church is enhanced by its location. Situated in
            a cave whose roof was formed by basalt lava flows, the monastery is
            shrouded in darkness, granting it a solemn and somewhat bewitching
            atmosphere. This cave is itself surrounded by juniper trees, where
            vervet monkeys are sometimes found.
          </Typography>
          <Typography style={textStyle}>
            The interior of the church is spectacularly ornate; the walls of the
            church display carved geometric designs and colorful murals
            portraying various biblical scenes. It is very well-preserved,
            although there are a few structural problems that have developed
            over the years.
          </Typography>
          <Typography style={textStyle}>
            Like most ancient churches in Ethiopia, Yemrehana Krestos is still
            in use today. There is something quite fascinating – and often
            deeply moving – about witnessing this more than 800-year-long
            continuity in religious practice and heritage.
          </Typography>
          <Typography style={textStyle}>
            Yemrehana Krestos is one of a group of churches found in the
            highlands around Lalibela. The other major churches in these
            highlands are Asheton Maryam and Na’akuto La‘ab Monastery.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default YemrehanaKrestosMonasteryPage;
