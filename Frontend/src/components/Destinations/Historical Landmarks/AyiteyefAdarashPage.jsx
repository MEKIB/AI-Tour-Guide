import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AyiteyefAdarashImage from "../../../assets/Ayiteyef.jpg";

const AyiteyefAdarashPage = () => {
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
          src={AyiteyefAdarashImage}
          alt="Ayiteyef Adarash"
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
            Ayiteyef Adarash
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
            Ayiteyef Adarash
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
            Discover Ayiteyef Adarash
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
            ‘Ayiteyef Adarash’ is located in Dessie Town. It was built by King
            Michael in 1907 E.C. Before it got its present name from the king,
            the hall used to be known by the name ‘Giber Bet’ or Hall for
            Banquets.
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
            The name Ayiteyef, meaning ‘no one is discriminated or isolated,’
            emerged as the hall was open for all people irrespective of any
            differences – status, religious, ethnic, or any other backgrounds. A
            person with disabilities, including underprivileged segments of
            society, used to be served without any prejudices or favoritism,
            equally with the rest of the customers. The king and queen were also
            served along with their servants.
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
            Ayiteyef Adarash was built by professionals who came from Greece,
            Armenia, and individuals from Arab countries. According to sources,
            the hall was constructed using local materials, apart from the roof
            and other finishing materials.
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
            The trunks used to construct the hall were collected from Abeliko
            Woreda, a place known for its forestry resources. The sand and stone
            were sourced from the Bokerna and Gerado rivers, located near the
            town.
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
            Other parts of the inputs were also said to be sourced from the
            surrounding areas. As legends go, the walls were made by mixing
            powdered limestone and egg yolks as cement.
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
            The hall, spanning 2,131 hectares of land, was built with a 10-meter
            height and one-meter wide 70 pillars. Amazingly, the construction of
            the hall took only nine months. It has the capacity to serve more
            than five thousand people, as stated in various documents.
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
            After King Michael, the hall was used as an administrative center
            and later by Ras Emeru Haile Selassie and Prince Asefawosson as a
            Gebir Bet.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AyiteyefAdarashPage;
