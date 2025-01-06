const impactDB = require('../utils/db')

//Schema(model) User
const User = impactDB.model('User',
{
    createdAt: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
);

module.exports = User;