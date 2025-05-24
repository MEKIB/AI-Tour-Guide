import React from "react";
import { Container, Box, Typography } from "@mui/material";
import heroImage from "../../../assets/Semien-Mountains.jpg"; // Import the image from AmharaS

const AmharaBoth = () => {
  return (
    <Container
      sx={{
        backgroundColor: "rgba(34, 40, 49, 0.8)", // Match AlitashPage main background
        minHeight: "100vh",
        py: 2.5, // 20px padding (converted to MUI's spacing unit: 20/8 = 2.5)
      }}
    >
      <Container
        maxWidth="lg" // Matches AlitashPage's maxWidth of 1200px (lg is close)
        sx={{
          p: 2.5, // 20px padding
        }}
      >
        {/* Hero Section (from AmharaS) */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "400px", // Adjusted to match AlitashPage's hero height
            overflow: "hidden",
            borderRadius: "16px", // Match AlitashPage's borderRadius
            mb: 2.5, // 20px marginBottom
          }}
        >
          <img
            src={heroImage}
            alt="Semien Mountains"
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
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "2.5rem", // Match AlitashPage's heroTitleStyle
                fontWeight: 600,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Match AmharaS and AlitashPage
              }}
            >
              About Amhara Region
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

        {/* Content Section (from Amhara) */}
        <Box
          sx={{
            backgroundColor: "rgba(57, 62, 70, 0.8)", // Match AlitashPage content background
            borderRadius: "16px",
            p: 2.5, // 20px padding
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#00ADB5", // Match AlitashPage heading color
              fontSize: "1.5rem", // Match AlitashPage sectionTitleStyle
              fontWeight: 600,
              mb: 1.25, // 10px marginBottom
            }}
          >
            The Amhara National Regional State
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE", // Match AlitashPage text color
              fontSize: "1rem",
              lineHeight: 1.6,
              mb: 1.875, // 15px marginBottom
            }}
          >
            The Amhara National Regional State is located in the northeastern,
            northwestern, and much of the central part of Ethiopia. It shares
            common borders with the region of Tigray in the north, Afar in the
            east, Oromiya in the south, Benishangul Gumuz in the southwest, and
            the Republic of Sudan in the west.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#00ADB5",
              fontSize: "1.5rem",
              fontWeight: 600,
              mb: 1.25,
            }}
          >
            Bahir Dar, Capital City of Amhara
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              lineHeight: 1.6,
              mb: 1.875,
            }}
          >
            Bahir Dar is the capital city of Amhara National Regional State. The
            city with tremendous attractions and gratification lies at the
            southern edge of Lake Tana and the outlet of the Great Blue Nile
            River. There are also other historical cities like Lalibela, Gondar,
            Debre Birhan, Dessie, Debre Markos, Ankober, Woldiya, and Debre
            Tabor in the region.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#00ADB5",
              fontSize: "1.5rem",
              fontWeight: 600,
              mb: 1.25,
            }}
          >
            Landforms and Climate
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              lineHeight: 1.6,
              mb: 1.875,
            }}
          >
            Due to the exogenic and endogenic forces that have acted for
            millions of years, the landforms of Amhara are made up of river-cut
            gorges, valleys, plateaus, mountains, hills, and plains. The
            altitude varies from 500m around Metema to 4543m above sea level at
            Ras Dejen in the Semien Mountains National parks.
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              lineHeight: 1.6,
              mb: 1.875,
            }}
          >
            Highlands comprise the largest part of the northern and eastern
            parts of the region. Chains of mountains and plateaus characterize
            the highlands. Mount Ras Dejen (4543m) is the highest peak in the
            country, Mount Analu(4473m), Mount Tefaw Lezer(4449m), Mount
            Kolo(4300m), Mount Guna (4231m), Mount Choke/Birhan (4184m) and
            Mount Abune Yousef (4284m) are among the mountain peaks that are
            located in the highland parts of the region. The lowland part with
            an altitude between 500-1000 above sea level covers mainly the
            western and some eastern parts of the region.
          </Typography>
          <Typography
            paragraph
            sx={{
              color: "#EEEEEE",
              fontSize: "1rem",
              lineHeight: 1.6,
              mb: 1.875,
            }}
          >
            Due to the altitude and cloud cover effect, there is a spatial
            variation of temperature and rainfall distribution in the region.
            The annual mean temperature for most parts of the region ranges
            between 15°C-21°C. The sunny season prevails from October through
            May, and the highest rainfall occurs during the summer season, which
            starts in mid-June and ends in early September.
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default AmharaBoth;
