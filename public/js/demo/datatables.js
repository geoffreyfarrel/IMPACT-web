// Call the dataTables jQuery plugin
$(document).ready(function () {
  // Check if the DataTable instance exists and destroy it
  if ($.fn.dataTable.isDataTable("#temperatureTable")) {
    $("#temperatureTable").DataTable().destroy();
  }

  // Temperature DataTable
  let temperatureTable = $("#temperatureTable").DataTable({
    dom: "lrtip",
    ajax: {
      url: "/data",
      method: "GET",
      dataSrc: function (json) {
        // // Log the entire JSON response to the console
        // console.log("Received data:", json.latestSensorArray);

        // Return the part of the JSON that DataTables should use to populate the table
        return json.latestSensorArray;
      },
    },
    columns: [
      {
        data: "createdAt",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          let date = new Date(data);
          let localDate = new Date(date.getTime() + 8 * 3600000);
          return localDate
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace(/-/g, "/");
        },
      },
      {
        data: "temperature",
        className: "text-center align-middle",
        render: function (data, type, row) {
          return data ? data : "NaN";
        },
      },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
  });
  // Check if the DataTable instance exists and destroy it
  if ($.fn.dataTable.isDataTable("#pHTable")) {
    $("#pHTable").DataTable().destroy();
  }

  // pH DataTable
  let pHTable = $("#pHTable").DataTable({
    dom: "lrtip",
    ajax: {
      url: "/data",
      method: "GET",
      dataSrc: function (json) {
        // // Log the entire JSON response to the console
        // console.log("Received data:", json.latestSensorArray);

        // Return the part of the JSON that DataTables should use to populate the table
        return json.latestSensorArray;
      },
    },
    columns: [
      {
        data: "createdAt",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          let date = new Date(data);
          let localDate = new Date(date.getTime() + 8 * 3600000);
          return localDate
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace(/-/g, "/");
        },
      },
      {
        data: "pH",
        className: "text-center align-middle",
        render: function (data, type, row) {
          return data ? data : "NaN";
        },
      },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
  });
  // conductivity DataTable
  let conductivityTable = $("#conductivityTable").DataTable({
    dom: "lrtip",
    ajax: {
      url: "/data",
      method: "GET",
      dataSrc: function (json) {
        // // Log the entire JSON response to the console
        // console.log("Received data:", json.latestSensorArray);

        // Return the part of the JSON that DataTables should use to populate the table
        return json.latestSensorArray;
      },
    },
    columns: [
      {
        data: "createdAt",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          let date = new Date(data);
          let localDate = new Date(date.getTime() + 8 * 3600000);
          return localDate
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace(/-/g, "/");
        },
      },
      {
        data: "conductivity",
        className: "text-center align-middle",
        render: function (data, type, row) {
          return data ? data : "NaN";
        },
      },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
  });
  // oxygen DataTable
  let oxygenTable = $("#oxygenTable").DataTable({
    dom: "lrtip",
    ajax: {
      url: "/data",
      method: "GET",
      dataSrc: function (json) {
        // // Log the entire JSON response to the console
        // console.log("Received data:", json.latestSensorArray);

        // Return the part of the JSON that DataTables should use to populate the table
        return json.latestSensorArray;
      },
    },
    columns: [
      {
        data: "createdAt",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          let date = new Date(data);
          let localDate = new Date(date.getTime() + 8 * 3600000);
          return localDate
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace(/-/g, "/");
        },
      },
      {
        data: "oxygen",
        className: "text-center align-middle",
        render: function (data, type, row) {
          return data ? data : "NaN";
        },
      },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
  });
  // ppm DataTable
  let ppmTable = $("#ppmTable").DataTable({
    dom: "lrtip",
    ajax: {
      url: "/data",
      method: "GET",
      dataSrc: function (json) {
        //   // Log the entire JSON response to the console
        //   console.log("Received data:", json.latestSensorArray);

        // Return the part of the JSON that DataTables should use to populate the table
        return json.latestSensorArray;
      },
    },
    columns: [
      {
        data: "createdAt",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          let date = new Date(data);
          let localDate = new Date(date.getTime() + 8 * 3600000);
          return localDate
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace(/-/g, "/");
        },
      },
      {
        data: "ppm",
        className: "text-center align-middle",
        render: function (data, type, row) {
          return data ? data : "NaN";
        },
      },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
  });
  // pm25 DataTable
  let pm25Table = $("#pm25Table").DataTable({
    dom: "lrtip",
    ajax: {
      url: "/data",
      method: "GET",
      dataSrc: function (json) {
        //   // Log the entire JSON response to the console
        //   console.log("Received data:", json.latestSensorArray);

        // Return the part of the JSON that DataTables should use to populate the table
        return json.latestSensorArray;
      },
    },
    columns: [
      {
        data: "createdAt",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          let date = new Date(data);
          let localDate = new Date(date.getTime() + 8 * 3600000);
          return localDate
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace(/-/g, "/");
        },
      },
      {
        data: "pm25",
        className: "text-center align-middle",
        render: function (data, type, row) {
          return data ? data : "NaN";
        },
      },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
  });

  // Set intervals to reload DataTables every 10 seconds
  setInterval(function () {
    temperatureTable.ajax.reload(null, false); // false to stay on the current page after reloading
    pHTable.ajax.reload(null, false);
    conductivityTable.ajax.reload(null, false);
    oxygenTable.ajax.reload(null, false);
    ppmTable.ajax.reload(null, false);
    // waterLevelTable.ajax.reload(null, false);
    pm25Table.ajax.reload(null, false);
  }, 1000); // 10000 milliseconds = 10 seconds
});
