const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);


const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Function to generate random vitals data
function generateRandomVitals() {
    const heartRate = Math.floor(Math.random() * (120 - 60 + 1)) + 60; // Random heart rate between 60 and 120 bpm
    const systolic = Math.floor(Math.random() * (140 - 100 + 1)) + 100; // Random systolic pressure between 100 and 140 mmHg
    const diastolic = Math.floor(Math.random() * (90 - 60 + 1)) + 60; // Random diastolic pressure between 60 and 90 mmHg
    const temperature = parseFloat((Math.random() * (37.5 - 36 + 1) + 36).toFixed(1)); // Random temperature between 36.0 and 37.5 degrees Celsius

    return {
        "Temperature": `${temperature} °F`,
        "Pulse": `${heartRate} bpm`,
        "Respiratory": `${Math.floor(Math.random() * (20 - 10 + 1)) + 10} breaths/min`, // Random respiratory rate between 10 and 20 breaths/min
        "Blood Pressure": `${systolic}/${diastolic} mmHg`,
        "Oxygen": `${Math.floor(Math.random() * (100 - 90 + 1)) + 90} %`, // Random oxygen saturation between 90% and 100%
        "Pain Level": `${Math.floor(Math.random() * (10 - 0 + 1))}/10`, // Random pain level between 0 and 10
        "Glucose": `${Math.floor(Math.random() * (200 - 80 + 1)) + 80} mg/dL`, // Random blood glucose between 80 and 200 mg/dL
        "ECG/EKG": `Normal`,
        "Capnography": `${Math.floor(Math.random() * (45 - 35 + 1)) + 35} mmHg`, // Random capnography value between 35 and 45 mmHg
        "Intracranial Pressure": `${Math.floor(Math.random() * (20 - 5 + 1)) + 5} mmHg` // Random intracranial pressure between 5 and 20 mmHg
    };
}

// Emit random vitals data every second
setInterval(() => {
    const randomVitals = generateRandomVitals();
    io.emit('vitals', randomVitals);
}, 200); // Interval set to 1000 milliseconds (1 second)

// Handle incoming socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = 8001;
server.listen(PORT, () => {
    console.log(`Socket.io server running on port ${PORT}`);
});
