import { RawData, WebSocket } from 'ws';
import { rooms } from '../../db';
import { broadcastUpdateRoom, findPlayerByWebSocket } from '..';
import { startGame } from './startGame';

export const addToRoom = (ws: WebSocket, data: RawData) => {
  const { indexRoom } = JSON.parse(JSON.parse(data.toString()).data);

  const room = rooms[indexRoom];
  const player = findPlayerByWebSocket(ws);
  
  if (!room || !player) return;

  room.players.push(player);
  if (room.players.length === 2) {
    startGame(room);
  }
  broadcastUpdateRoom();
};
