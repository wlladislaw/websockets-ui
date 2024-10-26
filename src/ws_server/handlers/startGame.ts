import { games } from '../../db';
import { Room } from '../../types';

export function startGame(room: Room) {
  console.log('room: ', room);
  let gameIdCounter = 1;
  const gameId = gameIdCounter++;
  games[gameId] = { roomId: room.roomId, players: room.players };

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
