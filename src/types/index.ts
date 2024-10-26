type Player = {
  name: string;
  password: string;
  wins: number;
};

export type Players = {
  [key: string]: Player;
};

export type Room = {
  roomId: number;
  players: Players[];
};

export type Game = {
  gameId: Room;
};

export type Games = {
  [key: number]: Game;
};
