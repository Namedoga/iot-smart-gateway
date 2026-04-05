const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Device connected to broker');

    setInterval(() => {
        const message = `Hello from device1 at ${new Date().toLocaleTimeString()}`;
        client.publish('test/topic', message);
        console.log('Message sent:', message);
    }, 3000);
});

client.on('error', (err) => {
    console.log('MQTT error:', err.message);
});