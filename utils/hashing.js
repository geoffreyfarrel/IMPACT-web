const bcrypt = require('bcrypt');

// Setup db User data
require('./db');
const User = require('../models/user');

// Setup hashing rounds
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.log('Hashing Failed!');
        return;
    }
        // Create object in DB
        User.create({
            createdAt: new Date(),
            username: username,
            password: hash,
        },);
    // Hashing successful, 'hash' contains the hashed password
    console.log('User created successfully!');
});
