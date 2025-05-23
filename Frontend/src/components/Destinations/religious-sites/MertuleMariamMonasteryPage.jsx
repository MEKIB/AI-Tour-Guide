import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MertuleMariamImage from "../../../assets/MertuleMaryam.jpg"; // Placeholder image path; replace with actual image

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

const MertuleMariamMonasteryPage = () => {
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
          <span style={breadcrumbTextStyle}> / Mertule Mariam Monastery</span>
        </div>
        <div style={heroStyle}>
          <img
            src={MertuleMariamImage}
            alt="Mertule Mariam Monastery"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Mertule Mariam Monastery</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Mertule Mariam is an ancient historical place located in Amhara
            Regional State, in East Gojjam Zone in Enebese Sarmider Woreda.
            Mertule Mariam is one of the eighteen districts of East Gojjam Zone
            with the center at Debre Markos.
          </Typography>
          <Typography style={textStyle}>
            Mertule Mariam monastery is found at about 364 kilometers from the
            capital Addis Abeba. Its distance from the regional capital Bahr Dar
            is about 180 kilometers. It is also located 190 kilometers northeast
            of Debre Markos and also situated 28 kilometers southeast of
            Gundawoyen, a town with dense forest on the Addis Abeba–Bahr Dar
            road through Debre Worq.
          </Typography>
          <Typography style={textStyle}>
            The town of Mertule Mariam, particularly the eastern edge where the
            monastery is now located, is found at a flat-topped hill over 2600
            meters above sea level. This top hill has had an important site in
            the historical evolution of the town, serving as a place where the
            church and the monastery were constructed.
          </Typography>
          <Typography style={textStyle}>
            Topographically, Mertule Mariam is found in the climate condition of
            Wayna Dega, an intermediate zone between Dega and Qolla temperature
            zones. In general, Enebse Sar Mider Woreda is bounded by Wollo
            Province and Abbay River in the east, Enarjienawuga Woreda in the
            west, Southern Gonder Zone, and Goncha Sisso Enesa Woreda in the
            north, and the desert of Somma in the south.
          </Typography>
          <Typography style={textStyle}>
            Mertule Mariam is approximately located between 10°42‘ and 10°45‘N
            and 37°51‘E in Gojjam province of northwest Ethiopia, situated at an
            altitude of 2500 m above sea level, and close to the Choke Mountain.
          </Typography>
          <Typography style={textStyle}>
            Geographically, it occurs on the western fringes of the Choke
            Mountain range, the closest point being Motta, about 40 km away from
            Mertule Mariam town. It is generally a mountainous area, with the
            terrain consisting of cliffs, gorges, undulating slopes, patches of
            woodland, and lowland plateau. Many small streams originate in the
            mountains.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default MertuleMariamMonasteryPage;
