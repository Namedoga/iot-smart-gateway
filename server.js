const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Connected to MQTT broker');

    client.subscribe('test/topic', (err) => {
        if (!err) {
            console.log('Subscribed to test/topic');
        } else {
            console.log('Subscribe error:', err.message);
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Received message: ${message.toString()}`);
});

client.on('error', (err) => {
    console.log('MQTT error:', err.message);
});