// Object to store the locale data
const locales = {};

// Function to load locale data
function loadLocale(language) {
  return new Promise((resolve, reject) => {
    if (locales[language]) {
      resolve(locales[language]);
    } else {
      fetch(`/locales/${language}.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          locales[language] = data;
          languageLabels = data; // Update the language labels for chart.js
          resolve(data);
        })
        .catch(error => {
          console.error('Error loading the locale file:', error);
          reject(error);
        });
    }
  });
}

// Function to display the current language as a flag
function displayCurrentLanguageFlag(language) {
    const flagImage = document.querySelector('#language-flag');
    if (flagImage) {
      flagImage.src = `img/${language}-flag.png`; // Construct the path based on the language
      flagImage.alt = `Flag of ${language.toUpperCase()}`; // Update alt text for accessibility
    }
}

// Function to switch language and update page texts
function switchLanguage(language) {
  loadLocale(language)
    .then(() => {
      setCurrentLanguage(language);
      updateTexts(language);
      displayCurrentLanguageFlag(language);
      // Dispatch event to update chart labels
      document.dispatchEvent(new CustomEvent('changeLanguage', {
        detail: {
          language: language
        }
      }));
    })
    .catch(error => {
      console.error(`Failed to load locale for ${language}:`, error);
    });
}

// Function to update the webpage texts based on the current language
function updateTexts(language) {
  const currentLocale = locales[language];
  if (!currentLocale) {
    console.error(`Locale data for ${language} is not loaded.`);
    return;
  }

  document.querySelectorAll("[data-locale-key]").forEach(element => {
    const key = element.getAttribute("data-locale-key");
    const text = currentLocale[key];
    if (text !== undefined) {
        if (element.tagName === "INPUT" && (element.type === "text" || element.type === 'password')) {
          element.placeholder = text;  // Set placeholder for input elements
        } else {
          element.textContent = text;  // Set textContent for other elements
        }
    } else {
        console.warn(`Missing key '${key}' for language '${language}'`);
    }
  });
}

// Utility functions to manage the current language state
function getCurrentLanguage() {
  return localStorage.getItem('currentLanguage') || 'en'; // Default to English
}

function setCurrentLanguage(language) {
  localStorage.setItem('currentLanguage', language);
}

// Initialize locale data for available languages on document load
document.addEventListener('DOMContentLoaded', () => {
  const currentLanguage = getCurrentLanguage();
  loadLocale(currentLanguage)
    .then(() => {
      updateTexts(currentLanguage);
      displayCurrentLanguageFlag(currentLanguage);
    })
    .catch(error => {
      console.error('Error initializing locales:', error);
    });
});
