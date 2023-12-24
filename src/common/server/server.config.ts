const SPOTIFY_ACCOUNTS_API = process.env.SPOTIFY_ACCOUNTS_API;
const SPOTIFY_API_URL = "/spotify";

export const SERVER = {
  /* API Routes */
  GET_PLAYLIST: `${SPOTIFY_API_URL}/get-playlist`,

  /* Spotify Routes */
  SPOTIFY_TOKEN: `${SPOTIFY_ACCOUNTS_API}/api/token`,
  SPOTIFY_PLAYLIST: (playlistId: string) => `/playlists/${playlistId}`,
};
