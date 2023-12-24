"use server";

import { v4 as uuidv4 } from "uuid";
import { client } from "@/lib/redis/db";
import { Game, GameStatus } from "@/common/types";
import { redirect } from "next/navigation";
import { HOST } from "@/common/routes";

type CreateGameFunc = (data: {
  playlistId: string;
  userId: string;
}) => Promise<void>;

export const createGame: CreateGameFunc = async ({ playlistId, userId }) => {
  const data: Game = {
    playlistId,
    createdBy: userId,
    gameStatus: GameStatus.Not_Started,
  };

  const gameId = uuidv4();
  await client.hSet(`games:${gameId}`, data);
  await client.expire(`games:${gameId}`, 60 * 30);

  redirect(`${HOST}/${gameId}`);
};
