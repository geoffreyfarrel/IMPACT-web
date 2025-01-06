const express = require('express');
const axios = require('axios');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const User = require('./models/user');
const hashCompare = require('./utils/verify-account');
const moment = require('moment');

const session = require('express-session');
const UnderWaterSensor = require('./models/under-water-sensor');
const Sensor = require('./models/dummy-sensors');

const app = express();
const port = 5010;
const url = '120.126.151.152';

/* To Be Removed */
const cron = require('node-cron');
const generateDummyFiles = require('./utils/dummy-file-generator');

// Setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded( { extended: true }));

// Setup Session
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: true,
}));

// Cache control middleware
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// Login Page
app.get('/', (req, res) => {
    res.render('login', {
        title: 'IMPACT: NTPU Login Page',
        layout: 'layouts/login-layout',
        pageScripts: [],
    },);
});

// Home Page
app.get('/home', async (req, res) => {
    // Check if session exists or if user is logged in as 'guest'
    if (!req.session.user) {
        return res.redirect('/');
    }

    const user = req.session.user || 'guest';
    
    res.render('index', {
        title: 'Home',
        layout: 'layouts/main-layout',
        active: 'home',
        pageScripts: [
            'vendor/chart.js/Chart.min.js',
            'js/demo/chart.js',
            'js/demo/card.js',
            'js/demo/reset-sensor.js',
        ],
        user,
    },);
},);

// Create Admin Page
app.get('/register', (req, res) => {
    res.render('register', {
        title: 'IMPACT Login Page',
        layout: 'layouts/login-layout',
        pageScripts: [],
    },);
},);

// Admin Login Process
app.post('/',
    body('username').custom(async (value, { req }) => {
        const user = await User.findOne({ username: value });
        if (!user) {
            throw new Error('Incorrect name or password!');
        }
        const verificationResult = await hashCompare({ user, req });
        if (!verificationResult) {
            throw new Error('Incorrect name or password!');
        }
        req.session.user = user.username;
        return true;
    }),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('login', {
            title: 'Login',
            layout: 'layouts/login-layout',
            pageScripts: [],
            errors: errors.array(),
        },);
    } else {
        res.redirect('/home');
    }
});

// Guest Login Process
app.get('/login-guest', (req, res) => {
    // Set session user to guest
    req.session.user = 'guest';

    // Redirect to home
    res.redirect('/home');
})

// Latest Results Page
app.get('/result', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const user = req.session.user || 'guest';
    res.render('result', {
        title: 'Latest Result',
        layout: 'layouts/main-layout',
        active: 'result',
        pageScripts: ['js/demo/datatables.js'],
        user,
    },);
})
// All Results Page
app.get('/all-result', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const user = req.session.user || 'guest';
    res.render('all-result', {
        title: 'All Result',
        layout: 'layouts/main-layout',
        active: 'all-result',
        pageScripts: ['js/demo/datepicker.js', 'js/demo/all-result-datatables.js'],
        user,
    },);
})
// About Page
app.get('/about', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    const user = req.session.user || 'guest';
    res.render('about', {
        title: 'About',
        layout: 'layouts/main-layout',
        active: 'all-about',
        pageScripts: [],
        user,
    },);
})

// Endpoint to get latest table data
app.get('/card-data', async (req, res) => {
    const latestSensorArray = await Sensor.find().sort({ createdAt: -1 }).limit(1);
    const latestSensor = latestSensorArray[0];
    res.json({ latestSensor });
});

// Endpoint to get latest 24 hourly averaged data points
app.get('/chart-data', async (req, res) => {
    const latestSensorArray = await Sensor.find().sort({ createdAt: -1 }).limit(144);

    // Calculate hourly averages (6 data points per hour)
    const hourlyAverages = [];
    for (let i = 0; i < 24; i++) {
        const start = i * 6;
        const end = start + 6;
        const hourData = latestSensorArray.slice(start, end);

        // Calculate the average for this hour
        const hourAvg = hourData.reduce((sum, item) => {
            return {
                temperature: sum.temperature + item.temperature / 6,
                pH: sum.pH + item.pH / 6,
                conductivity: sum.conductivity + item.conductivity / 6,
                oxygen: sum.oxygen + item.oxygen / 6,
                ppm: sum.ppm + item.ppm / 6,
                pm25: sum.pm25 + item.pm25 / 6,
                index: i,
            };
        }, { temperature: 0, pH: 0, conductivity: 0, oxygen: 0, ppm: 0, pm25: 0 });

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
            index: i
        });
    }

    res.json({ latestSensorArray: hourlyAverages });
});


// Endpoint to get latest 50 table data
app.get('/data', async (req, res) => {
    const latestSensorArray = await Sensor.find().sort({ createdAt: -1 }).limit(50);
    res.json({ latestSensorArray });
});

// Endpoint to get all table data
app.get('/all-data', async (req, res) => {
    // console.log(req.query.)
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
                $lt: endDateTime
            };
        }

        // Total data count
        const total = await Sensor.countDocuments({});

        // Filtered data count
        const filtered = (startDate && endDate) ? await Sensor.countDocuments(query) : total;

        // Fetch paginated data
        const resultData = await Sensor.find(query)
            .skip(start)
            .limit(length);

        // Prepare response
        const response = {
            draw,
            recordsTotal: total,
            recordsFiltered: filtered,
            data: resultData,
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Error fetching data' + error.message);
    }
});

// Endpoint to send reset TDS, etc. to MQTT
app.post('/reset-tds', async (req, res) => {
    try {
        const mqttUrl = 'localhost';
        const mqttPort = 4000;
        // Make an HTTP request to the MQTT backend service
        const mqttServiceUrl = `http://${mqttUrl}:${mqttPort}/reset-tds`; // URL and port of your MQTT backend
        const response = await axios.post(mqttServiceUrl);
        if (response.data.success) {
            console.log("Success");
            res.json({ success: true });
        } else {
            res.json({ success: false, error: response.data.error });
        }
    } catch (error) {
        console.error('Error communicating with MQTT service:', error);
        res.json({ success: false, error: error.message });
    }
});

// Endpoint to send reset WaterLevel, etc. to MQTT
app.post('/reset-waterlevel', async (req, res) => {
    try {
        const mqttUrl = 'localhost';
        const mqttPort = 4000;
        // Make an HTTP request to the MQTT backend service
        const mqttServiceUrl = `http://${mqttUrl}:${mqttPort}/reset-waterlevel`; // URL and port of your MQTT backend
        const response = await axios.post(mqttServiceUrl);
        if (response.data.success) {
            console.log("Success");
            res.json({ success: true });
        } else {
            res.json({ success: false, error: response.data.error });
        }
    } catch (error) {
        console.error('Error communicating with MQTT service:', error);
        res.json({ success: false, error: error.message });
    }
});

// Endpoint to send reset pm25 to MQT
app.post('/reset-pm25', async (req, res) => {
    try {
        const mqttUrl = 'localhost';
        const mqttPort = 4000;
        // Make an HTTP request to the MQTT backend service
        const mqttServiceUrl = `http://${mqttUrl}:${mqttPort}/reset-pm25`; // URL and port of your MQTT backend
        const response = await axios.post(mqttServiceUrl);
        if (response.data.success) {
            console.log("Success");
            res.json({ success: true });
        } else {
            res.json({ success: false, error: response.data.error });
        }
    } catch (error) {
        console.error('Error communicating with MQTT service:', error);
        res.json({ success: false, error: error.message });
    }
});

app.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        // Redirect to the login page after logout
    });
    res.redirect('/');
});



/* To Be Removed */
// Schedule task to run at every 0, 10, 20, 30, 40, and 50 minutes
// cron.schedule('*/10 * * * * *', () => {
//     console.log('Generating and saving dummy sensor data...');
//     generateDummyFiles();
//   });



app.listen(port, () => {
    console.log(`IMPACT: NTPU App | Listening at http://${url}:${port}/home`);
});