const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express application
const app = express();

// Create an HTTP server and integrate with Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files from the public directory
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming chat messages
  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 8002;
server.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start the server:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
