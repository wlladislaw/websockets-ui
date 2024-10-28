import { Game } from "../../types";

export const turn = (game:Game, currentPlayerIndex: number | string) => {
  game.players.forEach((player) => {
    player.ws.send(
      JSON.stringify({
        type: 'turn',
        data: JSON.stringify({ currentPlayer: currentPlayerIndex }),
        id: 0,
      }),
    );
  });
};
