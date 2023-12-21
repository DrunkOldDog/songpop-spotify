import type { GameStatus } from ".";

export type CreateGame = {
  playlistId: string;
  createdBy: string;
  gameStatus: GameStatus;
};
