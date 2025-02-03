// Object to store the locale data
const locales = {};

// Function to load locale data
function loadLocale(language) {
  return new Promise((resolve, reject) => {
    if (locales[language]) {
      resolve(locales[language]);
    } else {
      fetch(`/locales/${language}.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          locales[language] = data;
          languageLabels = data; // Update the language labels for chart.js
          resolve(data);
        })
        .catch((error) => {
          console.error("Error loading the locale file:", error);
          reject(error);
        });
    }
  });
}

// Function to display the current language as a flag
function displayCurrentLanguageFlag(language) {
  const flagImage = document.querySelector("#language-flag");
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
      document.dispatchEvent(
        new CustomEvent("changeLanguage", {
          detail: { language: language },
        })
      );
    })
    .catch((error) => {
      console.error(`Failed to load locale for ${language}:`, error);
    });
}

// Function to update the webpage texts based on the current language
function updateTexts(language, element = null) {
  const currentLocale = locales[language];
  if (!currentLocale) {
    console.error(`Locale data for ${language} is not loaded.`);
    return;
  }

  // If a specific element is provided, update only that element
  if (element) {
    const key = element.getAttribute("data-locale-key");
    if (key && currentLocale[key]) {
      element.textContent = currentLocale[key];
    } else {
      console.warn(`Missing key '${key}' for language '${language}'`);
    }
    return;
  }

  // Otherwise, update all elements with data-locale-key
  document.querySelectorAll("[data-locale-key]").forEach((el) => {
    const key = el.getAttribute("data-locale-key");
    if (key && currentLocale[key]) {
      el.textContent = currentLocale[key];
    } else {
      console.warn(`Missing key '${key}' for language '${language}'`);
    }
  });
}

// Utility functions to manage the current language state
function getCurrentLanguage() {
  return localStorage.getItem("currentLanguage") || "en"; // Default to English
}

function setCurrentLanguage(language) {
  localStorage.setItem("currentLanguage", language);
}

// ✅ MutationObserver to detect changes in `data-locale-key`
document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-locale-key") {
        let element = mutation.target;
        updateTexts(getCurrentLanguage(), element); // ✅ Update only the changed element
      }
    });
  });

  // ✅ Observe all elements with `data-locale-key`
  document.querySelectorAll("[data-locale-key]").forEach((element) => {
    observer.observe(element, { attributes: true });
  });

  // ✅ Load initial language settings
  const currentLanguage = getCurrentLanguage();
  loadLocale(currentLanguage)
    .then(() => {
      updateTexts(currentLanguage);
      displayCurrentLanguageFlag(currentLanguage);
    })
    .catch((error) => {
      console.error("Error initializing locales:", error);
    });
});
