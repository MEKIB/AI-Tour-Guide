import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FasilGhebbi from "../../../assets/Gondar-1.jpg";

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

const FasilGhebbiHeritagePage = () => {
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
          <span style={breadcrumbTextStyle}> / Fasil Ghebbi</span>
        </div>
        <div style={heroStyle}>
          <img
            src={FasilGhebbi}
            alt="Fasil Ghebbi - The Camelot of Africa"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Fasil Ghebbi - The Camelot of Africa</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Dubbed as the Camelot of Africa, the city of Gondar — the capital of
            Ethiopia from 1636 until the mid 19th century — combines a modern
            veneer with an architectural sensibility harking back to the Middle
            Ages. The city’s physical and architectural centerpiece is Fasil
            Ghebbi, a stone-walled Royal Compound containing half a dozen
            fairytale castles including the three-story original built by
            Emperor Fasil in the 1630s. The Fasil Ghebbi UNESCO World Heritage
            Site also incorporates several more remote constructions, most
            notably the Church of Debre Berhan Selassie, with its beautifully
            painted interior.
          </Typography>

          <Typography style={sectionTitleStyle}>What to See?</Typography>
          <Typography style={textStyle}>
            Enclosed by tall stone walls, the central Fasil Ghebbi is a
            7-hectare ‘Royal Compound’ housing six fortified stone castles built
            from the 1630s onward. The most striking is Emperor Fasil’s
            three-story castle, which stands 32 meters high, and displays a
            blend of Portuguese, Indian, and indigenous Aksumite influences
            typical of the Gondarine style.
          </Typography>
          <Typography style={textStyle}>
            Consecrated in 1693 under Emperor Iyasu I, Debre Berhan Selassie
            (‘Mountain of the Enlightened Trinity) was the only major Gondarine
            church to survive the Mahdist attack of 1888 unscathed – thanks,
            legend has it, to the intervention of a virulent bee swarm. The
            ceiling, adorned with 17th-century paintings of 80 cherubic faces,
            is probably the most famous ecclesiastic artwork in Ethiopia.
          </Typography>
          <Typography style={textStyle}>
            The sunken Fasil’s Pool, overlooked by a two-story building
            attributed to Emperor Fasil, is where Gondar’s legendarily colorful
            annual Timkat (Ethiopian Epiphany) celebrations take place on
            January 19 (a day later in Leap Years).
          </Typography>
          <Typography style={textStyle}>
            Named after a Coptic convent in Egypt, the 18th-century Kuskuam
            Palace was constructed on the slopes of Debre Tsehay (Mountain of
            Sun) for the charismatic Empress Mentewab, wife of Emperor Bakaffa,
            and regent to their son Iyasu II and grandson Iyaos I.
          </Typography>
          <Typography style={textStyle}>
            On the northern outskirts of Gondar, an abandoned synagogue at
            Woleka evokes the story of Beta Israel, a ‘lost tribe’ of Ethiopian
            Jews whose last 10,000-or-so adherents were airlifted to Israel
            during the 1980s.
          </Typography>
          <Typography style={textStyle}>
            Old Gorgora, on the Lake Tana shore 65km south of Gondar, houses the
            most remote of the sites that comprise the Fasil Ghebbi UNESCO World
            Heritage Site: a ruined castle and Catholic church called Maryam
            Gimb.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Practical Information Before Your Trip to Gondar
          </Typography>
          <Typography style={sectionTitleStyle}>By Road</Typography>
          <Typography style={textStyle}>
            Gondar stands about 730km north of Addis Ababa, 176km north of Bahir
            Dar, and 355km southwest of Aksum. The drive from Aksum takes you
            through the very scenic Simien Mountains National Park.
          </Typography>

          <Typography style={sectionTitleStyle}>By Air</Typography>
          <Typography style={textStyle}>
            Daily flights connect Gondar to Addis Ababa, Lalibela, and Aksum
            (www.ethiopianairlines.com). The airport is about 17km south of the
            town center off the road to Bahir Dar. Most hotels offer a free
            airport transfer service, and taxis are also available.
          </Typography>

          <Typography style={sectionTitleStyle}>Getting Around</Typography>
          <Typography style={textStyle}>
            Taxis are widely available in the town center, and affordable.
            Several local operators offer day tours of the town and longer
            excursions to the Simien Mountains. When visiting Fasil Ghebbi, a
            knowledgeable local guide – optional but highly recommended – can be
            obtained at the guides association kiosk next to the ticket office.
          </Typography>

          <Typography style={sectionTitleStyle}>Accommodation</Typography>
          <Typography style={textStyle}>
            A good selection of hotels catering to all budgets can be found in
            the town center like Gondar hill resorts, Herfazy resort, Zobel
            Resort hotel, Goha Hotel, Haile resort Gondar, Kassahun Lodge, AG
            Hotel, Florida International Hotel, Jantekel Hotel, Taye Belay Hotel
            and others. For those who prefer to stay out of town, at least one
            good hotel or lodge can also be found at Kossoye (near Wunenia),
            Azazo (near the airport), and more distantly at Gorgora and in the
            Simien Mountains.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Annual Events and Festivals
          </Typography>
          <Typography style={textStyle}>
            Gondar is renowned as the best place to be during Timkat, with its
            unique cultural performances. Timkat is the Ethiopian Orthodox
            equivalent to Epiphany, celebrated on January 19 (a day later in
            Leap Years). The festival culminates in a crowded and colorful
            afternoon reenactment of the first baptism, held at the 17th century
            Fasil’s Pool, which is filled with water for the occasion.
          </Typography>

          <Typography style={sectionTitleStyle}>Things to Do</Typography>
          <Typography style={textStyle}>
            One of the cool things any visitors to Gondar can do is visiting the
            cultural night clubs in the night. It could be one of the highlights
            of your trip to Gondar.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default FasilGhebbiHeritagePage;
