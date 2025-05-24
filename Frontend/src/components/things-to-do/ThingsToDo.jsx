import React from "react";
import { Row, Col, Typography, Space, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "antd/dist/antd.min.js";
import Biking from "../../assets/Biking.jpg";
import Fishing from "../../assets/Fishing.jpg";
import Community from "../../assets/community.jpg";
import Hiking from "../../assets/Hiking and trekking.jpg";
import Horseback from "../../assets/horseback.jpg";
import Bird from "../../assets/Bird watching.jpg";

const attractions = [
  {
    title: "Horseback Riding",
    description:
      "With the decoration, they put in their horse, and with a heated and fierce horse galloping event hosted annually attending the horsing events in the Amhara region is a lifetime experience.",
    image: Horseback,
    path: "/things-to-do/horseback-riding",
  },
  {
    title: "Community Tourism",
    description:
      "With the unique welcoming culture and attribute of the Amhara people, community tourism is one of the special experience one has to do in this part of Ethiopia.",
    image: Community,
    path: "/things-to-do/community-tourism",
  },
  {
    title: "Biking",
    description:
      "Thanks to pristine new roads developing in Ethiopia, the Amhara region is now an exciting destination for cyclists with tough climbs, friendly people, and endless views.",
    image: Biking,
    path: "/things-to-do/biking",
  },
  {
    title: "Fishing",
    description:
      "Fishing in the Amhara region is moving back in time to the period of the Ancient Egyptians. Discover Amhara and be in awe of how old fishing is in this part of Ethiopia.",
    image: Fishing,
    path: "/things-to-do/fishing",
  },
  {
    title: "Bird Watching",
    description:
      "Host some of the rare and endemic bird species like Lammergeyer and Ankober Serin, birding in this part of Ethiopia will make your binocular restive.",
    image: Bird,
    path: "/things-to-do/bird-watching",
  },
  {
    title: "Hiking and Trekking",
    description:
      "The region that dominated by mountainous topography and vistas, the Amhara region retains world class destinations for Hiking and trekking.",
    image: Hiking,
    path: "/things-to-do/hiking-and-trekking",
  },
];

const ThingsToDo = () => {
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
          src={Horseback}
          alt="Things to Do"
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
            Things to Do
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
            The Most Popular Attractions
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

export default ThingsToDo;
