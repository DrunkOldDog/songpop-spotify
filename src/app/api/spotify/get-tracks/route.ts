import { TRACKS_DEFAULT_LIMIT } from "@/common/constants";
import { SERVER } from "@/common/server";
import { spotifyAxios } from "@/lib/axios/axios";
import queryString from "query-string";

import { NextResponse, type NextRequest } from "next/server";
import type { AxiosError } from "axios";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const playlistId = requestUrl.searchParams.get("playlistId");
  if (!playlistId) {
    return NextResponse.json(
      {},
      {
        status: 400,
        statusText: "No playlistId was provided.",
      }
    );
  }

  const limit = Number(process.env.SONGS_LIMIT ?? TRACKS_DEFAULT_LIMIT);
  const offset = requestUrl.searchParams.get("offset");

  try {
    const reqUrl = queryString.stringifyUrl(
      {
        url: SERVER.SPOTIFY_PLAYLIST_TRACKS(playlistId),
        query: {
          limit,
          offset,
          fields:
            "limit,next,offset,previous,href,total,items(track(id,name,preview_url))",
        },
      },
      { skipNull: true }
    );

    const { data } = await spotifyAxios.get(reqUrl);
    return NextResponse.json(data);
  } catch (error) {
    const typedError = error as AxiosError;
    return NextResponse.json(
      {},
      {
        status: typedError.response?.status,
        statusText: typedError.response?.statusText,
      }
    );
  }
}
