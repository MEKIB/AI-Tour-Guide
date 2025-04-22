import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeroImage from "../../../assets/Semien-Mountains.jpg";
import SemienMountains from "../../../assets/Semien-Mountains.jpg";
import Lalibela from "../../../assets/Lalibela-1.jpg";
import FasilGhebbi from "../../../assets/Gondar-1.jpg";
import LakeTana from "../../../assets/Lake-Tana.jpg";

const attractions = [
  {
    title: "The Semien Mountains National Park",
    description:
      "Famous for its dramatic highland scenery and endemic wildlife, the Semien Mountains National Park constitutes a world heritage site.",
    image: SemienMountains,
    path: "/worldheritagesites/semienmountains",
  },
  {
    title: "The Rock Hewn Churches of Lalibela",
    description:
      "Lalibela is a place where history and mystery frozen in stone, its soul alive with the rites and awe of Christianity at its most ancient and unbending.",
    image: Lalibela,
    path: "/worldheritagesites/lalibela",
  },
  {
    title: "Fasil Ghebbi - The Camelot of Africa",
    description:
      'Often called the "Camelot of Africa", Gonder\'s royal enclosure is a reality of medieval African architecture with castles and churches dating back to the 17th century.',
    image: FasilGhebbi,
    path: "/worldheritagesites/fasilghebbi",
  },
  {
    title: "Lake Tana Biosphere Reserve",
    description:
      "A hotspot of biodiversity, internationally known as an Important Bird Area, Lake Tana Biosphere Reserve is of global importance for agricultural genetic diversity.",
    image: LakeTana,
    path: "/worldheritagesites/lakeTana",
  },
];

const World = () => {
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
          src={HeroImage}
          alt="World Heritage Sites"
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
            World Heritage Sites
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "60px",
            background: "linear-gradient(rgba(0, 0, 0, 0.2), transparent)",
          }}
        />
      </Box>

      {/* Card Section */}
      <Container maxWidth={false} sx={{ py: 4, width: "100%" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#00ADB5" }}
        >
          Historical & Natural Wonders
        </Typography>
        <Grid container spacing={3}>
          {attractions.map((attraction, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  background: "rgba(57, 62, 70, 0.8)",
                  color: "#EEEEEE",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={() => navigate(attraction.path)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={attraction.image}
                  alt={attraction.title}
                  sx={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#00ADB5" }}
                  >
                    {attraction.title}
                  </Typography>
                  <Typography variant="body2">
                    {attraction.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default World;
