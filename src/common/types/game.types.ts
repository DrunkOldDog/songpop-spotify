import type { GameStatus, Playlist, TrackItem } from '.';

export type GameTrack = TrackItem & {
  isCurrent: boolean;
};

type PlayerScore = {
  nickname: string;
  score: number;
};

export type Game = {
  createdBy: string;
  gameStatus: GameStatus;
  playlist: Playlist;
  tracks: GameTrack[][];
  playersScore: PlayerScore[];
};
