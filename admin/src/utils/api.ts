import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1335/admin";
const TOKEN = import.meta.env.VITE_TOKEN;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: !!1,
  headers: { "Content-Type": "application/json" },
});

api.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
