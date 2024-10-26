import { WebSocket } from "ws";

type Player = {
  name: string;
  password: string;
  wins: number;
  ws:WebSocket;
  index:number;
};

export type Players = {
  [key: string]: Player;
};

export type Room = {
  roomId: number;
  players: Player[];
};

export type Rooms = {
  [key:number]: Room
}

export type Game = {
  gameId: number;
  
};

export type Games = {
  [key: number]: Game;
};
