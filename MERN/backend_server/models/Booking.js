const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  serviceId: mongoose.Schema.Types.ObjectId, // ObjectId represents specific instances (documents) 
  customerId: mongoose.Schema.Types.ObjectId, // of a model (constructor from Schema definitions)
  date: Date,
  availability: Array,
  price: Number, 
  createdAt: { type: Date, default: Date.now }
});
// need availability and price

module.exports = mongoose.model('Booking', BookingSchema);
