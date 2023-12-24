import { SERVER } from "@/common/server";
import { mainAxios } from "@/lib/axios/axios";

import type { Playlist } from "@/common/types";

export const getPlaylist = async (playlistId: string) => {
  const { data } = await mainAxios.get<Playlist>(SERVER.GET_PLAYLIST, {
    params: { playlistId },
  });

  return data;
};
