const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);

const WS = new WebSocket.Server({ server });

WS.on('connection', function connection(conn) {
    console.log('connected');

    conn.send(JSON.stringify({ event_type: 'connection' }));
});

console.table({
    server: 'online',
    port: PORT
});
