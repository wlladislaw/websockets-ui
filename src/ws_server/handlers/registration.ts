import { RawData, WebSocket } from 'ws';
import { players } from '../../db';

export const registration = (ws: WebSocket, data: RawData) => {
  let id = 0;
  const { name, password } = JSON.parse(data.toString());

  if (players[name]) {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({ name, index: null, error: true, errorText: 'write another name' }),
        id: 0,
      }),
    );
  } else {
    players[name] = { password, wins: 0 };
    const playerId = id;
    id++;
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({ name, index: playerId, error: false, errorText: '' }),
        id: 0,
      }),
    );
  }
};
