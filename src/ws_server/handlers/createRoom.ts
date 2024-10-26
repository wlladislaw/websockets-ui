import {  WebSocket } from 'ws';
import { rooms } from '../../db';
import { broadcastUpdateRoom, findPlayerByWebSocket } from '../index';

export const createRoom = (ws: WebSocket) => {
  let roomIdCounter = 1;



  const player = findPlayerByWebSocket(ws);
  console.log('player:By WS ', player);
  if (!player) return;

  const newRoom = { roomId: roomIdCounter++, players: [player] };
  console.log('newRoom: ', newRoom);
  rooms[newRoom.roomId] = newRoom;
  broadcastUpdateRoom();
};
