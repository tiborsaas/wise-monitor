const express = require('express');
const WebSocket = require('ws');

const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);

const WS = new WebSocket.Server({ server });

WS.on('connection', function connection(conn) {
    console.log('connected');
    const message = JSON.stringify({
      data: 'OK'
    });
    conn.send(message);
});

console.table({
    server: 'online',
    port: PORT
});
