// "use client";
import axios from "axios";
// import { AUTH_TOKEN } from "@/config"

// baseURL: `${SITE_URL}/api/`,

export const Axios = axios.create({
  baseURL: `/api/`,
  withCredentials: !!1,
});

