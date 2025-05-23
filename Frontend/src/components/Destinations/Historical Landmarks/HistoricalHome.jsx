import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Gondar from "../../../assets/Gondar-1.jpg";
import GuzaraCastleImage from "../../../assets/Guzara.jpg";
import YismaNigusImage from "../../../assets/Yisma.jpg";
import AyiteyefAdarashImage from "../../../assets/Ayiteyef.jpg";
import MaqedelaRidgeImage from "../../../assets/Maqedela.jpg";
import ShonkeVillageImage from "../../../assets/Shonke.jpg";
import AnkoberLodgeImage from "../../../assets/Ankober.jpg";

const attractions = [
  {
    title: "Guzara Castle",
    description:
      "Guzara is a place which ushers a new period of urban development and permanent seat construction for the Ethiopian empire during the medieval period.",
    image: GuzaraCastleImage,
    path: "/historical/guzara-castle",
  },
  {
    title: "Yisma Nigus",
    description:
      "Yisma Nigus is one of the iconic places in Ethiopia in relation to the Battle of Adwa. A museum dedicated to the history of the area is recently installed.",
    image: YismaNigusImage,
    path: "/historical/yisma-nigus",
  },
  {
    title: "Ayiteyef Adarash (Dining Hall)",
    description:
      "Ayiteyef is one of the big historical dining halls in Ethiopia. The dining hall can accommodate 3000 guests at one time and as its name implies, the king, the nobles, the clergy, and the ordinary people were served equally in the hall.",
    image: AyiteyefAdarashImage,
    path: "/historical/ayiteyef-adarash",
  },
  {
    title: "Maqedela Ridge",
    description:
      "Meqedela Amba is a place where the aspiration and the zeal of Emperor Tewodros for the modernization of Ethiopia came to an end.",
    image: MaqedelaRidgeImage,
    path: "/historical/maqedela-ridge",
  },
  {
    title: "Shonke Village",
    description:
      "The Shonke Village is an old and mesmerizing mountain with a 900-year unabated settlement with enthralling homes and alleyways.",
    image: ShonkeVillageImage,
    path: "/historical/shonke-village",
  },
  {
    title: "Ankober Lodge",
    description:
      "The medieval town of Ankober is one of the best accomplished day trip destinations in the vicinity of Addis Ababa.",
    image: AnkoberLodgeImage,
    path: "/historical/ankober-lodge",
  },
];

const HistoricalHome = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(34, 40, 49, 0.8)", // Match AlitashPage main background
        minHeight: "100vh",
        fontFamily: "'Poppins', 'Roboto', sans-serif",
      }}
    >
      {/* Full-Screen Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "50vh", // Reduced height
          overflow: "hidden",
        }}
      >
        <img
          src={Gondar}
          alt="Historical Landmarks"
          style={{
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
            color: "#00ADB5", // Match AlitashPage heading color
            zIndex: 1,
            width: "100%",
            px: { xs: 2, md: 4 }, // Responsive padding
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" }, // Adjusted for smaller height
              fontWeight: 700,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              fontFamily: "'Poppins', 'Roboto', sans-serif",
              letterSpacing: "1px",
            }}
          >
            Historical Landmarks
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

      {/* Breadcrumb Navigation */}
      <Container
        maxWidth="xl"
        sx={{
          py: 2, // Reduced padding for spacing
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(57, 62, 70, 0.8)",
            borderRadius: "8px",
            p: "8px 16px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              color: "#00ADB5",
              textDecoration: "none",
              fontSize: "1rem",
              fontFamily: "'Poppins', 'Roboto', sans-serif",
              "&:hover": {
                color: "#00CED1",
              },
            }}
          >
            Home
          </Typography>
          <Typography
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              mx: 1,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
            }}
          >
            /
          </Typography>
          <Typography
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              fontFamily: "'Poppins', 'Roboto', sans-serif",
            }}
          >
            Historical Landmarks
          </Typography>
        </Box>
      </Container>

      {/* Content Section */}
      <Container
        maxWidth="xl"
        sx={{
          py: 3, // Reduced padding for spacing
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#00ADB5",
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 600,
            mb: 3,
            textAlign: "center",
            fontFamily: "'Poppins', 'Roboto', sans-serif",
            background: "linear-gradient(90deg, #00ADB5, #00CED1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Explore Historical Sites
        </Typography>
        <Grid container spacing={3}>
          {attractions.map((attraction, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component={Link}
                to={attraction.path}
                sx={{
                  textDecoration: "none",
                  width: "100%",
                  maxWidth: { xs: 300, md: 350 },
                  backgroundColor: "rgba(57, 62, 70, 0.8)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Box
                  component="img"
                  src={attraction.image}
                  alt={attraction.title}
                  sx={{
                    width: "100%",
                    height: 240,
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#00ADB5",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      mb: 1,
                      fontFamily: "'Poppins', 'Roboto', sans-serif",
                    }}
                  >
                    {attraction.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#EEEEEE",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      fontFamily: "'Poppins', 'Roboto', sans-serif",
                    }}
                  >
                    {attraction.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HistoricalHome;
