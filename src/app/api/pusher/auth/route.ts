import { NextRequest } from 'next/server';
import queryString from 'query-string';

import { pusher } from '@/lib/pusher';

import type { PresenceChannelData } from 'pusher';

type PusherAuthQuery = {
  socket_id: string;
  channel_name: string;
};

type PusherAuthParams = {
  userName: string;
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const { channel_name, socket_id, userName } = queryString.parse(
    body
  ) as PusherAuthQuery & PusherAuthParams;

  const presenceData: PresenceChannelData = {
    user_id: Math.random().toString(16).slice(2),
    user_info: {
      userName,
    },
  };

  // This authenticates every user. Don't do this in production!
  const authResponse = pusher.authorizeChannel(
    socket_id,
    channel_name,
    presenceData
  );

  console.info(`${userName} - Auth response`, authResponse);
  return new Response(JSON.stringify(authResponse), { status: 200 });
}
