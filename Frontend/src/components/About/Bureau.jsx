import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const Bureau = () => {
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
        {/* First Row */}
        <Grid container spacing={3}>
          {/* First Column: Mission and Vision */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: "rgba(57, 62, 70, 0.8)", // Match AlitashPage content background
                borderRadius: "16px", // Match AlitashPage's borderRadius
                p: 2.5, // 20px padding
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#00ADB5", // Match AlitashPage heading color
                    fontSize: "1.5rem", // Match sectionTitleStyle
                    fontWeight: 600,
                    mb: 1.25, // 10px marginBottom
                  }}
                >
                  Mission, Vision, Duties, and Responsibilities of the Amhara
                  Culture and Tourism Bureau
                </Typography>
                <Divider
                  sx={{
                    backgroundColor: "#00ADB5", // Use the same teal color as headings for consistency
                    height: "2px",
                    width: "20%",
                    my: 1,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#00ADB5",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    mb: 1.25,
                    mt: 2,
                  }}
                >
                  Mission
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    color: "#EEEEEE", // Match AlitashPage text color
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    mb: 1.875, // 15px marginBottom
                  }}
                >
                  To identify, study, preserve, develop, and promote the
                  cultural, historical, and natural resources in the region,
                  thereby making a significant contribution to the economic,
                  social, political, and environmental development of the
                  region’s people.
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#00ADB5",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    mb: 1.25,
                    mt: 2,
                  }}
                >
                  Vision
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#EEEEEE",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    mb: 1.875,
                  }}
                >
                  To establish the culture and tourism sector as a primary
                  foundation for economic and social development, aiming to
                  cover 20 percent of the region’s annual production by the year
                  2030.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Column: Values */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: "rgba(57, 62, 70, 0.8)",
                borderRadius: "16px",
                p: 2.5,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#00ADB5",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    mb: 1.25,
                  }}
                >
                  Values
                </Typography>
                <ul
                  style={{
                    paddingLeft: "1.5rem",
                    margin: 0,
                    color: "#EEEEEE",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  <li style={{ marginBottom: "0.5rem" }}>Hospitality</li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    Respecting diversity
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    We strive for change
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>Excellent service</li>
                  <li style={{ marginBottom: "0.5rem" }}>Participation</li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    We prioritize community benefit
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>Transparency</li>
                  <li style={{ marginBottom: "0.5rem" }}>Accountability</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Second Row: Strategic Focus Areas */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "rgba(57, 62, 70, 0.8)",
                borderRadius: "16px",
                p: 2.5,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#00ADB5",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    mb: 1.25,
                  }}
                >
                  Strategic Focus Areas for the Institution in the Next 10 Years
                </Typography>
                <Divider
                  sx={{
                    backgroundColor: "#00ADB5",
                    height: "2px",
                    width: "20%",
                    my: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    color: "#EEEEEE",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    mb: 1.875,
                  }}
                >
                  Based on the duties and responsibilities assigned by
                  proclamation in the culture and tourism sector’s 10-year plan,
                  the strengths, weaknesses, opportunities, and threats
                  identified during past performance evaluations, the region’s
                  potential capacity, and the current situational demands, the
                  following focus areas have been identified as central pillars:
                </Typography>
                <ol
                  style={{
                    paddingLeft: "1.5rem",
                    margin: 0,
                    color: "#EEEEEE",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  <li style={{ marginBottom: "0.5rem" }}>
                    Sustainable protection and care of heritage and attraction
                    resources
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    Development of cultural values and industry
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    Development of tourism destinations and enhanced
                    competitiveness
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    Delivery of excellent service
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    Institutional capacity building
                  </li>
                </ol>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Bureau;
