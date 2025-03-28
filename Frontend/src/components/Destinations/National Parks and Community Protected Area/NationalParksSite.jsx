import React from "react";

// Import placeholder images or your actual images
import AbuneYosephImage from "../../../assets/abune-yoseph.jpg";
import SemienMountainsImage from "../../../assets/Semien-Mountains.jpg";
import GunaMountainImage from "../../../assets/Guna.jpg";
import ChokeMountainImage from "../../../assets/Choke.jpg";
import BorenaSayintImage from "../../../assets/Borena.jpg";
import MenzGuassaImage from "../../../assets/Menz-Guassa.jpg";
import AlitashNationalParkImage from "../../../assets/Alitash.jpg";

// Attraction data
const attractions = [
  {
    title: "Abune Yoseph Community Conservation Area",
    description:
      "Considered to be one of the habitats of the elusive Ethiopian wolf, Abune Yoseph mountain is an important biodiversity zone in Amhara Region.",
    image: AbuneYosephImage,
  },
  {
    title: "The Semien Mountains National Park",
    description:
      "Famous for its dramatic highland scenery and endemic wildlife, The Semien Mountains National Park constitutes a world heritage site.",
    image: SemienMountainsImage,
  },
  {
    title: "Guna Mountain",
    description:
      "Mount Guna is the source of Gumara, Rib, and other rivers which flow down to the largest lake of Ethiopia; Lake Tana.",
    image: GunaMountainImage,
  },
  {
    title: "Choke Mountain",
    description:
      "Choke Mountain is a famous bio-diversity rich hotspot area found South of Lake Tana and is always dubbed to be the water tower of Ethiopia.",
    image: ChokeMountainImage,
  },
  {
    title: "Borena Sayint Worehimeno National Park",
    description:
      "The Borena Sayint National park is an area endowed with unspoiled nature and wilderness. The locals consider the park as a concealing place from aggressors.",
    image: BorenaSayintImage,
  },
  {
    title: "Menz Guassa Community Conservation Area",
    description:
      "Truly off the beaten track, the 98-sq-km Menz-Guassa Community Conservation Area has one of the smallest but best-protected Afro-alpine habitats in Ethiopia.",
    image: MenzGuassaImage,
  },
  {
    title: "Alitash National Park",
    description:
      "Called to be the green belt of the desert between Sudan and the northwestern part of Ethiopia, Alitash National Park is the hidden gem of Ethiopia.",
    image: AlitashNationalParkImage,
  },
];

// Styles to match Home page
const sectionStyle = {
  background: "rgba(34, 40, 49, 0.8)", // Dark overlay like Home page
  padding: "40px 0", // Vertical padding for section
};

const containerStyle = {
  width: "100%",
  maxWidth: "1200px", // Similar to Container maxWidth in MUI
  margin: "0 auto", // Center the content
  textAlign: "center",
};

const headingStyle = {
  color: "#00ADB5", // Teal heading
  fontSize: "2rem", // Matches Typography h4
  fontWeight: 600,
  marginBottom: "32px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive grid
  gap: "16px", // Matches gutter spacing
  padding: "0 16px", // Horizontal padding
};

const cardStyle = {
  background: "rgba(57, 62, 70, 0.8)", // Matches Home page card background
  color: "#EEEEEE", // Off-white text
  borderRadius: "16px", // Rounded corners
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", // Shadow effect
  transition: "transform 0.3s ease-in-out", // Hover animation
  overflow: "hidden", // Ensure content stays within bounds
};

const cardHoverStyle = {
  transform: "scale(1.05)", // Scale up on hover
};

const imageStyle = {
  width: "100%",
  height: "240px",
  objectFit: "cover",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
};

const contentStyle = {
  padding: "16px", // Matches CardContent padding
};

const titleStyle = {
  color: "#00ADB5", // Teal for headings
  fontSize: "1.5rem", // Matches Typography h6
  fontWeight: 600,
  marginBottom: "8px",
};

const descriptionStyle = {
  color: "#EEEEEE", // Off-white for description
  fontSize: "0.875rem", // Matches Typography body2
};

const NationalParkSites = () => {
  return (
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
            >
              <img
                alt={attraction.title}
                src={attraction.image}
                style={imageStyle}
              />
              <div style={contentStyle}>
                <h4 style={titleStyle}>{attraction.title}</h4>
                <p style={descriptionStyle}>{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NationalParkSites;
