// Language labels object to be loaded dynamically
let languageLabels = {};
let currentLanguage = "en"; // Default language

// Function to load locale and update the chart labels
const loadLocaleAndUpdateChart = async (language, currentChart) => {
  try {
    // Load the languageLabels from the locale file (language-switcher.js should already manage this)
    languageLabels = await loadLocale(language);
    updateChartLabels(currentChart);
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

// Function to update the chart labels when language changes
const updateChartLabels = (currentChart) => {
  if (currentChart) {
    const translatedLabel = getTranslatedLabel(currentDataType);
    currentChart.data.datasets[0].label = translatedLabel;
    currentChart.update();
  }
};
