import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BlueNileFallsImage from "../../../assets/blue-nile.jpg";

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
const sectionTitleStyle = {
  color: "#00ADB5",
  fontSize: "1.5rem",
  fontWeight: 600,
  marginTop: "20px",
  marginBottom: "10px",
};

const BlueNileFallsPage = () => {
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
          <Link to="/lakeAndWaterfall" style={breadcrumbLinkStyle}>
            Lakes, Hot Springs, and Waterfalls
          </Link>
          <span style={breadcrumbTextStyle}> / Blue Nile Falls</span>
        </div>
        <div style={heroStyle}>
          <img
            src={BlueNileFallsImage}
            alt="Blue Nile Falls"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Blue Nile Falls</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            The 18th-century Scottish traveler James Bruce described the Blue
            Nile Falls as ‘a magnificent sight, that ages, added to the greatest
            length of human life, would not efface or eradicate from my memory.’
            Particularly in the rainy season, the waterfall known locally as Tis
            Isat (Water that Smokes) is a sensational sight, kicking up a
            thunderous wall of spray as it crashes over a 45-meter high cliff
            before being channeled into a frothing gorge. From the village of
            Tis Abay, a splendid series of full-frontal viewpoints can be
            reached along a 1.5km footpath across the 17th-century Alata Bridge.
            Birders should check the riverine forest here for endemics and
            near-endemics such as blue-breasted bee-eater, white-cheeked turaco,
            black-winged lovebird, and yellow-fronted parrot.
          </Typography>

          <Typography style={sectionTitleStyle}>What to See</Typography>
          <Typography style={textStyle}>
            The road to the Blue Nile Falls is picturesque, offering a scenic
            journey through a staggering landscape on the route to the falls.
            Visitors can enjoy the sight of different bird species soaring over
            the falls, adding to the natural splendor. One of the oldest bridges
            in Ethiopia, the 17th-century Alata Bridge, is also located at the
            nose of the waterfall, providing a historical element to the visit.
            The combination of the thundering falls, the historic bridge, and
            the rich birdlife makes this a must-visit destination.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Practical Information Before Your Trip
          </Typography>
          <Typography style={textStyle}>
            <strong>Getting There:</strong> The Blue Nile Falls are accessed
            from the city of Bahir Dar, which is located 484 km from the
            capital, Addis Ababa. Daily Ethiopian Airlines flights connect Addis
            Ababa and Bahir Dar. The Blue Nile Falls are 30 km away from Bahir
            Dar, accessible via a drive on a tarmac road.
          </Typography>
          <Typography style={textStyle}>
            <strong>Getting Around:</strong> As the area is blessed with
            staggering scenic views, hiking around near the waterfall is highly
            recommended. The landscape, the sound of the blistering waterfall,
            and the droplets of the plunging falls will make your experience
            unforgettable. The footpath from Tis Abay offers excellent
            opportunities to immerse yourself in the natural beauty of the area.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default BlueNileFallsPage;
