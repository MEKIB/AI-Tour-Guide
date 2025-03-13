import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import router from './Routes/Routes.js'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Hotel from './modules/Hotel.js'
env.config()

const app = express()
app.use(cors())

// Middleware to parse JSON data
app.use(express.json());


















// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images


// Define storage BEFORE using it in multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create/Update Hotel
app.post('/api/hotels', upload.array('images', 10), async (req, res) => {
  try {
    const { name, location, facilityType, description, lat, long, id } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        name: file.filename,
        url: `/uploads/${file.filename}`,
      }));
    }

    if (id) {
      // Update existing hotel
      await Hotel.findByIdAndUpdate(id, {
        name,
        location,
        facilityType,
        description,
        lat,
        long,
        images: images,
      });
      res.json({ message: 'Hotel updated successfully' });
    } else {
      // Create new hotel
      const newHotel = new Hotel({
        name,
        location,
        facilityType,
        description,
        lat,
        long,
        images: images,
      });
      await newHotel.save();
      res.json({ message: 'Hotel created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Hotel by ID
app.get('/api/hotels/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
const PORT=500

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



















app.use(router)
const port = process.env.PORT||2001
const password = process.env.PASSWORD

// Database connection with MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/AI_Tour_Guide') // Replace 'yourDatabaseName'
  .then(() => console.log('The database connected successfully (local)'))
  .catch(error => console.log('Error connecting to local database:', error));


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})