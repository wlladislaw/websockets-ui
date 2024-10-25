import { RawData, WebSocket } from 'ws';


export const addToRoom = (ws: WebSocket, data: RawData) => {
  const { indexRoom } = JSON.parse(data.toString());
  console.log('indexRoom: ', indexRoom);

  ws.send(
    JSON.stringify({
      type: 'create_game',
      data: JSON.stringify({
        idGame: 1,
        idPlayer: 1,
      }),
      id: 0,
    }),
  );
};
