import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import person1 from "../../../assets/11.png";
import person2 from "../../../assets/12.png";
import person3 from "../../../assets/13.jpg";
import person4 from "../../../assets/14.jpg";
import person5 from "../../../assets/15.jpg";
import person6 from "../../../assets/16.jpg";
import person7 from "../../../assets/17.jpg";
import person8 from "../../../assets/18.jpg";
import person9 from "../../../assets/19.jpg";
import person10 from "../../../assets/20.jpg";

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
    name: "Gashaye MELESE BEKELE",
    role: "Heritage restoration and conservation Director",
    image: person9,
  },
  {
    name: "Yengusie Abebe Eshatie",
    role: "Grievance And Compliance Handling Expert",
    image: person10,
  },
];

const AboutManagement = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid
            item
            xs={12}
            sm={index === 0 ? 12 : index <= 2 ? 6 : index <= 6 ? 3 : 4}
            key={index}
          >
            <Card
              sx={{
                maxWidth: 300,
                margin: "auto",
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
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
              <CardContent sx={{ bgcolor: "#f5f5f5", p: 2 }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutManagement;
