// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
  "Nunito, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
Chart.defaults.global.defaultFontColor = "#858796";

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
      const data = responseBody.data;

      let timeStamp = data.map((item) => {
        const date = new Date(item.timestamp);
        const localDate = new Date(date.getTime() + 8 * 3600000);
        return formatISOTimeWithDate(localDate.toISOString());
      });

      // Create or update the Chart.js line chart
      const temperatureChart = new Chart(
        document.getElementById("selectedChartCanvas"),
        {
          type: "bar",
          data: {
            labels: timeStamp, // Use data from the response for labels
            datasets: [
              {
                label: getTranslatedLabel("temperature"),
                data: data.map((item) => item.temperature), // Use data from the response for the dataset
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
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  });
});
