import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverless: {
    maxDuration: 60,
  },
};

export default nextConfig;
