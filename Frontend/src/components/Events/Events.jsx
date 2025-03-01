import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
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
  },
  {
    title: "Sebat bet Agew Horse Riding festival",
    description:
      "With the decoration, they put in their horse, and with a large number of horses gathering annually attending the horsing events in the Amhara region is a lifetime experience.",
    image: Image2,
  },
  {
    title: "Mewlid",
    description:
      "Welcome to a place where Mewlid/the birth of Prophet Mohammed/ being celebrated in a colorful and astounding fashion.",
    image: Image3,
  },
  {
    title: "Ashendeye/Shadey/solel",
    description:
      "One of the best events that makes visiting the region by the end of August is the vibrant girls festival Ashendeye/Shadey/Solel.",
    image: Image4,
  },
  {
    title: "Meskel/the finding of the true cross/",
    description:
      "When the Ethiopian mountains’ turns to a verdant meadow after the rainy season, Ethiopians celebrate one of the colorful festival of the year; Meskel.",
    image: Image5,
  },
  {
    title: "Genna (Ethiopian Christmas)",
    description:
      "Although Genna is observed by Christians across Ethiopia, the most famous Christmas celebrations arguably occur in the historic city of Lalibela.",
    image: Image6,
  },
  {
    title: "Timket (Epiphany)",
    description:
      "Appraise as Ethiopia’s most colorful holiday of the year, Gondar is the right venue to witness this energic outdoor festival.",
    image: Image7,
  },
  {
    title: "Fasika (Ethiopian Easter)",
    description:
      "Fasika, or Ethiopian Easter, is one of the most significant religious celebrations in Ethiopia. Marked by a long fasting period and culminating in a grand midnight mass, it is a deeply spiritual event observed by millions.",
    image: Image8,
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ height: "100%", cursor: "pointer" }}
              onClick={() => handleOpen(event)}
            >
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!selectedEvent} onClose={handleClose} fullScreen>
        {selectedEvent && (
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <CardMedia
              component="img"
              image={selectedEvent.image}
              alt={selectedEvent.title}
              sx={{ width: "100%", height: "80vh", objectFit: "contain" }}
            />
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
              {selectedEvent.title}
            </Typography>
            <Typography variant="h6" align="center" sx={{ mt: 1 }}>
              {selectedEvent.description}
            </Typography>
          </DialogContent>
        )}
      </Dialog>
    </Container>
  );
};

export default Events;
