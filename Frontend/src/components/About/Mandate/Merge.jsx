import React from "react";
import { Container, Box, Typography } from "@mui/material";
import heroImage from "../../../assets/photo2.jpg"; // Import the image from AmharaS

const Merge = () => {
  return (
    <Container
      sx={{
        backgroundColor: "rgba(34, 40, 49, 0.8)", // Match AlitashPage main background
        minHeight: "100vh",
        width: "100vw", // Full-screen width
        maxWidth: "none", // Remove maxWidth constraint for full-screen
        p: 0, // No padding at the outermost level
        py: 2.5, // 20px vertical padding
        fontFamily: "'Poppins', 'Roboto', sans-serif", // Use Poppins with Roboto fallback
      }}
    >
      <Container
        maxWidth="xl" // Wider container for content (still centered)
        sx={{
          p: 2.5, // 20px padding
        }}
      >
        {/* Hero Section (from AmharaS) */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "300px", md: "400px" }, // Responsive height
            overflow: "hidden",
            borderRadius: "16px", // Match AlitashPage's borderRadius
            mb: 5, // More spacing below for a polished look
          }}
        >
          <img
            src={heroImage}
            alt="Amhara Region Mandate"
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
              px: { xs: 2, md: 0 }, // Responsive padding for text
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" }, // Responsive font size
                fontWeight: 700, // Bolder for emphasis
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Match AmharaS and AlitashPage
                fontFamily: "'Poppins', 'Roboto', sans-serif",
                letterSpacing: "1px", // Add spacing for elegance
              }}
            >
              Amhara Region Mandate and Responsibility
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "60px",
              background: "linear-gradient(rgba(0, 0, 0, 0.2), transparent)", // Keep the gradient from AmharaS
            }}
          />
        </Box>

        {/* Content Section (from Mandate, English only) */}
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
              color: "#00ADB5", // Match AlitashPage heading color
              fontSize: { xs: "1.5rem", md: "2rem" }, // Responsive font size
              fontWeight: 600,
              mb: 2,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
              letterSpacing: "0.5px",
              textAlign: "center", // Centered for emphasis
              background: "linear-gradient(90deg, #00ADB5, #00CED1)", // Gradient text
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Mandate and Responsibility
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE", // Match AlitashPage text color
              fontSize: "1rem",
              lineHeight: 1.8, // Increased for readability
              mb: 2,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
            }}
          >
            In accordance with the provisions of other laws enacted or to be
            enacted, as stated in the Amhara State Executive Proclamation No.
            264/2011, the Amhara Regional State Culture and Tourism Bureau has
            the following detailed powers and functions:
            <strong> 264/2011</strong>.
          </Typography>
          <ol
            style={{
              paddingLeft: "1.5rem",
              margin: 0,
              color: "#EEEEEE",
              fontSize: "1rem",
              lineHeight: 1.8,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
            }}
          >
            <li style={{ marginBottom: "0.75rem" }}>
              Study the cultural values of the region and strive to develop a
              positive cultural landscape;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Work with various governmental and non-governmental organizations
              to involve the community in the elimination of harmful traditional
              practices and immigrant cultures, and the spread of important
              cultural values in the region;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Encourage and support cultural groups and art and craft clubs to
              be organized in the region and to actively participate in the
              development of the culture and tourism industry;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Encourage the expansion of cultural institutions in the region,
              issue licenses to those engaged in the sector, monitor and
              supervise their implementation;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Provide support, record, supervise, and manage artifacts in the
              hands of any person, association, religious organization, or
              institution in the region;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Ensure that the history and culture of the nations and peoples
              living in the region are properly documented and studied, and that
              their languages are developed and expanded;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Collect, compile, analyze, and disseminate cultural and
              tourism-related information in the region, and promote domestic
              and foreign tourism by advertising the region’s tourist
              attractions in various ways based on pre-existing market research;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Facilitate and train the human resources engaged in tourism,
              hospitality, travel, and tourism services;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Promote a tourism culture in the region;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Identify, recognize, register, and facilitate the development of
              tourism that directly benefits the community in parks and other
              protected areas;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Facilitate the growth and development of social tourism in the
              region; based on the standard of the type of service to be issued
              following this Proclamation, it shall ratify the tourist service
              providers operating in the region;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Organize and develop tourist routes and observation points, and
              closely monitor ongoing infrastructure construction and other
              environmental development activities in collaboration with
              stakeholders in a way that supports tourism;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              In collaboration with the relevant regional government bodies,
              devise a strategy to relocate the residents of national heritage
              sites and parks in a way that the people themselves can
              participate and be part of the solution;
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Provide certification of professional qualifications to
              organizations, institutions, and individuals engaged in tourism
              services in the region.
            </li>
          </ol>
        </Box>
      </Container>
    </Container>
  );
};

export default Merge;
