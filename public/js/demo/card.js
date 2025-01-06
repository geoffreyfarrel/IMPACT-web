// Realtime Data Update
function fetchData() {
    fetch('card-data')
        .then(res => res.json())
        .then(data => {
            const sensor = data.latestSensor;
            document.getElementById('temperature').innerHTML = sensor.temperature;
            document.getElementById('pH').innerHTML = sensor.pH;
            document.getElementById('conductivity').innerHTML = sensor.conductivity;
            document.getElementById('oxygen').innerHTML = sensor.oxygen;
            document.getElementById('ppm').innerHTML = sensor.ppm;
            // document.getElementById('waterLevel').innerHTML = sensor.waterLevel;
            document.getElementById('pm25').innerHTML = sensor.pm25;
            const utcDate = new Date(sensor.createdAt);
            let localDate = new Date(utcDate.getTime() + 8 * 3600000);
            document.getElementById('createdAt').innerHTML = localDate.toISOString().slice(0,16).replace('T',' ').replace(/-/g, '/');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Fetch data initially and then every 10 minutes (600000 milliseconds)
fetchData();
setInterval(fetchData, 1000);