const mongoose = require('mongoose');

const UserCustomer = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const UserBusiness = new mongoose.Schema({
  name: String,
  phone: String,
  email: {type: string, unique: true},
  password: String,

  createdAt: {type: Data, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);