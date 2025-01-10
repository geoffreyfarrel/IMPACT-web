const express = require("express");
const axios = require("axios");
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const User = require("./models/user");
const hashCompare = require("./utils/verify-account");
const moment = require("moment");
const { URL, PORT } = require("./utils/env");
const bodyParser = require("body-parser");

const session = require("express-session");
const UnderWaterSensor = require("./models/under-water-sensor");
const Sensor = require("./models/dummy-sensors");

const app = express();
const port = PORT;
const url = URL;

/* To Be Removed */
const cron = require("node-cron");
const generateDummyFiles = require("./utils/dummy-file-generator");
const { default: start } = require("mqtt/bin/pub");
const {
  convertToTaiwanTime,
  convertToUTCTime,
} = require("./utils/time-format");
const isValidDate = require("./utils/date-validation");

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup Session
app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: true,
  })
);

// Cache control middleware
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// Home Page
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home",
    layout: "layouts/main-layout",
    active: "home",
    pageScripts: [
      "vendor/chart.js/Chart.min.js",
      "js/demo/chart.js",
      "js/demo/card.js",
      "js/demo/utils/format-iso-time.js",
    ],
  });
});

// Latest Results Page
app.get("/result", async (req, res) => {
  res.render("result", {
    title: "Latest Result",
    layout: "layouts/main-layout",
    active: "result",
    pageScripts: ["js/demo/datatables.js"],
  });
});
// All Results Page
app.get("/all-result", async (req, res) => {
  res.render("all-result", {
    title: "All Result",
    layout: "layouts/main-layout",
    active: "all-result",
    pageScripts: ["js/demo/datepicker.js", "js/demo/all-result-datatables.js"],
  });
});

// Charts Page
app.get("/charts", async (req, res) => {
  res.render("charts", {
    title: "Charts",
    layout: "layouts/main-layout",
    active: "charts",
    pageScripts: [
      "vendor/chart.js/Chart.min.js",
      "js/demo/datepicker.js",
      "js/demo/selection-chart.js",
      "js/demo/utils/format-iso-time.js",
      "js/demo/utils/translate-chart.js",
    ],
  });
});

// About Page
app.get("/about", async (req, res) => {
  res.render("about", {
    title: "About",
    layout: "layouts/main-layout",
    active: "all-about",
    pageScripts: [],
  });
});

// Endpoint to get latest table data
app.get("/card-data", async (req, res) => {
  const latestSensorArray = await Sensor.find()
    .sort({ createdAt: -1 })
    .limit(1);
  const latestSensor = latestSensorArray[0];
  res.json({ latestSensor });
});

// Endpoint to get latest 24 hourly averaged data points
app.get("/chart-data", async (req, res) => {
  const latestSensorArray = await Sensor.find()
    .sort({ createdAt: -1 })
    .limit(144);

  // Calculate hourly averages (6 data points per hour)
  const hourlyAverages = [];
  for (let i = 0; i < 24; i++) {
    const start = i * 6;
    const end = start + 6;
    const hourData = latestSensorArray.slice(start, end);

    // Calculate the average for this hour
    const hourAvg = hourData.reduce(
      (sum, item) => {
        return {
          temperature: sum.temperature + item.temperature / 6,
          pH: sum.pH + item.pH / 6,
          conductivity: sum.conductivity + item.conductivity / 6,
          oxygen: sum.oxygen + item.oxygen / 6,
          ppm: sum.ppm + item.ppm / 6,
          pm25: sum.pm25 + item.pm25 / 6,
          index: i,
        };
      },
      { temperature: 0, pH: 0, conductivity: 0, oxygen: 0, ppm: 0, pm25: 0 }
    );

    // Round the timestamp to the start of the hour
    const roundedDate = new Date(hourData[0].createdAt);
    roundedDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to zero

    // Format values to 2 decimal places and add to hourly averages
    hourlyAverages.push({
      createdAt: roundedDate,
      temperature: parseFloat(hourAvg.temperature.toFixed(2)),
      pH: parseFloat(hourAvg.pH.toFixed(2)),
      conductivity: parseFloat(hourAvg.conductivity.toFixed(2)),
      oxygen: parseFloat(hourAvg.oxygen.toFixed(2)),
      ppm: parseFloat(hourAvg.ppm.toFixed(2)),
      pm25: parseFloat(hourAvg.pm25.toFixed(2)),
      index: i,
    });
  }

  res.json({ latestSensorArray: hourlyAverages });
});

// Endpoint to get latest 50 table data
app.get("/data", async (req, res) => {
  const latestSensorArray = await Sensor.find()
    .sort({ createdAt: -1 })
    .limit(50);
  res.json({ latestSensorArray });
});

// Endpoint to get all table data
app.get("/all-data", async (req, res) => {
  // console.log(req.query);
  const draw = req.query.draw;
  const start = parseInt(req.query.start);
  const length = parseInt(req.query.length);
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  // console.log("Received startDate: ", startDate);
  // console.log("Received endDate: ", endDate);

  try {
    // Construct search query based on date
    let query = {};
    if (startDate && endDate) {
      const startDateTime = new Date(startDate);
      startDateTime.setHours(0, 0, 0, 0); // Set time to the start of the day
      // console.log("StartDateTime: ", startDateTime);
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999); // Set time to the end of the day
      // console.log("EndDateTime: ", endDateTime);
      endDateTime.setDate(endDateTime.getDate() + 1);

      query.createdAt = {
        $gte: startDateTime,
        $lt: endDateTime,
      };
    }

    // Total data count
    const total = await Sensor.countDocuments({});

    // Filtered data count
    const filtered =
      startDate && endDate ? await Sensor.countDocuments(query) : total;

    // Fetch paginated data
    const resultData = await Sensor.find(query).skip(start).limit(length);

    // Prepare response
    const response = {
      draw,
      recordsTotal: total,
      recordsFiltered: filtered,
      data: resultData,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data" + error.message);
  }
});

// Endpoint to get selected chart
app.post("/selected-chart", async (req, res) => {
  const { startDate, endDate, chartType } = req.body;

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).json({
      message: "startDate and endDate are invalid",
      data: null,
    });
  }
  const startSearchDate = convertToUTCTime(new Date(startDate));
  const endSearchDate = convertToUTCTime(new Date(endDate));
  try {
    const query = {
      createdAt: {
        $gte: startSearchDate,
        $lt: endSearchDate,
      },
    };

    const totalPoints = await Sensor.countDocuments(query);
    const targetPoints = 20;
    const filteredData = await Sensor.find(query).sort({ createdAt: 1 });

    const step = Math.ceil(filteredData.length / targetPoints);
    const chartData = [];

    for (let i = 0; i < filteredData.length; i += step) {
      const stepData = filteredData.slice(i, i + step);

      const averagedData = {
        timestamp: stepData[0].createdAt,
        temperature: (
          stepData.reduce((sum, item) => sum + item.temperature, 0) /
          stepData.length
        ).toFixed(2),
        pH: (
          stepData.reduce((sum, item) => sum + item.pH, 0) / stepData.length
        ).toFixed(2),
        conductivity: (
          stepData.reduce((sum, item) => sum + item.conductivity, 0) /
          stepData.length
        ).toFixed(2),
        oxygen: (
          stepData.reduce((sum, item) => sum + item.oxygen, 0) / stepData.length
        ).toFixed(2),
        ppm: (
          stepData.reduce((sum, item) => sum + item.ppm, 0) / stepData.length
        ).toFixed(2),
        pm25: (
          stepData.reduce((sum, item) => sum + item.ppm, 0) / stepData.length
        ).toFixed(2),
      };
      chartData.push(averagedData);
    }
    const filteredDataLength = filteredData.length;

    const chartDataLength = chartData.length;

    res.status(200).json({
      message: "Successfully get data",
      data: [{ chartData, chartType, chartDataLength }],
    });
  } catch (error) {
    res.status(400).json({
      message: "Data is not found",
      data: null,
    });
  }
});

/* To Be Removed */
// Schedule task to run at every 0, 10, 20, 30, 40, and 50 minutes
// cron.schedule('*/10 * * * * *', () => {
//     console.log('Generating and saving dummy sensor data...');
//     generateDummyFiles();
//   });

app.listen(port, () => {
  console.log(`IMPACT: NTPU App | Listening at http://${url}:${port}`);
});
