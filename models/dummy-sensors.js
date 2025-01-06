const impactDB = require('.././utils/db')

// Dummy Schema Model for Sensors
const DummySensor = impactDB.model('Sensor',
{
    createdAt: {
        type: Date,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    pH: {
        type: Number,
        required: true,
    },
    conductivity: {
        type: Number,
        required: true,
    },
    oxygen: {
        type: Number,
        required: true,
    },
    ppm: {
        type: Number,
        required: true,
    },
    waterLevel: {
        type: Number,
        required: true,
    },
    pm25: {
        type: Number,
        required: true,
    }
},
);

module.exports = DummySensor;