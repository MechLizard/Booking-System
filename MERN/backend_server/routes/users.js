const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST: Register => MongoDB
router.post('/register', async (req, res) => {
  const { name, phone, zipcode, email, password, permissions } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, phone, zipcode, email, password: hashedPassword, permissions });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// POST: Login => MongoDB
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id, role: user.permissions }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token, role: user.permissions });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});


