const mongoose = require('mongoose');

const UserCustomer = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  permissions: { type: String, enum: ['customer', 'business', 'admin'], default: 'customer'},
  createdAt: { type: Date, default: Date.now }
});

const UserBusiness = new mongoose.Schema({
  name: String,
  phone: String,
  email: {type: String, unique: true},
  password: String,
  permissions: {type: String, enum: ['customer','business','admin'],default: 'business'},
  // This will be where we store the total rating and the number of ratings
  ratingArray: [],
  businessName: String,
  description: String,
  createdAt: {type: Date, default: Date.now}
});

const UserAdmin = new mongoose.Schema({
    name: String,
    permissions: {type: String, enum: ['customer', 'business', 'admin'], default: 'admin'},

    }
)

module.exports = mongoose.model('User', UserSchema);