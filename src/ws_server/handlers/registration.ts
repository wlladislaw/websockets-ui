import { RawData, WebSocket } from 'ws';
import { players } from '../../db';
import { broadcastUpdateRoom, broadcastUpdateWinners } from '..';

let playerIndex = 0;
export const registration = (ws: WebSocket, data: RawData) => {
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
    playerIndex++;
    const playerId = playerIndex;

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
