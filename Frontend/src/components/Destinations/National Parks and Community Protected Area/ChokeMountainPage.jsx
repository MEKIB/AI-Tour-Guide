import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ChokeMountainImage from "../../../assets/Choke.jpg";

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};

const breadcrumbStyle = {
  marginBottom: "20px",
};

const breadcrumbLinkStyle = {
  color: "#00ADB5",
  textDecoration: "none",
  fontSize: "1rem",
};

const breadcrumbTextStyle = {
  color: "#EEEEEE",
  fontSize: "1rem",
};

const heroStyle = {
  position: "relative",
  width: "100%",
  height: "400px",
  overflow: "hidden",
  borderRadius: "16px",
  marginBottom: "20px",
};

const heroImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

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

const textStyle = {
  fontSize: "1rem",
  lineHeight: "1.6",
  marginBottom: "15px",
};

const ChokeMountainPage = () => {
  return (
    <Box sx={{ background: "rgba(34, 40, 49, 0.8)", minHeight: "100vh" }}>
      <div style={containerStyle}>
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>
            Home
          </Link>
          <span style={breadcrumbTextStyle}> / </span>
          <Link to="/national-parks" style={breadcrumbLinkStyle}>
            National Parks
          </Link>
          <span style={breadcrumbTextStyle}> / Choke Mountain</span>
        </div>
        <div style={heroStyle}>
          <img
            src={ChokeMountainImage}
            alt="Choke Mountain"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Choke Mountain</h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            The Choke Mountains are a large block of highland found in central
            Gojjam, from Aba Felassie forest (near Debre Work) in the east and
            close to Tillili town in the west. The mountain range is located on
            a plateau that rises from a block of meadows and valleys at 2800m
            asl, rising to the highest point of the range, Mount Choke, at 4184m
            asl, located north of Debre Markos.
          </p>
          <p style={textStyle}>
            The mountain, which is known by its bio-diversity rich hotspot, is a
            water tower of the upper Blue Nile Basin and a source of over 60
            rivers and 270 springs. Choke watershed extends from tropical alpine
            environments at over 4000m elevation to the hot and dry Blue Nile
            gorge that includes areas below 1000m elevation, and contains a
            diversity of slope forms and soil types. The watershed has six
            different agro-ecology zones with various bio-diversity and the
            source of many tributaries to the Nile. The majority part of it is
            covered by mountains and gorges, which are sources of river waters
            that are mostly tributary to the Blue Nile. Choke Mountain by itself
            contributes more than 10% of the Nile water, so the ecosystem is not
            invaluable for just Ethiopia but also the downstream countries.
          </p>
          <p style={textStyle}>
            In addition to the approximately 3386 km² wetland area, the mountain
            is endowed with resources for recreation. The watershed covers most
            parts of the Upper Blue Nile Gorge, historical places and heritages,
            and partly fertile arable lands. The area has physical diversity and
            accompanying socioeconomic contrasts.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default ChokeMountainPage;
