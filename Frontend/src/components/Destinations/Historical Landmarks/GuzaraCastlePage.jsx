import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GuzaraCastleImage from "../../../assets/Guzara.jpg";

const GuzaraCastlePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(34, 40, 49, 0.8)", // Match AlitashPage main background
        minHeight: "100vh",
        fontFamily: "'Poppins', 'Roboto', sans-serif",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "50vh", // Reduced height
          overflow: "hidden",
        }}
      >
        <img
          src={GuzaraCastleImage}
          alt="Guzara Castle"
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
            Guzara Castle
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
            component={Link}
            to="/historical"
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
            Historical Landmarks
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
            Guzara Castle
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
        <Box
          sx={{
            backgroundColor: "rgba(57, 62, 70, 0.8)", // Match AlitashPage content background
            borderRadius: "16px",
            p: { xs: 2, md: 3 }, // Responsive padding
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#00ADB5",
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 600,
              mb: 2,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
              letterSpacing: "0.5px",
              textAlign: "center",
              background: "linear-gradient(90deg, #00ADB5, #00CED1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Discover Guzara Castle
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              lineHeight: 1.8,
              mb: 2,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
            }}
          >
            Dubbed to be the pioneer of the Gondar area castles and thought to
            have been built by Emperor Sarsa Dengal in 1572, the castle is still
            an impressive sight, and, although in ruins, is a fine example of
            the architectural style of the early Gondarine period, which
            developed from the many influences from Central Europe, Turkey, and
            Portugal. Recognized as a UNESCO World Heritage Site, Guzara Castle
            is located in the northeast of Lake Tana, on the road between Bahir
            Dar and Gondar, around 25km north of the town of Addis Zemen. The
            Castle offers spectacular views over the lake. Its strong walls have
            stood watching over Lake Tana for at least four centuries.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#00ADB5",
              fontSize: "1.5rem",
              fontWeight: 600,
              mb: 1,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
            }}
          >
            Guided Tours
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              lineHeight: 1.8,
              mb: 2,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
            }}
          >
            You can book tours with the knowledgeable and well-informed local
            guide Samuel (+251 – (0) 918213143, English and Amharic).
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GuzaraCastlePage;
