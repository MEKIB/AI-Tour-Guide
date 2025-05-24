import React from "react";
import { Row, Col, Typography, Space, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "antd/dist/antd.min.js";
import DebreBirhanSellasie from "../../../assets/DebreBirhanSellasie.jpg";
import AmbaGiorgis from "../../../assets/AmbaGiorgis.jpg";
import DimaGiorgis from "../../../assets/DimaGiorgis.jpg";
import GeneteMaryam from "../../../assets/Genetemaryam.jpg";
import AshetonMaryam from "../../../assets/AshetonMaryam.jpg";
import HayikEstifanos from "../../../assets/HayqEstifanos.jpg";
import JemaNigusMosque from "../../../assets/JemaNigus.jpg";
import LakeTanaMonasteries from "../../../assets/LakeTanaMonasteries.jpg";
import YemrehanaKrestos from "../../../assets/Yemrehanne-Kristos.jpg";
import Gishen from "../../../assets/GishenMaryam.jpg";
import TedbabeMariam from "../../../assets/TedebabeMaryam.jpg";
import MertuleMariam from "../../../assets/MertuleMaryam.jpg";
import AbuneMelkezedek from "../../../assets/AbuneMelketsedeq1.jpg";

const attractions = [
  {
    title: "Debre Birhane Sellassie",
    description:
      "Welcome to one of Ethiopia’s most beautiful churches. Appealing as it is on the outside with its stone walls, arched doors, and two-tiered thatch roof, it’s the inner sanctuary of Debre Berhan Selassie, with its glorious frescos, that really shines.",
    image: DebreBirhanSellasie,
    path: "/religious-sites/debre-birhane-sellassie",
  },
  {
    title: "Zoz Amba Gyorgis",
    description:
      "Hidden and unexplored, the rock-hewn churches of Zoz Amba Gyorgis flicker a glimpse of idea how Bete Gyorgis in Lalibela seems before the culmination of its construction.",
    image: AmbaGiorgis,
    path: "/religious-sites/zoz-amba-gyorgis",
  },
  {
    title: "Dima Giorgis Monastery",
    description:
      "Dima Gyorgis is one of the active and elevated monasteries of the Ethiopian Orthodox Church, renowned for its long history of scholarship and education.",
    image: DimaGiorgis,
    path: "/religious-sites/dima-giorgis-monastery",
  },
  {
    title: "Genete Maryam",
    description:
      "Resembling the Bete Medhaniyalem church of Lalibela, Genete Maryam rock-hewn church is one of the most architecturally decorated and probably the last rock-hewn church to be hewn in the Lalibela area.",
    image: GeneteMaryam,
    path: "/religious-sites/genete-maryam",
  },
  {
    title: "Asheton Maryam",
    description:
      "Nestled in spectacular mountain scenery, Asheton Maryam offers a rewarding hike with stunning views and a glimpse into an active monastery near Lalibela.",
    image: AshetonMaryam,
    path: "/religious-sites/asheton-maryam",
  },
  {
    title: "Hayik Estifanos Monastery",
    description:
      "A historically iconic monastery by Lake Hayik, housing priceless antiquities and offering scenic views, though entry is restricted to men only.",
    image: HayikEstifanos,
    path: "/religious-sites/hayik-estifanos-monastery",
  },
  {
    title: "Jema Nigus Mosque",
    description:
      "A significant Islamic site where the Mawlid celebration began in Ethiopia, attracting thousands of Muslim pilgrims annually for vibrant rituals.",
    image: JemaNigusMosque,
    path: "/religious-sites/jema-nigus-mosque",
  },
  {
    title: "Lake Tana Monasteries",
    description:
      "Explore the ancient monasteries on Lake Tana’s islands and peninsulas, renowned for their historical treasures and natural beauty.",
    image: LakeTanaMonasteries,
    path: "/religious-sites/lake-tana-monasteries",
  },
  {
    title: "Yemrehana Krestos Monastery",
    description:
      "A well-preserved Aksumite church near Lalibela, known for its ornate interiors and unique cave setting, offering a glimpse into ancient Christian heritage.",
    image: YemrehanaKrestos,
    path: "/religious-sites/yemrehana-krestos-monastery",
  },
  {
    title: "Gishen",
    description:
      "A sacred site housing a fragment of the True Cross, Gishen attracts thousands of pilgrims annually for its spiritual significance.",
    image: Gishen,
    path: "/religious-sites/gishen",
  },
  {
    title: "Tedbabe Mariam Monastery",
    description:
      "An ancient monastery in Amhara Saynt with roots tracing back to the Old Testament, surrounded by dense forests and steeped in history.",
    image: TedbabeMariam,
    path: "/religious-sites/tedbabe-mariam-monastery",
  },
  {
    title: "Mertule Mariam Monastery",
    description:
      "Located in East Gojjam, this historic monastery sits on a flat-topped hill, offering insights into the region’s religious and geographical heritage.",
    image: MertuleMariam,
    path: "/religious-sites/mertule-mariam-monastery",
  },
  {
    title: "Abune Melkezedek Monastery",
    description:
      "A mesmerizing rock-hewn monastery in North Shewa, featuring a stunning waterfall and miraculous preservation of monks’ remains.",
    image: AbuneMelkezedek,
    path: "/religious-sites/abune-melkezedek-monastery",
  },
];

const Religious = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "rgba(34, 40, 49, 0.8)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
        }}
      >
        <img
          src={DebreBirhanSellasie}
          alt="Religious Sites"
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
            color: "#00ADB5",
            zIndex: 1,
            width: "100%",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "2px 2px 4px #000000" }}
          >
            Religious Sites
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "0",
            width: "100%",
            height: "60px",
            background: "linear-gradient(rgba(0, 0, 0, 0.2), transparent)",
          }}
        />
      </Box>

      {/* Card Section */}
      <Box sx={{ padding: "40px 20px", width: "100%" }}>
        <Space
          direction="vertical"
          size="middle"
          align="center"
          style={{ width: "100%" }}
        >
          <Typography.Title
            level={3}
            style={{ color: "#00ADB5", textAlign: "center" }}
          >
            Historical and Religious Sites
          </Typography.Title>
          <Row gutter={[16, 16]} style={{ width: "100%" }}>
            {attractions.map((attraction, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={attraction.title}
                      src={attraction.image}
                      style={{
                        height: 240,
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />
                  }
                  onClick={() => navigate(attraction.path)}
                  style={{
                    background: "rgba(57, 62, 70, 0.8)",
                    color: "#EEEEEE",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                  }}
                  styles={{
                    body: {
                      padding: "16px",
                    },
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1.0)")
                  }
                >
                  <Card.Meta
                    title={
                      <Typography.Title
                        level={4}
                        style={{ color: "#00ADB5", margin: 0 }}
                      >
                        {attraction.title}
                      </Typography.Title>
                    }
                    description={
                      <Typography.Text style={{ color: "#EEEEEE" }}>
                        {attraction.description}
                      </Typography.Text>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </Box>
    </Box>
  );
};

export default Religious;
