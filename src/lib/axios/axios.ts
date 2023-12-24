import axios, { InternalAxiosRequestConfig } from "axios";

const isServer = typeof window === "undefined";

const mainAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
});

const spotifyAxios = axios.create({
  baseURL: process.env.SPOTIFY_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const authorizationInterceptor = async (config: InternalAxiosRequestConfig) => {
  if (isServer) {
    const { headers } = await import("next/headers"),
      authorization = headers().get("authorization");

    if (authorization) {
      config.headers["Authorization"] = authorization;
    }
  }

  return config;
};

mainAxios.interceptors.request.use(authorizationInterceptor);
spotifyAxios.interceptors.request.use(authorizationInterceptor);

export { spotifyAxios, mainAxios };
