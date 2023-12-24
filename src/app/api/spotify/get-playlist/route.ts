import { SERVER } from "@/common/server";
import { spotifyAxios } from "@/lib/axios/axios";

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

  try {
    const { data } = await spotifyAxios.get(SERVER.SPOTIFY_PLAYLIST(playlistId));
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
