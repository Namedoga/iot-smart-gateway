const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Device2 connected');

    setInterval(() => {
        const data = {
            deviceId: 'device2',
            temperature: Math.floor(Math.random() * 30) + 5,
            humidity: Math.floor(Math.random() * 60) + 20,
            timestamp: new Date().toISOString()
        };

        client.publish('devices/device2/data', JSON.stringify(data));
        console.log('Device2 sent:', data);
    }, 4000);
});