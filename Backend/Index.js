import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import router from './Routes/Routes.js'
env.config()

const app = express()
app.use(router)
const port = process.env.PORT||2001
const password = process.env.PASSWORD

// Database connection with MongoDB
mongoose.connect(`mongodb+srv://mekibib:${password}@cluster0.trdz9op.mongodb.net/`)
.then(()=>console.log('the database connectd successfully'))
.catch(error=>console.log(error))


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})