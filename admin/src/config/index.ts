export const MODE = import.meta.env.MODE
export const NETWORK_MODE = import.meta.env.VITE_NETWORK_MODE
export const DEV = import.meta.env.DEV
export const PROD = import.meta.env.PROD
export const CLIENTID = import.meta.env.VITE_CLIENT_ID

const nestageAddressTestnet = import.meta.env.VITE_TESTNET; //testnet
const nestageAddressMainnet = import.meta.env.VITE_MAINNET; //mainnet

export const nestageAddress = NETWORK_MODE === "mainnet" ? nestageAddressMainnet : nestageAddressTestnet;

export const nullAddress = "0x0000000000000000000000000000000000000000";

export const mAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; // mainnet
export const tAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"; // testnet