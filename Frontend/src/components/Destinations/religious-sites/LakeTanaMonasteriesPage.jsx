import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LakeTanaMonasteriesImage from "../../../assets/tana_kirkos.jpg"; // Placeholder image path; replace with actual image

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
const sectionHeadingStyle = {
  fontSize: "2rem",
  color: "#00ADB5",
  marginBottom: "15px",
  marginTop: "30px",
};

const LakeTanaMonasteriesPage = () => {
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
          <span style={breadcrumbTextStyle}> / Lake Tana Monasteries</span>
        </div>
        <div style={heroStyle}>
          <img
            src={LakeTanaMonasteriesImage}
            alt="Lake Tana Monasteries"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Lake Tana Monasteries</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            Lake Tana’s beauty can only be truly appreciated when you get out
            beyond the city to enjoy azure waters, a lush shoreline, and rich
            birdlife. But even the lake’s natural beauty plays second fiddle to
            its centuries-old monasteries, full of paintings and treasures, and
            some pretty impressive numbers.
          </Typography>
          <Typography style={textStyle}>
            The islands and peninsulas of the lake host 19 monasteries and more
            than 35 churches, most of which were built during the 14th century,
            though some are possibly as old as the 3rd century. These are old
            repositories of the invaluable historical heritages collected from
            different corners of the country and skeletal remains of the
            medieval Ethiopian Emperors.
          </Typography>

          <Typography style={sectionHeadingStyle}>
            Southern Monasteries of Lake Tana
          </Typography>

          <Typography style={subHeadingStyle}>Debre Maryam</Typography>
          <Typography style={textStyle}>
            Debre Maryam is located near the Nile outlet from Lake Tana. Abune
            Tselalesh founded the monastery there during the reign of Amde Tsion
            (1315-1345). The Monastery of Debre Maryam can be reached by boat
            for about 20 minutes northeast of Bahir Dar. It is also possible to
            reach there by crossing the Blue Nile River using a boat after
            driving towards Abay Bridge.
          </Typography>
          <Typography style={textStyle}>
            It is an ideal site to experience the Nile outlet and a hippo
            colony. What is more, there are many historical heritages found in
            the church museum.
          </Typography>

          <Typography style={subHeadingStyle}>
            Kibran Gabriel & Entos Eyesus Monasteries
          </Typography>
          <Typography style={textStyle}>
            Kibran was founded in the 14th century during the reign of Amde
            Tsion and rebuilt during the reign of Emperor Iyasu I (1682-1706).
            It is the closest monastery from Bahir Dar that lies on a tiny,
            forested crescent, presumably part of the rim of an extinct volcano.
          </Typography>

          <Typography style={subHeadingStyle}>
            The Zege Peninsula: Ura Kidane Mihret
          </Typography>
          <Typography style={textStyle}>
            The forested Zege Peninsula is studded with medieval churches, of
            which Ura Kidane Mihret ranks not only as the most impressive of the
            southern monasteries but also possibly the most beautiful church
            anywhere in the Lake Tana region. A saint called Betre Mariam
            founded the monastery in the 14th century. However, the circular
            church was built in the 16th century.
          </Typography>
          <Typography style={textStyle}>
            Its architectural style is a typical example of the Ethiopian
            Orthodox church, having mud-plastered round walls with a conical
            thatched roof.
          </Typography>

          <Typography style={subHeadingStyle}>Azwa Maryam</Typography>
          <Typography style={textStyle}>
            In the Zege Peninsula, there are other monasteries such as Azwa
            Maryam, Mahil-Zegie Giorgis, Betre Maryam, and Yiganda Tekle
            Hayimanot. These monasteries on the peninsula are open for both men
            and women. The monasteries in the peninsula can be accessed either
            by boat or by road from Bahir Dar using private vehicles or public
            transport.
          </Typography>

          <Typography style={sectionHeadingStyle}>
            Central Monasteries of Lake Tana
          </Typography>

          <Typography style={subHeadingStyle}>Tana Qirkos Monastery</Typography>
          <Typography style={textStyle}>
            Tana Qirkos, one of the oldest monasteries in Ethiopia, is situated
            on the eastern shore of Lake Tana where one can observe life and
            rituals that have hardly been changed since the Old Testament. This
            monastery had been used as one of the four places of ancient Judaic
            worship where sacrificial stones are still found.
          </Typography>
          <Typography style={textStyle}>
            The sacrificing stone testifies to the island’s importance as a
            Judaic religious shrine in Pre-Christian times. It is believed that
            the Ark of the Covenant had been kept there for 800 years. The
            founder of Ethiopian church music, St. Yared, wrote his first book
            of songs called Degua at this monastery.
          </Typography>
          <Typography style={textStyle}>
            The museum collection of the monastery has preserved several
            valuable and unique treasures, which inspire visitors. The monastery
            is not open to women. It takes about three hours to drive by boat
            from Bahir Dar to reach there.
          </Typography>

          <Typography style={sectionHeadingStyle}>
            Monasteries on Deq Island
          </Typography>

          <Typography style={textStyle}>
            Deq is the largest island in Lake Tana. It is located 37 kilometers
            north of Bahir Dar and takes about 3 hours by boat.
          </Typography>

          <Typography style={subHeadingStyle}>Daga Estifanos</Typography>
          <Typography style={textStyle}>
            Daga Estifanos lies on a small wedge-shaped island immediately east
            of the larger part of Dek Island. It takes about three hours of boat
            sailing from Bahir Dar. Based on local sources, Daga was founded by
            Hiruta Amlak during the reign of Emperor Yekuno Amlak.
          </Typography>
          <Typography style={textStyle}>
            The main point of interest at Daga Estifanos today is the mausoleum,
            which contains mummified remains of at least five Ethiopian medieval
            Emperors, namely Yikuno Amlak, Dawit I, Zer’a Yakob, Susneyos, and
            Emperor Fasilidas. The church symbolizes the biblical ark of Noah
            (Noah’s ship).
          </Typography>
          <Typography style={textStyle}>
            Certainly, Daga Estifanos was a popular retreat for several of the
            above-mentioned kings, and its tranquility was also favored by
            Tewodros II, who took communion there on several occasions. Several
            other treasures associated with these kings are stored in the
            mausoleum: old crowns, parchment manuscripts with some line drawings
            dating back to the 14th century, and two immaculately preserved
            15th-century paintings of Madonna with uncharacteristically detailed
            and non-stylized facial features.
          </Typography>

          <Typography style={subHeadingStyle}>Narga Sillassie</Typography>
          <Typography style={textStyle}>
            Empress Mintewab founded the monastery in the 18th century. Narga
            Sillassie is situated on the western shore of Dek Island and takes
            three hours of sailing by boat from Bahir Dar. Its architectural
            style has resemblance to the buildings of Gonder.
          </Typography>
          <Typography style={textStyle}>
            Narga is the most ornately decorated monastery. As with Ura Kidane
            Mihrte, the inner walls are covered from top to bottom with an
            amazing and absorbing collection of paintings dating back to the
            18th century.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default LakeTanaMonasteriesPage;
