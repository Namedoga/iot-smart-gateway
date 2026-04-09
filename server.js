const express = require('express');
const mqtt = require('mqtt');
const path = require('path');

const app = express();
const PORT = 3000;

const devices = {};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/devices', (req, res) => {
    res.json(devices);
});

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Gateway connected to MQTT broker');

    client.subscribe('devices/+/data', (err) => {
        if (!err) {
            console.log('Subscribed to all device data');
        } else {
            console.log('Subscribe error:', err.message);
        }
    });
});

client.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());

        devices[data.deviceId] = {
            deviceId: data.deviceId,
            temperature: data.temperature,
            humidity: data.humidity,
            timestamp: data.timestamp,
            status: 'active'
        };

        console.log('Updated device:', devices[data.deviceId]);
    } catch (err) {
        console.log('Error parsing message:', err.message);
    }
});

client.on('error', (err) => {
    console.log('MQTT error:', err.message);
});

app.listen(PORT, () => {
    console.log(`Web server running at http://localhost:${PORT}`);
});