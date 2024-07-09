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
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving user information' });
  }
});

// // PUT: modifies user 
// router.put('/:id', async (req, res) => {
//   const { name, phone, zipcode, email, password, permissions } = req.body;
//   try {
//     const updates = { name, phone, zipcode, email, permissions };
//     if (password) {
//       updates.password = await bcrypt.hash(password, 10);
//     }
//     const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
//     if (!user) return res.status(404).send('User not found');
//     res.json(user);
//   } catch (error) {
//     res.status(500).send('Error updating user information');
//   }
// });

module.exports = router;
