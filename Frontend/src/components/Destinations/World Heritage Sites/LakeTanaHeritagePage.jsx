import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LakeTana from "../../../assets/Lake-Tana.jpg";

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

const LakeTanaHeritagePage = () => {
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
            Navigation
          </Link>
          <span style={breadcrumbTextStyle}> / </span>
          <Link to="/worldheritagesites" style={breadcrumbLinkStyle}>
            World Heritage Sites
          </Link>
          <span style={breadcrumbTextStyle}> / Lake Tana</span>
        </div>
        <div style={heroStyle}>
          <img
            src={LakeTana}
            alt="Lake Tana Biosphere Reserve"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Lake Tana Biosphere Reserve</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            A mesmerizing inland sea fringed by lush tropical vegetation, the
            3,156 km² Lake Tana Biosphere Reserve is most easily explored from
            Bahir Dar, a well-equipped port city that doubles as the capital of
            the Amhara Region. The source of the Blue Nile, Tana was known to
            the ancient Egyptians as Coloe, while the ancient Greeks extolled it
            as the ‘copper-tinted… jewel of Ethiopia’. In June 2015, Lake Tana
            became the centerpiece of a 5,000 km² UNESCO biosphere reserve.
          </Typography>

          <Typography style={sectionTitleStyle}>What to See?</Typography>
          <Typography style={textStyle}>
            Sites of interest in Lake Tana and Bahir Dar include the lake’s many
            picturesque island monasteries, most of which date to medieval
            times, and the stupendous Blue Nile Falls south of Bahir Dar.
          </Typography>
          <Typography style={textStyle}>
            Its sprawling daily market is a fun place to explore, weaving
            between stalls that sell everything from traditional handicrafts to
            fresh tropical fruit. It also hosts several tourist-friendly
            traditional music venues.
          </Typography>
          <Typography style={textStyle}>
            Bahir Dar’s oldest architectural landmarks are the medieval church
            of Bahir Dar Giyorgis and an adjacent stone tower built for Emperor
            Susenyos in the 1620s.
          </Typography>
          <Typography style={textStyle}>
            At least 20 old monasteries stud the forested islands and peninsulas
            of Lake Tana. Many were established during the 14th-century AD rule
            of Amda Tsion, but others, most notably Tana Chirkos, with its trio
            of ancient Judaic sacrificial pillars, might date back thousands of
            years.
          </Typography>
          <Typography style={textStyle}>
            The most popular monastery with tourists, due to its proximity to
            Bahir Dar and tolerance of female visitors, is Ura Kidane Mihret,
            which contains some of Ethiopia’s finest ecclesiastic artwork in
            Ethiopia and also has a superb museum. For adventurous seafarers, a
            full-day boat outing is required to visit the equally worthwhile but
            more remote likes of Daga Istafanos, Tana Chirkos, or Narga
            Selassie.
          </Typography>
          <Typography style={textStyle}>
            Tana supports remarkable biodiversity. More than 20 fish species are
            endemic to the lake. Hippos are frequently seen within walking
            distance of Bahir Dar. Birdlife ranges from flotillas of great white
            pelicans to colorful weavers and their neat little nests, to the
            African fish eagles that perform a haunting duet high in the trees.
            The conservationist ethos of the Ethiopian Orthodox Church means
            that many of the lake’s monasteries double as virtual nature
            sanctuaries, protecting a range of forest birds and monkeys.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Practical Information Before Your Trip to Lake Tana
          </Typography>
          <Typography style={sectionTitleStyle}>Getting There</Typography>
          <Typography style={textStyle}>
            Bahir Dar lies 484 km northwest of Addis Ababa and 175km south of
            Gondar along good surfaced roads. Ethiopian Airlines
            (www.ethiopianairlines.com) operates daily flights connecting Bahir
            Dar to Addis Ababa, Lalibela, and Aksum. The airport is 5km west of
            the town center and taxis are available there. There are no flights
            between Gondar and Bahir Dar, so most operators drive between the
            two. Trips can be organized using local tour operators based in the
            main towns.
          </Typography>

          <Typography style={sectionTitleStyle}>Getting Around</Typography>
          <Typography style={textStyle}>
            Taxis and bajaji (tuc-tucs) are available to explore the town center
            and environs. Several local operators offer half-day trips to the
            Blue Nile Falls. The best way to explore the lake monasteries is on
            a boat trip arranged through your hotel, the Lake Tana Tour Guide
            Association, or one of several operators in the Marine Authority
            compound.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default LakeTanaHeritagePage;
