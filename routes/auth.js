const authenticateToken = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Route for user sign-up
router.post('/signup', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  // Check if the required fields are provided
  if (!username || !email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const SALT = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, SALT);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword, firstName, lastName });
    await user.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Route for user sign-in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Check if the required fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Set the JWT as an HTTP-only cookie
    res.cookie('authToken', token, { httpOnly: true });
    res.status(200).json({ message: 'Sign-in successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error signing in' });
  }
});

// Route to fetch user data (protected)
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Avoid sending the password back to the client
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Route for user logout
router.post('/logout', authenticateToken, (req, res) => {
  // Clear the JWT token from the cookie
  res.clearCookie('authToken');
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;