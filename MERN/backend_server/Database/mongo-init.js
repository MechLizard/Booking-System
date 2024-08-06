// Connect to the 'MERN' database
db = db.getSiblingDB('MERN');

// Create 'businesses' collection
db.createCollection('businesses');

// Create 'users' collection
db.createCollection('users');