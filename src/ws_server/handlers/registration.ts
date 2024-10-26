import { RawData, WebSocket } from 'ws';
import { players } from '../../db';
import { broadcastUpdateRoom, broadcastUpdateWinners } from '..';

export const registration = (ws: WebSocket, data: RawData) => {
  let playerIndex = 0;
  const { name, password } = JSON.parse(JSON.parse(data.toString()).data);

  if (players[name]) {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({ name, index: null, error: true, errorText: 'write another name' }),
        id: 0,
      }),
    );
  } else {
    const playerId = playerIndex++;

    const newPlayer = { name: name, password: password, wins: 0, index: playerId, ws };
    players[newPlayer.index] = newPlayer;
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({ name, index: playerId, error: false, errorText: '' }),
        id: 0,
      }),
    );

    broadcastUpdateRoom();
    broadcastUpdateWinners();
  }
};
