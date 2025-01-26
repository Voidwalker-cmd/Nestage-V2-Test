"use client"

import {useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useActiveWalletConnectionStatus, useAutoConnect} from "thirdweb/react";
// import { client } from '@/components/molecules/ConnectWallet';
import {Wallet} from 'thirdweb/wallets';
import Preloader from '@/components/molecules/Loader';
// import { CLIENT_ID } from "@/config";
import {createThirdwebClient} from "thirdweb";
import {useGetStakers} from "@/hooks/useWeb3";
import {searchStringInArray} from "@/functions";
import {getReferrals} from "@/actions";
import {useWeb3Store} from "@/store";

export const client = createThirdwebClient({
  clientId: "520d55c9ed1eb0dc52af37d81000ce76",
});

const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();
  const setUserAddress = useWeb3Store((state) => state.setAddress);
  
  const router = useRouter();
  const params = useParams<{ userAddress: string }>();
  const pathName = usePathname()
  
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(0);
  const [isLoading, setIsLoading] = useState(!!1);
  const [isClient, setIsClient] = useState(!!0);
  
  const stakerList = useGetStakers();
  
  const {data: autoConnected, isLoading: isLoaded} = useAutoConnect({
    client,
    onConnect: (w: Wallet) => {
      const address = w.getAccount()?.address || "";
      setAddress(address);
    },
    timeout: 3000,
    onTimeout: () => router.push("/")
  });
  
  const initY = async () => {
    let result = !!0;
    if (stakerList.length) result = searchStringInArray(stakerList, address);
    return result;
  }
  
  const initZ = async () => {
    return await getReferrals({address})
  }
  
  const initX = async () => {
    setUserAddress(address);
    if (isClient) {
      const path = params.userAddress;
      
      if (!path) {
        if (autoConnected && address) {
          const hasStake = await initY()
          const hasRef = await initZ()
          if (hasStake || hasRef) {
            router.push(`/user/${address}`);
          } else {
            if (pathName === "/connect-wallet") {
              if (status === 'disconnected') {
                router.push("/");
              } else {
                setIsLoading(!!0);
              }
            } else {
              router.push("/");
            }
          }
        } else {
          if (pathName === "/") {
            setIsLoading(!!0)
          } else {
            if(status === "connecting" || status === "connected") {
              return
            } else if (status === "disconnected") {
              router.push("/");
            }
          }
        }
        return
      }
      
      if (path && address && autoConnected) {
        if (path !== address) {
          if (status === "connected") {
            const hasStake = await initY()
            const hasRef = await initZ()
            if (hasStake || hasRef) {
              router.push(`/user/${address}`);
            } else {
              router.push("/");
            }
          } else {
            router.push("/");
          }
        } else {
          const hasStake = await initY()
          const hasRef = await initZ()
          if (hasStake || hasRef) {
            // router.push(`/user/${address}`);
            setIsLoading(!!0);
          } else {
            router.push("/");
          }
        }
      } else {
        if (path && status !== "connected") {
          if (status === "connecting") {
          } else {
            router.push("/");
          }
        } else {
          setIsLoading(!!0)
        }
      }
    }
    setLoad(load + 1)
  }
  
  useEffect(() => {
    initX()
  }, [params.userAddress, address, autoConnected, isLoading, isLoaded, isClient]);
  
  useEffect(() => {
    if( load > 0 && status === "disconnected" && pathName !== "/"){
      setIsLoading(!!1)
      router.push("/");
    }
  }, [status]);
  
  useEffect(() => {
    setIsClient(!!1);
  }, []);
  
  if (isLoading || !isClient) {
    return <Preloader/>;
  }
  
  return (
    <>{children}</>
  )
}

export default AuthProvider;
