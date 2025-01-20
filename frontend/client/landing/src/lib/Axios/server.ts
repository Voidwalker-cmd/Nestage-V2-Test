// "use client"
import axios from "axios";
import { API_URL, AUTH_TOKEN } from "@/config";

export const ServerAxios = axios.create({
  baseURL: API_URL,
  withCredentials: !!1,
});

ServerAxios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;