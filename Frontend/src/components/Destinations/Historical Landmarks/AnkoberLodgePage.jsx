import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AnkoberLodgeImage from "../../../assets/Ankober.jpg";

const AnkoberLodgePage = () => {
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
          src={AnkoberLodgeImage}
          alt="Ankober Lodge"
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
            Ankober Lodge
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
            Ankober Lodge
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
            Discover Ankober Lodge
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
            The medieval town of Ankober is one of the best accomplished day
            trip destinations in the vicinity of Addis Ababa. Served as the seat
            of the Shewan Kingdom beginning from the second half of the 18th
            century, Ankober is the epicenter of the late medieval period
            history of Ethiopia and the springboard for the establishment of the
            present Ethiopian capital, Addis Ababa. Found 170km northeast of
            Addis Ababa on an elevated mesa, the area is one of the scenic and
            intriguing spots to travel. Believed to be founded by Merid Azmatch
            Ameha Eyesus, one of the kings of the Shewan Kingdom, the place was
            an important political and economic center. A number of Shoan rulers
            are buried in churches in the surrounding area.
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
            Apart from its scenic beauty and buoyant historical attractions, the
            highlands surrounding Ankober, which sit at an elevation of some
            2,500m, are great for hiking and even more rewarding for
            birdwatchers. The very rare endemic Ankober serin can be found here,
            while two breeds of seedeater, the white throat and the yellow
            throat, may also be spotted.
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
            The small town in the lowland Aliyu Amba near Ankober was one of the
            first places where the tax system started in Ethiopia. The
            diplomatic missions – that Britain, France, and Italy established
            here during Menelik’s reign – can also be distinguished in the town
            itself.
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
            Getting There
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              lineHeight: "1.8",
              mb: 2,
              fontFamily: "'Poppins', 'Roboto', sans-serif",
            }}
          >
            Ankober is found 170 km from the capital Addis Ababa. Drive to Debre
            Birhan and take the left junction to Ankober at the city end. The
            road is now upgraded to an asphalt road.
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
            Where to Stay
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
            Ankober Palace Lodge is the perfect lodging facility to stay in
            Ankober. If you are not interested in staying there, there are many
            standard accommodations in the city of Debre Birhan, like Getva
            Hotel, Bernos Hotel, etc.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AnkoberLodgePage;
