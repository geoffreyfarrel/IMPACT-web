const { DATABASE_URL } = require("./env");

const mongoose = require("mongoose");
mongoose.connect(DATABASE_URL).then();

const impactDB = mongoose.connection.useDb("IMPACT");

const UnderWaterSensor = require("../models/under-water-sensor");

// // Menambah 1 data
// const underWaterSensor1 = new UnderWaterSensor({
//     createdAt: new Date(),
//     temperature: 19,
//     pH: 11,
//     conductivity: 123.13,
//     oxygen: 82.23,
//     ppm: 352,
// });

// // Simpan ke collection
// underWaterSensor1.save().then((underWaterSensor) => console.log(underWaterSensor));

module.exports = impactDB;
