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
} from "@mui/material";

// Import images for testimonials and other components
import lalibelaChurches from "../../assets/lalibela-1.jpg";
import lalibelaLodge from "../../assets/lalibela_lodge.jpg";
import rockHotel from "../../assets/rock_hotel.jpg";
import mountainViewHotel from "../../assets/mountain_view_hotel.jpg";
import zionHotel from "../../assets/zion_hotel.jpg";
import tukulVillage from "../../assets/tukul_village.jpg";
import sevenOlivesHotel from "../../assets/seven_olives_hotel.jpg";
import benAbeba from "../../assets/ben_abeba.jpg";
import lalibelaHudad from "../../assets/lalibela_hudad.jpg";
import rohaHotel from "../../assets/roha_hotel.jpg";
import harbeHotel from "../../assets/harbe_hotel.jpg";
import beteMedhaneAlem from "../../assets/bete_medhane_alem.jpg";
import beteMaryam from "../../assets/bete_maryam.jpg";
import beteGolgotha from "../../assets/bete_golgotha.jpg";
import beteAmanuel from "../../assets/bete_amanuel.jpg";
import beteAbbaLibanos from "../../assets/bete_abba_libanos.jpg";
import beteGabrielRufael from "../../assets/bete_gabriel_rufael.jpg";
import beteMerkorios from "../../assets/bete_merkorios.jpg";
import beteLehem from "../../assets/bete_lehem.jpg";
import abuneYosef from "../../assets/abune_yosef.jpg";
import lakeTana from "../../assets/lake_tana.jpg";
import blueNileFalls from "../../assets/blue_nile_falls.jpg";

// Testimonials Data with Images
const testimonials = [
  {
    id: 1,
    text: "An unforgettable experience! The Rock-Hewn Churches of Lalibela are truly a wonder of the world.",
    author: "Visitor 1",
    image: lalibelaChurches,
  },
  {
    id: 2,
    text: "The hospitality and beauty of Lalibela left me speechless. A must-visit destination!",
    author: "Visitor 2",
    image: lalibelaChurches,
  },
  {
    id: 3,
    text: "The history and culture of Lalibela are awe-inspiring. I can't wait to visit again!",
    author: "Visitor 3",
    image: lalibelaChurches,
  },
  {
    id: 4,
    text: "The hotels and accommodations were top-notch. Highly recommend Lalibela to everyone!",
    author: "Visitor 4",
    image: lalibelaChurches,
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

// Location Data
const locationData = {
  Lalibela: {
    popularAttraction: {
      name: "Rock-Hewn Churches",
      description:
        "The Rock-Hewn Churches of Lalibela are a UNESCO World Heritage site and one of the most extraordinary architectural wonders in the world. Carved directly into solid rock in the 12th century, these churches are a testament to the ingenuity and devotion of the Ethiopian people. Each church has unique features, and the site remains an active place of worship and pilgrimage.",
      image: lalibelaChurches,
    },
    hotels: [
      {
        name: "Lalibela Lodge",
        description:
          "A luxurious lodge offering breathtaking views of the surrounding mountains and valleys. Perfect for travelers seeking comfort and tranquility.",
        image: lalibelaLodge,
      },
      {
        name: "Rock Hotel",
        description:
          "A unique hotel built into the rock formations, offering an authentic Lalibela experience with modern amenities.",
        image: rockHotel,
      },
      {
        name: "Mountain View Hotel",
        description:
          "Located on a hilltop, this hotel provides panoramic views of Lalibela and its iconic churches.",
        image: mountainViewHotel,
      },
      {
        name: "Zion Hotel",
        description:
          "A cozy hotel with a warm atmosphere, located close to the main attractions of Lalibela.",
        image: zionHotel,
      },
      {
        name: "Tukul Village",
        description:
          "Experience traditional Ethiopian hospitality in these charming tukul-style accommodations.",
        image: tukulVillage,
      },
      {
        name: "Seven Olives Hotel",
        description:
          "One of the oldest hotels in Lalibela, offering a blend of history and modern comfort.",
        image: sevenOlivesHotel,
      },
      {
        name: "Ben Abeba",
        description:
          "A unique and modern hotel with stunning architecture and exceptional service.",
        image: benAbeba,
      },
      {
        name: "Lalibela Hudad",
        description:
          "Eco-friendly lodges located on a plateau, offering stunning views and a peaceful retreat.",
        image: lalibelaHudad,
      },
      {
        name: "Roha Hotel",
        description:
          "A mid-range hotel with comfortable rooms and easy access to Lalibela's attractions.",
        image: rohaHotel,
      },
      {
        name: "Harbe Hotel",
        description:
          "A budget-friendly option with clean rooms and friendly staff, located in the heart of Lalibela.",
        image: harbeHotel,
      },
    ],
    religiousSites: [
      {
        name: "Bete Medhane Alem",
        description:
          "The largest rock-hewn church in the world, known for its impressive architecture and religious significance.",
        image: beteMedhaneAlem,
      },
      {
        name: "Bete Maryam",
        description:
          "One of the oldest churches in Lalibela, known for its beautiful frescoes and carvings.",
        image: beteMaryam,
      },
      {
        name: "Bete Golgotha",
        description:
          "A church known for its unique carvings and religious artifacts, including the tomb of King Lalibela.",
        image: beteGolgotha,
      },
      {
        name: "Bete Giyorgis",
        description:
          "The most famous of the Lalibela churches, carved in the shape of a cross and a symbol of Ethiopian Christianity.",
        image: beteAmanuel,
      },
      {
        name: "Bete Amanuel",
        description:
          "A monolithic church with intricate carvings and a unique architectural style.",
        image: beteAmanuel,
      },
      {
        name: "Bete Abba Libanos",
        description:
          "A church carved into a cliff, known for its religious significance and stunning views.",
        image: beteAbbaLibanos,
      },
      {
        name: "Bete Gabriel-Rufael",
        description:
          "A twin church complex with unique architectural features and religious importance.",
        image: beteGabrielRufael,
      },
      {
        name: "Bete Merkorios",
        description:
          "A church believed to have been used as a prison, with fascinating carvings and history.",
        image: beteMerkorios,
      },
      {
        name: "Bete Lehem",
        description:
          "A small church known for its religious significance and peaceful atmosphere.",
        image: beteLehem,
      },
      {
        name: "Abune Yosef",
        description:
          "A monastery located on a mountain, offering stunning views and a spiritual retreat.",
        image: abuneYosef,
      },
    ],
    lakes: [
      {
        name: "Lake Tana",
        description:
          "The largest lake in Ethiopia and the source of the Blue Nile, home to numerous monasteries and rich biodiversity.",
        image: lakeTana,
      },
      {
        name: "Blue Nile Falls",
        description:
          "Known as 'The Smoking Water,' this stunning waterfall is a must-see natural wonder near Lake Tana.",
        image: blueNileFalls,
      },
      {
        name: "Danakil Depression",
        description:
          "One of the hottest and lowest places on Earth, known for its otherworldly landscapes and active volcanoes.",
        image: blueNileFalls,
      },
      {
        name: "Lake Awassa",
        description:
          "A serene lake surrounded by lush greenery, perfect for birdwatching and relaxation.",
        image: lakeTana,
      },
      {
        name: "Lake Langano",
        description:
          "A popular destination for swimming and water sports, with beautiful sandy beaches.",
        image: lakeTana,
      },
      {
        name: "Lake Ziway",
        description:
          "A freshwater lake known for its birdlife and nearby historical sites.",
        image: lakeTana,
      },
      {
        name: "Lake Chamo",
        description:
          "Famous for its crocodile market and hippopotamus populations, located in Nechisar National Park.",
        image: lakeTana,
      },
      {
        name: "Lake Abaya",
        description:
          "A large lake with reddish waters, offering stunning views and wildlife sightings.",
        image: lakeTana,
      },
      {
        name: "Lake Shala",
        description:
          "A deep crater lake surrounded by steep cliffs, known for its tranquility.",
        image: lakeTana,
      },
      {
        name: "Lake Ashenge",
        description:
          "A high-altitude lake with historical significance, located near the town of Mekelle.",
        image: lakeTana,
      },
    ],
    historicalLandmarks: [
      {
        name: "Axum Obelisks",
        description:
          "Ancient obelisks and stelae that mark the tombs of Axumite kings, a UNESCO World Heritage site.",
        image: lakeTana,
      },
      {
        name: "Gondar Castles",
        description:
          "A collection of medieval castles and churches, known as the 'Camelot of Africa.'",
        image: lakeTana,
      },
      {
        name: "Simien Mountains",
        description:
          "A UNESCO World Heritage site, known for its dramatic landscapes and endemic wildlife.",
        image: lakeTana,
      },
      {
        name: "Sof Omar Caves",
        description:
          "One of the longest cave systems in the world, with stunning limestone formations.",
        image: lakeTana,
      },
      {
        name: "Harar Walls",
        description:
          "The historic fortified city of Harar, known for its ancient walls and vibrant culture.",
        image: lakeTana,
      },
      {
        name: "Tiya Stelae",
        description:
          "A UNESCO World Heritage site featuring ancient stone stelae with mysterious carvings.",
        image: lakeTana,
      },
      {
        name: "Lower Omo Valley",
        description:
          "A region rich in cultural diversity and ancient tribal traditions.",
        image: lakeTana,
      },
      {
        name: "Debre Damo Monastery",
        description:
          "An ancient monastery accessible only by climbing a sheer cliff, offering breathtaking views.",
        image: lakeTana,
      },
      {
        name: "Yeha Temple",
        description:
          "The oldest standing structure in Ethiopia, dating back to the 5th century BCE.",
        image: lakeTana,
      },
      {
        name: "Negash Mosque",
        description:
          "One of the oldest mosques in Africa, with deep historical and religious significance.",
        image: lakeTana,
      },
    ],
  },
};

// Call-to-Action Section Component
const CallToAction = ({ title, buttonText, onClick }) => {
  return (
    <Box sx={{ bgcolor: "#00ADB5", py: 6, mt: 4, mb: 4 }}>
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
    <Container maxWidth={false} sx={{ bgcolor: "#222831" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: "100px",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
                bgcolor: "#393E46",
                color: "#EEEEEE",
                width: "100%",
                height: "300px", // Varying heights
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
                background: `linear-gradient(145deg, #00ADB5, #393E46)`,
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <CardMedia
                component="img"
                height = "180px" // Varying heights
                image={item.image}
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
      <Box sx={{ bgcolor: "#393E46", py: 6, mt: 4 }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mb: 4, color: "#EEEEEE" }}>
            What Our Visitors Say
          </Typography>
          <Slider {...carouselSettings}>
            {testimonials.map((testimonial) => (
              <Box key={testimonial.id} sx={{ px: 2 }}>
                <Card
                  sx={{
                    background: "linear-gradient(145deg, #00ADB5, #393E46)",
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
                    image={testimonial.image}
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
  );
}

export default Home;