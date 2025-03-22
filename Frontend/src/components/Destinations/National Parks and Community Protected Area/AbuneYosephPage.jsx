import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import AbuneYoseph from "../../../assets/abune-yoseph.jpg";

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

const sectionTitleStyle = {
  color: "#00ADB5",
  fontSize: "1.5rem",
  fontWeight: 600,
  marginBottom: "10px",
};

const textStyle = {
  fontSize: "1rem",
  lineHeight: "1.6",
  marginBottom: "15px",
};

const AbuneYosephPage = () => {
  return (
    <Box sx={{ background: "rgba(34, 40, 49, 0.8)", minHeight: "100vh" }}>
      <div style={containerStyle}>
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>
            Navigation
          </Link>
          <span style={breadcrumbTextStyle}> / </span>
          <Link to="/national-parks" style={breadcrumbLinkStyle}>
            National Parks
          </Link>
          <span style={breadcrumbTextStyle}> / Abune Yoseph</span>
        </div>
        <div style={heroStyle}>
          <img src={AbuneYoseph} alt="Abune Yoseph" style={heroImageStyle} />
          <h1 style={heroTitleStyle}>
            Abune Yoseph Community Conservation Area
          </h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            With the third highest peak in Ethiopia, the Abune Yoseph massif
            offers visitors stunning views and wildlife viewing opportunities.
            During the 2-5 day treks in Abune Yoseph /zigit and abohay gara
            Community Conservation Area (AZACCA), visitors can see an impressive
            array of flora and fauna including giant lobelia, troops of gelada
            baboons, and the rare Ethiopia wolf. Located north of Lalibela, the
            afro-montane environment offers a perfect complement to the cultural
            and historical experience of the Lalibela rock-hewn churches. During
            treks, visitors enjoy friendly hospitality in community-managed
            guest houses built out of local materials. Treks in Abune Yoseph
            bring visitors to over 4,000m and are not for the faint of heart.
            However, those that make the climb find the views and experience
            well worth it!
          </p>
          <h2 style={sectionTitleStyle}>What to See</h2>
          <p style={textStyle}>
            Of the 860 species of bird found in Ethiopia, over 220 have been
            identified on the Abune Yoseph massif. The Abune Yoseph area is one
            of the most important bird areas in the country. The Abune Yoseph
            Mountains also attract a few pairs of Golden Eagles – a species that
            is most common in the Bale Mountains to the south.
          </p>
          <p style={textStyle}>
            There are 43 known species of mammal on the Abune Yoseph massif. Of
            the 32 species of Abyssinian endemic mammals (endemic to Ethiopia
            and Eritrea), seven can be found in Abune Yoseph. The most
            spectacular of these are the Ethiopian wolf and gelada. Other
            species to look out for include: Golden jackal, hyena, caracal,
            leopard, rock hyrax, duiker, klipspringer, and Starck’s hare.
          </p>
          <p style={textStyle}>
            The highlands of Ethiopia have formed from volcanic eruptions 70 to
            5 million years ago that deposited a thick layer of basalt (volcanic
            rock) up to 3,000m deep in some places. During the Pleistocene
            period (2.6 million – 11,700 years ago) the highlands were glaciated
            and some areas were still glaciated up to 10,000 years ago.
          </p>
          <p style={textStyle}>
            Today, the area is characterized by steep cliffs and jagged peaks.
            The area’s diverse topography includes several high plateaus
            surrounded by gigantic eroded abysses dotted with the three highest
            peaks: the Big Zigit (4,080m), the Small Zigit (4,035m), and the Rim
            Gedel or Abune Yoseph peak (4,284m) which is the third highest peak
            in the country.
          </p>
          <h2 style={sectionTitleStyle}>Getting There</h2>
          <p style={textStyle}>
            One has to reach Lalibela to get to the Abune Yoseph mountains
            conservation area. Lalibela lies 170km from Weldiya, 300km from
            Bahir Dar, 360km from Gondar, and 390km from Aksum by road. All
            routes are surfaced but involve some travel on gravel. The shortest
            road distance between Addis Ababa and Lalibela is 680km via Dessie
            and Weldiya. Lalibela Airport, 25km from the town center along a
            surfaced road, is serviced by daily Ethiopian Airlines flights from
            Addis Ababa, Gondar, and Aksum (www.ethiopianairlines.com). All
            flights are met by private operators offering transfers into town.
            After you arrive in Lalibela the local guides will arrange your trip
            to the Abune Yoseph mountains.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default AbuneYosephPage;
