"use client"

import {createContext, useContext, useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useActiveAccount, useActiveWalletConnectionStatus, useAutoConnect, useReadContract} from "thirdweb/react";

import {Wallet} from 'thirdweb/wallets';
import Preloader from '@/components/molecules/Loader';

import {createThirdwebClient, getContract} from "thirdweb";
import {getAuth} from "@/actions";
import {useWeb3Store} from "@/store";
import {useAuthStore} from "@/store/auth";
import {useQuery} from "@tanstack/react-query";

// import { useWeb3Store } from "@/store";
import * as T from "../types";
import {units} from "@/lib";
import {toBigInt} from "ethers";
import {bsc, bscTestnet} from "thirdweb/chains";
// import {client} from "@/components/molecules/ConnectWallet";
import {nestageAddress, NETWORK_MODE} from "@/config";
// import {useAuthStore} from "@/store/auth";

export const client = createThirdwebClient({
  clientId: "520d55c9ed1eb0dc52af37d81000ce76",
});

interface AppContextType {
  status: "connected" | "disconnected" | "connecting";
  autoConnect: boolean
  setAutoConnect: (value: boolean) => void;
  checking: boolean;
  setIsLoading: (value: boolean) => void;
  isAuth: boolean
  setDashboardDisconneted: (value: boolean) => void;
  stakeItems: [] | T.ParsedStakersData[] | undefined;
  stakeError: Error | null
  stakesLoading: boolean;
  refetch: () => void
}

export interface rawStakers {
  id: bigint;
  amount: bigint;
  startDate: bigint;
  endDate: bigint;
  profit: bigint;
  staker: string
}

async function fetchStakers(stakers: rawStakers[] | []) {
  if (!stakers) return []
  try {
    const parsedStakers: T.ParsedStakersData[] | undefined = stakers?.map(
      (staker): T.ParsedStakersData => ({
        staker: staker.staker,
        amount: units(staker.amount, "ether"),
        startDate: Number(toBigInt(staker.startDate)),
        endDate: Number(toBigInt(staker.endDate)),
        profit: units(staker.profit, "ether"),
      })
    );
    // console.log({parsedStakers})
    // setStakers(parsedStakers || [])
    return parsedStakers || [];
  } catch (error) {
    console.log(error);
    //   dispatch(setCheckState({ state: "not-found" }));
    // setStakers([])
    return []
  }
}

const AuthContext = createContext<AppContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();
  const activeAccount = useActiveAccount();
  const setUserAddress = useWeb3Store((state) => state.setAddress);
  const savedAddress = useWeb3Store((state) => state.address);
  const auth = useAuthStore((state) => state.isAuth);
  const setAuth = useAuthStore((state) => state.setIsAuth);
  const router = useRouter();
  const params = useParams<{ userAddress: string }>();
  const pathName = usePathname()
  const [addr, setAddr] = useState(savedAddress);
  const [hold, setHold] = useState(!!0);
  const [isLoading, setIsLoading] = useState(!!0);
  const [isClient, setIsClient] = useState(!!0);
  const [autoConnect, setAutoConnect] = useState(!!1);
  const [checking, setChecking] = useState(!!1);
  const [isAuth, setIsAuth] = useState(!!0);
  const [allStakers, setAllStakers] = useState<rawStakers[]>([]);
  const [dashboardDisconneted, setDashboardDisconneted] = useState(!!0);
  
  useAutoConnect({
    client,
    onConnect: (w: Wallet) => {
      const address = w.getAccount()?.address || "";
      setAddr(address);
      setUserAddress(address)
      setAuth(!!1)
    },
  });
  
  // // const setStakers = useAuthStore((state) => state.setStakers)
  const contract = getContract({
    client: client,
    address: nestageAddress!,
    chain: NETWORK_MODE === "mainnet" ? bsc : bscTestnet,
  });
  // const stakers: T.stakersData[] = await contract?.call("getAllStakes");
  
  const {data: rawStakers} = useReadContract({
    contract,
    method:
      "function getAllStakes() view returns ((uint256 id, uint256 amount, uint256 startDate, uint256 endDate, uint256 profit, address staker)[])",
    params: [],
  });
  
  useEffect(() => {
    if (!rawStakers) {
      setAllStakers([])
    } else if (rawStakers) {
      setAllStakers([...rawStakers])
    }
  }, [rawStakers])
  
  
  const {data: stakeItems, error: stakeError, isLoading: stakesLoading, refetch} = useQuery<any[]>({
    queryKey: ["stakeItmes", savedAddress], // Cache based on user address
    queryFn: () => fetchStakers(allStakers),
    enabled: !!savedAddress, // Fetch only if wallet is connected
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchInterval: 30000, // Refetch every 30s
  });
  
  const checkAuth = async (address: string) => {
    setChecking(!!1)
    const res = await getAuth(address)
    if (res) {
      if (!pathName.includes("user")) {
        setAuth(!!1)
        setIsAuth(!!1)
        if (pathName === "/") {
          setHold(!!1)
          setIsLoading(!!1)
          setTimeout(() => {
            router.replace(`/user/${address}`)
          }, 1000)
        } else {
          router.replace(`/user/${address}`)
        }
      } else {
        setIsAuth(!!0)
        setHold(!!1)
        setAuth(!!0)
        setIsLoading(!!1)
      }
    } else {
      if (pathName.includes("user")) {
        setAuth(!!0)
        setIsAuth(!!0)
        setIsLoading(!!0)
        router.replace(`/`)
      } else {
        setIsLoading(!!1)
        setHold(!!1)
      }
    }
    setChecking(!!0)
  }
  
  const Init = async () => {
    const address = activeAccount?.address || addr || savedAddress
    if (pathName === '/') {
      if (status === 'connected') {
        await checkAuth(address)
        
      } else if (status === 'connecting') {
      
      } else if (status === 'disconnected') {
        setIsLoading(!!1)
        setHold(!!1)
      }
    } else if (pathName.includes("/connect-wallet")) {
      if (status === "connected") {
        await checkAuth(address)
      } else {
        if (status === "disconnected" && !auth) {
          if (!activeAccount?.address) {
            setIsLoading(!!0)
            setHold(!!0)
            router.replace(`/`);
          }
        } else {
        
        }
      }
    } else if (pathName.includes("/user/")) {
      if (status === "connected") {
        if (!address) {
        
        } else {
          if (address !== params.userAddress) {
            
            setIsLoading(!!0)
            router.replace(`/`);
          } else {
            if (!auth) {
              await checkAuth(address)
            } else {
              setIsLoading(!!1)
              setHold(!!1)
            }
          }
        }
      } else if (status === "disconnected" && !auth) {
        setHold(!!0)
        setIsLoading(!!0)
        router.replace(`/`);
      } else {
      
      }
    }
  }
  
  useEffect(() => {
    if (isClient) {
      Init();
    }
  }, [isClient, status])
  
  useEffect(() => {
    setIsClient(!!1);
  }, []);
  
  useEffect(() => {
    if (dashboardDisconneted) {
      setIsLoading(!!0)
      setHold(!!0)
      setTimeout(() => {
        router.replace(`/`)
      }, 500)
      setDashboardDisconneted(!!0)
    }
  }, [dashboardDisconneted]);
  
  
  if (!isLoading || !isClient || !hold) {
    return <Preloader/>;
  }
  const value = {
    status,
    autoConnect,
    setAutoConnect,
    checking,
    setIsLoading,
    isAuth,
    setDashboardDisconneted,
    stakeItems, stakeError, stakesLoading, refetch
  }
  
  return (
    <AuthContext.Provider
      value={
        value}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AppProvider");
  }
  return context;
};
