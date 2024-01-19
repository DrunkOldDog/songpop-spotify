import queryString from 'query-string';
import { NextResponse } from 'next/server';

import { SERVER } from '@/common/server';
import { spotifyAxios } from '@/lib/axios/axios';

import type { AxiosError } from 'axios';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const playlistId = requestUrl.searchParams.get('playlistId');
  if (!playlistId) {
    return NextResponse.json(
      {},
      {
        status: 400,
        statusText: 'No playlistId was provided.',
      }
    );
  }

  try {
    const reqUrl = queryString.stringifyUrl({
      url: SERVER.SPOTIFY_PLAYLIST(playlistId),
      query: {
        fields: 'id,name,description,images,tracks(total)',
      },
    });

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
