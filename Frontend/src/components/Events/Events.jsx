import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventsUpper from "./EventsUpper";
import Image1 from "../../assets/merqorios.jpg";
import Image2 from "../../assets/sebat.jpg";
import Image3 from "../../assets/mewlid.jpg";
import Image4 from "../../assets/ashenda.jpg";
import Image5 from "../../assets/meskel.jpg";
import Image6 from "../../assets/gena.jpg";
import Image7 from "../../assets/timket.jpg";
import Image8 from "../../assets/fasika.jpg";

const events = [
  {
    title: "Merqorios horse galloping",
    description:
      "The horse galloping event in Debere Tabor by the beginning of February is a reminder of some fantastic adventure movies.",
    image: Image1,
    path: "/events/merqorios",
  },
  {
    title: "Sebat bet Agew Horse Riding festival",
    description:
      "With the decoration they put on their horses, and with a large number of horses gathering annually, attending the horsing events in the Amhara region is a lifetime experience.",
    image: Image2,
    path: "/events/sebat",
  },
  {
    title: "Mewlid",
    description:
      "Welcome to a place where Mewlid, the birth of Prophet Mohammed, is celebrated in a colorful and astounding fashion.",
    image: Image3,
    path: "/events/mewlid",
  },
  {
    title: "Ashendeye/Shadey/Solel",
    description:
      "One of the best events that makes visiting the region by the end of August is the vibrant girls festival Ashendeye/Shadey/Solel.",
    image: Image4,
    path: "/events/ashenda",
  },
  {
    title: "Meskel/the finding of the true cross/",
    description:
      "When the Ethiopian mountains turn to a verdant meadow after the rainy season, Ethiopians celebrate one of the colorful festivals of the year: Meskel.",
    image: Image5,
    path: "/events/meskel",
  },
  {
    title: "Genna (Ethiopian Christmas)",
    description:
      "Although Genna is observed by Christians across Ethiopia, the most famous Christmas celebrations arguably occur in the historic city of Lalibela.",
    image: Image6,
    path: "/events/genna",
  },
  {
    title: "Timket (Epiphany)",
    description:
      "Appraised as Ethiopia’s most colorful holiday of the year, Gondar is the right venue to witness this energetic outdoor festival.",
    image: Image7,
    path: "/events/timket",
  },
  {
    title: "Fasika (Ethiopian Easter)",
    description:
      "Fasika, or Ethiopian Easter, is one of the most significant religious celebrations in Ethiopia. Marked by a long fasting period and culminating in a grand midnight mass, it is a deeply spiritual event observed by millions.",
    image: Image8,
    path: "/events/fasika",
  },
];

const Events = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "rgba(34, 40, 49, 0.8)", minHeight: "100vh" }}>
      <EventsUpper />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#00ADB5" }}
        >
          Events
        </Typography>
        <Grid container spacing={3}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  background: "rgba(57, 62, 70, 0.8)",
                  color: "#EEEEEE",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={() => navigate(event.path)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                  sx={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#00ADB5" }}
                  >
                    {event.title}
                  </Typography>
                  <Typography variant="body2">{event.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Events;
