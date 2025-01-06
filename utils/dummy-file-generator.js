const mongoose = require('mongoose');
const DummySensor = require('../models/dummy-sensors');
require('./db');

const generateDummyFiles = () => {
    const randomValue = (min, max) => {
        return(Math.random() * (max - min) + min);
    }

    const dummyData = {
        createdAt: new Date(),
        temperature: Math.floor(randomValue(15, 40)),
        pH: Math.floor(randomValue(1, 13)),
        conductivity: Math.floor(randomValue(100, 2000)),
        oxygen: Math.round(randomValue(100, 2000)) / 100,
        ppm: Math.round(randomValue(100, 1000)),
        waterLevel: Math.round(randomValue(1.0, 30.5)) / 100,
        pm25: Math.round(randomValue(100, 2000)) / 100,
    };

const dummySensor = new DummySensor(dummyData);

dummySensor.save()
    .then((dummySensor) => console.log(dummySensor));

}

module.exports = generateDummyFiles;