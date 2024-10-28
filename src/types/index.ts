import { WebSocket } from 'ws';

type Player = {
  name: string;
  password: string;
  wins: number;
  ws: WebSocket;
  index: number ;
};

export type Players = {
  [key: string]: Player;
};

export type Room = {
  roomId: number;
  players: Player[];
};

export type Rooms = {
  [key: number]: Room;
};

export type Ship = {
  position: { x: number; y: number };
  length: number;
  direction: boolean;
  killed?: boolean;
  cells: { x: number; y: number }[];
};

export type Game = {
  gameId: number;
  roomId: number;
  players: Player[];
  board: { [key: number]: Ship[] };
  currentPlayerTurn: number;
};

export type Games = {
  [key: number]: Game;
};
