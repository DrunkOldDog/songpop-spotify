'use server';

import { SERVER } from "@/common/server";
import { mainAxios } from "@/lib/axios/axios";

import type { Playlist } from "@/common/types";

export const getTracks = async (playlistId: string) => {
  const { data } = await mainAxios.get<Playlist>(SERVER.GET_TRACKS, {
    params: { playlistId },
  });

  return data;
};
