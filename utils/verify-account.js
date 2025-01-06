const bcrypt = require('bcrypt');
require('./db');
const User = require('../models/user');

// Password Hash Comparison
const hashCompare = async ({ user, req }) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                reject(err);
            } else {
                if (result) {
                    console.log('Passwords match! User authenticated.');
                    resolve(result);
                } else {
                    resolve(false);
                }
            }
        });
    });
};


module.exports = hashCompare;