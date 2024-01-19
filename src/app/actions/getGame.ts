'use server';

import { isEmpty } from 'lodash';

import { client } from '@/lib/redis/db';

import type { Game } from '@/common/types';

type GetGameFunc = (gameId: string) => Promise<Game>;

export const getGame: GetGameFunc = async (gameId) => {
  const game = await client.json.get(`games:${gameId}`);
  if (isEmpty(game)) {
    throw new Error(`This game doesn't exist in our records.`);
  }

  return game as Game;
};
