import { RawData, WebSocket } from "ws";

export const createRoom = (ws:WebSocket, data:RawData) => {
  const { name, password } = JSON.parse(data.toString());

}