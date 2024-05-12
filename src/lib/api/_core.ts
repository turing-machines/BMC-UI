import axios, { type AxiosError } from "axios";

import { useAuth } from "@/hooks/useAuth";

const host = import.meta.env.DEV ? "http://localhost:4460/api" : "/api";

export function useAxiosWithAuth() {
  const { token, logout } = useAuth();

  const api = axios.create({
    baseURL: host,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        // Unauthorized - log out the user
        logout();
      }
      return Promise.reject(error);
    }
  );

  return api;
}
