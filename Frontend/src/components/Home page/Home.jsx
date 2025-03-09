import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";

// Import images from the assets folder
import lalibelaChurches from "../../assets/lalibela-1.jpg";
import yemrehannaKristos from "../../assets/Yemrehanne-Kristos.jpg";
import ashetenMariam from "../../assets/asheten_mariam.jpg";
import naakutoLaab from "../../assets/AbuneMelketsedeq1.jpg";
import beteGiyorgis from "../../assets/bete_giyorgis.jpg";
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
import geneteMariyam from "../../assets/genete_mariyam.jpg";

import fasilGhebbi from "../../assets/fasil_ghebbi.jpg";
import debreBerhanSelassie from "../../assets/debre_berhan_selassie.jpg";
import fasiladasBath from "../../assets/fasiladas_bath.jpg";
import kuskuamComplex from "../../assets/kuskuam_complex.jpg";
import simienMountains from "../../assets/simien_mountains.jpg";
import gohaHotel from "../../assets/goha_hotel.jpg";
import tayeBelayHotel from "../../assets/taye_belay_hotel.jpg";
import lodgeDuChateau from "../../assets/lodge_du_chateau.jpg";
import quaraHotel from "../../assets/quara_hotel.jpg";
import habeshaHotel from "../../assets/habesha_hotel.jpg";
import fasilLodge from "../../assets/fasil_lodge.jpg";
import gondarHillsResort from "../../assets/gondar_hills_resort.jpg";
import atseTewodrosHotel from "../../assets/atse_tewodros_hotel.jpg";
import circleHotel from "../../assets/circle_hotel.jpg";
import gondarTownHotel from "../../assets/gondar_town_hotel.jpg";
import fasiladasCastle from "../../assets/fasiladas_castle.jpg";
import susenyosCastle from "../../assets/susenyos_castle.jpg";
import iyasuPalace from "../../assets/iyasu_palace.jpg";
import waliaIbex from "../../assets/walia_ibex.jpg";
import geladaBaboons from "../../assets/gelada_baboons.jpg";
import ethiopianWolf from "../../assets/ethiopian_wolf.jpg";

import blueNileFalls from "../../assets/blue_nile_falls.jpg";
import lakeTana from "../../assets/lake_tana.jpg";
import uraKidaneMehret from "../../assets/ura_kidane_mehret.jpg";
import zegePeninsula from "../../assets/zege_peninsula.jpg";
import stGeorgeMonastery from "../../assets/st_george_monastery.jpg";
import tanaKirkos from "../../assets/tana_kirkos.jpg";
import dagaEstifanos from "../../assets/daga_estifanos.jpg";
import kebranGabriel from "../../assets/kebran_gabriel.jpg";
import nargaSelassie from "../../assets/narga_selassie.jpg";
import debreMaryam from "../../assets/debre_maryam.jpg";
import azwaMaryam from "../../assets/azwa_maryam.jpg";
import lakeShoreResort from "../../assets/lake_shore_resort.jpg";
import blueNileHotel from "../../assets/blue_nile_hotel.jpg";
import kuriftuResort from "../../assets/kuriftu_resort.jpg";
import abayMinchLodge from "../../assets/abay_minch_lodge.jpg";
import tanaHotel from "../../assets/tana_hotel.jpg";
import papyrusHotel from "../../assets/papyrus_hotel.jpg";
import jacarandaHotel from "../../assets/jacaranda_hotel.jpg";
import ghionHotel from "../../assets/ghion_hotel..jpg";
import ethioStarHotel from "../../assets/ethio_star_hotel.jpg";
import bahirDarHotel from "../../assets/bahir_dar_hotel.jpg";

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
    attractions: [
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
        image: beteGiyorgis,
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
      {
        name: "Genete Mariyam",
        description:
          "A historic church located outside Lalibela, known for its beautiful frescoes and serene atmosphere.",
        image: geneteMariyam,
      },
    ],
  },
  Gondar: {
    popularAttraction: {
      name: "Fasil Ghebbi",
      description:
        "Fasil Ghebbi, also known as the Royal Enclosure, is a UNESCO World Heritage site and the former residence of Ethiopian emperors. The complex includes castles, churches, and palaces built in the 17th century, showcasing a unique blend of Ethiopian and European architectural styles.",
      image: fasilGhebbi,
    },
    hotels: [
      {
        name: "Goha Hotel",
        description:
          "A luxurious hotel offering panoramic views of Gondar and its historic sites.",
        image: gohaHotel,
      },
      {
        name: "Taye Belay Hotel",
        description:
          "A modern hotel with excellent amenities and a central location.",
        image: tayeBelayHotel,
      },
      {
        name: "Lodge du Chateau",
        description:
          "A charming lodge located near Fasil Ghebbi, offering a peaceful retreat.",
        image: lodgeDuChateau,
      },
      {
        name: "Quara Hotel",
        description:
          "A budget-friendly hotel with clean rooms and friendly service.",
        image: quaraHotel,
      },
      {
        name: "Habesha Hotel",
        description:
          "A mid-range hotel offering comfortable accommodations and a warm atmosphere.",
        image: habeshaHotel,
      },
      {
        name: "Fasil Lodge",
        description: "A cozy lodge located close to Gondar's main attractions.",
        image: fasilLodge,
      },
      {
        name: "Gondar Hills Resort",
        description:
          "A luxury resort offering stunning views and top-notch amenities.",
        image: gondarHillsResort,
      },
      {
        name: "Atse Tewodros Hotel",
        description:
          "A historic hotel with a unique atmosphere and comfortable rooms.",
        image: atseTewodrosHotel,
      },
      {
        name: "Circle Hotel",
        description:
          "A modern hotel with a central location and excellent service.",
        image: circleHotel,
      },
      {
        name: "Gondar Town Hotel",
        description:
          "A budget-friendly option with clean rooms and a convenient location.",
        image: gondarTownHotel,
      },
    ],
    attractions: [
      {
        name: "Fasiladas' Castle",
        description:
          "The most famous castle in Gondar, built by Emperor Fasiladas in the 17th century.",
        image: fasiladasCastle,
      },
      {
        name: "Susenyos' Castle",
        description:
          "A historic castle built by Emperor Susenyos, known for its unique architecture.",
        image: susenyosCastle,
      },
      {
        name: "Iyasu's Palace",
        description:
          "A grand palace built by Emperor Iyasu I, known for its beautiful frescoes and carvings.",
        image: iyasuPalace,
      },
      {
        name: "Debre Berhan Selassie",
        description:
          "A historic church known for its beautiful frescoes and religious significance.",
        image: debreBerhanSelassie,
      },
      {
        name: "Fasiladas' Bath",
        description:
          "A ceremonial bath used for Timkat (Epiphany) celebrations, surrounded by beautiful gardens.",
        image: fasiladasBath,
      },
      {
        name: "Kuskuam Complex",
        description:
          "A historic site with ruins of a palace and church, offering a glimpse into Gondar's past.",
        image: kuskuamComplex,
      },
      {
        name: "Simien Mountains National Park",
        description:
          "A UNESCO World Heritage site known for its stunning landscapes and unique wildlife, including the Walia Ibex and Gelada Baboons.",
        image: simienMountains,
      },
      {
        name: "Walia Ibex",
        description:
          "A rare species of ibex found only in the Simien Mountains, known for its majestic horns.",
        image: waliaIbex,
      },
      {
        name: "Gelada Baboons",
        description:
          "A unique species of baboon found in the Simien Mountains, known for their social behavior and striking appearance.",
        image: geladaBaboons,
      },
      {
        name: "Ethiopian Wolf",
        description:
          "One of the rarest canids in the world, found in the highlands of Ethiopia, including the Simien Mountains.",
        image: ethiopianWolf,
      },
    ],
  },
  BahirDar: {
    popularAttraction: {
      name: "Blue Nile Falls",
      description:
        "The Blue Nile Falls, also known as 'Tis Issat' (Smoking Water), is one of Ethiopia's most spectacular natural wonders. The falls are located on the Blue Nile River and are surrounded by lush greenery, making it a must-visit destination for nature lovers.",
      image: blueNileFalls,
    },
    hotels: [
      {
        name: "Lake Shore Resort",
        description:
          "A luxurious resort located on the shores of Lake Tana, offering stunning views and top-notch amenities.",
        image: lakeShoreResort,
      },
      {
        name: "Blue Nile Hotel",
        description:
          "A modern hotel with a central location and excellent service.",
        image: blueNileHotel,
      },
      {
        name: "Kuriftu Resort & Spa",
        description:
          "A luxury resort offering a spa, water sports, and beautiful views of Lake Tana.",
        image: kuriftuResort,
      },
      {
        name: "Abay Minch Lodge",
        description:
          "A cozy lodge located near the Blue Nile Falls, offering a peaceful retreat.",
        image: abayMinchLodge,
      },
      {
        name: "Tana Hotel",
        description:
          "A mid-range hotel with comfortable rooms and a convenient location.",
        image: tanaHotel,
      },
      {
        name: "Papyrus Hotel",
        description:
          "A budget-friendly hotel with clean rooms and friendly service.",
        image: papyrusHotel,
      },
      {
        name: "Jacaranda Hotel",
        description:
          "A charming hotel with a warm atmosphere and excellent service.",
        image: jacarandaHotel,
      },
      {
        name: "Ghion Hotel",
        description:
          "A historic hotel located on the shores of Lake Tana, offering beautiful views and comfortable accommodations.",
        image: ghionHotel,
      },
      {
        name: "Ethio-Star Hotel",
        description:
          "A modern hotel with a central location and excellent amenities.",
        image: ethioStarHotel,
      },
      {
        name: "Bahir Dar Hotel",
        description:
          "A budget-friendly option with clean rooms and a convenient location.",
        image: bahirDarHotel,
      },
    ],
    attractions: [
      {
        name: "Lake Tana",
        description:
          "Lake Tana is the largest lake in Ethiopia and the source of the Blue Nile. It is home to numerous monasteries and islands, making it a popular destination for both nature lovers and history enthusiasts.",
        image: lakeTana,
      },
      {
        name: "Ura Kidane Mehret",
        description:
          "A historic monastery located on one of Lake Tana's islands, known for its beautiful frescoes and religious significance.",
        image: uraKidaneMehret,
      },
      {
        name: "Zege Peninsula",
        description:
          "A lush peninsula on Lake Tana, known for its coffee plantations and historic monasteries.",
        image: zegePeninsula,
      },
      {
        name: "Monastery of St. George",
        description:
          "A historic monastery located on a small island in Lake Tana, known for its unique architecture and religious significance.",
        image: stGeorgeMonastery,
      },
      {
        name: "Tana Kirkos",
        description:
          "An ancient monastery located on an island in Lake Tana, believed to have housed the Ark of the Covenant.",
        image: tanaKirkos,
      },
      {
        name: "Daga Estifanos",
        description:
          "A historic monastery located on an island in Lake Tana, known for its religious artifacts and serene atmosphere.",
        image: dagaEstifanos,
      },
      {
        name: "Kebran Gabriel",
        description:
          "A historic monastery located on an island in Lake Tana, known for its beautiful frescoes and religious significance.",
        image: kebranGabriel,
      },
      {
        name: "Narga Selassie",
        description:
          "A historic monastery located on an island in Lake Tana, known for its unique architecture and religious importance.",
        image: nargaSelassie,
      },
      {
        name: "Debre Maryam",
        description:
          "A historic monastery located on an island in Lake Tana, known for its religious significance and beautiful views.",
        image: debreMaryam,
      },
      {
        name: "Azwa Maryam",
        description:
          "A historic monastery located on an island in Lake Tana, known for its beautiful frescoes and serene atmosphere.",
        image: azwaMaryam,
      },
    ],
  },
};

function Home({ location }) {
  const currentLocation = location || "Lalibela"; // Default to Lalibela if location not set
  const currentData = locationData[currentLocation];

  return (
    <Container maxWidth={false} sx={{ py: 4, px: 0 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Welcome to {currentLocation}, Ethiopia
      </Typography>

      {/* Popular Attraction */}
      <Card elevation={3} sx={{ mb: 4, mx: 2 }}>
        <CardMedia
          component="img"
          height="400"
          image={currentData.popularAttraction.image}
          alt={currentData.popularAttraction.name}
          sx={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {currentData.popularAttraction.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentData.popularAttraction.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Attractions and Hotels Grid */}
      <Grid container spacing={4} sx={{ px: 2 }}>
        {/* Attractions Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Places to Visit
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {currentData.attractions.map((attraction, index) => (
              <Card key={index} elevation={3}>
                <CardMedia
                  component="img"
                  height="300"
                  image={attraction.image}
                  alt={attraction.name}
                  sx={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {attraction.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {attraction.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Hotels Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Hotels & Lodges
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {currentData.hotels.map((hotel, index) => (
              <Card key={index} elevation={3}>
                <CardMedia
                  component="img"
                  height="300"
                  image={hotel.image}
                  alt={hotel.name}
                  sx={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
