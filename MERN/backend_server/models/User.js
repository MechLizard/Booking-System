const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['customer', 'provider'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);