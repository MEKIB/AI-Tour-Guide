import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AbuneYoseph from "../../../assets/abune-yoseph.jpg";
import SemienMountainsImage from "../../../assets/Semien-Mountains.jpg";
import GunaMountainImage from "../../../assets/Guna.jpg";
import ChokeMountainImage from "../../../assets/Choke.jpg";
import BorenaSayintImage from "../../../assets/Borena.jpg";
import MenzGuassaImage from "../../../assets/Menz-Guassa.jpg";
import AlitashNationalParkImage from "../../../assets/Alitash.jpg";

const attractions = [
  {
    title: "Abune Yoseph Community Conservation Area",
    image: AbuneYoseph,
    path: "/national-parks/abune-yoseph",
  },
  {
    title: "The Semien Mountains National Park",
    image: SemienMountainsImage,
    path: "/national-parks/semien-mountains",
  },
  {
    title: "Guna Mountain",
    image: GunaMountainImage,
    path: "/national-parks/guna-mountain",
  },
  {
    title: "Choke Mountain",
    image: ChokeMountainImage,
    path: "/national-parks/choke-mountain",
  },
  {
    title: "Borena Sayint Worehimeno National Park",
    image: BorenaSayintImage,
    path: "/national-parks/borena-sayint",
  },
  {
    title: "Menz Guassa Community Conservation Area",
    image: MenzGuassaImage,
    path: "/national-parks/menz-guassa",
  },
  {
    title: "Alitash National Park",
    image: AlitashNationalParkImage,
    path: "/national-parks/alitash",
  },
];

const sectionStyle = {
  background: "rgba(34, 40, 49, 0.8)",
  padding: "40px 0",
};

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  textAlign: "center",
};

const headingStyle = {
  color: "#00ADB5",
  fontSize: "2rem",
  fontWeight: 600,
  marginBottom: "32px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "16px",
  padding: "0 16px",
};

const cardStyle = {
  background: "rgba(57, 62, 70, 0.8)",
  color: "#EEEEEE",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  transition: "transform 0.3s ease-in-out",
  overflow: "hidden",
  cursor: "pointer",
};

const cardHoverStyle = {
  transform: "scale(1.05)",
};

const imageStyle = {
  width: "100%",
  height: "240px",
  objectFit: "cover",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
};

const contentStyle = {
  padding: "16px",
};

const titleStyle = {
  color: "#00ADB5",
  fontSize: "1.5rem",
  fontWeight: 600,
  marginBottom: "8px",
};

const heroTitleStyle = {
  color: "#00ADB5",
  fontSize: "2rem",
  fontWeight: 600,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  marginBottom: "16px",
};

const NationalParksAndSites = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
        }}
      >
        <img
          src={AbuneYoseph}
          alt="Abune-yoseph"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 1,
            width: "100%",
          }}
        >
          <h1 style={heroTitleStyle}>
            National Parks and Community Protected Area
          </h1>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "60px",
            background: "linear-gradient(rgba(0, 0, 0, 0.2), transparent)",
          }}
        />
      </Box>
      <div style={sectionStyle}>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Protected Areas</h3>
          <div style={gridStyle}>
            {attractions.map((attraction) => (
              <div
                key={attraction.title}
                style={cardStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = cardHoverStyle.transform)
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                onClick={() => navigate(attraction.path)}
              >
                <img
                  alt={attraction.title}
                  src={attraction.image}
                  style={imageStyle}
                />
                <div style={contentStyle}>
                  <h4 style={titleStyle}>{attraction.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NationalParksAndSites;
