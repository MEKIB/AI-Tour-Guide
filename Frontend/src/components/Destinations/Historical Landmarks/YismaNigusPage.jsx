import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import YismaNigusImage from "../../../assets/Yisma.jpg";

const YismaNigusPage = () => {
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
          src={YismaNigusImage}
          alt="Yisma Nigus"
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
            Yisma Nigus
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
            Yisma Nigus
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
            Discover Yisma Nigus
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
            Yisma Nigus (literally meaning ‘let the king hear the news’ in
            Amharic) is the name of the place where Emperor Menelik and the
            Italian agent Kont Antonoly signed the Wuchalie Treaty in 1889. This
            historical place is located at the foothill of Mount Ambasel, 4km
            after a turn-off, which is 7km before Wuchalie town, which is
            located 60km on the Dessie – Woldya road. Historical evidence
            suggests that the place has sparked the first beacon of the Black
            Freedom Movement. The Great Battle of Adwa, as Italy’s conspiracy to
            colonize Ethiopia under the cover of the Wuchalie Treaty, was
            revealed and a fierce disagreement started.
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
            The name of the place reflects the then historical events in which
            Emperor Menelik’s consort, Etegie Taytu Bitul, was forced to defy
            article 17 of the treaty. Dismayed by the conduct of the Italians,
            she made the following statement of historic importance: “I detest
            war; however, I prefer it to accept a treaty like this. Let the king
            hear the news!” It is on the basis of this informative statement to
            the king that the place was given the name ‘Yisma Nigus’ (meaning:
            Let the king hear the news!). Close to Yisma Nigus, the renowned and
            majestic Mount Ambassel, which looks as if it were attached to the
            sky, is stretched from north to south.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default YismaNigusPage;
