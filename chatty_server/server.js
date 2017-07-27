// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function broadcast(data){
  for (let client of wss.clients){
    console.log('Broadcasting');
    console.log(JSON.stringify(data));
    client.send(JSON.stringify(data));
  }
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

function generateClientSize(){
  return {
    clients: wss.clients.size,
    type: 'clientCount'
  }

}

wss.on('connection', (client) => {
  broadcast(generateClientSize());



  console.log('Client connected');
  client.on('message', function incoming(data) {
    const message = JSON.parse(data);
    switch(message.type) {
      case 'postNotification':
        message.type = 'incomingNotification';
        broadcast(message);
        break;
      case 'postMessage':
        message.type = 'incomingMessage';
        message.id = uuidv1();
        broadcast(message);
        break;
      default:
        throw new Error("Unknown event type " + message.type);
    }
  });

  client.on('close', () => {
    console.log('Client disconnected');
    broadcast(generateClientSize());
  });





});





