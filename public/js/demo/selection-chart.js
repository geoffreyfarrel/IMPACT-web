// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
  "Nunito, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
Chart.defaults.global.defaultFontColor = "#858796";

let charts = [];

$(document).ready(function () {
  $("#selectedChart").on("submit", async function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    const formData = $(this).serialize();

    try {
      // Fetch data from the backend
      const response = await fetch("/selected-chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      const responseBody = await response.json(); // Convert response to JSON
      const data = responseBody.data[0];
      const chartData = data.chartData;

      let timeStamp = chartData.map((item) => {
        const date = new Date(item.timestamp);
        const localDate = new Date(date.getTime() + 8 * 3600000);
        return formatISOTimeWithDate(localDate.toISOString());
      });

      const chartType = data.chartType;

      // Destroy existing charts if they exist
      charts.forEach((chart) => {
        if (chart) chart.destroy();
      });
      charts = []; // Clear the charts array
      // Create or update the Chart.js line chart
      const temperatureChart = new Chart(
        document.getElementById("temperatureCanvas"),
        {
          type: chartType,
          data: {
            labels: timeStamp, // Use data from the response for labels
            datasets: [
              {
                label: getTranslatedLabel("temperature"),
                data: chartData.map((item) => item.temperature), // Use data from the response for the dataset
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                tension: 0.4, // Smooth curve
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Allow the chart to stretch to the parent div
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "pH",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Count",
                },
              },
            },
          },
        }
      );
      charts.push(temperatureChart);
      const pHChart = new Chart(document.getElementById("pHCanvas"), {
        type: chartType,
        data: {
          labels: timeStamp, // Use data from the response for labels
          datasets: [
            {
              label: getTranslatedLabel("pH"),
              data: chartData.map((item) => item.pH), // Use data from the response for the dataset
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to the parent div
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "pH",
              },
            },
            y: {
              title: {
                display: true,
                text: "Count",
              },
            },
          },
        },
      });
      charts.push(pHChart);
      const conductivityChart = new Chart(
        document.getElementById("conductivityCanvas"),
        {
          type: chartType,
          data: {
            labels: timeStamp, // Use data from the response for labels
            datasets: [
              {
                label: getTranslatedLabel("conductivity"),
                data: chartData.map((item) => item.conductivity), // Use data from the response for the dataset
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                tension: 0.4, // Smooth curve
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Allow the chart to stretch to the parent div
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "conductivity",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Count",
                },
              },
            },
          },
        }
      );
      charts.push(conductivityChart);
      const oxygenChart = new Chart(document.getElementById("oxygenCanvas"), {
        type: chartType,
        data: {
          labels: timeStamp, // Use data from the response for labels
          datasets: [
            {
              label: getTranslatedLabel("oxygen"),
              data: chartData.map((item) => item.oxygen), // Use data from the response for the dataset
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to the parent div
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "oxygen",
              },
            },
            y: {
              title: {
                display: true,
                text: "Count",
              },
            },
          },
        },
      });
      charts.push(oxygenChart);
      const ppmChart = new Chart(document.getElementById("ppmCanvas"), {
        type: chartType,
        data: {
          labels: timeStamp, // Use data from the response for labels
          datasets: [
            {
              label: getTranslatedLabel("ppm"),
              data: chartData.map((item) => item.ppm), // Use data from the response for the dataset
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to the parent div
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "ppm",
              },
            },
            y: {
              title: {
                display: true,
                text: "Count",
              },
            },
          },
        },
      });
      charts.push(ppmChart);
      const pm25Chart = new Chart(document.getElementById("pm25Canvas"), {
        type: chartType,
        data: {
          labels: timeStamp, // Use data from the response for labels
          datasets: [
            {
              label: getTranslatedLabel("pm25"),
              data: chartData.map((item) => item.pm25), // Use data from the response for the dataset
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to the parent div
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "pm25",
              },
            },
            y: {
              title: {
                display: true,
                text: "Count",
              },
            },
          },
        },
      });
      charts.push(pm25Chart);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  });
});

document.addEventListener("changeLanguage", function (event) {
  currentLanguage = event.detail.language || "en";
  loadLocaleAndUpdateChart(currentLanguage, charts);
});
