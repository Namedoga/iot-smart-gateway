const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Device1 connected');

    setInterval(() => {
        const data = {
            deviceId: 'device1',
            temperature: Math.floor(Math.random() * 30) + 10, 
            humidity: Math.floor(Math.random() * 50) + 30,   
            timestamp: new Date().toISOString()
        };

        client.publish('devices/device1/data', JSON.stringify(data));
        console.log('Device1 sent:', data);
    }, 3000);
});