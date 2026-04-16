const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Device3 connected');

    setInterval(() => {
        const data = {
            deviceId: 'device3',
            temperature: Math.floor(Math.random() * 140) - 30, // -30 to 109
            humidity: Math.floor(Math.random() * 130) - 10,    // -10 to 119
            timestamp: new Date().toISOString()
        };

        client.publish('devices/device3/data', JSON.stringify(data));
        console.log('Device3 sent:', data);
    }, 2000);
});

client.on('error', (err) => {
    console.log('MQTT error:', err.message);
});