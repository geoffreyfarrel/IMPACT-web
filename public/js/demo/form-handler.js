$(document).ready(function() {
    $('#dateRangeForm').on('submit', function(e) {
        e.preventDefault();  // Stop the form from causing a page refresh.
        var formData = $(this).serialize();  // Serialize the form data.

        // Trigger the DataTable to filter data based on the form input
        $(document).trigger('refreshData', [formData]);
    });
});