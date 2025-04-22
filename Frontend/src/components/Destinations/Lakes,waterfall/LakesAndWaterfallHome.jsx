import React from "react";
import { Row, Col, Typography, Space, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "antd/dist/antd.min.js";
import LakeZengenaImage from "../../../assets/Lake-Zegena.jpg";
import LakeTirbaImage from "../../../assets/Lake-tribe.jpg";
import WanzayeHotspringImage from "../../../assets/lake-wanzaye.jpg";
import LakeHayqImage from "../../../assets/lake-hayq.jpg";
import BlueNileFallsImage from "../../../assets/blue-nile.jpg";
import LakeTanaReserveImage from "../../../assets/lake-tana1.jpg";

const attractions = [
  {
    title: "Lake Zengena",
    description:
      "Lake Zenegna is one of the Crater Lakes in Ethiopia which is endowed with a large variety of bird species and wildlife.",
    image: LakeZengenaImage,
    path: "/lakes-hot-springs-waterfalls/lake-zengena",
  },
  {
    title: "Lake Tirba",
    description:
      "Lake Tirba is one of the few crater lakes that dot around the Awi Zone of the Amhara Regional State.",
    image: LakeTirbaImage,
    path: "/lakes-hot-springs-waterfalls/lake-tirba",
  },
  {
    title: "Wanzaye Hotspring",
    description:
      "Wanzaye Filweha/hot spring/ is one of the nearby and closest natural hot springs near the regional capital Bahir Dar. The hot spring has a curative role for local communities.",
    image: WanzayeHotspringImage,
    path: "/lakes-hot-springs-waterfalls/wanzaye-hot-spring",
  },
  {
    title: "Lake Hayq",
    description:
      "Best known for its crystal clear water, Lake Hayq is one of the lakes found outside of the Ethiopian Great Rift Valley system.",
    image: LakeHayqImage,
    path: "/lakes-hot-springs-waterfalls/lake-hayq",
  },
  {
    title: "Blue Nile Falls",
    description:
      "The Blue Nile looks like a sluggish beast as it meanders out of Lake Tana, but not far out of Bahir Dar you’ll see the Nile in a very different mood.",
    image: BlueNileFallsImage,
    path: "/lakes-hot-springs-waterfalls/blue-nile-falls",
  },
  {
    title: "Lake Tana Biosphere Reserve",
    description:
      "Lake Tana Biosphere Reserve is a hotspot of biodiversity, internationally known as an Important Bird Area, and is of global importance for agricultural genetic diversity.",
    image: LakeTanaReserveImage,
    path: "/lakes-hot-springs-waterfalls/lake-tana", // Note: This is a different route from the World Heritage Sites version
  },
];

const LakesAndWaterfallHome = () => {
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
          src={LakeZengenaImage}
          alt="Lakes, Hot Springs, and Waterfalls"
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
            Lakes, Hot Springs, and Waterfalls
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
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
            Natural Attractions
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

export default LakesAndWaterfallHome;
