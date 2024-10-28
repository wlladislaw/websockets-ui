import { RawData, WebSocket } from 'ws';
import { attack } from './attack';
import { games } from '../../db';

export const randomAttack = (ws: WebSocket, data: RawData) => {
  const { gameId, indexPlayer } = JSON.parse(JSON.parse(data.toString()).data);

  const game = games[gameId];

  if (!game || game.currentPlayerTurn !== indexPlayer) {
    ws.send(JSON.stringify({ type: 'error', data: { errorText: 'enemy turn' }, id: 0 }));
    return;
  }

  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  attack(ws, JSON.stringify({ data: JSON.stringify({ gameId, x: x, y: y, indexPlayer: indexPlayer }) }));
};
