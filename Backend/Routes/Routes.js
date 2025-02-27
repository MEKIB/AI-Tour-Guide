import express from 'express';
import userModel from '../modules/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router = express.Router();

const JWT_SECRET = 'your-strong-secret-key'; // REPLACE WITH YOUR SECRET KEY
const EMAIL_USER = 'your-email@example.com'; // REPLACE WITH YOUR EMAIL
const EMAIL_PASS = 'your-email-password'; // REPLACE WITH YOUR EMAIL PASSWORD
const EMAIL_SERVICE = 'gmail'; // REPLACE WITH YOUR EMAIL SERVICE
const FRONTEND_URL = 'http://localhost:3000'; // REPLACE WITH YOUR FRONTEND URL

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Route (with JWT)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        pno: user.pno,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Forgot Password Route
// router.post('/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     const resetTokenExpiry = Date.now() + 3600000;
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = resetTokenExpiry;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: EMAIL_SERVICE,
//       auth: {
//         user: EMAIL_USER,
//         pass: EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset',
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         ${FRONTEND_URL}/reset-password/${resetToken}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Email sending error:', error);
//         return res.status(500).json({ message: 'Failed to send reset email.' });
//       }
//       console.log('Email sent:', info.response);
//       res.json({ message: 'Password reset email sent' });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// // Reset Password Route
// router.post('/reset-password/:token', async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;
//     const user = await userModel.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user) {
//       return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();
//     res.json({ message: 'Password reset successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

export default router;