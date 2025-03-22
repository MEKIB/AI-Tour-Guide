import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import AlitashNationalParkImage from "../../../assets/Alitash.jpg";

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

const AlitashPage = () => {
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
          <span style={breadcrumbTextStyle}> / Alitash</span>
        </div>
        <div style={heroStyle}>
          <img
            src={AlitashNationalParkImage}
            alt="Alitash National Park"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Alitash National Park</h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            Alitash National Park is bordered by Dinder National Park of Sudan,
            which upholds its ideal site for an ecological corridor to wildlife
            conservation, transboundary tourism, and ecotourism. The park, which
            covers an area of 2665 km² of land and is situated at an altitude of
            500-900 meters above sea level, is the largest in the region and the
            fourth largest in Ethiopia. Above and beyond the affluence of flora
            and fauna, it is also enriched with historical, cultural, and
            traditional attractions.
          </p>
          <h2 style={sectionTitleStyle}>What to See?</h2>
          <p style={textStyle}>
            <strong>Wildlife:</strong> Elephant, Greater and Lesser Kudu, Lion,
            and Leopard.
          </p>
          <p style={textStyle}>
            <strong>Birds:</strong> Ostrich, Chestnut-billed Starling, and other
            starlings. Undulating savannah plains interrupted by valleys,
            streams, scattered hills, and seasonal wetlands make this National
            Park a great destination. A visit to Alitash also offers the chance
            for observing rich cultural interactions and historical sites.
          </p>
          <p style={textStyle}>
            <strong>History:</strong> The area is known during the Italian
            invasion (1936-1941). Haile Selassie I lived in England in exile and
            returned to his homeland after the war. After 5 years of exile in
            England, Emperor Haile Selassie I returned to Ethiopia through Sudan
            and spent 7 days at Omedla, a place found at the edge of this park.
            For his rest, a temporary cave was prepared from a big tree. The
            cave had the capacity to accommodate eight people and some more
            space to shelve books. On the tree, there are entrance doors, which
            are carved with the first letters of the king’s full name (ቀ.ኃ.ሥ)
            ‘Kedamawi Haile Selassie’ (Haile Selassie I), and a seat for a
            guard. The lifestyle of the population of the area and their ways of
            dressing create a beautiful mix and hence are special attractions
            worth visiting.
          </p>
          <h2 style={sectionTitleStyle}>Getting There</h2>
          <p style={textStyle}>
            <strong>By Road:</strong> Alatish is a newly established national
            park located in Quara woreda of Western Gondar Zone. It is only
            accessible by cars. It is located 460 kilometers away from Bahir
            Dar, 204 kilometers from Gondar, and 187 kilometers from Metema
            Yohannes town. One has to drive to the small town of Tewodros Ketema
            from Gondar or Metema Yohannes via the town of Shawera. Then one has
            to drive to the park with a poor gravel road.
          </p>
          <p style={textStyle}>
            <strong>By Flight:</strong> The closest airport to the park is
            Gondar airport. Then driving to Tewodros Ketema and then to the park
            with a rented car is a must.
          </p>
          <h2 style={sectionTitleStyle}>Getting Around</h2>
          <p style={textStyle}>
            Once you arrive at the park, the wardens will take you around within
            the park.
          </p>
          <h2 style={sectionTitleStyle}>Accommodation</h2>
          <p style={textStyle}>
            There is a campsite and eco-tourism lodge inside the park. However,
            the small town of Gelegu or Tewodros Ketema at the gate of the park
            offers some basic accommodations.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default AlitashPage;
