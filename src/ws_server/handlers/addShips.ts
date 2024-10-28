import { RawData, WebSocket } from 'ws';
import { games } from '../../db';
import { setShipCells } from '../tools/setShipCells';
import { turn } from '../tools/turn';
import { Game, Ship } from '../../types';

export const addShips = (ws: WebSocket, data: RawData) => {
  const { gameId, ships, indexPlayer } = JSON.parse(JSON.parse(data.toString()).data);

  const game = games[gameId];
  if (!game) return;

  game.board[indexPlayer] = ships.map((ship: Ship) => {
    ship.cells = setShipCells(ship);
    return ship;
  });

  if (Object.keys(game.board).length === 2) {
    startGame(game);
  }
};
function startGame(game: Game) {
  game.players.forEach((player) => {
    player.ws.send(
      JSON.stringify({
        type: 'start_game',

        data: JSON.stringify({ ships: game.board[player.index], currentPlayerIndex: game.currentPlayerTurn }),
        id: 0,
      }),
    );
  });
  turn(game, game.currentPlayerTurn);
}
