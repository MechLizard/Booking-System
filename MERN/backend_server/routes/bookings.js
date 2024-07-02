const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router() // creates an instance of the router

// Create Booking
router.post('/', async (req, res) => {
  const { serviceId, customerId, date } = req.body
  const newBooking = new Booking({ serviceId, customerId, date })
  await newBooking.save();
  res.status(201).send('Booking created')
})

// Get Bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.find()
  res.status(200).json(bookings)
})

module.exports = router // exports router