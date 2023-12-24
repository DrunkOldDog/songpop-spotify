/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SPOTIFY_API: "https://api.spotify.com/v1",
    SPOTIFY_ACCOUNTS_API: "https://accounts.spotify.com",
  },
};

module.exports = nextConfig;
