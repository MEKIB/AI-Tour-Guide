import express from 'express';
import userModel from '../modules/User.js';
import bcrypt from 'bcrypt'; 

const router = express.Router();


// Registration Route 
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash password
    const createdUser = await userModel.create({
      ...req.body,
      password: hashedPassword, 
    });
    res.json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' }); // 401 Unauthorized
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If login is successful
    res.json({ message: 'Login successful', user: {
            _id: user._id,
            username: user.username,
            Fname: user.Fname,
            Lname: user.Lname,
            Email: user.Email,
            Pno:user.Pno
        } }); // Send user information, excluding sensitive data like password

  } catch (err) {
    res.status(500).json(err);
  }
});












export default router;