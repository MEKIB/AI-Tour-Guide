import mongoose from "mongoose";

const SystemAdminSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})

const SystemAdminModel=mongoose.model("systemadminlist",SystemAdminSchema)

export default SystemAdminModel