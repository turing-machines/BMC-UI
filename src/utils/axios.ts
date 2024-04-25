import axios from "axios";

import { useAuth } from "../hooks/useAuth";

const host = import.meta.env.DEV ? "http://localhost:4460/api" : "/api";

const useAxiosWithAuth = () => {
  const { token } = useAuth();

  const api = axios.create({
    baseURL: host,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return api;
};

export default useAxiosWithAuth;
