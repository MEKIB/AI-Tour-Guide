import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:String,
    Fname:String,
    Lname:String,
    Email:String,
    Pno:Number,
    password:String
})

const userModel=mongoose.model('users',userSchema)

export default userModel