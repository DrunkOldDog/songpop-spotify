import type { GameStatus } from ".";

export type Game = {
  playlistId: string;
  createdBy: string;
  gameStatus: GameStatus;
};
