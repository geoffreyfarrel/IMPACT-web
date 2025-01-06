const mongoose = require('mongoose');

//Schema(model) UnderWaterSensor
const UnderWaterSensor = mongoose.model('UnderWaterSensor',
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
},
);

module.exports = UnderWaterSensor;