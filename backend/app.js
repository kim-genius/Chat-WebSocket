const express = require("express");
const { WebSocketServer } = require("ws");

const app = express();
const wss = new WebSocketServer({ port: 8001 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      console.log(`receive message: ${data}`);
      client.send(`${data}`);
    });
  });

  ws.on("close", (code, reason) => console.log("Client has disconnected!", code, reason));

  ws.onerror = function () {
    console.log("websocket error");
  };
});

app.listen(8000, () => {
  console.log(`Example app listening on port 8000`);
});
