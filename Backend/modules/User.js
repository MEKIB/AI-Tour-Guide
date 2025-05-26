import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Please enter a valid email']
  },
  phone: { 
    type: String, 
    required: true,
    match: [/^\+?[0-9]{7,15}$/, 'Please enter a valid phone number']
  },
  password: { type: String, required: true },
  passportOrId: { type: String, required: true }, // Expect a string (file path or name)
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  acceptedTerms: { type: Boolean, required: true }, // Expect a boolean
}, { timestamps: true });


 const userModel=mongoose.model('User',userSchema)
export default userModel
