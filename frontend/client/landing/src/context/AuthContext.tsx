"use client"

import {createContext, useContext, useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useActiveAccount, useActiveWalletConnectionStatus, useAutoConnect} from "thirdweb/react";

import {Wallet} from 'thirdweb/wallets';
import Preloader from '@/components/molecules/Loader';

import {createThirdwebClient} from "thirdweb";
import {getAuth} from "@/actions";
import {useWeb3Store} from "@/store";
import {useAuthStore} from "@/store/auth";

export const client = createThirdwebClient({
  clientId: "520d55c9ed1eb0dc52af37d81000ce76",
});

interface AppContextType {
  status: "connected" | "disconnected" | "connecting";
  autoConnect: boolean;
  setAutoConnect: (value: boolean) => void;
  checking: boolean;
  setIsLoading: (value: boolean) => void;
  isAuth: boolean
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
 
  useAutoConnect({
    client,
    onConnect: (w: Wallet) => {
      const address = w.getAccount()?.address || "";
      setAddr(address);
      setUserAddress(address)
    },
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
            if (!checking || !auth) {
              await checkAuth(address)
            } else {
              setIsLoading(!!1)
              setHold(!!1)
            }
          }
        }
      } else if (status === "disconnected") {
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
  
  
  if (!isLoading || !isClient || !hold) {
    return <Preloader/>;
  }
  const value = {
    status,
    autoConnect,
    setAutoConnect,
    checking,
    setIsLoading,
    isAuth
  }
  
  return (
    <AuthContext.Provider
      value={
        value}
    >
      {children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AppProvider");
  }
  return context;
};
