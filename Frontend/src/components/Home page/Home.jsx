import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  ButtonGroup,
  Icon,
} from "@mui/material";

// Icons for Why Book with Visit Amhara
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PaymentIcon from "@mui/icons-material/Payment";

// Testimonials Data with Unsplash Images
const testimonials = [
  {
    id: 1,
    text: "An unforgettable experience! The Rock-Hewn Churches of Lalibela are truly a wonder of the world.",
    author: "Visitor 1",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791", // Unsplash URL
  },
  {
    id: 2,
    text: "The hospitality and beauty of Lalibela left me speechless. A must-visit destination!",
    author: "Visitor 2",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f", // Unsplash URL
  },
  {
    id: 3,
    text: "The history and culture of Lalibela are awe-inspiring. I can't wait to visit again!",
    author: "Visitor 3",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f", // Unsplash URL
  },
  {
    id: 4,
    text: "The hotels and accommodations were top-notch. Highly recommend Lalibela to everyone!",
    author: "Visitor 4",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791", // Unsplash URL
  },
];

// Carousel Settings
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

// Location Data with Unsplash Images
const locationData = {
  Lalibela: {
    popularAttraction: {
      name: "Rock-Hewn Churches",
      description:
        "The Rock-Hewn Churches of Lalibela are a UNESCO World Heritage site and one of the most extraordinary architectural wonders in the world. Carved directly into solid rock in the 12th century, these churches are a testament to the ingenuity and devotion of the Ethiopian people. Each church has unique features, and the site remains an active place of worship and pilgrimage.",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791", // Unsplash URL
    },
    hotels: [
      {
        name: "Lalibela Lodge",
        description:
          "A luxurious lodge offering breathtaking views of the surrounding mountains and valleys. Perfect for travelers seeking comfort and tranquility.",
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f", // Unsplash URL
      },
      {
        name: "Rock Hotel",
        description:
          "A unique hotel built into the rock formations, offering an authentic Lalibela experience with modern amenities.",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791", // Unsplash URL
      },
      {
        name: "Mountain View Hotel",
        description:
          "Located on a hilltop, this hotel provides panoramic views of Lalibela and its iconic churches.",
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f", // Unsplash URL
      },
    ],
    religiousSites: [
      {
        name: "Bete Medhane Alem",
        description:
          "The largest rock-hewn church in the world, known for its impressive architecture and religious significance.",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791", // Unsplash URL
      },
      {
        name: "Bete Maryam",
        description:
          "One of the oldest churches in Lalibela, known for its beautiful frescoes and carvings.",
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f", // Unsplash URL
      },
    ],
    lakes: [
      {
        name: "Lake Tana",
        description:
          "The largest lake in Ethiopia and the source of the Blue Nile, home to numerous monasteries and rich biodiversity.",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791", // Unsplash URL
      },
      {
        name: "Blue Nile Falls",
        description:
          "Known as 'The Smoking Water,' this stunning waterfall is a must-see natural wonder near Lake Tana.",
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f", // Unsplash URL
      },
    ],
  },
};

// Call-to-Action Section Component
const CallToAction = ({ title, buttonText, onClick }) => {
  return (
    <Box sx={{ bgcolor: "rgba(0, 173, 181, 0.8)", py: 6, mt: 4, mb: 4 }}>
      <Container>
        <Typography variant="h4" align="center" sx={{ mb: 4, color: "#EEEEEE" }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={onClick}
            sx={{
              bgcolor: "#393E46",
              color: "#EEEEEE",
              "&:hover": { bgcolor: "#222831" },
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

// Why Book with Visit Amhara Section
const WhyBookWithUs = () => {
  return (
    <Box sx={{ bgcolor: "rgba(57, 62, 70, 0.8)", py: 6 }}>
      <Container>
        <Typography variant="h4" align="center" sx={{ mb: 4, color: "#00ADB5" }}>
          Why Book with Visit Amhara?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <SupportAgentIcon sx={{ fontSize: 50, color: "#00ADB5", mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, color: "#EEEEEE" }}>
                24/7 Support
              </Typography>
              <Typography variant="body2" sx={{ color: "#EEEEEE" }}>
                We’re here for you anytime, anywhere.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <LoyaltyIcon sx={{ fontSize: 50, color: "#00ADB5", mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, color: "#EEEEEE" }}>
                Earn Rewards
              </Typography>
              <Typography variant="body2" sx={{ color: "#EEEEEE" }}>
                Travel more, earn more with our loyalty program.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <ThumbUpIcon sx={{ fontSize: 50, color: "#00ADB5", mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, color: "#EEEEEE" }}>
                Trusted Reviews
              </Typography>
              <Typography variant="body2" sx={{ color: "#EEEEEE" }}>
                Millions of verified reviews to guide your journey.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <PaymentIcon sx={{ fontSize: 50, color: "#00ADB5", mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, color: "#EEEEEE" }}>
                Flexible Plans
              </Typography>
              <Typography variant="body2" sx={{ color: "#EEEEEE" }}>
                Free cancellation and pay-later options.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Home Component
function Home({ location }) {
  const currentLocation = location || "Lalibela";
  const currentData = locationData[currentLocation];
  const [filter, setFilter] = useState("hotels");

  const filteredData = currentData[filter];

  // Handle button click for the Call-to-Action
  const handleBookTrip = () => {
    alert("Redirecting to booking page...");
    // Add your booking logic here
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(https://images.unsplash.com/photo-1564501049412-61c2a3083791)`, // Unsplash URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#EEEEEE",
      }}
    >
      {/* Semi-transparent overlay */}
      <Box
        sx={{
          background: "rgba(34, 40, 49, 0.8)", // Dark overlay for better readability
          minHeight: "100vh",
        }}
      >
        <Container maxWidth={false}>
          {/* Hero Section */}
          <Box
            sx={{
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#EEEEEE",
              mb: 4,
            }}
          >
            <Typography variant="h2" component="h3" sx={{ fontWeight: 100 }}>
              Welcome to {currentLocation}, Ethiopia
            </Typography>
          </Box>

          {/* Why Book with Visit Amhara Section */}
          <WhyBookWithUs />


          {/* Filter Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4, px: 2 }}>
            <ButtonGroup variant="contained">
              <Button
                onClick={() => setFilter("hotels")}
                sx={{
                  bgcolor: filter === "hotels" ? "#00ADB5" : "#393E46",
                  color: "#EEEEEE",
                  "&:hover": { bgcolor: "#00ADB5" },
                }}
              >
                Hotels
              </Button>
              <Button
                onClick={() => setFilter("religiousSites")}
                sx={{
                  bgcolor: filter === "religiousSites" ? "#00ADB5" : "#393E46",
                  color: "#EEEEEE",
                  "&:hover": { bgcolor: "#00ADB5" },
                }}
              >
                Religious Sites
              </Button>
              <Button
                onClick={() => setFilter("lakes")}
                sx={{
                  bgcolor: filter === "lakes" ? "#00ADB5" : "#393E46",
                  color: "#EEEEEE",
                  "&:hover": { bgcolor: "#00ADB5" },
                }}
              >
                Lakes
              </Button>
              <Button
                onClick={() => setFilter("historicalLandmarks")}
                sx={{
                  bgcolor: filter === "historicalLandmarks" ? "#00ADB5" : "#393E46",
                  color: "#EEEEEE",
                  "&:hover": { bgcolor: "#00ADB5" },
                }}
              >
                Historical Landmarks
              </Button>
            </ButtonGroup>
          </Box>

          {/* Filtered Content */}
          <Grid container spacing={4} sx={{ px: 2 }}>
            {filteredData.map((item, index) => (
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
                <Card
                  elevation={3}
                  sx={{
                    bgcolor: "rgba(57, 62, 70, 0.8)",
                    color: "#EEEEEE",
                    width: "100%",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180px"
                    image={item.image} // Unsplash URL
                    alt={item.name}
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="#EEEEEE">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Testimonials Carousel */}
          <Box sx={{ bgcolor: "rgba(57, 62, 70, 0.8)", py: 6, mt: 4 }}>
            <Container>
              <Typography variant="h4" align="center" sx={{ mb: 4, color: "#EEEEEE" }}>
                What Our Visitors Say
              </Typography>
              <Slider {...carouselSettings}>
                {testimonials.map((testimonial) => (
                  <Box key={testimonial.id} sx={{ px: 2 }}>
                    <Card
                      sx={{
                        background: "rgba(0, 173, 181, 0.8)",
                        color: "#EEEEEE",
                        p: 3,
                        height: 300,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "16px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={testimonial.image} // Unsplash URL
                        alt={testimonial.author}
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          mb: 2,
                          border: "3px solid #00ADB5",
                          objectFit: "cover",
                        }}
                      />
                      <Typography variant="body1" sx={{ mb: 2, fontStyle: "italic" }}>
                        "{testimonial.text}"
                      </Typography>
                      <Typography variant="subtitle2" align="right" sx={{ color: "#00ADB5" }}>
                        - {testimonial.author}
                      </Typography>
                    </Card>
                  </Box>
                ))}
              </Slider>
            </Container>
          </Box>

          {/* Call-to-Action Section */}
          <CallToAction
            title={`Ready to Explore ${currentLocation}?`}
            buttonText="Book Your Trip Now"
            onClick={handleBookTrip}
          />
        </Container>
      </Box>
    </Box>
  );
}

export default Home;