"use server";

import { client } from "@/lib/redis/db";
import type { Game } from "@/common/types";
import { isEmpty } from "lodash";

type GetGameFunc = (gameId: string) => Promise<Game>;

export const getGame: GetGameFunc = async (gameId) => {
  const game = (await client.hGetAll(`games:${gameId}`)) as Game;
  if (isEmpty(game)) {
    throw new Error(`This game doesn't exist in our records.`);
  }

  return game;
};
