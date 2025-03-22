import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import BorenaSayintImage from "../../../assets/Borena.jpg";

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

const BorenaSayintPage = () => {
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
          <span style={breadcrumbTextStyle}> / Borena Sayint</span>
        </div>
        <div style={heroStyle}>
          <img
            src={BorenaSayintImage}
            alt="Borena Sayint"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Borena Sayint Worehimeno National Park</h1>
        </div>
        <div style={contentStyle}>
          <p style={textStyle}>
            In variance of altitude that ranges between 1900m to 4280m asl, the
            Park encloses afro-alpine and alpine vegetation, from Erica to
            tussock grass. The Borena Sayint is endowed with unspoiled nature, a
            real wild area which was thought by the residents of the area as a
            concealing place of aggressors. There are more than ten caves where
            there were incidents once held that are now a history of the
            country.
          </p>
          <h2 style={sectionTitleStyle}>What to See</h2>
          <p style={textStyle}>
            The park’s total area covers 15,262 hectares of land, harboring a
            significant number of large and small mammals, birds, amphibians,
            and plants. The landscape of the park is composed of rough
            topography, deeply incised valleys, escarpments, plateaus,
            cone-shaped peaks, and fascinating cliffs. It has different
            topographical features ranging from lowland to highland mountains.
            The altitude ranges between 1900 to 4280m above sea level. The
            topography of Borena wereda is dominated by mountains (10%), plains
            (20%), valleys (30%), and ups and downs (40%).
          </p>
          <p style={textStyle}>
            There are around six caves along the cliff, which separate the
            Afromontane forest from the upper part of the park. The park has
            some amazing peaks such as Kabu Kora, Mossebit, Galokab, Shiftoch
            Kora, Gulas, and Kerkeha Ras, which are covered by trees and also
            serve as natural watching towers for tourists. Due to the high
            variation of altitude, agro-climatically the park is classified
            within three belts of weather: Woina Dega (temperate), Dega (cool
            zone), and Wurch (alpine). Being dominated by typical
            sub-afro-alpine areas vegetation, the park is a natural habitat for
            large mammals and endemic birds. Sedentary agriculture, where crop
            cultivation is complemented by strong livestock rearing, is the
            primary occupation of the community. Moreover, the area is
            characterized by a minimum of socio-economic infrastructure and
            administrative institutions.
          </p>
          <p style={textStyle}>
            The afro-alpine strip of forest encompasses Afromontane forest in
            its lower part and sub-afro-alpine and afro-alpine vegetation types
            in its upper part. The Afromontane one is a narrow forest and its
            occurrence is largely restricted to Borena wereda. It is dominated
            by big trees and different types of shrubs. The afro-alpine and
            sub-afro-alpine parts are dominated by species of Erica trees and
            shrubs, interspersed with tussock grass or Guassa (Festuca spp.) and
            Lobelia rhynchopetalum populations. The incredible vegetation
            resources of the park are the main ecotourism resources. According
            to ANRSP, there are around 66 families of vegetation species,
            consisting of 174 species of plants, which represent higher species
            diversity in comparison to other Afromontane forests of the country.
            Giant lobelia (Jibera), Bidens pachyloma (Adey-Abeba),
            Plectocephalus, Euphorbia dumalis, Acanthus sennii (Shekori),
            Solanaceous gigas (Yeshikoko Gomen), Echinops longisetus, and
            Echinops kebericho are endemic to the park. Both the Afromontane
            forest and the upper part of the park have a very attractive view
            for tourists.
          </p>
          <h2 style={sectionTitleStyle}>Getting There</h2>
          <p style={textStyle}>
            <strong>By road:</strong> The Borena Sayint National Park is found
            in the central Amhara region of Ethiopia, approximately 600km from
            Addis Ababa via Debre Birhan and Dessie, and 300km from Bahir Dar
            through Merto Lemariam. The park shares boundaries with Borena,
            Mehal Saynt, and Saynt woredas. If you drive from Addis Ababa to
            Dessie, you need to drive 200 km southwest of Dessie to reach the
            park.
          </p>
          <p style={textStyle}>
            <strong>By flight:</strong> The nearby airport to the Borena Sayint
            National Park is Kombolcha, 23 km southeast of the town of Dessie.
            Flights are available to Kombolcha on fixed days of the week. Check
            the flight schedule of Ethiopian Airlines here:{" "}
            <a
              href="http://www.ethiopianairlines.com"
              style={{ color: "#00ADB5" }}
            >
              www.ethiopianairlines.com
            </a>
            .
          </p>
          <h2 style={sectionTitleStyle}>Accommodations</h2>
          <p style={textStyle}>
            There are basic and standard accommodations in the town of Mekane
            Selam (18 km from the park). If you prefer camping, there are
            designated campsites within the park.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default BorenaSayintPage;
