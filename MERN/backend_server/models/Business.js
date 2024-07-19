const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    customerEmail: String,
    Service: String,
    Date: Number,
    Time: String,
    Index: Number,
});

const ReviewsSchema = new mongoose.Schema({
    customerName: String,
    rating: Number,
    customerComment: String,
    businessComment: String,
    availability: String,
});

const servicesOfferedSchema = new mongoose.Schema({
    service: String,
});

const TimesSchema = new mongoose.Schema({
    times: String,
})

const AvailabilitySchema = new mongoose.Schema({
    day: Number,
    times: [TimesSchema],
});

const BusinessSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: { type: String, unique: true },
    password: String,
    serviceType: String, // type of business (i.e. plumber) for dropdown
    servicesOffered: [servicesOfferedSchema], // services offered
    description: String,
    availability: [AvailabilitySchema],
    price: Number,
    booking: [BookingSchema], // of objects [[booking1], [booking2]]
    profit: Number,
    rating: Number,
    reviews: [ReviewsSchema],
    permissions: { type: String, enum: ['customer', 'business', 'admin']},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', BusinessSchema);