$(document).ready(function () {
  // Temperature DataTable
  let temperatureAllTable = $("#temperatureAllTable").DataTable({
    processing: true,
    serverSide: true,
    searchDelay: 500,
    dom: "lrtip",
    ordering: false,
    ajax: {
      url: "/all-data",
      type: "GET",
      data: function (d) {
        // console.log("Draw:", d.draw);
        // console.log("Start:", d.start);
        // console.log("Length:", d.length);
        // console.log("Search Value:", d.search.value);
        // Passing additional parameters to server
        // console.log("Sending data:", d);
        return $.extend({}, d, {
          draw: d.draw,
          start: d.start,
          length: d.length,
        });
      },
      dataSrc: function (json) {
        // console.log("Received data:", json.data);
        return json.data.map((item) => {
          item.predicted = "NaN"; // Default value since there's no predicted data yet
          // console.log(item);
          return item;
        });
      },
    },
    columns: [
      {
        data: "createdAt",
        title: "Time",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          var date = new Date(data);
          var localDate = new Date(date.getTime() + 8 * 3600000);
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
      },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
    ],
    // "drawCallback": function(settings) {
    // This callback gets called after every draw (data load)
    // console.log("Records Total: ", settings._iRecordsTotal);  // You can see the total records here
    // console.log("Records Filtered: ", settings._iRecordsDisplay);  // You can see the filtered records here
    // }
  });
  // pH DataTable
  let pHAllTable = $("#pHAllTable").DataTable({
    processing: true,
    serverSide: true,
    searchDelay: 500,
    dom: "lrtip",
    ajax: {
      url: "/all-data",
      type: "GET",
      data: function (d) {
        // console.log("Draw:", d.draw);
        // console.log("Start:", d.start);
        // console.log("Length:", d.length);
        // console.log("Search Value:", d.search.value);
        // Passing additional parameters to server
        // console.log("Sending data:", d);
        return $.extend({}, d, {
          draw: d.draw,
          start: d.start,
          length: d.length,
        });
      },
      dataSrc: function (json) {
        // console.log("Received data:", json.data);
        return json.data.map((item) => {
          item.predicted = "NaN"; // Default value since there's no predicted data yet
          // console.log(item);
          return item;
        });
      },
    },
    columns: [
      {
        data: "createdAt",
        title: "Time",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          var date = new Date(data);
          var localDate = new Date(date.getTime() + 8 * 3600000);
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
      },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
    // "drawCallback": function(settings) {
    // This callback gets called after every draw (data load)
    // console.log("Records Total: ", settings._iRecordsTotal);  // You can see the total records here
    // console.log("Records Filtered: ", settings._iRecordsDisplay);  // You can see the filtered records here
    // }
  });
  // conductivity DataTable
  let conductivityAllTable = $("#conductivityAllTable").DataTable({
    processing: true,
    serverSide: true,
    searchDelay: 500,
    dom: "lrtip",
    ajax: {
      url: "/all-data",
      type: "GET",
      data: function (d) {
        // console.log("Draw:", d.draw);
        // console.log("Start:", d.start);
        // console.log("Length:", d.length);
        // console.log("Search Value:", d.search.value);
        // Passing additional parameters to server
        // console.log("Sending data:", d);
        return $.extend({}, d, {
          draw: d.draw,
          start: d.start,
          length: d.length,
        });
      },
      dataSrc: function (json) {
        // console.log("Received data:", json.data);
        return json.data.map((item) => {
          item.predicted = "NaN"; // Default value since there's no predicted data yet
          // console.log(item);
          return item;
        });
      },
    },
    columns: [
      {
        data: "createdAt",
        title: "Time",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          var date = new Date(data);
          var localDate = new Date(date.getTime() + 8 * 3600000);
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
      },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
    // "drawCallback": function(settings) {
    // This callback gets called after every draw (data load)
    // console.log("Records Total: ", settings._iRecordsTotal);  // You can see the total records here
    // console.log("Records Filtered: ", settings._iRecordsDisplay);  // You can see the filtered records here
    // }
  });
  // oxygen DataTable
  let oxygenAllTable = $("#oxygenAllTable").DataTable({
    processing: true,
    serverSide: true,
    searchDelay: 500,
    dom: "lrtip",
    ajax: {
      url: "/all-data",
      type: "GET",
      data: function (d) {
        // console.log("Draw:", d.draw);
        // console.log("Start:", d.start);
        // console.log("Length:", d.length);
        // console.log("Search Value:", d.search.value);
        // Passing additional parameters to server
        // console.log("Sending data:", d);
        return $.extend({}, d, {
          draw: d.draw,
          start: d.start,
          length: d.length,
        });
      },
      dataSrc: function (json) {
        // console.log("Received data:", json.data);
        return json.data.map((item) => {
          item.predicted = "NaN"; // Default value since there's no predicted data yet
          // console.log(item);
          return item;
        });
      },
    },
    columns: [
      {
        data: "createdAt",
        title: "Time",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          var date = new Date(data);
          var localDate = new Date(date.getTime() + 8 * 3600000);
          return localDate
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace(/-/g, "/");
        },
      },
      // {
      //   "data": "oxygen",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
    // "drawCallback": function(settings) {
    // This callback gets called after every draw (data load)
    // console.log("Records Total: ", settings._iRecordsTotal);  // You can see the total records here
    // console.log("Records Filtered: ", settings._iRecordsDisplay);  // You can see the filtered records here
    // }
  });
  // ppm DataTable
  let ppmAllTable = $("#ppmAllTable").DataTable({
    processing: true,
    serverSide: true,
    searchDelay: 500,
    dom: "lrtip",
    ajax: {
      url: "/all-data",
      type: "GET",
      data: function (d) {
        // console.log("Draw:", d.draw);
        // console.log("Start:", d.start);
        // console.log("Length:", d.length);
        // console.log("Search Value:", d.search.value);
        // Passing additional parameters to server
        // console.log("Sending data:", d);
        return $.extend({}, d, {
          draw: d.draw,
          start: d.start,
          length: d.length,
        });
      },
      dataSrc: function (json) {
        // console.log("Received data:", json.data);
        return json.data.map((item) => {
          item.predicted = "NaN"; // Default value since there's no predicted data yet
          // console.log(item);
          return item;
        });
      },
    },
    columns: [
      {
        data: "createdAt",
        title: "Time",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          var date = new Date(data);
          var localDate = new Date(date.getTime() + 8 * 3600000);
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
      },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
      // {
      //   "data": "predicted",
      //   "className": "text-center align-middle"
      // },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
    // "drawCallback": function(settings) {
    // This callback gets called after every draw (data load)
    // console.log("Records Total: ", settings._iRecordsTotal);  // You can see the total records here
    // console.log("Records Filtered: ", settings._iRecordsDisplay);  // You can see the filtered records here
    // }
  });
  // pm25 DataTable
  let pm25AllTable = $("#pm25AllTable").DataTable({
    processing: true,
    serverSide: true,
    searchDelay: 500,
    dom: "lrtip",
    ajax: {
      url: "/all-data",
      type: "GET",
      data: function (d) {
        // console.log("Draw:", d.draw);
        // console.log("Start:", d.start);
        // console.log("Length:", d.length);
        // console.log("Search Value:", d.search.value);
        // Passing additional parameters to server
        // console.log("Sending data:", d);
        return $.extend({}, d, {
          draw: d.draw,
          start: d.start,
          length: d.length,
        });
      },
      dataSrc: function (json) {
        // console.log("Received data:", json.data);
        return json.data.map((item) => {
          item.predicted = "NaN"; // Default value since there's no predicted data yet
          // console.log(item);
          return item;
        });
      },
    },
    columns: [
      {
        data: "createdAt",
        title: "Time",
        className: "text-center align-middle",
        render: function (data, type, row) {
          if (!data) return "NaN";
          var date = new Date(data);
          var localDate = new Date(date.getTime() + 8 * 3600000);
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
      },
    ],
    order: [[0, "desc"]], // 0 is the index of the 'createdAt' column if it's the first column
    // "drawCallback": function(settings) {
    // This callback gets called after every draw (data load)
    // console.log("Records Total: ", settings._iRecordsTotal);  // You can see the total records here
    // console.log("Records Filtered: ", settings._iRecordsDisplay);  // You can see the filtered records here
    // }
  });

  // Debugging statement to check if the document is ready and DataTable is initialized
  // console.log("DataTable initialized and ready for data.");

  // Check if the DataTable instance exists and destroy it
  // if ($.fn.dataTable.isDataTable('#temperatureAllTable')) {
  //   temperatureAllTable.ajax.reload(null, false)
  // }
  // else {
  // }

  // Form submission handler
  $("#temperatureDateRangeForm").on("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Debugging statement to check form submission
    // console.log("Form submitted.");

    // Build the query URL and reload the DataTable
    var queryUrl = "/all-data?" + $(this).serialize();
    // console.log("Constructed query URL: ", queryUrl); // Debugging statement to inspect the URL

    // Debugging statement to inspect serialized form data
    // console.log("Serialized data: ", $(this).serialize());

    // Reload or filter the DataTable based on the date range
    temperatureAllTable.ajax.url("/all-data?" + $(this).serialize()).load();
  });
  // Form submission handler
  $("#pHDateRangeForm").on("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Debugging statement to check form submission
    // console.log("Form submitted.");

    // Build the query URL and reload the DataTable
    var queryUrl = "/all-data?" + $(this).serialize();
    // console.log("Constructed query URL: ", queryUrl); // Debugging statement to inspect the URL

    // Debugging statement to inspect serialized form data
    // console.log("Serialized data: ", $(this).serialize());

    // Reload or filter the DataTable based on the date range
    pHAllTable.ajax.url("/all-data?" + $(this).serialize()).load();
  });
  // Form submission handler
  $("#conductivityDateRangeForm").on("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Debugging statement to check form submission
    // console.log("Form submitted.");

    // Build the query URL and reload the DataTable
    var queryUrl = "/all-data?" + $(this).serialize();
    // console.log("Constructed query URL: ", queryUrl); // Debugging statement to inspect the URL

    // Debugging statement to inspect serialized form data
    // console.log("Serialized data: ", $(this).serialize());

    // Reload or filter the DataTable based on the date range
    conductivityAllTable.ajax.url("/all-data?" + $(this).serialize()).load();
  });
  // Form submission handler
  $("#oxygenDateRangeForm").on("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Debugging statement to check form submission
    // console.log("Form submitted.");

    // Build the query URL and reload the DataTable
    var queryUrl = "/all-data?" + $(this).serialize();
    // console.log("Constructed query URL: ", queryUrl); // Debugging statement to inspect the URL

    // Debugging statement to inspect serialized form data
    // console.log("Serialized data: ", $(this).serialize());

    // Reload or filter the DataTable based on the date range
    oxygenAllTable.ajax.url("/all-data?" + $(this).serialize()).load();
  });
  // Form submission handler
  $("#ppmDateRangeForm").on("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Debugging statement to check form submission
    // console.log("Form submitted.");

    // Build the query URL and reload the DataTable
    var queryUrl = "/all-data?" + $(this).serialize();
    // console.log("Constructed query URL: ", queryUrl); // Debugging statement to inspect the URL

    // Debugging statement to inspect serialized form data
    // console.log("Serialized data: ", $(this).serialize());

    // Reload or filter the DataTable based on the date range
    ppmAllTable.ajax.url("/all-data?" + $(this).serialize()).load();
  });
  // Form submission handler
  $("#waterLevelDateRangeForm").on("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Debugging statement to check form submission
    // console.log("Form submitted.");

    // Build the query URL and reload the DataTable
    var queryUrl = "/all-data?" + $(this).serialize();
    // console.log("Constructed query URL: ", queryUrl); // Debugging statement to inspect the URL

    // Debugging statement to inspect serialized form data
    // console.log("Serialized data: ", $(this).serialize());

    // Reload or filter the DataTable based on the date range
    waterLevelAllTable.ajax.url("/all-data?" + $(this).serialize()).load();
  });
  // Form submission handler
  $("#pm25DateRangeForm").on("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Debugging statement to check form submission
    // console.log("Form submitted.");

    // Build the query URL and reload the DataTable
    var queryUrl = "/all-data?" + $(this).serialize();
    // console.log("Constructed query URL: ", queryUrl); // Debugging statement to inspect the URL

    // Debugging statement to inspect serialized form data
    // console.log("Serialized data: ", $(this).serialize());

    // Reload or filter the DataTable based on the date range
    pm25AllTable.ajax.url("/all-data?" + $(this).serialize()).load();
  });
});
