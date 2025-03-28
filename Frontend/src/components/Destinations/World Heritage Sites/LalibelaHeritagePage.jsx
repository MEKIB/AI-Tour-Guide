import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Lalibela from "../../../assets/Lalibela-1.jpg";

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

const LalibelaHeritagePage = () => {
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
          <Link to="/worldheritagesites" style={breadcrumbLinkStyle}>
            World Heritage Sites
          </Link>
          <span style={breadcrumbTextStyle}> / Lalibela</span>
        </div>
        <div style={heroStyle}>
          <img
            src={Lalibela}
            alt="The Rock Hewn Churches of Lalibela"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>The Rock Hewn Churches of Lalibela</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Comprising eleven churches and two chapels, Ethiopia’s labyrinthine
            ‘New Jerusalem’, excavated by King Lalibela in the 12th century and
            still in active use today, has been dubbed the “Eighth Wonder of the
            World”. Hand-carved into the rock flake by painstaking flake, a
            process that would have required around 40,000 man-years to
            complete, Lalibela represents the apex of an Ethiopian
            church-excavating tradition that dates to the arrival of
            Christianity circa 350 AD.
          </Typography>

          <Typography style={sectionTitleStyle}>What to See?</Typography>
          <Typography style={textStyle}>
            Many of Lalibela’s churches are subterranean monoliths, created in
            two stages. First, a quadrangle of trenches up to 15 meters deep
            would be hand-cut into a horizontal rock surface. Only then could
            the artisans commence work on the actual church, which was excavated
            into a massive freestanding central block enclosed by the artificial
            trenches.
          </Typography>
          <Typography style={textStyle}>
            The church of Bete Medhane Alem, set in one such subterranean
            courtyard, is the world’s largest rock-hewn excavation, supported by
            36 internal and 36 external pillars.
          </Typography>
          <Typography style={textStyle}>
            The most iconic church at Lalibela, Bete Giyorgis is a free-standing
            monolith carved in the shape of a cross and dedicated to its
            namesake Saint George. Legend has it that Saint George was so
            delighted when he saw his church that he rode his horse right over
            the entrance tunnel, leaving behind hoof prints that are still
            visible today.
          </Typography>
          <Typography style={textStyle}>
            The impact of Lalibela is not limited to its architecture. This is
            also one of the very few UNESCO World Heritage Sites of comparable
            vintage that functions as a living shrine, one whose ancient stone
            churches have remained in active use since their excavation almost
            nine centuries ago.
          </Typography>
          <Typography style={textStyle}>
            The countryside around Lalibela is studded with many other ancient
            churches. These include Yemrehanna Kristos, one of the finest
            surviving examples of Aksumite architecture, constructed in the 11th
            century with alternating layers of wood and gypsum-faced granite.
          </Typography>

          <Typography style={sectionTitleStyle}>Getting There</Typography>
          <Typography style={textStyle}>
            Lalibela lies 170km from Weldiya, 300km from Bahir Dar, 360km from
            Gondar, and 390km from Aksum by road. All routes are mostly surfaced
            but involve some travel on gravel. The shortest road distance
            between Addis Ababa and Lalibela is 680km via Dessie and Weldiya.
            Lalibela Airport, 25km from the town center along a surfaced road,
            is serviced by daily Ethiopian Airlines flights from Addis Ababa,
            Gondar, Bahir Dar, and Aksum (www.ethiopianairlines.com). All
            flights are met by private operators offering transfers into town.
          </Typography>

          <Typography style={sectionTitleStyle}>Getting Around</Typography>
          <Typography style={textStyle}>
            The complex of 11 churches in Lalibela town can only be explored on
            foot. A guide is strongly recommended and can be obtained at the
            ticket office outside the Northern church cluster. Transport and
            logistics for visiting other churches further afield can be handled
            by most hotels and guides, local tour operators, or the Community
            Tourism Guiding Enterprise.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default LalibelaHeritagePage;
