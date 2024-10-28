import { WebSocket } from 'ws';
import { rooms } from '../../db';
import { broadcastUpdateRoom, findPlayerByWebSocket } from '../index';

export const createRoom = (ws: WebSocket) => {
  let roomId = 1;

  const player = findPlayerByWebSocket(ws);

  if (!player) return;

  const newRoom = { roomId: roomId++, players: [player] };

  rooms[newRoom.roomId] = newRoom;
  broadcastUpdateRoom();
};
