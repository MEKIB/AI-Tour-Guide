import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:String,
    fname:String,
    lname:String,
    email:String,
    pno:Number,
    password:String
})

const userModel=mongoose.model('users',userSchema)

export default userModel