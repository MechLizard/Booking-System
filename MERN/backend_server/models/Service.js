const mongoose = require('mongoose');
const {mongo} = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  category: String,
  description: String,
  providerId: mongoose.Schema.Types.ObjectId,
  availability: [Date],
  createdAt: { type: Date, default: Date.now }
});



const ServiceTutor = new mongoose.Schema({
    name: String,
    description: String,
    providerId: mongoose.Schema.Types.ObjectId,
    availability: [Date],
    createdAt: {type: Date, default: Date.now}
});

const ServiceLawnCutting = new mongoose.Schema({
    name: String,
    description: String,
    providerId: mongoose.Schema.Types.ObjectId,
    availability: [Date],

    createdAt: {type: Date, default: Date.now}
});

const ServiceArt = new mongoose.Schema({
    name: String,
    description: String,
    providerId: mongoose.Schema.Types.ObjectId,
    availability: [Date],
    createdAt: {type: Date, default :Date.now}
});

module.exports = mongoose.model('Service', ServiceSchema);
