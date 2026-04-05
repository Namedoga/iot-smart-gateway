const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Device3 connected');

    setInterval(() => {
        const data = {
            deviceId: 'device3',
            temperature: Math.floor(Math.random() * 100), 
            humidity: Math.floor(Math.random() * 120),
            timestamp: new Date().toISOString()
        };

        client.publish('devices/device3/data', JSON.stringify(data));
        console.log('Device3 sent:', data);
    }, 2000);
});