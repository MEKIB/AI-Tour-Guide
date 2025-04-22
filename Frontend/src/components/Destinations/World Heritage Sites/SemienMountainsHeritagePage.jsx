import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SemienMountains from "../../../assets/Semien-Mountains.jpg";

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

const SemienMountainsHeritagePage = () => {
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
          <span style={breadcrumbTextStyle}> / Semien Mountains</span>
        </div>
        <div style={heroStyle}>
          <img
            src={SemienMountains}
            alt="The Semien Mountains National Park"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>The Semien Mountains National Park</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Ethiopia’s premier trekking and walking destination, the 412km2
            Simien Mountains National Park was inscribed as a Natural World
            Heritage Site in 1979, whereupon UNESCO lauded it as “one of the
            world’s most spectacular landscapes, with jagged mountain peaks deep
            valleys and sharp precipices dropping some 1,500m”. In addition to
            the splendid scenery and hiking opportunities, the Afromontane
            meadows and moorlands of the upper Simiens also form one of
            Ethiopia’s most important biodiversity hotspots, populated by an
            alluring wealth of endemic plants and animals including Walia ibex,
            gelada baboon, and Ethiopian wolf.
          </Typography>

          <Typography style={sectionTitleStyle}>What to See?</Typography>
          <Typography style={textStyle}>
            The bedrock of the Simien Mountains comprises a vast and ancient
            basaltic dome molded into a series of jagged pinnacles and
            buttresses by glacial activity and precipitation. More than a dozen
            of its peaks top the 4,000m mark, including the 4,533m Ras Dejen,
            which is Ethiopia’s tallest mountain.
          </Typography>
          <Typography style={textStyle}>
            The Afromontane vegetation of the Simien Mountains includes more
            than 1,200 plant species, of which three are endemic to the national
            park. Above 3,700m, the dominant vegetation type is open grassland
            punctuated by spectacular giant lobelias that stand up to 10m high.
            Giant heather trees and other ericaceous plants are the main
            vegetation type between the 3,000m and 3,700m contour.
          </Typography>
          <Typography style={textStyle}>
            Simien protects an alluring selection of endemic wildlife. It is the
            last remaining stronghold of the impressively horned Walia ibex, the
            only goat indigenous to sub-Saharan Africa. Large troops of gelada
            baboon are rendered unmistakable by the male’s flowing lion-like
            mane and heart-shaped red chest patch. A population of around 50
            Ethiopian wolves is the world’s second-largest after Bale Mountains
            National Park. Other large mammals include Anubis baboon, Hamadryas
            baboon, grivet monkey, Menelik’s bushbuck, klipspringer, common
            jackal, spotted hyena, and leopard.
          </Typography>
          <Typography style={textStyle}>
            Simien Mountains National Park is one of northern Ethiopia’s key
            birding sites, with a checklist of 180 species that includes five
            Ethiopian endemics and 12 near-endemics. However, many would say the
            true avian star of the Simien is the magnificent lammergeyer, a
            cliff-loving vulture with a 2-meter wingspan and the only bird in
            the world with a specialized diet of bone marrow.
          </Typography>
          <Typography style={textStyle}>
            The best way to explore the Simien Mountains is on foot or mule
            back. Several overnight options are available. The 3-day trial
            connecting Sankaber, Gich, Imet Gogo, and Ayna Meda is recommended
            to those whose main interest is endemic wildlife. For peak-baggers,
            the ascent to the summit of Ras Dejen could be undertaken as a 3-day
            hike from Chennek. For those with limited time, it is possible to
            drive east from Debark to Chennek along an all-weather road and to
            exit the car for short walks.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Practical Information Before Your Trip to the Simien Mountains
            National Park
          </Typography>
          <Typography style={sectionTitleStyle}>Getting There</Typography>
          <Typography style={textStyle}>
            <strong>By road:</strong> Debark, the junction town for the national
            park lies 830km from Addis Ababa, 275km from Bahir Dar, and 100km
            from Gondar along a surfaced road. It is 250km southwest of Aksum
            along a zigzag road and a newly asphalted road. The 100km drive from
            Gondar to Debark takes up to two hours. Transport can be provided by
            any operator in Gondar and taxis are also available to do the run.
            The entrance gate at Buyit Ras is 14km east of Debark. Transport
            there, or to any of the lodges or camps, can be arranged through the
            national park office in Debark or using local tour operators located
            in the main towns.
          </Typography>
          <Typography style={textStyle}>
            <strong>By air:</strong> The closest airport is in Gondar. This is
            connected to Addis Ababa, Lalibela, and Aksum by daily flights with
            Ethiopian Airlines (www.ethiopianairlines.com).
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default SemienMountainsHeritagePage;
