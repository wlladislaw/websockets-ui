import { RawData, WebSocket } from 'ws';
import { games, players } from '../../db';
import { broadcastUpdateWinners } from '..';
import { turn } from '../tools/turn';
import { Game, Ship } from '../../types';

export const attack = (ws: WebSocket, data: RawData) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(JSON.parse(data.toString()).data);
  const game = games[gameId];

  if (!game || game.currentPlayerTurn !== indexPlayer) {
    ws.send(JSON.stringify({ type: 'error', data: { errorText: 'enemy turn' }, id: 0 }));
    return;
  }
  const enemyIndex = game.players.find((p) => p.index !== indexPlayer)?.index;

  const shipShot = checkShot(game.board[enemyIndex!], x, y);

  const resOfAttack = shipShot ? (shipShot.killed ? 'killed' : 'shot') : 'miss';

  game.players.forEach((player) => {
    player.ws.send(
      JSON.stringify({
        type: 'attack',
        data: JSON.stringify({ position: { x, y }, currentPlayer: indexPlayer, status: resOfAttack }),
        id: 0,
      }),
    );
  });

  if (resOfAttack === 'killed' && checkAllKilled(game.board[enemyIndex!])) {
    finishGame(game, indexPlayer);
    return;
  }

  if (resOfAttack === 'miss') {
    game.currentPlayerTurn = enemyIndex!;
    turn(game, enemyIndex!);
  } else {
    turn(game, indexPlayer);
  }
};

function finishGame(game: Game, winnerId: number) {
  game.players.forEach((player) => {
    player.ws.send(
      JSON.stringify({
        type: 'finish',
        data: JSON.stringify({ winPlayer: winnerId }),
        id: 0,
      }),
    );
  });
  players[winnerId].wins++;
  broadcastUpdateWinners();
}

function checkShot(ships: Ship[], x: number, y: number) {
  for (const ship of ships) {
    const shipCells = ship.cells;
    const exist = shipCells.some((cell) => cell.x === x && cell.y === y);

    if (exist) {
      ship.length--;

      if (ship.length === 0) ship.killed = true;
      return ship;
    }
  }
  return null;
}

function checkAllKilled(ships: Ship[]) {
  return ships.every((ship) => ship.killed);
}
