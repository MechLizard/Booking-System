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
// http::localhost:8000/businesses/
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
    //console.log('Received data:', req.body); // For debugging

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newBusiness = new Business({ name, serviceType, phone, zipcode, email, password: hashedPassword, permissions });
        await newBusiness.save();
        res.status(201).send('Business registered');
    } catch (error) {
        console.error('Error registering business:', error); // For debugging
        res.status(500).send('Error registering business');
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const business = await Business.findOne({ email });
        if (!business) return res.status(400).send('Business not found');

        const isMatch = await bcrypt.compare(password, business.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        //console.log('Business ID:', business._id); // For debugging

        const token = jwt.sign({ id: business._id, role: business.permissions }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token, role: business.permissions, userId: business._id });
    } catch (error) {
        console.error('Error logging in:', error); // For debugging
        res.status(500).send('Error logging in');
    }
});


// PATCH: modifies business (availability, price, bookings, reviews fields)

// *=== Availability ===* //
router.patch('/:id/availability', async (req, res) => {
    const { id } = req.params;
    const { day, times } = req.body.availability;

    // // Log the incoming request parameters and body for debugging
    // console.log('Request ID:', id);
    // console.log('Request Body:', req.body);
    // console.log('Day:', day);
    // console.log('Times:', times);

    try {
        // Find the business by ID
        const business = await Business.findById(id);
        if (!business) {
            console.log('Business not found');
            return res.status(404).json({ msg: "Business not found" });
        }

        // // Log the existing availability for debugging
        // console.log('Existing Availability:', business.availability);

        // Check for existing availability and update or add new availability
        const existingAvailability = business.availability.find(avail => avail.day === day);
        if (existingAvailability) {
            //console.log('Updating existing availability for day:', day); // For debugging
            existingAvailability.times = times; // Updates times for existing day
        } else {
            //console.log('Adding new availability for day:', day); // For debugging
            business.availability.push({ day, times }); // Adds new availability
        }

        // Save the updated business document
        await business.save();
        //console.log('Updated Business:', business); // For debugging
        res.status(200).json(business);
    } catch (err) {
        console.error('Error occurred:', err.message);
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

// *=== Services Offered ===* //
router.patch('/:id/services', async (req, res) => {
    const { id } = req.params;
    const { service, price } = req.body;

    try {
        const business = await Business.findById(id);
        if (!business) return res.status(404).json({ msg: 'Business not found' });
        const existingServiceIndex = business.servicesOffered.findIndex(s => s.service === service);
        if (existingServiceIndex > -1) {
            business.servicesOffered[existingServiceIndex].price = price;
            //console.log('Service Exists'); // For debugging
        } else {
            business.servicesOffered.push({ service, price });
            //console.log(service); // For debugging
            //console.log('Service Added'); // For debugging
        }
        await business.save();
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// * === Description === * //
router.patch('/:id/description', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, { description: description }, { new: true });
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// * === Rating === * //
router.patch('/:id/updateRating', async (req, res) => {
    const { id } = req.params;
    const { averageRating } = req.body;

    try {
        // Update the average rating of the business
        const updatedBusiness = await Business.findByIdAndUpdate(id, { rating: averageRating }, { new: true });
        res.status(200).json(updatedBusiness);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;