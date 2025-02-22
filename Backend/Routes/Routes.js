import express from 'express'
import env from 'dotenv'
import userModel from '../modules/User.js'
const router=express.Router()

router.post('/register',(req,res)=>{
    userModel.create(req.body)
    .then(user>res.json(user))
    .catch(err=>res.json(err))
})


export default router