import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import person1 from "../../assets/11.png";
import person2 from "../../assets/12.png";
import person3 from "../../assets/13.jpg";
import person4 from "../../assets/14.jpg";
import person5 from "../../assets/15.jpg";
import person6 from "../../assets/16.jpg";
import person7 from "../../assets/17.jpg";
import person8 from "../../assets/18.jpg";
import person9 from "../../assets/19.jpg";
import person10 from "../../assets/20.jpg";

const teamMembers = [
  {
    name: "Muluken Adane Tiruneh (PhD)",
    role: "Bureau Head",
    image: person1,
  },
  { name: "Endris Abdu Ahmed", role: "Deputy Bureau Head", image: person2 },
  {
    name: "Abebe Baye Ewnetu (D/r)",
    role: "Deputy Bureau Head",
    image: person3,
  },
  {
    name: "Abera Balda Silga",
    role: "Tourism Services Competency Accreditation Director",
    image: person4,
  },
  {
    name: "Melkamu Adam Delele",
    role: "Tourism Development Director",
    image: person5,
  },
  {
    name: "Birhan Tsagaye Girefe",
    role: "Cultural Values & Industry Development Director",
    image: person6,
  },
  {
    name: "Melaku Berhanie Tesfa",
    role: "Planning, Monitoring & Evaluation Director",
    image: person7,
  },
  {
    name: "Abebe Embiale Hailie",
    role: "Head of Public Relation",
    image: person8,
  },
  {
    name: "Gashaye Melese Bekele",
    role: "Heritage Restoration and Conservation Director",
    image: person9,
  },
  {
    name: "Yengusie Abebe Eshatie",
    role: "Grievance And Compliance Handling Expert",
    image: person10,
  },
];

const Management = () => {
  return (
    <Container
      sx={{
        backgroundColor: "rgba(34, 40, 49, 0.8)", // Match AlitashPage main background
        minHeight: "100vh",
        width: "100vw", // Full-screen width
        maxWidth: "none", // Remove maxWidth constraint for full-screen
        p: 0, // No padding at the outermost level
        py: 2.5, // 20px vertical padding
      }}
    >
      <Container
        maxWidth="xl" // Use a wider container for content (still centered)
        sx={{
          p: 2.5, // 20px padding
        }}
      >
        {/* Section Title */}
        <Typography
          variant="h4"
          sx={{
            color: "#00ADB5", // Match AlitashPage heading color
            fontSize: "2.5rem", // Larger for prominence, matching hero titles
            fontWeight: 600,
            textAlign: "center",
            mb: 5, // More spacing below the title
          }}
        >
          Meet Our Management Team
        </Typography>

        {/* Team Members Grid */}
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid
              item
              xs={12}
              sm={index === 0 ? 12 : index <= 2 ? 6 : index <= 6 ? 4 : 4} // Adjusted for full-screen layout
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: { xs: 300, md: 350 }, // Slightly wider cards on larger screens
                  backgroundColor: "rgba(57, 62, 70, 0.8)", // Match AlitashPage content background
                  borderRadius: "16px", // Match AlitashPage's borderRadius
                  textAlign: "center",
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={member.image}
                  alt={member.name}
                  sx={{
                    objectFit: "contain", // Prevents cropping
                    padding: "10px", // Adds spacing to ensure full visibility
                  }}
                />
                <CardContent
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#00ADB5", // Match AlitashPage heading color
                      fontSize: "1.5rem", // Match AlitashPage sectionTitleStyle
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#EEEEEE", // Match AlitashPage text color
                      fontSize: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default Management;
