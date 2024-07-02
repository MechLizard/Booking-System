const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  serviceId: mongoose.Schema.Types.ObjectId,
  customerId: mongoose.Schema.Types.ObjectId,
  date: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
