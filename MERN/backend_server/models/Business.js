const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    customerEmail: String,
    customerPhone: String, // to meet functional requirements
    businessName: String,
    businessPhone: String,
    service: String,
    day: Number, // how to prevent duplicates of date/time??    
    Time: {
        type: String,
        unique: true,
    },
    index: Number,
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
    price: Number,
});

const TimesSchema = new mongoose.Schema({
    times: String,
     // add or not? -> goal: only one of each timestamp (no duplicates of "9:00-10:00")

})

const AvailabilitySchema = new mongoose.Schema({
    day: {
        type: Number,
        unique: true, // add or not? -> goal: only one of each timestamp (no duplicates of "day 1")
    },
    times: [TimesSchema],
});

const BusinessSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: { type: String, unique: true },
    zipcode: String,
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