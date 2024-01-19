'use server';

import { SERVER } from '@/common/server';
import { mainAxios } from '@/lib/axios/axios';

import type { Playlist } from '@/common/types';
import type { AxiosError } from 'axios';

export const getPlaylist = async (playlistId: string) => {
  try {
    const { data } = await mainAxios.get<Playlist>(SERVER.GET_PLAYLIST, {
      params: { playlistId },
    });

    return data;
  } catch (err) {
    const error = err as AxiosError;
    throw Error(error.response?.statusText);
  }
};
