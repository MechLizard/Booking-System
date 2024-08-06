//const bcrypt = require('bcryptjs');
//const { MongoClient } = require('mongodb');
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'MERN'; // Replace with your database name

// Function to run the insertion of 100 business accounts
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function run() {
  const client = new MongoClient(uri);

  let servicesAvailable = ['Service', 'Restaurant', 'Retail'];

  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection('businesses');

    // Insert 100 generated business accounts
    const permissions = 'business';
    const password = 'omegalul';
    console.log("Whats up");

    for (let i = 1; i <= 100; i++) {
      const email = `B${i}@gmail.com`;

      //console.log(`Creating Business ${i}`);

      // Check if the email already exists
      const emailExists = await collection.findOne({ email });
      if (emailExists) {
        console.log(`Email exists`);
        continue;
      }

      const newBusiness = {
        name: `Business ${i}`,
        email: email,
        permission: permissions,
        password: await bcrypt.hash(password, 10),
        phone: '224',
        zipcode: '112',
        permissions: 'business',
        serviceType: servicesAvailable[getRandomInt(3)],
      };
      //console.log(newBusiness);

      const insertResult = await collection.insertOne(newBusiness);
      console.log('Inserted document:', insertResult.insertedId);
    }
  } catch (error) {
    console.error('There was an error inserting the documents!', error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
