const express = require('express');
const Service = require('../models/Service');

const router = express.Router();

// Create Service
router.post('/', async (req, res) => {
  const { name, description, providerId, availability } = req.body;
  const newService = new Service({ name, description, providerId, availability });
  await newService.save();
  res.status(201).send('Service created');
});

// Get Services
router.get('/', async (req, res) => {
  const services = await Service.find();
  res.status(200).json(services);
});

module.exports = router;
