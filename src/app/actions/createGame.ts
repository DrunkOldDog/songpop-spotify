"use server";

import { v4 as uuidv4 } from "uuid";
import { client } from "@/lib/redis/db";
import {
  type Game,
  GameStatus,
  type TrackItem,
  GameTrack,
} from "@/common/types";
import { redirect } from "next/navigation";
import { HOST } from "@/common/routes";
import { getPlaylist } from "./spotify";
import { getTracks } from "./spotify/getTracks";
import { getRandomNumFromInterval } from "@/common/helpers";
import { TRACKS_DEFAULT_LIMIT } from "@/common/constants";

type CreateGameFunc = (data: {
  playlistId: string;
  userId: string;
}) => Promise<any>;

const getGameTracks = async (playlistId: string, totalSongs: number) => {
  const songsLimit = Number(process.env.SONGS_LIMIT ?? TRACKS_DEFAULT_LIMIT);
  if (totalSongs < songsLimit) {
    // get songs from 0 - totalSongs
    return await getTracks(playlistId);
  }

  const lowerLimit = 0;
  const upperLimit = totalSongs - songsLimit;
  const offset = getRandomNumFromInterval(lowerLimit, upperLimit);
  return await getTracks(playlistId, offset);
};

const getRandomSong = (
  tracks: TrackItem[],
  trackIndexSet: Set<number>
): number => {
  const randomSongInd = getRandomNumFromInterval(0, tracks.length - 1);
  if (trackIndexSet.has(randomSongInd)) {
    return getRandomSong(tracks, trackIndexSet);
  }

  return randomSongInd;
};

const shuffleTracks = (
  tracks: TrackItem[],
  trackIndexSet: Set<number>
): { answerPos: number; gameTracks: GameTrack[] } => {
  const localTrackIndexSet = new Set<number>(trackIndexSet); // current round option index set
  const nOptions = 4; // 4 options available per round
  const gameTracks: GameTrack[] = []; // current round options

  let answerTrackPos = 0; // keep track of the answer index to not repeat it on next rounds
  const answerPos = getRandomNumFromInterval(0, 3); // get the correct answer position
  for (let i = 0; i < nOptions; i++) {
    const trackInd = getRandomSong(tracks, localTrackIndexSet);
    localTrackIndexSet.add(trackInd);
    gameTracks.push({ ...tracks[trackInd], isCurrent: i === answerPos });

    if (i === answerPos) {
      answerTrackPos = trackInd;
    }
  }

  return { answerPos: answerTrackPos, gameTracks };
};

const getRandomGameTracks = (tracks: TrackItem[]) => {
  const nRounds = 10; // 10 rounds to play
  const trackIndexSet = new Set<number>(); // set to keep track of used songs
  const shuffledTracks: Array<GameTrack[]> = [];

  for (let i = 0; i < nRounds; i++) {
    const { answerPos, gameTracks } = shuffleTracks(tracks, trackIndexSet);
    shuffledTracks[i] = gameTracks;
    trackIndexSet.add(answerPos);
  }

  return shuffledTracks;
};

export const createGame: CreateGameFunc = async ({ playlistId, userId }) => {
  const playlist = await getPlaylist(playlistId);
  const tracks = await getGameTracks(playlistId, playlist.tracks.total);

  const game: Game = {
    playlist,
    createdBy: userId,
    gameStatus: GameStatus.Not_Started,
    tracks: getRandomGameTracks(tracks),
    playersScore: [],
  };

  const gameId = uuidv4();
  await client.json.set(`games:${gameId}`, "$", game);
  await client.expire(`games:${gameId}`, 60 * 30);

  redirect(`${HOST}/${gameId}`);
};
