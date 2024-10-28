import { RawData, WebSocket } from 'ws';
import { registration } from './handlers/registration';
import { createRoom } from './handlers/createRoom';
import { addToRoom } from './handlers/addToRoom';
import { addShips } from './handlers/addShips';
import { attack } from './handlers/attack';

export function controller(ws: WebSocket, data: RawData) {
  const stringReq = JSON.parse(data.toString());
  switch (stringReq.type) {
    case 'reg':
      registration(ws, data);
      break;
    case 'create_room':
      createRoom(ws);
      break;
    case 'add_user_to_room':
      addToRoom(ws, data);
      break;
      case 'add_ships':
        addShips(ws, data);
        break;
        case 'attack':
          attack(ws, data);
          break;

    default:
      console.log('unknown request type:', stringReq.type);
  }
}
