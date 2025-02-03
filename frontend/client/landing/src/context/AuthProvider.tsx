"use client"

import {useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useActiveAccount, useActiveWalletConnectionStatus, useAutoConnect} from "thirdweb/react";
// import { client } from '@/components/molecules/ConnectWallet';
import {Wallet} from 'thirdweb/wallets';
import Preloader from '@/components/molecules/Loader';
// import { CLIENT_ID } from "@/config";
import {createThirdwebClient} from "thirdweb";
import {getAuth} from "@/actions";
import {useWeb3Store} from "@/store";

export const client = createThirdwebClient({
  clientId: "520d55c9ed1eb0dc52af37d81000ce76",
});

const AuthProvider = ({children}: { children: React.ReactNode }) => {
  // const stakerList = useGetStakers()
  const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();
  const activeAccount = useActiveAccount();
  const setUserAddress = useWeb3Store((state) => state.setAddress);
  // const auth = useAuthStore((state) => state.auth);
  //
  const router = useRouter();
  const params = useParams<{ userAddress: string }>();
  const pathName = usePathname()
  //
  const [addr, setAddr] = useState("");
  const [redo] = useState(0);
  const [hold, setHold] = useState(!!0);
  const [isLoading, setIsLoading] = useState(!!0);
  const [isClient, setIsClient] = useState(!!0);
  const [checking, setChecking] = useState(!!0);
  //
  const {data: autoConnected} = useAutoConnect({
    client,
    onConnect: (w: Wallet) => {
      const address = w.getAccount()?.address || "";
      setAddr(address);
      setUserAddress(address)
    },
    // timeout: 3000,
    // onTimeout: () => router.refresh()
  });
  //
  // const initY = async () => {
  //   //
  //   let result = !!0;
  //   if (stakerList.length) result = searchStringInArray(stakerList, address);
  //   return result;
  // }
  //
  // const initZ = async () => {
  //   return await getReferrals({address})
  // }
  //
  // const initX = async () => {
  //   setUserAddress(address);
  //   if (isClient) {
  //     const path = params.userAddress;
  //
  //     if (!path) {
  //       if (autoConnected && address) {
  //         const hasStake = await initY()
  //         const hasRef = await initZ()
  //         if (hasStake || hasRef) {
  //           router.push(`/user/${address}`);
  //         } else {
  //           if (pathName === "/connect-wallet") {
  //             if (status === 'disconnected') {
  //               router.push("/");
  //             } else {
  //               setIsLoading(!!0);
  //             }
  //           } else {
  //             router.push("/");
  //           }
  //         }
  //       } else {
  //         if (pathName === "/") {
  //           setIsLoading(!!0)
  //         } else {
  //           if(status === "connecting" || status === "connected") {
  //             return
  //           } else if (status === "disconnected") {
  //             router.push("/");
  //           }
  //         }
  //       }
  //       return
  //     }
  //
  //     if (path && address) {
  //       if (path !== address) {
  //         if (status === "connected") {
  //           const hasStake = await initY()
  //           const hasRef = await initZ()
  //           if (hasStake || hasRef) {
  //             router.push(`/user/${address}`);
  //           } else {
  //             router.push("/");
  //           }
  //         } else {
  //           router.push("/");
  //         }
  //       } else {
  //         const hasStake = await initY()
  //         const hasRef = await initZ()
  //         if (hasStake || hasRef) {
  //           // router.push(`/user/${address}`);
  //           setIsLoading(!!0);
  //         } else {
  //           router.push("/");
  //         }
  //       }
  //     } else {
  //       if (path && status !== "connected") {
  //         if (status === "connecting") {
  //         } else if (status === "disconnected") {
  //           router.push("/");
  //         }
  //       } else {
  //         setIsLoading(!!0)
  //       }
  //     }
  //   }
  //   setLoad(load + 1)
  // }
  //
  // useEffect(() => {
  //   initX()
  // }, [params.userAddress, address, autoConnected, isLoading, isLoaded, isClient]);
  //
  // useEffect(() => {
  //   if( load > 0 && status === "disconnected" && pathName !== "/"){
  //     setIsLoading(!!1)
  //     router.push("/");
  //   }
  // }, [status]);
  //
  
  const checkAuth = async (address: string) => {
    setChecking(!!1)
    const res = await getAuth(address)
    if (res) {
      if (!pathName.includes("user")) {
        router.replace(`/user/${address}`)
      } else {
      setHold(!!1)
        setIsLoading(!!1)
      }
    } else {
      if (pathName.includes("user")) {
        router.replace(`/`)
      } else {
        setIsLoading(!!1)
        setHold(!!1)
      }
    }
    setChecking(!!1)
  }
  
  const Init = async () => {
    const address = activeAccount?.address || addr
    if (pathName.includes("/connect-wallet")) {
      if (status === "connected") {
        if (!checking) await checkAuth(address)
      } else {
        if (status === "disconnected" && !address) {
          router.replace(`/`);
        } else {
          // setRedo(Math.random())
        }
      }
    } else if (pathName.includes("/user/")) {
      if (status === "connected") {
        if (!address) {
          // setRedo(Math.random())
        } else {
          if (address !== params.userAddress) {
            // setHold(!!1)
            router.replace(`/`);
          } else {
            if (!checking) await checkAuth(address)
            setIsLoading(!!1)
            // setHold(!!1)
          }
        }
      } else if (status === "disconnected") {
        // setHold(!!1)
        router.replace(`/`);
      } else {
        // setRedo(Math.random())
      }
    } else {
      setIsLoading(!!1)
      setHold(!!1)
    }
  }
  
  useEffect(() => {
    if (isClient) Init()
  }, [isClient, redo, status, autoConnected])
  
  useEffect(() => {
    setIsClient(!!1);
  }, []);
  
  if (!isLoading || !isClient || !hold) {
    return <Preloader/>;
  }
  
  return (
    <>{children}</>
  )
}

export default AuthProvider;
