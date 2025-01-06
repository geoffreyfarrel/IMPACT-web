// TDS Reset
const resetTdsButton = document.getElementById('resetTds');
if (resetTdsButton) {
    resetTdsButton.addEventListener('click', function() {
        // Confirm Reset
        confirm("Reset TDS?");

        // Send an HTTP request to the web backend
        fetch('/reset-tds', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("TDS Has Been Reset Successfully!");
            } else {
                alert("Failed to reset TDS: " + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while sending the payload.");
        });
    });
}

// Water Level Reset
const resetWaterLevelButton = document.getElementById('resetWaterLevel');
if (resetWaterLevelButton) {
    resetWaterLevelButton.addEventListener('click', function() {
        // Confirm Reset
        confirm("Reset Water Level?");

        // Send an HTTP request to the web backend
        fetch('/reset-waterlevel', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Water Level Has Been Reset Successfully!");
            } else {
                alert("Failed to reset Water Level: " + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while sending the payload.");
        });
    });
}

// PM2.5 Reset
const resetPM25Button = document.getElementById('resetPM25');
if (resetPM25Button) {
    resetPM25Button.addEventListener('click', function() {
        // Confirm Reset
        confirm("Reset PM2.5?");

        // Send an HTTP request to the web backend
        fetch('/reset-pm25', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("PM2.5 Has Been Reset Successfully!");
            } else {
                alert("Failed to reset PM2.5: " + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while sending the payload.");
        });
    });
}
