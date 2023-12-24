import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === "undefined";

const axiosApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use(async (config) => {
  if (isServer) {
    const { headers } = await import("next/headers"),
      authorization = headers().get("authorization");

    if (authorization) {
      config.headers["Authorization"] = authorization;
    }
  }

  return config;
});

export default axiosApi;
