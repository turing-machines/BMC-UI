import axios from "axios";

const host = "http://localhost:4460/api";
const api = axios.create({
  baseURL: host,
});

export default api;
