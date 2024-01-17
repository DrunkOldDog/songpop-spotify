import { getPlaylistIdFromInput } from "@/common/helpers";
import { z } from "zod";

export const createGameSchema = z.object({
  playlistUrl: z.string().refine((url) => {
    const playlistId = getPlaylistIdFromInput(url);
    return playlistId.length > 0;
  }, "You must introduce a valid shared playlist url"),
});
