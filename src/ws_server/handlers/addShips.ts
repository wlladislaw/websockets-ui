import { RawData, WebSocket } from 'ws';

export const addShips = (ws: WebSocket, data: RawData) => {
  const { gameId, ships, indexPlayer } = JSON.parse(JSON.parse(data.toString()).data);
  console.log('indexPlayer: ', indexPlayer);
  console.log('ships: ', ships);
  console.log('gameId: ', gameId);
  
};
