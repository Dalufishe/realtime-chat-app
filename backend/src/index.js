const express = require("express");
const SocketServer = require("ws").Server;
const cors = require("cors");

const PORT = 8000;

const app = express();
const server = app.listen(PORT, () => {
  console.log(`[Server] Listening on http://localhost:${PORT}`);
});

app.use(cors());

const wss = new SocketServer({ server: server });
//connection
wss.on("connection", (ws, req) => {
  ws.on("message", (msg) => {
    let id = req.headers["sec-websocket-key"];
    let clients = wss.clients;
    clients.forEach((client) => {
      client.send(JSON.stringify({ msg: msg.toString(), id }));
    });
  });
});
//close
wss.on("close", () => {});
