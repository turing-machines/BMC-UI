import axios from "axios";

const host = import.meta.env.DEV ? "http://localhost:4460/api" : "/api";
const api = axios.create({
  baseURL: host,
});

export default api;
