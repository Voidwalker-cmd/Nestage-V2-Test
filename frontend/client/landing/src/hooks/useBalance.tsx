"use client"

import {nestageAddress, NETWORK_MODE} from "@/config";
import {client} from "@/components/molecules/ConnectWallet";
import {bsc, bscTestnet} from "thirdweb/chains";
import {useWalletBalance} from "thirdweb/react";
import {BrowserProvider, Contract, formatUnits} from "ethers";
import BUSD_ABI from "@/web3/NestageNw.json";

export const useBNB = (walletAddress: string) => {
    const { data, isLoading, isError } = useWalletBalance({
        client: client,
        address: walletAddress,
        chain: NETWORK_MODE === "mainnet" ? bsc : bscTestnet,
    });
    
    return {
        balance: data?.displayValue ?? 0,
        symbol: data?.symbol ?? "bnb",
        isLoading,
        isError
    };
};


export const getBUSD = async (walletAddress: string) => {
    let bal: bigint = BigInt(0), err: string | null = null;
    
    if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        try {
            const signer = await provider.getSigner();
            const busdContract = new Contract(nestageAddress!, BUSD_ABI, signer);
            
            bal = await busdContract.getBalance(walletAddress);
        } catch (error) {
            console.error("Error fetching BUSD balance:", error);
            err = `Error fetching BUSD balance: ${error}`;
        }
    }
    
    return {balance: formatUnits(bal || BigInt(0), "ether"), error: err};
};
