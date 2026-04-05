const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Gateway connected to broker');

    client.subscribe('devices/+/data', (err) => {
        if (!err) {
            console.log('Subscribed to all device data');
        }
    });
});

client.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());

        console.log('--- Incoming Data ---');
        console.log('Topic:', topic);
        console.log('Device:', data.deviceId);
        console.log('Temp:', data.temperature);
        console.log('Humidity:', data.humidity);
        console.log('Time:', data.timestamp);
        console.log('----------------------\n');

    } catch (err) {
        console.log('Error parsing message:', err.message);
    }
});