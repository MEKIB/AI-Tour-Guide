import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TedbabeMariamImage from "../../../assets/TedebabeMaryam.jpg"; // Placeholder image path; replace with actual image

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
const subHeadingStyle = {
  fontSize: "1.5rem",
  color: "#00ADB5",
  marginBottom: "10px",
  marginTop: "20px",
};

const TedbabeMariamMonasteryPage = () => {
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
          <Link to="/religious-sites" style={breadcrumbLinkStyle}>
            Religious Sites
          </Link>
          <span style={breadcrumbTextStyle}> / Tedbabe Mariam Monastery</span>
        </div>
        <div style={heroStyle}>
          <img
            src={TedbabeMariamImage}
            alt="Tedbabe Mariam Monastery"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Tedbabe Mariam Monastery</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            The Tedbabe Mariam monastery is situated in Amhara Regional State of
            South Wollo Zone in Saynt Woreda. It is located 600 km from Addis
            Ababa and situated in Woynadega (semi-tropical) climatic zone. It is
            bordered by the Mota Woreda (district) in the west, Semada Woreda in
            the North, Mekidela Woreda in the South, and Ajbar Town in the East.
          </Typography>
          <Typography style={textStyle}>
            Beshilo River flows under the Plateau where the monastery is
            situated. The monastery is situated in the heart of the Plateau and
            is surrounded by dense indigenous forest trees such as juniper,
            olive, and so on. The forest is home to different wild animals and
            birds.
          </Typography>
          <Typography style={textStyle}>
            As earlier said, the Monastery is situated on the hilltop, thus to
            enter and arrive at the Monastery there are 12 natural gates in
            different directions. Demographically, the entire residents of the
            area are Amhara ethnic groups; almost 94% of them are Orthodox
            Christian and the rest 6% are Muslims.
          </Typography>

          <Typography style={subHeadingStyle}>
            The History of the Church
          </Typography>
          <Typography style={textStyle}>
            According to legend, Menelik I returned from Jerusalem with the Ark
            of the Covenant and the firstborn sons of Israelites. Among those
            who came to Ethiopia, Amenadab was the most prominent one. Amenadab
            arrived in Amhara Saynt and propagated the Old Testament into the
            surrounding vicinity.
          </Typography>
          <Typography style={textStyle}>
            At the same time, he constructed a temple in the area, where the
            present-day TedabeMariam Monastery is established. After he
            accomplished the construction of the temple (church), he assigned
            Azarias (a High priest) as an administrator of the temple.
          </Typography>
          <Typography style={textStyle}>
            Apart from this, Amenadab assigned biblical names to each village
            that is found nearby the church. These entire names represent the
            different place names of Israel: Gologota, Kebron, Gaza, Loza, Dabra
            Tabor, Betanya, Gelila, Eyariko, Jerusalem Lebanos, Armonem,
            Demsaqo, and Debra Faran. Thus, these names signify that a tradition
            of the Old Testament was practiced in this area before the
            introduction of Christianity into the vicinity and gives light that
            there had been Israelites in the area during the then period.
          </Typography>
          <Typography style={textStyle}>
            On the other hand, Azaryas, who had been assigned as administrator
            of the temple, gave the name Tedbabe Tsion to the present-day
            Tedbabe Mariam; he coined the name to the memorial of his uncle,
            King Dawit.
          </Typography>
          <Typography style={textStyle}>
            After the advent of Christianity in Ethiopia in 330 AD, the first
            church of Axum was constructed. Since then, Christianity spread into
            different parts of the country. Alongside this, various churches
            were built in the area where Christianity was propagated. During
            that time, Amhara Saynt was one of the areas where Christianity was
            expanded.
          </Typography>
          <Typography style={textStyle}>
            According to different informants and different parchment books
            found in the church, the two brother kings, Abrha and Atsbha, had
            come into Amhara Saynt and constructed a monastery in the place
            where the temple was built by Aminadab. Then these kings changed the
            name Tedbabe Tsion into Tedbabe Mariam, to mean a place or a hill
            which elected to God.
          </Typography>
          <Typography style={textStyle}>
            Monastery informants also said that the name Tedbabe is a Ge`ez word
            that means an edge. After they established the church, the two kings
            offered various material objects that belonged to the kings such as
            crosses and other ecclesiastical relics with their names inscribed
            upon them. These are still present in the museum and became
            testimony since the monastery is ancient and historic.
          </Typography>
          <Typography style={textStyle}>
            As stated above, according to church historians and local
            informants, the first monastery (temple) was constructed in 982 BC.
            Since its establishment, the church was rebuilt nine times. After
            the introduction of Christianity, it was reconstructed about four
            times, with the first during the reign of Ezana and Sizana (340 AD).
          </Typography>
          <Typography style={textStyle}>
            It was also reconstructed in 882 AD by king Gelawdiwos and in the
            1550s by the host community. The construction of the existing church
            was started in 1906 and accomplished in 1907 by the order and
            sponsor of King Michael, the then governor of Wollo provinces and
            one of the regional lords of Emperor Menelik II.
          </Typography>
          <Typography style={textStyle}>
            The construction materials had been brought from distant areas:
            bamboo from south Gondar, Esta, stone, and limestone from the
            surrounding villages called Uqir, and indigenous juniper from Albiko
            and Kalu districts. Horse and human labor were used to transport the
            construction materials. The mason and carpenter who constructed the
            monastery came from the vicinity and distant areas.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default TedbabeMariamMonasteryPage;
