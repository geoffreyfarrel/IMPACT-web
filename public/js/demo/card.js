// pH dataset colors
const pHColors = (pH) => {
  if (pH >= 0 && pH < 1) return "rgba(234, 28, 36, 1)";
  else if (pH >= 1 && pH < 2) return "rgba(241, 105, 35, 1)";
  else if (pH >= 2 && pH < 3) return "rgba(246, 141, 58, 1)";
  else if (pH >= 3 && pH < 4) return "rgba(254, 190, 52, 1)";
  else if (pH >= 4 && pH < 5) return "rgba(255, 243, 62, 1)";
  else if (pH >= 5 && pH < 6) return "rgba(202, 219, 47, 1)";
  else if (pH >= 6 && pH < 7) return "rgba(123, 194, 79, 1)";
  else if (pH >= 7 && pH < 8) return "rgba(4, 177, 110, 1)";
  else if (pH >= 8 && pH < 9) return "rgba(1, 170, 206, 1)";
  else if (pH >= 9 && pH < 10) return "rgba(72, 116, 185, 1)";
  else if (pH >= 10 && pH < 11) return "rgba(49, 71, 157, 1)";
  else if (pH >= 11 && pH < 12) return "rgba(94, 62, 150, 1)";
  else if (pH >= 12 && pH < 13) return "rgba(129, 49, 146, 1)";
  else if (pH >= 13 && pH < 14) return "rgba(148, 93, 166, 1)";
  else if (pH >= 14) return "rgba(183, 102, 168, 1)";
  else return "rgba(0, 0, 0, 1)"; // Default (if pH is out of range)
};

// Dissolved Oxygen dataset colors
const oxygenColors = (oxygen) => {
  if (oxygen >= 0 && oxygen < 4.1) {
    return "rgba(225, 37, 37, 1)"; // Red (Very Low Oxygen)
  } else if (oxygen >= 4.1 && oxygen < 6.6) {
    return "rgba(255, 145, 49, 1)"; // Orange (Low Oxygen)
  } else if (oxygen >= 6.6 && oxygen < 9.6) {
    return "rgba(194, 255, 82, 1)"; // Green-Yellow (Moderate Oxygen)
  } else if (oxygen >= 9.6) {
    return "rgba(0, 218, 7, 1)"; // Green (Good Oxygen)
  } else {
    return "rgba(0, 0, 0, 1)"; // Default Black (Invalid Value)
  }
};

// Dissolved Solid dataset colors
const ppmColors = (ppm) => {
  if (ppm >= 0 && ppm < 50) return "rgba(37, 169, 225, 1)";
  else if (ppm >= 50 && ppm < 100) return "rgba(26, 117, 187, 1)";
  else if (ppm >= 100 && ppm < 200) return "rgba(46, 54, 144, 1)";
  else if (ppm >= 200 && ppm < 300) return "rgba(142, 41, 143, 1)";
  else if (ppm >= 300 && ppm < 400) return "rgba(214, 222, 33, 1)";
  else if (ppm >= 400 && ppm < 500) return "rgba(243, 147, 25, 1)";
  else if (ppm >= 500) return "rgba(236, 27, 36, 1)";
  else return "rgba(0, 0, 0, 1)"; // Default color for invalid values
};

// PM25 dataset colors
const pm25Colors = (pm25) => {
  if (pm25 >= 0 && pm25 < 9.1) return "rgba(65, 207, 69, 1)";
  else if (pm25 >= 9.1 && pm25 < 35.5) return "rgba(103, 251, 117, 1)";
  else if (pm25 >= 35.5 && pm25 < 55.5) return "rgba(165, 249, 109, 1)";
  else if (pm25 >= 55.5 && pm25 < 125.5) return "rgba(255, 225, 73, 1)";
  else if (pm25 >= 125.5 && pm25 < 225.5) return "rgba(255, 134, 59, 1)";
  else if (pm25 >= 225) return "rgba(204, 0, 0, 1)";
  else return "rgba(0, 0, 0, 1)"; // Default color for invalid values
};

const updatePHIndicator = (pHValue) => {
  document.getElementById("pHCardIndicator").style.backgroundColor =
    pHColors(pHValue);
};
const updateOxygenIndicator = (oxygenValue) => {
  document.getElementById("oxygenCardIndicator").style.backgroundColor =
    oxygenColors(oxygenValue);
};
const updatePPMIndicator = (ppmValue) => {
  document.getElementById("ppmCardIndicator").style.backgroundColor =
    ppmColors(ppmValue);
};
const updatePM25Indicator = (pm25Value) => {
  document.getElementById("pm25CardIndicator").style.backgroundColor =
    pm25Colors(pm25Value);
};

const updatePHIndicatorText = (pHValue) => {
  if (pHValue >= 0 && pHValue < 3) {
    document.getElementById("pHCardIndicatorText").dataset.localeKey =
      "highly_acidic";
  } else if (pHValue >= 3 && pHValue < 7) {
    document.getElementById("pHCardIndicatorText").dataset.localeKey =
      "slightly_acidic";
  } else if (pHValue >= 7 && pHValue < 8) {
    document.getElementById("pHCardIndicatorText").dataset.localeKey =
      "neutral";
  } else if (pHValue >= 8 && pHValue < 13) {
    document.getElementById("pHCardIndicatorText").dataset.localeKey =
      "slightly_alkaline";
  } else if (pHValue >= 13) {
    document.getElementById("pHCardIndicatorText").dataset.localeKey =
      "highly_alkaline";
  }
};
const updateOxygenIndicatorText = (oxygenValue) => {
  if (oxygenValue >= 0 && oxygenValue < 4.1) {
    document.getElementById("oxygenCardIndicatorText").dataset.localeKey =
      "no_live";
  } else if (oxygenValue >= 4.1 && oxygenValue < 6.6) {
    document.getElementById("oxygenCardIndicatorText").dataset.localeKey =
      "fe_live";
  } else if (oxygenValue >= 6.6 && oxygenValue < 9.6) {
    document.getElementById("oxygenCardIndicatorText").dataset.localeKey =
      "most_live";
  } else if (oxygenValue >= 9.6) {
    document.getElementById("oxygenCardIndicatorText").dataset.localeKey =
      "all_live";
  }
};
const updatePPMIndicatorText = (ppmValue) => {
  if (ppmValue >= 0 && ppmValue < 50) {
    document.getElementById("ppmCardIndicatorText").dataset.localeKey =
      "ideal_ppm";
  } else if (ppmValue >= 50 && ppmValue < 100) {
    document.getElementById("ppmCardIndicatorText").dataset.localeKey =
      "good_ppm";
  } else if (ppmValue >= 100 && ppmValue < 200) {
    document.getElementById("ppmCardIndicatorText").dataset.localeKey =
      "hard_ppm";
  } else if (ppmValue >= 200 && ppmValue < 300) {
    document.getElementById("ppmCardIndicatorText").dataset.localeKey =
      "marginally_ppm";
  } else if (ppmValue >= 300 && ppmValue < 400) {
    document.getElementById("ppmCardIndicatorText").dataset.localeKey =
      "high_ppm";
  } else if (ppmValue >= 400 && ppmValue < 500) {
    document.getElementById("ppmCardIndicatorText").dataset.localeKey =
      "poor_ppm";
  } else if (ppmValue >= 500) {
    document.getElementById("ppmCardIndicatorText").dataset.localeKey =
      "undrinkable_ppm";
  }
};
const updatePM25IndicatorText = (pm25Value) => {
  if (pm25Value >= 0 && pm25Value < 9.1) {
    document.getElementById("pm25CardIndicatorText").dataset.localeKey =
      "good_pm25";
  } else if (pm25Value >= 9.1 && pm25Value < 35.5) {
    document.getElementById("pm25CardIndicatorText").dataset.localeKey =
      "moderate_pm25";
  } else if (pm25Value >= 35.5 && pm25Value < 55.5) {
    document.getElementById("pm25CardIndicatorText").dataset.localeKey =
      "unhealthy_several_pm25";
  } else if (pm25Value >= 55.5 && pm25Value < 125.5) {
    document.getElementById("pm25CardIndicatorText").dataset.localeKey =
      "unhealthy_pm25";
  } else if (pm25Value >= 125.5 && pm25Value < 225.5) {
    document.getElementById("pm25CardIndicatorText").dataset.localeKey =
      "very_unhealthy_pm25";
  } else if (pm25Value >= 225.5) {
    document.getElementById("pm25CardIndicatorText").dataset.localeKey =
      "hazardous_pm25";
  }
};

// Realtime Data Update
function fetchData() {
  fetch("card-data")
    .then((res) => res.json())
    .then((data) => {
      const sensor = data.latestSensor;
      const temperatureValue = sensor.temperature;
      const pHValue = sensor.pH;
      const conductivityValue = sensor.conductivity;
      const oxygenValue = sensor.oxygen;
      const ppmValue = sensor.ppm;
      const pm25Value = sensor.pm25;

      document.getElementById("temperature").innerHTML = temperatureValue;
      document.getElementById("pH").innerHTML = pHValue;
      document.getElementById("conductivity").innerHTML = conductivityValue;
      document.getElementById("oxygen").innerHTML = oxygenValue;
      document.getElementById("ppm").innerHTML = ppmValue;
      document.getElementById("pm25").innerHTML = pm25Value;
      const utcDate = new Date(sensor.createdAt);
      let localDate = new Date(utcDate.getTime() + 8 * 3600000);
      document.getElementById("createdAt").innerHTML = localDate
        .toISOString()
        .slice(0, 16)
        .replace("T", " ")
        .replace(/-/g, "/");

      updatePHIndicator(pHValue);
      updateOxygenIndicator(oxygenValue);
      updatePPMIndicator(ppmValue);
      updatePM25Indicator(pm25Value);

      updatePHIndicatorText(pHValue);
      updateOxygenIndicatorText(oxygenValue);
      updatePPMIndicatorText(ppmValue);
      updatePM25IndicatorText(pm25Value);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Fetch data initially and then every 10 minutes (600000 milliseconds)
fetchData();
setInterval(fetchData, 1000);
