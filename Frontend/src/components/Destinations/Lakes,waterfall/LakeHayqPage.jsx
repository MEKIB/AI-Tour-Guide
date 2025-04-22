import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LakeHayqImage from "../../../assets/lake-hayq.jpg";

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

const LakeHayqPage = () => {
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
          <span style={breadcrumbTextStyle}> / Lake Hayq</span>
        </div>
        <div style={heroStyle}>
          <img src={LakeHayqImage} alt="Lake Hayq" style={heroImageStyle} />
          <h1 style={heroTitleStyle}>Lake Hayq</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Lake Hayq is a remarkable and picturesque feature in the
            northeastern landscape of Ethiopia. The lake has great significance
            to the riparian inhabitants in providing protein from fisheries,
            fresh water for drinking, and the preservation of sound ecosystems
            and biodiversity. Lake Hayq is a freshwater lake found outside the
            Great East African Rift Valley and it is one of the freshwater lakes
            in Ethiopia. It is located 30 km north of the town of Dessie and
            east of the small town of Hayq.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Geographical Overview
          </Typography>
          <Typography style={textStyle}>
            Lake Hayq is 6.7 km long and 6 km wide, with a surface area of 23
            km². It has a maximum depth of 88 m and is at an elevation of 2,030
            meters above sea level. It is one of two lakes in the surrounding
            area. The lake's location outside the Great East African Rift Valley
            makes it a unique freshwater body in Ethiopia, contributing to its
            ecological and cultural importance.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Historical and Religious Significance
          </Typography>
          <Typography style={textStyle}>
            The lake keeps one of the oldest monasteries and monastic schools in
            Ethiopia. Hayq St. Stephen Church is the earliest university of the
            Ethiopian Orthodox Church and a stepping stone for the
            evangelization process of the church to the central and southern
            parts of Ethiopia. Many prominent kings and Ethiopian Orthodox
            Church saints attended their religious and monastic education at
            Lake Hayq St. Stephen Church. Yikuno Amlak, who is said to have
            restored the Solomonic dynasty by the second half of the 13th
            century AD, is deemed to have attended his church education and
            received his coronation at Hayq St. Stephen Church. St.
            Tekelhaymanot, one of the prominent saints in the Ethiopian Orthodox
            Church who founded the monastery of Debere Asebo (later renamed
            Debere Libanos), Aba Giyorgis the Gascha who founded the Gascha
            monastery, and Abune Hirute Amelak, who founded Kibran Gebriel at
            Lake Tana, also attended their monastic education at Lake Hayq.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Scenic Beauty and Attractions
          </Typography>
          <Typography style={textStyle}>
            The clean water of the lake, surrounded by beautiful scenery, is one
            of the pulling potentials of the lake. Apart from that, the
            geographic features such as attractive mountains and gorges at the
            eastern side of the lake make it one of the scenic places in
            Ethiopia to travel. The combination of the lake's crystal-clear
            waters and the surrounding natural landscape offers a breathtaking
            experience for visitors seeking to explore Ethiopia's natural
            beauty.
          </Typography>

          <Typography style={sectionTitleStyle}>Travel Information</Typography>
          <Typography style={textStyle}>
            <strong>By Road:</strong> Lake Hayq is located 431 km from the
            capital, Addis Ababa, and 250 km from Lalibela. Daily buses run to
            Dessie and Woldia from Addis Ababa. It’s 30 km from Dessie and 90 km
            from Woldia.
          </Typography>
          <Typography style={textStyle}>
            <strong>By Flight:</strong> The nearby airport is Kombolcha, which
            has a scheduled weekly flight from Addis Ababa. For more
            information, visit{" "}
            <a href="http://ethiopianairlines.com" style={{ color: "#00ADB5" }}>
              ethiopianairlines.com
            </a>
            .
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default LakeHayqPage;
