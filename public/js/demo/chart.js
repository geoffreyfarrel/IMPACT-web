// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Variables to manage the data type and interval
let dataTypes = ['temperature', 'pH', 'conductivity', 'oxygen', 'ppm', 'pm25'];
let currentDataTypeIndex = 0;
let dataTypeSwitchInterval = null;

// Language labels object to be loaded dynamically
let languageLabels = {};
let currentLanguage = 'en'; // Default language

document.getElementById('temperatureButton').addEventListener('click', function() {
    changeDataType('temperature');
});

document.getElementById('pHButton').addEventListener('click', function() {
    changeDataType('pH');
});

document.getElementById('conductivityButton').addEventListener('click', function() {
    changeDataType('conductivity');
});

document.getElementById('oxygenButton').addEventListener('click', function() {
    changeDataType('oxygen');
});

document.getElementById('ppmButton').addEventListener('click', function() {
    changeDataType('ppm');
});

document.getElementById('pm25Button').addEventListener('click', function() {
    changeDataType('pm25');
});

// Initialize default chart
document.addEventListener('DOMContentLoaded', function() {
    changeDataType(dataTypes[currentDataTypeIndex]);
    startDataTypeRotation();
});

const ctx = document.getElementById("myAreaChart");
let currentChart;

const changeDataType = (newDataType) => {
    // Update current data type
    currentDataType = newDataType;

    // Fetch new data and update chart
    fetchDataAndUpdateChart(currentDataType);
}

const startDataTypeRotation = () => {
    if (dataTypeSwitchInterval) {
        clearInterval(dataTypeSwitchInterval);
    }

    // Change data type every 10 seconds (10000 milliseconds)
    dataTypeSwitchInterval = setInterval(() => {
        currentDataTypeIndex = (currentDataTypeIndex + 1) % dataTypes.length;
        changeDataType(dataTypes[currentDataTypeIndex]); // Call changeDataType to update the chart
    }, 10000);
}

const fetchDataAndUpdateChart = async (dataToBeShown) => {
    try {
        // console.log(`Fetching data for: ${dataToBeShown}`);
        const response = await fetch('/chart-data');

        if (!response.ok) {
            console.error('Failed to fetch data, status:', response.status);
            return;
        }

        const data = await response.json();
        // console.log('Fetched data:', data);

        // Transform data for the chart
        const chartData = transformDataForChart(data, dataToBeShown);
        // console.log('Transformed chart data:', chartData);

        // Get translated label for the current data type
        const translatedLabel = getTranslatedLabel(currentDataType);

        // Update or create the chart
        if (currentChart) {
            // Update chart data without destroying it
            currentChart.data.labels = chartData.labels;
            currentChart.data.datasets[0].data = chartData.datasets[0].data;
            currentChart.data.datasets[0].label = translatedLabel;
            currentChart.update();
        } else {
            // Create chart if it doesn't exist yet
            createChart(chartData, translatedLabel);
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

function formatISOTimeWithDate(isoTimeString) {
    // Format to show both date and time (e.g., "YYYY-MM-DD hh:mm")
    const date = new Date(isoTimeString);
    return date.toISOString().slice(0, 16).replace('T', ' ');
}

const transformDataForChart = (rawData, dataToBeShown) => {
    if (!rawData || !rawData.latestSensorArray || !Array.isArray(rawData.latestSensorArray)) {
        console.error('Invalid rawData structure:', rawData);
        return {
            labels: [],
            datasets: [{ data: [] }]
        };
    }

    const data = rawData.latestSensorArray;

    let labels = data.map(item => {
        const date = new Date(item.createdAt);
        const localDate = new Date(date.getTime() + 8 * 3600000); // Adding 8 hours for UTC+8
        return formatISOTimeWithDate(localDate.toISOString()); // Show "YYYY-MM-DD hh:mm"
    });
    let values = data.map(item => item[dataToBeShown]);

    // Transform the raw data into a format suitable for your chart
    return {
        labels: labels.reverse(),
        datasets: [
            {
                label: getTranslatedLabel(dataToBeShown), // Fetch translated label
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                fill: false,
                data: values.reverse(),
            },
        ]
    }
};

const createChart = (chartData, translatedLabel) => {
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            ...chartData,
            datasets: [
                {
                    ...chartData.datasets[0],
                    label: translatedLabel // Set translated label for the dataset
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 7,
                        fontColor: 'black', // Set x-axis label color to black
                        fontSize: 16,
                        fontStyle: 'bold',
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        fontColor: 'black', // Set y-axis label color to black
                        fontSize: 16,
                        fontStyle: 'bold',
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'black', // Set legend label color to black
                    fontSize: 24,
                    fontStyle: 'bold',
                }
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
            }
        }
    });
}

// Function to get the translated label
const getTranslatedLabel = (dataType) => {
    // Make sure languageLabels is not empty and contains current dataType translation
    if (languageLabels && languageLabels[dataType]) {
        return languageLabels[dataType].toUpperCase();
    } else {
        return dataType.toUpperCase(); // Fallback to uppercase version of dataType if translation is not available
    }
}

// Event listener for language change
document.addEventListener('changeLanguage', function(event) {
    currentLanguage = event.detail.language || 'en';
    loadLocaleAndUpdateChart(currentLanguage);
});

// Function to load locale and update the chart labels
const loadLocaleAndUpdateChart = async (language) => {
    try {
        // Load the languageLabels from the locale file (language-switcher.js should already manage this)
        languageLabels = await loadLocale(language);
        updateChartLabels();
    } catch (error) {
        console.error('Error loading locale:', error);
    }
}

// Function to update the chart labels when language changes
const updateChartLabels = () => {
    if (currentChart) {
        const translatedLabel = getTranslatedLabel(currentDataType);
        currentChart.data.datasets[0].label = translatedLabel;
        currentChart.update();
    }
}
