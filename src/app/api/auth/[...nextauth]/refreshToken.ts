import { SERVER } from "@/common/server";
import { RefreshToken } from "@/common/types";
import axios from "axios";

export const refreshToken = async (token: string): Promise<RefreshToken> => {
  const clientKey = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const { data } = await axios.post<RefreshToken>(
    SERVER.SPOTIFY_TOKEN,
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token,
    }),
    {
      headers: {
        Authorization: `Basic ${clientKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
};
