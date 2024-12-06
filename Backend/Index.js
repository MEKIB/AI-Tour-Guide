import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const port= process. env.PORT
const app=express()


app.get("/",(req,res)=>{
    res.send("this server is running in port 40000")
})
app.listen(port,()=>console.log(`the server is running in port ${port}`))