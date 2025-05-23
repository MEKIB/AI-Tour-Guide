import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GeneteMaryamImage from "../../../assets/Genetemaryam.jpg";

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

const GeneteMaryamPage = () => {
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
          <span style={breadcrumbTextStyle}> / Genete Maryam</span>
        </div>
        <div style={heroStyle}>
          <img
            src={GeneteMaryamImage}
            alt="Genete Maryam"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Genete Maryam</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Found 22 km southeast of Lalibela, Genete Maryam is located on the
            road to Woldia town. On this road leads to a small village called
            Genete Maryam, and once again, a left turn about 1 km towards the
            north leads to the Church. It is a monolithic rock-hewn church with
            interesting architectural representations.
          </Typography>
          <Typography style={textStyle}>
            According to local tradition, Yekuno Amlak, the king who ‘restored’
            the Solomonic Dynasty in the late 13th century, established the
            church. The church resembles Bete-Medhane Alem, the house of the
            redeemer of the world, of the rock-hewn churches of Lalibela.
          </Typography>
          <Typography style={textStyle}>
            The church was first begun to be hewn by King Lalibela, and for an
            unknown reason, he left it unfinished. Later, it was completed
            during the reign of King Ne’akuto Le’ab (1215-1255) and shares
            similar features with the rock-hewn churches of Lalibela, for it was
            hewn from a single solid rock.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default GeneteMaryamPage;
