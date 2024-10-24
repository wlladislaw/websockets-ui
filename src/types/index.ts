type Player = {
  password: string;
  wins: number;
};

export type Players = {
  [key: string]: Player;
};
