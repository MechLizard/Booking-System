const mongoose = require('mongoose');
const user = require('User');

const BookingSchema = new mongoose.Schema({
  serviceId: mongoose.Schema.Types.ObjectId, // ObjectId represents specific instances (documents) 
  customerId: mongoose.Schema.Types.ObjectId,
  businessId: mongoose.Schema.Types.ObjectId,// of a model (constructor from Schema definitions)
  date: Date,
  availability: Array,
  price: Number,
  customerName: String,
  customerEmail: String,
  businessEmail: String,
  businessName: String,
  customerPhone: String,
  businessPhone: String,

  createdAt: { type: Date, default: Date.now }
});
// need availability and price



module.exports = mongoose.model('Booking', BookingSchema);
// This is going to be the additions that I make. It will not be correct and I will have help tomorrow by adalys to reform it




const Permissions = {
  ADMIN : 0,
  CUSTOMER : 1,
  BUSINESS : 2,
};

// Define the Booking struct-like object


class Booking{
  time = "";
  price = 0;
  constructor(time, price) {
    this.time = time;
    this.price = price;
  }




}


// Define the Account "class" using a constructor function

/* This needs to be audited very badly. This was basically what chatgpt told me would be great.... I have no confidence in synthetics
* I would like to see if this actually executes as well since JS is not compiled, but interpreted which means we may have a ton of debugging to do.
* I do not know how to run this however*/



class Account {
  email = "";
  password = "";
  permission = Permissions.ADMIN;
  phoneNumber = "";
  nameOfBusiness = "";
  firstName = "";
  lastName = "";
  address = "";
  bookings = [];
  rating = [];

  categoryOfService = ""
  constructor(email, password, permission, phoneNumber, nameOfBusiness, firstName, lastName, address, category) {
    this.email = email;
    this.password = password;
    this.permission = permission;
    this.phoneNumber = phoneNumber;
    this.nameOfBusiness = nameOfBusiness;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    if(this.permission === Permissions.BUSINESS){
      this.categoryOfService = category;
    }
  }

  // Method to generate accounts
  generateAccounts(vector, numberOfAccounts) {
    const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < numberOfAccounts; i++) {
      let account = new Account();

      account.permission = Object.values(Permissions)[Math.floor(Math.random() * 3)];

      for (let j = 0; j < 10; j++) {
        account.email += alph.charAt(Math.floor(Math.random() * 26));
        account.password += alph.charAt(Math.floor(Math.random() * 26));
        account.fullName += alph.charAt(Math.floor(Math.random() * 26));
        account.address += alph.charAt(Math.floor(Math.random() * 26));

        if (account.permission === Permissions.BUSINESS) {
          account.nameOfBusiness += alph.charAt(Math.floor(Math.random() * 26));
          let booking = new Booking(); // Assuming Booking class exists
          let pair = { first: booking, second: account.email };
          account.bookings.push(pair);
        }
      }

      vector.push(account);
    }
  }

  // Method to print accounts
  printAccounts(vec) {
    vec.forEach(function(account) {
      console.log("email:", account.email);
      console.log("pass:", account.password);
      if (account.permission === Permissions.BUSINESS) {
        console.log("Business Name:", account.nameOfBusiness);
      }
    });
  }

  // Method to hash the password (simplified)
  hashPassword() {
    let hash = 0;
    for (let i = 0; i < this.password.length; i++) {
      hash += this.password.charCodeAt(i) << i;
    }
    return hash;
  }

  // Method to give discount (simplified)
  giveDiscount(account, discount) {
    if (account.permission !== Permissions.BUSINESS) {
      console.log("Only Business Accounts May Apply Discounts!");
      return;
    }

    account.bookings.forEach(function(pair) {
      if (pair.first.price - discount <= 0) {
        pair.first.price = 0;
      } else {
        pair.first.price -= discount;
      }
    });
  }

  // Method to print discounts (simplified)
  printDiscountsTest(vec) {
    vec.forEach((account) => {
      if (account.permission === Permissions.BUSINESS) {
        console.log("Price before discount", account.bookings[0].first.price);
        this.giveDiscount(account, 10);
        console.log("Price after discount", account.bookings[0].first.price);
        return;
      }
    });
  }

  // Method to authenticate account (simplified)
  authenticateAccount(accountMap, accountToVerify) {
    if (!accountMap.hasOwnProperty(accountToVerify.hashPassword())) {
      return false;
    }
    return accountMap[accountToVerify.hashPassword()].email === accountToVerify.email;

  }

  // Method to manage bookings (simplified)
  manageBookings(time, account) {
    if (this.permission !== Permissions.BUSINESS) {
      return;
    }

    account.bookings.forEach(function(pair) {
      if (pair.second !== account.email) {
        return;
      }
      pair.first.time = time;
    });
  }
  // This is how I would like to do it. Search until you find the available time slot and then delete
  // IDK if this is even remotely correct.
  deleteBooking(time){
    if(this.permission === Permissions.BUSINESS){
      this.bookings.find(time);
    }
  }
  makeRating(account, number){
    if(this.permission !== Permissions.CUSTOMER){
      return;
    }
    if(account.permission !==Permissions.BUSINESS){
      return;
    }

    account.rating.push(number);

  }
}



const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'MERN';

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // Use the collection "mycollection"
    const collection = db.collection('users');
    let account = new Account("Jaimeszq@gmail.com", "lol", Permissions.CUSTOMER, 5547854, "", "Jaimes", "Mitchell", "wwsjklsjdflj", "");

    // Insert a single document
    const insertResult = await collection.insertOne({ name: account.fullName, age: 25, email:account.email, Permission: Permissions.ADMIN, password: account.password});
    console.log('Inserted document:', insertResult);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
