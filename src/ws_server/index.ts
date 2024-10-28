import { WebSocket, WebSocketServer } from 'ws';
import { controller } from './controller';
import { players, rooms } from '../db';

const ws = new WebSocketServer({ port: 3000 });

ws.on('connection', (ws) => {
  console.log('client connected');
  ws.on('message', (data) => {
    console.log(`from client: ${data}`);
    controller(ws, data);
  });
  ws.on('close', () => {
    console.log('client has disconnected');
  });

  ws.onerror = function () {
    console.log('error occurred');
  };
});

export function broadcastUpdateRoom() {
  const roomData = Object.values(rooms).map((room) => ({
    roomId: room.roomId,
    roomUsers: room.players.map((player) => JSON.stringify({ name: player.name, index: player.index })),
  }));
  ws.clients.forEach((client) => {
    client.send(JSON.stringify({ type: 'update_room', data: JSON.stringify(roomData), id: 0 }));
  });
}

export function broadcastUpdateWinners() {
  const winners = Object.values(players).map((player) => ({ name: player.name, wins: player.wins }));
  ws.clients.forEach((client) => {
    client.send(JSON.stringify({ type: 'update_winners', data: JSON.stringify(winners), id: 0 }));
  });
}

export function findPlayerByWebSocket(ws: WebSocket) {
  return Object.values(players).find((player) => player.ws === ws);
}

console.log('Ws serveur coucou on port 3000');
