import { WebSocketServer } from 'ws';
import { controller } from './controller';

const ws = new WebSocketServer({ port: 3000 });

ws.on('connection', (ws) => {
  console.log('client connected');
  ws.on('message', (data) => {
    console.log(`from client: ${data}`);
    controller(ws, data);
  });
  ws.on('close', () => {
    console.log('the client has connected');
  });

  ws.onerror = function () {
    console.log('error occurred');
  };
});
console.log('WebSocket serveur coucou on port 3000');
