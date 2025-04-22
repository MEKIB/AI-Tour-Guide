import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LakeTirbaImage from "../../../assets/Lake-tribe.jpg";

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

const LakeTirbaPage = () => {
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
          <span style={breadcrumbTextStyle}> / Lake Tirba</span>
        </div>
        <div style={heroStyle}>
          <img src={LakeTirbaImage} alt="Lake Tirba" style={heroImageStyle} />
          <h1 style={heroTitleStyle}>Lake Tirba</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Nestled within the verdant highlands of the Awi Zone in the Amhara
            Region of Ethiopia lies the captivating Crater Lake of Tirba. Unlike
            its more readily accessible neighbor, Lake Zengena, Tirba offers a
            sense of secluded tranquility, rewarding those who venture to its
            shores with breathtaking natural beauty and a rich tapestry of life.
            This hidden gem, while requiring a bit more effort to reach,
            presents an unparalleled opportunity to immerse oneself in the
            pristine environment of an Ethiopian crater lake.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Access and Seasonal Dynamics
          </Typography>
          <Typography style={textStyle}>
            Connected to the main Bahir Dar – Debre Markos highway by a
            dry-weather road originating from the zonal administration seat,
            access to Lake Tirba presents a unique seasonal dynamic. During the
            drier months, vehicles can navigate the path, bringing visitors
            closer to the lake's embrace. However, with the onset of the rainy
            season, the road often becomes impassable, transforming the journey
            into a scenic 40-minute trek on foot or horseback from the small
            town of Gemeja Bet. This seasonal inaccessibility arguably
            contributes to the lake's unspoiled character, preserving its
            natural allure and limiting the impact of mass tourism. The journey
            itself becomes an integral part of the Tirba experience, offering
            glimpses into the rural life and the stunning landscapes of the Awi
            Zone.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Natural Beauty and Geological Features
          </Typography>
          <Typography style={textStyle}>
            The effort required to reach Lake Tirba is handsomely compensated by
            the sheer beauty that unfolds upon arrival. Like Zengena, Tirba
            occupies the caldera of an extinct volcano, its deep blue waters
            cradled by steep crater walls. While its maximum depth of 153 meters
            ranks it as the third deepest lake in Ethiopia, after Zengena and
            Shalla, its intimate setting and the surrounding environment create
            a unique atmosphere. The scale of the crater, while impressive,
            feels more enclosed and personal, fostering a sense of connection
            with the natural world.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Lush Forest Cover and Ecosystem
          </Typography>
          <Typography style={textStyle}>
            One of the defining characteristics of the Tirba area is its lush
            forest cover. The slopes of the crater, and the surrounding
            highlands, are adorned with a rich and diverse array of indigenous
            trees and vegetation. This verdant embrace not only contributes to
            the visual splendor of the lake but also plays a crucial role in
            maintaining the local ecosystem. The forests act as a natural
            buffer, protecting the lake's water quality and providing habitat
            for a multitude of species. The air is often fresh and crisp,
            carrying the subtle scents of the forest, further enhancing the
            sense of tranquility.
          </Typography>

          <Typography style={sectionTitleStyle}>
            A Haven for Birdlife
          </Typography>
          <Typography style={textStyle}>
            The dense vegetation surrounding Lake Tirba makes it a haven for
            birdlife. The area is renowned for hosting a significant number and
            variety of bird species, making it a paradise for ornithologists and
            birdwatching enthusiasts. The calls and songs of different birds
            echo through the trees, adding a vibrant soundtrack to the serene
            landscape. Observing the diverse avian population, from colorful
            endemic species to migratory visitors, is a rewarding experience for
            anyone who appreciates the wonders of nature. The lake itself likely
            supports its own unique aquatic life, although further ecological
            studies would be beneficial to fully understand the biodiversity it
            harbors.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Cultural Significance
          </Typography>
          <Typography style={textStyle}>
            Beyond its ecological significance, Lake Tirba likely holds cultural
            importance for the local communities. The remoteness of the lake and
            the surrounding forests may have imbued it with traditional beliefs
            and spiritual significance. The journey to the lake, particularly
            during the rainy season, could be seen as a form of pilgrimage or a
            connection to the natural world that sustains them. Further
            anthropological research could shed light on the cultural narratives
            and practices associated with this hidden gem.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Conservation Challenges
          </Typography>
          <Typography style={textStyle}>
            However, the very factors that contribute to Tirba's charm – its
            relative inaccessibility and pristine environment – also make it
            potentially vulnerable. As development progresses and access
            improves, there is a risk of increased human impact, including
            potential pollution and habitat degradation. Sustainable tourism
            initiatives, carefully planned and implemented in collaboration with
            local communities, are crucial to ensure that the lake's natural
            beauty and ecological integrity are preserved. Balancing the desire
            to share this remarkable place with the need to protect it for
            future generations is a key challenge.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default LakeTirbaPage;
