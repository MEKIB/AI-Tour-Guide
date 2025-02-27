import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import router from './Routes/Routes.js'
import cors from 'cors'
env.config()

const app = express()
app.use(cors())

// Middleware to parse JSON data
app.use(express.json());

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