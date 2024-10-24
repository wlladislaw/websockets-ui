import { RawData, WebSocket } from 'ws';
import { registration } from './handlers/registration';

export function controller(ws: WebSocket, data: RawData) {
  const stringReq = JSON.parse(data.toString());
  switch (stringReq.type) {
    case 'reg':
      registration(ws, data);
      break;
    // case 'create_room':
    //   createRoom(ws, request);
    //   break;

    default:
      console.log('unknown request type:', stringReq.type);
  }
}
