const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  permissions: Enumerator,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);