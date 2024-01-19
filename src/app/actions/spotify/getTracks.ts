'use server';

import { SERVER } from '@/common/server';
import { mainAxios } from '@/lib/axios/axios';

import type { TrackItem, Tracks } from '@/common/types';

type GetTracks = (playlistId: string, offset?: number) => Promise<TrackItem[]>;

export const getTracks: GetTracks = async (playlistId, offset) => {
  const { data } = await mainAxios.get<Tracks>(SERVER.GET_TRACKS, {
    params: {
      playlistId,
      offset,
    },
  });

  return data.items
    .map(({ track }) => track)
    .filter((track) => track.preview_url);
};
