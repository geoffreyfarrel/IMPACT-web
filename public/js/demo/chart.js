// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

// Variables to manage the data type and interval
let dataTypes = ["temperature", "pH", "conductivity", "oxygen", "ppm", "pm25"];
let currentDataTypeIndex = 0;
let dataTypeSwitchInterval = null;
let colorPallete;

// Language labels object to be loaded dynamically
let languageLabels = {};
let currentLanguage = "en"; // Default language

document
  .getElementById("temperatureButton")
  .addEventListener("click", function () {
    changeDataType("temperature");
  });

document.getElementById("pHButton").addEventListener("click", function () {
  changeDataType("pH");
});

document
  .getElementById("conductivityButton")
  .addEventListener("click", function () {
    changeDataType("conductivity");
  });

document.getElementById("oxygenButton").addEventListener("click", function () {
  changeDataType("oxygen");
});

document.getElementById("ppmButton").addEventListener("click", function () {
  changeDataType("ppm");
});

document.getElementById("pm25Button").addEventListener("click", function () {
  changeDataType("pm25");
});

// Initialize default chart
document.addEventListener("DOMContentLoaded", function () {
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
};

const startDataTypeRotation = () => {
  if (dataTypeSwitchInterval) {
    clearInterval(dataTypeSwitchInterval);
  }

  // Change data type every 10 seconds (10000 milliseconds)
  dataTypeSwitchInterval = setInterval(() => {
    currentDataTypeIndex = (currentDataTypeIndex + 1) % dataTypes.length;
    changeDataType(dataTypes[currentDataTypeIndex]); // Call changeDataType to update the chart
  }, 10000);
};

const fetchDataAndUpdateChart = async (dataToBeShown) => {
  try {
    // console.log(`Fetching data for: ${dataToBeShown}`);
    const response = await fetch("/chart-data");

    if (!response.ok) {
      console.error("Failed to fetch data, status:", response.status);
      return;
    }

    const responseBody = await response.json();
    const data = responseBody.data[0];
    // console.log("Fetched data:", data);

    // Transform data for the chart
    const chartData = transformDataForChart(data, dataToBeShown);
    // console.log("Transformed chart data:", chartData);

    // Get translated label for the current data type
    const translatedLabel = getTranslatedLabel(currentDataType);

    // Update or create the chart
    if (currentChart) {
      // Update chart labels and data
      currentChart.data.labels = chartData.labels; // Update labels
      currentChart.data.datasets[0].data = chartData.datasets[0].data; // Update data values

      // Update dynamic colors
      currentChart.data.datasets[0].pointBackgroundColor =
        chartData.datasets[0].pointBackgroundColor; // Update point colors
      currentChart.data.datasets[0].backgroundColor =
        chartData.datasets[0].backgroundColor; // Update dataset background color

      // Optionally update the label
      currentChart.data.datasets[0].label = translatedLabel;

      currentChart.update();
    } else {
      // Create chart if it doesn't exist yet
      createChart(chartData, translatedLabel);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const transformDataForChart = (rawData, dataToBeShown) => {
  if (
    !rawData ||
    !rawData.hourlyAverages ||
    !Array.isArray(rawData.hourlyAverages)
  ) {
    console.error("Invalid rawData structure:", rawData);
    return {
      labels: [],
      datasets: [{ data: [] }],
    };
  }

  const data = rawData.hourlyAverages;
  // console.log(data);

  // PH dataset colors
  const pHColors = (data) => {
    return data.map((item) => {
      switch (true) {
        case item.pH >= 0 && item.pH < 1:
          return "rgba(234, 28, 36, 1)";
        case item.pH >= 1 && item.pH < 2:
          return "rgba(241, 105, 35, 1)";
        case item.pH >= 2 && item.pH < 3:
          return "rgba(246, 141, 58, 1)";
        case item.pH >= 3 && item.pH < 4:
          return "rgba(254, 190, 52, 1)";
        case item.pH >= 4 && item.pH < 5:
          return "rgba(255, 243, 62, 1)";
        case item.pH >= 5 && item.pH < 6:
          return "rgba(202, 219, 47, 1)";
        case item.pH >= 6 && item.pH < 7:
          return "rgba(123, 194, 79, 1)";
        case item.pH >= 7 && item.pH < 8:
          return "rgba(4, 177, 110, 1)";
        case item.pH >= 8 && item.pH < 9:
          return "rgba(1, 170, 206, 1)";
        case item.pH >= 9 && item.pH < 10:
          return "rgba(72, 116, 185, 1)";
        case item.pH >= 10 && item.pH < 11:
          return "rgba(49, 71, 157, 1)";
        case item.pH >= 11 && item.pH < 12:
          return "rgba(94, 62, 150, 1)";
        case item.pH >= 12 && item.pH < 13:
          return "rgba(129, 49, 146, 1)";
        case item.pH >= 13 && item.pH < 14:
          return "rgba(148, 93, 166, 1)";
        case item.pH >= 14:
          return "rgba(183, 102, 168, 1)";
      }
    });
  };

  // Dissolved Oxygen dataset colors
  const oxygenColors = (data) => {
    return data.map((item) => {
      switch (true) {
        case item.oxygen >= 0 && item.oxygen < 4.1:
          return "rgba(225, 37, 37, 1)";
        case item.oxygen >= 4.1 && item.oxygen < 6.6:
          return "rgba(255, 145, 49, 1)";
        case item.oxygen >= 6.6 && item.oxygen < 9.6:
          return "rgba(194, 255, 82, 1)";
        case item.oxygen >= 9.6:
          return "rgba(0, 218, 7, 1)";
      }
    });
  };

  // Dissolved Solid dataset colors
  const ppmColors = (data) => {
    return data.map((item) => {
      switch (true) {
        case item.ppm >= 0 && item.ppm < 50:
          return "rgba(37, 169, 225, 1)";
        case item.ppm >= 50 && item.ppm < 100:
          return "rgba(26, 117, 187, 1)";
        case item.ppm >= 100 && item.ppm < 200:
          return "rgba(46, 54, 144, 1)";
        case item.ppm >= 200 && item.ppm < 300:
          return "rgba(142, 41, 143, 1)";
        case item.ppm >= 300 && item.ppm < 400:
          return "rgba(214, 222, 33, 1)";
        case item.ppm >= 400 && item.ppm < 500:
          return "rgba(243, 147, 25, 1)";
        case item.ppm >= 500:
          return "rgba(236, 27, 36, 1)";
      }
    });
  };

  // PM25 dataset colors
  const pm25Colors = (data) => {
    return data.map((item) => {
      switch (true) {
        case item.pm25 >= 0 && item.pm25 < 9.1:
          return "rgba(65, 207, 69, 1)";
        case item.pm25 >= 9.1 && item.pm25 < 35.5:
          return "rgba(103, 251, 117, 1)";
        case item.pm25 >= 35.5 && item.pm25 < 55.5:
          return "rgba(165, 249, 109, 1)";
        case item.pm25 >= 55.5 && item.pm25 < 125.5:
          return "rgba(255, 225, 73, 1)";
        case item.pm25 >= 125.5 && item.pm25 < 225.5:
          return "rgba(255, 134, 59, 1)";
        case item.pm25 >= 225:
          return "rgba(204, 0, 0, 1)";
      }
    });
  };

  switch (dataToBeShown) {
    case "pH":
      colorPallete = pHColors(data.reverse()); // Call pHColors to get dynamic colors for each point
      break;
    case "oxygen":
      colorPallete = oxygenColors(data); // Call oxygenColors to get dynamic colors
      break;
    case "ppm":
      colorPallete = ppmColors(data); // Call ppmColors to get dynamic colors
      break;
    case "pm25":
      colorPallete = pm25Colors(data); // Call pm25Colors to get dynamic colors
      break;
    default:
      colorPallete = data.map(() => "rgba(58, 96, 208, 1)"); // Default static color
      break;
  }

  let labels = data.map((item) => {
    const date = new Date(item.createdAt);
    const localDate = new Date(date.getTime() + 8 * 3600000); // Adding 8 hours for UTC+8
    return formatISOTimeWithDate(localDate.toISOString()); // Show "YYYY-MM-DD hh:mm"
  });
  let values = data.map((item) => item[dataToBeShown]);

  // Transform the raw data into a format suitable for your chart
  return {
    labels: labels.reverse(),
    datasets: [
      {
        label: getTranslatedLabel(dataToBeShown), // Fetch translated label
        borderColor: "black",
        backgroundColor: colorPallete,
        pointRadius: 6,
        pointBackgroundColor: colorPallete,
        pointBorderColor: "rgba(0, 0, 0, 0)", // Transparent border around points
        pointBorderWidth: 0,
        pointHoverRadius: 3,
        pointHitRadius: 10,
        borderWidth: 3,
        fill: false,
        tension: 0.4, // Smooth curve
        data: values.reverse(),
      },
    ],
  };
};

const createChart = (chartData, translatedLabel) => {
  currentChart = new Chart(ctx, {
    type: "line",
    data: {
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          label: translatedLabel, // Set translated label for the dataset
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0,
        },
      },
      scales: {
        xAxes: [
          {
            time: {
              unit: "date",
            },
            ticks: {
              maxTicksLimit: 10,
              fontColor: "black", // Set x-axis label color to black
              fontSize: 16,
              fontStyle: "bold",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              maxTicksLimit: 7,
              padding: 10,
              fontColor: "black", // Set y-axis label color to black
              fontSize: 16,
              fontStyle: "bold",
            },
          },
        ],
      },
      legend: {
        display: true,
        labels: {
          fontColor: "black", // Set legend label color to black
          fontSize: 24,
          fontStyle: "bold",
        },
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: "#6e707e",
        titleFontSize: 14,
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: "index",
        caretPadding: 10,
      },
    },
  });
};

// Function to get the translated label
const getTranslatedLabel = (dataType) => {
  // Make sure languageLabels is not empty and contains current dataType translation
  if (languageLabels && languageLabels[dataType]) {
    return languageLabels[dataType].toUpperCase();
  } else {
    return dataType.toUpperCase(); // Fallback to uppercase version of dataType if translation is not available
  }
};

// Event listener for language change
document.addEventListener("changeLanguage", function (event) {
  currentLanguage = event.detail.language || "en";
  loadLocaleAndUpdateChart(currentLanguage);
});

// Function to load locale and update the chart labels
const loadLocaleAndUpdateChart = async (language) => {
  try {
    // Load the languageLabels from the locale file (language-switcher.js should already manage this)
    languageLabels = await loadLocale(language);
    updateChartLabels();
  } catch (error) {
    console.error("Error loading locale:", error);
  }
};

// Function to update the chart labels when language changes
const updateChartLabels = () => {
  if (currentChart) {
    const translatedLabel = getTranslatedLabel(currentDataType);
    currentChart.data.datasets[0].label = translatedLabel;
    currentChart.update();
  }
};
