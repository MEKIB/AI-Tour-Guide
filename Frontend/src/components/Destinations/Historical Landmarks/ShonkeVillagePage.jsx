import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShonkeVillageImage from "../../../assets/Shonke.jpg";

const ShonkeVillagePage = () => {
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
          src={ShonkeVillageImage}
          alt="Shonke Village"
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
            Shonke Village
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
            Shonke Village
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
            Discover Shonke Village
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
            A village set on a hill, Shonke Village is located 23 km east of the
            town of Kemisse. The village of Shonke is inhabited by ethnic
            Argobbas. According to local tradition, the Argobbas settled in this
            area by the 12th century AD. The origin of the name ‘Argobba’ has
            two assumptions. First, the elders of Shonke Amba say that Argobba
            means Arab gebba (Arabs have entered). The second is Har gubba,
            which means silk that is seen on the mountain. The villagers are
            entirely Muslims and trace their ancestors to Arabs. The reason for
            their migration to Ethiopia by the 12th century AD was fleeing from
            a war in the Gulf region.
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
            The Argobbas are Muslim, self-sufficient agriculturists, traditional
            cloth weavers, and merchants. One of the drawing factors that
            trigger tourists to visit Shonke Village is the 900-year-old stellar
            houses. The houses and the Amba-based settlement are the identities
            of the Argobba people because the settlement has preserved the
            culture and religion of the Argobba for more than 9 centuries.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ShonkeVillagePage;
