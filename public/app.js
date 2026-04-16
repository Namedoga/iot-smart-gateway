async function loadDevices() {
    try {
        const response = await fetch('/api/devices');
        const devices = await response.json();

        const container = document.getElementById('device-container');
        container.innerHTML = '';

        const deviceList = Object.values(devices);

        if (deviceList.length === 0) {
            container.innerHTML = '<p>No device data available yet.</p>';
            return;
        }

        deviceList.forEach(device => {
            const card = document.createElement('div');
            card.className = 'device-card';

            card.innerHTML = `
                <h2>${device.deviceId}</h2>
                <p><strong>Temperature:</strong> ${device.temperature} °C</p>
                <p><strong>Humidity:</strong> ${device.humidity} %</p>
                <p><strong>Last Updated:</strong> ${new Date(device.timestamp).toLocaleString()}</p>
                <p class="status ${device.status}">Status: ${device.status}</p>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading devices:', error);
    }
}

loadDevices();
setInterval(loadDevices, 3000);