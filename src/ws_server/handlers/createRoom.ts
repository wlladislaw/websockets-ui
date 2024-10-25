import { RawData, WebSocket } from 'ws';
import { rooms } from '../../db';
import { broadcast } from '../index';

export const createRoom = (ws: WebSocket, data: RawData) => {
  let roomId = 0;
  rooms[roomId] = { players: [ws], id: roomId };
  broadcast({
    type: 'update_room',
    data: JSON.stringify({
      roomId: 1,
      roomUsers: [
        {
          name: 'user',
          index: 1,
        },
      ],
      id: 0,
    }),
  });
  roomId++;
  console.log('rooms: ', rooms);
};
