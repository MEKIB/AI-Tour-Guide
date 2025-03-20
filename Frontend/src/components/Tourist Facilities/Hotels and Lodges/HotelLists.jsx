import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import images from "../../../assets/Biking.jpg";
import HotelFilter from "./FilterHotel";
import { useNavigate } from "react-router-dom";
import sky from "../../../assets/sky resort.jpeg";
import grand from "../../../assets/grand hotel.jpeg";
import unison from "../../../assets/unison.jpg";
import unisonBed1 from "../../../assets/unison bed.jpg";
import unisonGym from "../../../assets/unison gym.jpeg";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockHotels = [
      {
        id: 1,
        name: "Hotel A",
        location: "Gondar",
        facilityType: "Hotels",
        image: images,
        rating: 4.5, // Added rating
        description:
          "A charming hotel in Gondar, offering comfortable rooms and a convenient location.",
      },
      {
        id: 2,
        name: "Hotel B",
        location: "Gondar",
        facilityType: "Hotel",
        image: images,
        rating: 3.8, // Added rating
        description:
          "Experience luxury at Hotel B in Gondar. Enjoy our excellent amenities and services.",
      },
      {
        id: 3,
        name: "Unison Hotel",
        location: "Bahir Dar",
        facilityType: "Hotels",
        image: unison,
        images: [
          unison,
          unison,
          unison,
          unison,
          unison,
          unison,
          unison,
          unison,
          unison,
          unison,
          unison,
          unisonBed1,
          unisonGym,
        ],
        rating: 4.7, // Added rating
        description: `
          You might be eligible for a Genius discount at AYA Addis Hotel. To check if a Genius discount is available for your selected dates sign in.
          
          Genius discounts at this property are subject to book dates, stay dates and other available deals.
          
          Located in Addis Ababa, 500 metres from Matti Multiplex Theatre, AYA Addis Hotel provides accommodation with a restaurant, free private parking and a bar. With free WiFi, this 4-star hotel offers room service and a 24-hour front desk. The accommodation features entertainment staff and an ATM.
          
          At the hotel, each room is fitted with a desk. Complete with a private bathroom equipped with a bath or shower and free toiletries, guest rooms at AYA Addis Hotel have a TV and air conditioning, and selected rooms are equipped with a balcony. All rooms include a safety deposit box.
          
          Guests at the accommodation can enjoy a buffet breakfast.
          
          UNECA Conference Center is 2.9 km from AYA Addis Hotel, while UN Conference Centre Addis Ababa is 3.2 km away. Addis Ababa Bole International Airport is 2 km from the property.
          
          Couples particularly like the very good location — they rated it 8.2 for a two-person trip.
          
          Distance in property description is calculated using © OpenStreetMap
        `.trim(),
      },
      {
        id: 4,
        name: "Hotel D",
        location: "Gondar",
        facilityType: "Hotel",
        image: images,
        rating: 4.2, // Added rating
        description:
          "A great choice for your stay in Gondar, offering comfortable accommodations.",
      },
      {
        id: 5,
        name: "Sky Resort",
        location: "Bahir Dar",
        facilityType: "Hotels",
        image: sky,
        images: [unison, unisonBed1, unisonGym],
        rating: 4.9, // Added rating
        description:
          "Luxurious resort in Bahir Dar with stunning views and excellent facilities.",
      },
      {
        id: 6,
        name: "Grand Hotel",
        location: "Bahir Dar",
        facilityType: "Hotels",
        image: grand,
        images: [unison, unisonBed1, unisonGym],
        rating: 4.0, // Added rating
        description:
          "Sophisticated hotel in Bahir Dar with spacious suites and gourmet dining.",
      },
    ];

    setHotels(mockHotels);
    setLoading(false);
  }, []);

  const handleFilterSubmit = (location, facilityType) => {
    let filtered = hotels;

    if (location !== "All Locations") {
      filtered = filtered.filter((hotel) => hotel.location === location);
    }

    if (facilityType !== "All Facility Types") {
      filtered = filtered.filter((hotel) => hotel.facilityType === facilityType);
    }

    navigate("/filtered-hotels", { state: { filteredHotels: filtered } });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Loading hotels...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error?.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <HotelFilter onApply={handleFilterSubmit} />

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id}>
            <Card
              sx={{
                cursor: "pointer",
                bgcolor: "#393E46",
                color: "#EEEEEE",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
                },
              }}
            >
             
             
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HotelList;