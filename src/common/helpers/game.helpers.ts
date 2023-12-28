import { TRACK_PREVIEW_DURATION, GAME_ROUNDS } from "../constants";

export const getPlaylistIdFromInput = (textInput: string) => {
  const regex = /playlist\/(\w+)/;
  const regexResult = regex.exec(textInput)?.[1];
  return regexResult ?? "";
};

/**
 * Based off Songpop© scoring.
 * Ref: https://www.quora.com/How-does-scoring-work-in-Song-Pop
 * @param time time taken to select an option
 * @param streak current active correct answers streak
 * @returns score value
 */
export const getSongScore = (time: number, streak: number) => {
  const baseScore = (TRACK_PREVIEW_DURATION - time) * 100;
  const multiplier = Math.pow(
    TRACK_PREVIEW_DURATION - time,
    (streak - 1) / GAME_ROUNDS
  );

  const result = baseScore * multiplier;
  return !Number.isNaN(result) ? result : 0;
};
