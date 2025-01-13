Chart.defaults.font = {
  family: "Nunito, Arial, sans-serif", // Font family
  size: 16, // Font size
  weight: "bold", // Font weight
  lineHeight: 1.2, // Line height
};

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
                borderColor: "black",
                backgroundColor: "rgba(58, 96, 208, 1)",
                pointRadius: 6,
                pointBackgroundColor: "rgba(58, 96, 208, 1)",
                pointBorderColor: "rgba(0, 0, 0, 0)", // Transparent border around points
                pointBorderWidth: 0,
                pointHoverRadius: 3,
                pointHitRadius: 10,
                borderWidth: 3,
                fill: false,
                tension: 0.4, // Smooth curve
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Allow the chart to stretch to the parent div
            legend: {
              display: true,
              labels: {
                fontColor: "black", // Set legend label color to black
                fontSize: 24,
                fontStyle: "bold",
                fontFamily: "Nunito, Arial, sans-serif",
                boxWidth: 0, // Remove the box width
                boxHeight: 0, // Remove the box height
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
                    padding: 10,
                    fontColor: "black", // Set y-axis label color to black
                    fontSize: 16,
                    fontStyle: "bold",
                  },
                },
              ],
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
              borderColor: "black",
              backgroundColor: pHColors(chartData),
              pointRadius: 6,
              pointBackgroundColor: pHColors(chartData),
              pointBorderColor: "rgba(0, 0, 0, 0)", // Transparent border around points
              pointBorderWidth: 0,
              borderWidth: 3,
              fill: false,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to the parent div
          legend: {
            display: true,
            labels: {
              fontColor: "black", // Set legend label color to black
              fontSize: 24,
              fontStyle: "bold",
              fontFamily: "Nunito, Arial, sans-serif",
              boxWidth: 0, // Remove the box width
              boxHeight: 0, // Remove the box height
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
                  padding: 10,
                  fontColor: "black", // Set y-axis label color to black
                  fontSize: 16,
                  fontStyle: "bold",
                },
              },
            ],
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
                borderColor: "black",
                backgroundColor: "rgba(58, 96, 208, 1)",
                pointRadius: 6,
                pointBackgroundColor: "rgba(58, 96, 208, 1)",
                pointBorderColor: "rgba(0, 0, 0, 0)", // Transparent border around points
                pointBorderWidth: 0,
                borderWidth: 3,
                fill: false,
                tension: 0.4, // Smooth curve
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Allow the chart to stretch to the parent div
            legend: {
              display: true,
              labels: {
                fontColor: "black", // Set legend label color to black
                fontSize: 24,
                fontStyle: "bold",
                fontFamily: "Nunito, Arial, sans-serif",
                boxWidth: 0, // Remove the box width
                boxHeight: 0, // Remove the box height
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
                    min: 0.0,
                    max: 0.03,
                    padding: 10,
                    fontColor: "black", // Set y-axis label color to black
                    fontSize: 16,
                    fontStyle: "bold",
                  },
                },
              ],
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
              borderColor: "black",
              backgroundColor: oxygenColors(chartData),
              pointRadius: 6,
              pointBackgroundColor: oxygenColors(chartData),
              pointBorderColor: "rgba(0, 0, 0, 0)", // Transparent border around points
              pointBorderWidth: 0,
              borderWidth: 3,
              fill: false,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to the parent div
          legend: {
            display: true,
            labels: {
              fontColor: "black", // Set legend label color to black
              fontSize: 24,
              fontStyle: "bold",
              fontFamily: "Nunito, Arial, sans-serif",
              boxWidth: 0, // Remove the box width
              boxHeight: 0, // Remove the box height
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
                  padding: 10,
                  fontColor: "black", // Set y-axis label color to black
                  fontSize: 16,
                  fontStyle: "bold",
                },
              },
            ],
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
              borderColor: "black",
              backgroundColor: ppmColors(chartData),
              pointRadius: 6,
              pointBackgroundColor: ppmColors(chartData),
              pointBorderColor: "rgba(0, 0, 0, 0)", // Transparent border around points
              pointBorderWidth: 0,
              borderWidth: 3,
              fill: false,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to the parent div
          legend: {
            display: true,
            labels: {
              fontColor: "black", // Set legend label color to black
              fontSize: 24,
              fontStyle: "bold",
              fontFamily: "Nunito, Arial, sans-serif",
              boxWidth: 0, // Remove the box width
              boxHeight: 0, // Remove the box height
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
                  padding: 10,
                  fontColor: "black", // Set y-axis label color to black
                  fontSize: 16,
                  fontStyle: "bold",
                },
              },
            ],
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
              borderColor: "black",
              backgroundColor: pm25Colors(chartData),
              pointRadius: 6,
              pointBackgroundColor: pm25Colors(chartData),
              pointBorderColor: "rgba(0, 0, 0, 0)", // Transparent border around points
              pointBorderWidth: 0,
              borderWidth: 3,
              fill: false,
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to the parent div
          legend: {
            display: true,
            labels: {
              fontColor: "black", // Set legend label color to black
              fontSize: 24,
              fontStyle: "bold",
              fontFamily: "Nunito, Arial, sans-serif",
              boxWidth: 0, // Remove the box width
              boxHeight: 0, // Remove the box height
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
                  padding: 10,
                  fontColor: "black", // Set y-axis label color to black
                  fontSize: 16,
                  fontStyle: "bold",
                },
              },
            ],
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
