const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);

const WS = new WebSocket.Server({ server });

WS.on('connection', function connection(conn) {
    console.log('connected');

    app.ws = { conn }; // save context to app object

    conn.send(JSON.stringify({
      data: {
        event_type: 'connection'
      }
    }));
});

app.post('/listen', (req, res) => {
  console.log(req.body); // see incoming events
  if (app.ws) {
    app.ws.conn.send(JSON.stringify(req.body));
  }
  res.json({}); // send sth back to Wise
});

console.table({
    server: 'online',
    port: PORT
});
