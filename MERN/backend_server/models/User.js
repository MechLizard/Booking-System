const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  permissions: { type: String, enum: ['customer', 'business', 'admin'], default: 'admin'},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);