export const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE;
export const NETWORK_MODE = process.env.NEXT_PUBLIC_NETWORK_MODE;
export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
export const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
export const TEST_API = process.env.NEXT_PUBLIC_TEST_API;
export const LIVE_API = process.env.NEXT_PUBLIC_LIVE_API;

const nestageAddressTestnet = process.env.NEXT_PUBLIC_TESTNET; //testnet
const nestageAddressMainnet = process.env.NEXT_PUBLIC_MAINNET; //mainnet

export const nestageAddress = NETWORK_MODE === "mainnet" ? nestageAddressMainnet : nestageAddressTestnet;

export const API_URL = SITE_MODE === "test" ? TEST_API : '';