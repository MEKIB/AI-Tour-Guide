import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GishenImage from "../../../assets/GishenMaryam.jpg"; // Placeholder image path; replace with actual image

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

const GishenPage = () => {
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
          <span style={breadcrumbTextStyle}> / Gishen</span>
        </div>
        <div style={heroStyle}>
          <img src={GishenImage} alt="Gishen" style={heroImageStyle} />
          <h1 style={heroTitleStyle}>Gishen</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Gishen is one of the places of immense significance for the
            Ethiopian Church and Ethiopian Orthodox Christians, perhaps even for
            Christianity itself. It has got a portion of the cross on which
            Jesus Christ was crucified. The Bible explicitly suggests that the
            first Christian convert was the Ethiopian eunuch, as written in Acts
            8.
          </Typography>
          <Typography style={textStyle}>
            Before the disciples of Jesus went outside of Israel to preach
            Christ, Philip the Evangelist happened to meet an Ethiopian eunuch
            who posed questions about the Christian faith and Jesus Christ
            before he embraced Christianity. Later on, he came back to Ethiopia
            and preached the faith. The originality of Christianity in Ethiopia
            and the Ethiopian church is partly attributed to that story.
          </Typography>
          <Typography style={textStyle}>
            Ethiopian Church teaching has it that the Cross on which Jesus was
            crucified continued to do miracles and heal patients after the
            ascension of Jesus Christ. Descendants of the establishment that
            crucified Jesus Christ were embarrassed about it so much so that
            they had to hide the cross; they dug deep, buried it, and made the
            place where it was buried a dumping place.
          </Typography>
          <Typography style={textStyle}>
            Sometime in the fourth century, Empress Eleni, who was said to have
            spiritual guidance, started the search for it, located and uncovered
            it after excavation work. Thereafter, the cross lived in Jerusalem
            for centuries and was later shared by the then-powerful countries.
            That’s how Ethiopia got a piece of it.
          </Typography>
          <Typography style={textStyle}>
            Emperor Zera Yacob, known in history as Ethiopia’s philosopher king,
            after experiencing spiritual revelation, is said to have led an
            exploration in search of a cross-shaped topography in Ethiopia where
            he was supposed to place the Cross as per the assignment to do so.
            The search ended where the present-day Gishen is located—a perfect
            cross-shaped plateau.
          </Typography>
          <Typography style={textStyle}>
            Gishen is in North Central Ethiopia in what is now the Amhara
            regional state, North Wollo zone. The cross is referred to as, in
            Ethiopia, Gimade Meskel. It was placed in Gishen on Meskerem 21
            sometime in the mid-15th century Ethiopian Calendar (on September 30
            in the Gregorian Calendar). The church of Egziabhier Ab (translates
            to God the Father) stands, for over many hundreds of years now,
            where the cross is kept. The Church of Virgin Mary stands adjacent
            to it.
          </Typography>
          <Typography style={textStyle}>
            On this day every year, thousands of Ethiopians make a pilgrimage to
            the holy place of Gishen. Many, in fact, walk more than 82
            kilometers from the town of Dessie in a deliberate move to make the
            pilgrimage more meaningful. It takes a hike through mountainous
            topography before reaching the holy place.
          </Typography>
          <Typography style={textStyle}>
            In addition to believers in Ethiopia, the place has become a
            destination for people who make religious travel even from outside
            of Ethiopia.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default GishenPage;
