import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));

const hotels = [
  {
    id: 1,
    name: "Blue Nile",
    location: "Bahir Dar",
    facilityType: "Hotels",
    image: '/images/AbuneMelketsedeq1.jpg' // Correct URL!
  },
  {
    id: 2,
    name: "Tana Hotel",
    location: "Bahir Dar",
    facilityType: "Hotels",
    image: '/images/AbuneMelketsedeq1.jpg' 
  },
  {
    id: 3,
    name: "Gonder Lodge",
    location: "Gonder",
    facilityType: "Lodges",
    image: '/images/AbuneMelketsedeq1.jpg' // Example
  },
  {
    id: 4,
    name: "Lalibela Hotel",
    location: "Lalibela",
    facilityType: "Hotels",
    image: '/images/AbuneMelketsedeq1.jpg' // Example
  },
  // ... more hotels
];

app.get('/api/hotels', (req, res) => {
  res.json(hotels);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});