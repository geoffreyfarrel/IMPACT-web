$(document).ready(function () {
  $(
    "#temperatureStartDatePicker, #temperatureEndDatePicker, #pHStartDatePicker, #pHEndDatePicker, #conductivityStartDatePicker, #conductivityEndDatePicker, #oxygenStartDatePicker, #oxygenEndDatePicker, #ppmStartDatePicker, #ppmEndDatePicker, #waterLevelStartDatePicker, #waterLevelEndDatePicker, #pm25StartDatePicker, #pm25EndDatePicker, #chartStartDatePicker, #chartEndDatePicker"
  ).datepicker({
    dateFormat: "yy-mm-dd",
  });
});
