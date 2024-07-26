const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Business = require('../models/Business');

const router = express.Router();

// GET particular business
router.get('/:id', async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
          return res.status(404).send('Business not found');
        }
        res.json(business);
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
      }
});

// GET all businesses in MongoDB
router.get('/', async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})


// POST: Register => MongoDB
router.post('/register', async (req, res) => {
    const { name, serviceType, phone, zipcode, email, password, permissions } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newBusiness = new Business({ name, serviceType, phone, zipcode, email, password: hashedPassword, permissions });
        await newBusiness.save();
        res.status(201).send('Business registered');
    } catch (error) {
        res.status(500).send('Error registering business');
    }
});

// POST: Login => MongoDB
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const business = await Business.findOne({ email });
        if (!business) return res.status(400).send('Business not found');

        const isMatch = await bcrypt.compare(password, business.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: business._id, role: business.permissions }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token, role: business.permissions });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// PATCH: modifies business (availability, price, bookings, reviews fields)

// *=== Availability ===* //
router.patch('/:id/availability', async (req, res) => {
    const { id } = req.params;
    const { availability } = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, { $push: { availability: availability } }, { new: true });
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.patch('/:id/availability/remove', async (req, res) => {
    const { id } = req.params;
    const { availabilityID } = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, { $pull: { availability: { _id: availabilityID } } }, { new: true });
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// *=== Reviews ===* //
router.patch('/:id/reviews', async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, { $push: { reviews: review } }, { new: true });
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.patch('/:id/reviews/remove', async (req, res) => {
    const { id } = req.params;
    const { reviewID } = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, { $pull: { reviews: { _id: reviewID } } }, { new: true });
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// *=== Bookings ===* //
router.patch('/:id/booking', async (req, res) => {
    const { id } = req.params;
    const { booking } = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, { $push: { booking: booking } }, { new: true });
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.patch('/:id/booking/remove', async (req, res) => {
    const { id } = req.params;
    const { bookingID } = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, { booking: { _id: bookingID } }, { new: true });
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// *=== Price ===* //
router.patch('/:id/price', async (req, res) => {
    const { id } = req.params;
    const { price } = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, { price: price }, { new: true });
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;