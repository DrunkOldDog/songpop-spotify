const SPOTIFY_API = process.env.SPOTIFY_API;

export const SERVER = {
  /* Spotify Routes */
  SPOTIFY_PLAYLIST: (playlistId: string) =>
    `${SPOTIFY_API}/playlists/${playlistId}`,
};
