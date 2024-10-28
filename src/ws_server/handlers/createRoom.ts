import { WebSocket } from 'ws';
import { rooms } from '../../db';
import { broadcastUpdateRoom, findPlayerByWebSocket } from '../index';
import { addToRoom } from './addToRoom';

export const createRoom = (ws: WebSocket) => {
  let roomId = 1;

  const player = findPlayerByWebSocket(ws);

  if (!player) return;

  const newRoom = { roomId: roomId, players: [player] };

  rooms[newRoom.roomId] = newRoom;
  addToRoom(ws, JSON.stringify({ data: JSON.stringify({ indexRoom: roomId }) }));
  broadcastUpdateRoom();
  roomId++;
};
