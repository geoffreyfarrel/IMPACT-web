// Language labels object to be loaded dynamically
let languageLabels = {};
let currentLanguage = "en"; // Default language

const staticDataTypes = [
  "temperature",
  "pH",
  "conductivity",
  "oxygen",
  "ppm",
  "pm25",
];

// Function to load locale and update the chart labels
const loadLocaleAndUpdateChart = async (language, charts) => {
  try {
    // Load the languageLabels from the locale file (language-switcher.js should already manage this)
    languageLabels = await loadLocale(language);
    updateAllChartLabels(charts);
  } catch (error) {
    console.error("Error loading locale:", error);
  }
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

document.addEventListener("changeLanguage", function (event) {
  currentLanguage = event.detail.language || "en";
  loadLocaleAndUpdateChart(currentLanguage);
});

const updateAllChartLabels = (charts) => {
  if (!charts || !Array.isArray(charts) || charts.length === 0) {
    return;
  }
  charts.forEach((chart, index) => {
    const dataType = staticDataTypes[index]; // Get the corresponding data type
    const translatedLabel = getTranslatedLabel(dataType); // Get translated label
    chart.data.datasets[0].label = translatedLabel; // Update chart label
    chart.update(); // Refresh the chart
  });
};
