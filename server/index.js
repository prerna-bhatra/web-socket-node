const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8001 });

wss.on('listening', () => {
  console.log('WebSocket server is running and listening on port 8001');
});

wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);

    // Echo the message back to the client
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});
