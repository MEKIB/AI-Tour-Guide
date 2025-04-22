import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import WanzayeHotspringImage from "../../../assets/lake-wanzaye.jpg";

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

const WanzayeHotspringPage = () => {
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
          <span style={breadcrumbTextStyle}> / Wanzaye Hotspring</span>
        </div>
        <div style={heroStyle}>
          <img
            src={WanzayeHotspringImage}
            alt="Wanzaye Hotspring"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Wanzaye Hotspring</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Nestled within the South Gondar administrative zone of the Amhara
            region, specifically in the Deraworeda and the Gedam Geregera
            administrative kebele, lies the renowned Wanzaye Hot Spring. This
            popular tourist destination offers a unique blend of natural beauty,
            historical significance, and therapeutic relaxation, drawing
            visitors seeking both respite and potential healing. Situated at a
            comfortable altitude of 1786 meters above sea level, Wanzaye
            benefits from a pleasant climate and is conveniently located near
            the Gumara River, one of the significant tributaries that nourish
            the majestic Lake Tana. The proximity to this vital waterway further
            enhances the natural appeal and ecological context of the hot
            spring.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Historical Significance
          </Typography>
          <Typography style={textStyle}>
            Wanzaye Hot Spring boasts a rich history, having been established
            during the reign of Emperor Haile Selassie I. This royal patronage
            underscores the early recognition of the site's potential and its
            integration into the developing infrastructure of the time. The
            facility officially commenced fully-fledged service in 1974, marking
            a significant milestone in its evolution as a recognized tourist and
            wellness destination. The enduring legacy of its imperial origins
            adds a layer of historical intrigue to the experience, connecting
            visitors to a pivotal era in Ethiopian history.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Therapeutic Geothermal Waters
          </Typography>
          <Typography style={textStyle}>
            The primary draw of Wanzaye is undoubtedly its naturally heated,
            therapeutic waters. Emerging from deep within the Earth, these
            geothermal springs reach temperatures of 42°C and above, creating a
            soothing and invigorating bathing experience. The mineral-rich
            composition of the water, heated by subterranean geological
            activity, is believed by many Ethiopians to possess remarkable
            healing properties. The perception of these waters as "holy" and
            capable of curing various ailments, such as rheumatism and skin
            complaints, reflects a deep-rooted cultural belief in their
            therapeutic efficacy. This traditional understanding, passed down
            through generations, contributes significantly to the allure and
            popularity of Wanzaye as a destination for wellness and
            rejuvenation.
          </Typography>
          <Typography style={textStyle}>
            The experience of immersing oneself in the warm, mineral-laden
            waters of Wanzaye offers a welcome respite from the stresses of
            daily life. The gentle heat helps to relax muscles, improve
            circulation, and alleviate aches and pains. The natural setting,
            often surrounded by verdant vegetation and the sounds of the nearby
            Gumara River, further enhances the sense of tranquility and
            well-being. Whether seeking relief from physical discomfort or
            simply desiring a peaceful escape, visitors to Wanzaye find a unique
            opportunity to connect with nature and experience the therapeutic
            power of geothermal waters.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Other Natural Springs in the Region
          </Typography>
          <Typography style={textStyle}>
            Beyond the structured facilities at Wanzaye, the Amhara region,
            particularly in the vicinity of Lake Tana, is dotted with other
            natural springs, each with its own unique character and potential
            benefits. Among these are Wenqshet Gabriel and Andasa, which, like
            Wanzaye, likely hold local significance and may attract visitors
            seeking natural springs in a less developed setting. These other
            springs contribute to the region's rich hydro-geological landscape
            and offer further opportunities for exploration and discovery. The
            presence of multiple natural springs underscores the geothermal
            activity beneath the surface of this part of Ethiopia.
          </Typography>

          <Typography style={sectionTitleStyle}>
            The Role of the Gumara River
          </Typography>
          <Typography style={textStyle}>
            The Gumara River, flowing in close proximity to Wanzaye, adds
            another dimension to the area's appeal. As a significant tributary
            of Lake Tana, it plays a vital role in the regional ecosystem and
            provides a scenic backdrop to the hot spring. The interplay between
            the warm, mineral-rich waters of Wanzaye and the flowing waters of
            the Gumara River creates a unique microenvironment that supports a
            diverse range of flora and fauna. The river also offers
            opportunities for leisurely walks along its banks and further
            exploration of the surrounding natural landscape.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Climate and Surroundings
          </Typography>
          <Typography style={textStyle}>
            The altitude of Gedam Geregera kebele (1786 meters above sea level)
            contributes to a generally mild and pleasant climate, making Wanzaye
            an attractive destination throughout much of the year. The moderate
            temperatures enhance the enjoyment of the hot springs, preventing
            the experience from becoming overly intense, even during warmer
            periods. The surrounding landscape, influenced by the altitude and
            proximity to water sources, is likely characterized by fertile soils
            and diverse vegetation, further contributing to the overall appeal
            of the area.
          </Typography>

          <Typography style={sectionTitleStyle}>
            Economic and Conservation Considerations
          </Typography>
          <Typography style={textStyle}>
            The development of Wanzaye Hot Spring as a tourist destination has
            undoubtedly brought economic benefits to the local community,
            providing employment opportunities and supporting local businesses.
            However, it is crucial that future development and management of the
            site prioritize sustainability and the preservation of the natural
            environment. Responsible tourism practices, including proper waste
            management, conservation of water resources, and respect for local
            customs, are essential to ensure the long-term viability of Wanzaye
            as a cherished natural and cultural asset.
          </Typography>

          <Typography style={sectionTitleStyle}>Conclusion</Typography>
          <Typography style={textStyle}>
            In conclusion, Wanzaye Hot Spring stands as a compelling testament
            to the natural wealth and historical heritage of the Amhara region.
            Its therapeutic geothermal waters, coupled with its historical
            significance dating back to the reign of Emperor Haile Selassie I,
            make it a unique and popular destination. The belief in the healing
            powers of its waters, deeply ingrained in local culture, further
            enhances its allure. Situated near the vital Gumara River and
            benefiting from a pleasant altitude, Wanzaye offers a holistic
            experience of relaxation and rejuvenation within a beautiful natural
            setting. As one of the prominent hot spring destinations in the
            Amhara region, alongside other natural springs like Wenqshet Gabriel
            and Andasa, Wanzaye holds significant potential for sustainable
            tourism development that benefits both visitors and the local
            community while preserving its invaluable natural and cultural
            heritage for generations to come. The soothing embrace of Wanzaye
            truly offers a therapeutic oasis in the heart of Ethiopia.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default WanzayeHotspringPage;
