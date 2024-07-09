const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST: Register => MongoDB
router.post('/register', async (req, res) => {
  const { name, phone, zipcode, email, password, permissions } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, phone, zipcode, email, password: hashedPassword, permissions});
  await newUser.save();
  res.status(201).send('User registered');
});

// POST: Login => MongoDB
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
  res.status(200).json({ token });
});

// GET: MongoDB => Website
router.get('/:id', (res, req) => {
  res.json({mssg: 'GET a customer\'s info'})
})

// PUT: modifies user 


module.exports = router;
