import { games } from '../../db';
import { Room } from '../../types';

export function createGame(room: Room) {
  let gameIdCounter = 0;
  const gameId = gameIdCounter++;

  games[gameId] = {
    gameId,
    roomId: room.roomId,
    players: room.players,
    board: {},
    currentPlayerTurn: room.players[0].index,
  };

  room.players.forEach((player) => {
    player.ws.send(
      JSON.stringify({
        type: 'create_game',
        data: JSON.stringify({ idGame: gameId, idPlayer: player.index }),
        id: 0,
      }),
    );
  });
}
