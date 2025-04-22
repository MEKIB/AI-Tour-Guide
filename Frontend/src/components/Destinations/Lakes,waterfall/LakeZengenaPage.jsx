import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LakeZengenaImage from "../../../assets/Lake-Zegena.jpg";

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

const LakeZengenaPage = () => {
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
          <span style={breadcrumbTextStyle}> / Lake Zengena</span>
        </div>
        <div style={heroStyle}>
          <img
            src={LakeZengenaImage}
            alt="Lake Zengena"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Lake Zengena</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Nestled high in the Awi Zone of the Amhara Region, Ethiopia, lies
            the captivating Zengena Lake. A pristine crater lake of remarkable
            depth and serene beauty, Zengena stands as a testament to the
            powerful geological forces that shaped this dramatic landscape.
            Situated conveniently close to the bustling Addis Ababa – Bahir Dar
            Highway, a mere 200 meters away, it offers an accessible yet
            profoundly tranquil escape for both locals and travelers. Perched at
            an elevation of approximately 2500 meters above sea level, the lake
            commands breathtaking panoramic views of the surrounding highlands,
            its deep blue waters reflecting the vast Ethiopian sky.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Geological Marvel: Depth and Formation
          </Typography>
          <Typography style={textStyle}>
            Zengena's most striking characteristic is its impressive depth.
            Ranking as the second deepest lake in Ethiopia, with a maximum
            recorded depth of 166 meters, it plunges into the earth's caldera,
            surpassed only by the enigmatic Lake Shalla. This remarkable depth,
            followed closely by Lake Tirba's 153 meters, underscores the unique
            geological history of the region. The sheer drop from the crater rim
            to the lake's bottom creates a sense of awe and mystery, inviting
            exploration and contemplation.
          </Typography>
          <Typography style={textStyle}>
            The lake's formation is intrinsically linked to volcanic activity.
            Born from the collapsed caldera of an ancient volcano, Zengena Lake
            occupies a near-perfect circular basin, boasting a diameter of
            roughly one kilometer. This classic crater lake morphology
            contributes significantly to its aesthetic appeal, its symmetrical
            form contrasting beautifully with the rugged terrain that cradles
            it. The steep slopes of the crater walls descend dramatically
            towards the water's edge, often adorned with lush vegetation,
            creating a vibrant tapestry of green and blue.
          </Typography>

          <Typography style={sectionTitleStyle}>
            A Closed Basin Ecosystem
          </Typography>
          <Typography style={textStyle}>
            Adding to its unique character is the fact that Zengena Lake is a
            closed basin, meaning it has no natural surface outlets or inlets.
            The water within the crater is primarily replenished by rainfall and
            groundwater seepage, while loss occurs through evaporation. This
            closed system contributes to the lake's distinct water chemistry and
            its delicate ecological balance. The absence of flowing water also
            lends to the lake's stillness, often creating mirror-like
            reflections of the surrounding landscape, enhancing its tranquil
            atmosphere.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Ecological Significance
          </Typography>
          <Typography style={textStyle}>
            The ecological significance of Zengena Lake, despite its relatively
            small size, is considerable. Its isolated nature and unique water
            chemistry likely support a distinct aquatic ecosystem. While
            detailed scientific studies on the lake's biodiversity may be
            limited, it is plausible that endemic or specialized species have
            adapted to its specific conditions. The surrounding vegetation on
            the crater slopes provides habitat for various terrestrial flora and
            fauna, contributing to the overall biodiversity of the region. The
            lake and its environs likely play a role in supporting local
            birdlife, attracting both resident and migratory species.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Cultural and Socio-Economic Potential
          </Typography>
          <Typography style={textStyle}>
            Beyond its natural wonders, Zengena Lake holds cultural and
            potential socio-economic significance for the local communities. Its
            serene beauty makes it an attractive spot for recreation and
            tourism, offering opportunities for activities such as hiking along
            the crater rim, birdwatching, and simply enjoying the peaceful
            ambiance. Responsible tourism initiatives could potentially benefit
            the local economy while ensuring the preservation of the lake's
            pristine environment. The lake may also hold cultural or spiritual
            significance for the people living in the Awi Zone, although further
            research would be needed to fully understand these aspects.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Environmental Challenges and Conservation
          </Typography>
          <Typography style={textStyle}>
            However, like many natural ecosystems, Zengena Lake faces potential
            environmental challenges. Given its closed nature, the lake is
            particularly vulnerable to pollution from surrounding human
            activities, including agricultural runoff and waste disposal.
            Changes in land use within the catchment area could also impact the
            lake's water quality and quantity. Sustainable management practices
            and community involvement are crucial to safeguarding the long-term
            health and beauty of this natural treasure.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default LakeZengenaPage;
