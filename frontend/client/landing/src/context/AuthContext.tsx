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
import {useAuthStore} from "@/store/auth";

export const client = createThirdwebClient({
  clientId: "520d55c9ed1eb0dc52af37d81000ce76",
});

const l = console.log

const AuthContext = ({children}: { children: React.ReactNode }) => {
  // const stakerList = useGetStakers()
  const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();
  const activeAccount = useActiveAccount();
  const setUserAddress = useWeb3Store((state) => state.setAddress);
  const savedAddress = useWeb3Store((state) => state.address);
  const auth = useAuthStore((state) => state.isAuth);
  const setAuth = useAuthStore((state) => state.setIsAuth);
  //
  const router = useRouter();
  const params = useParams<{ userAddress: string }>();
  const pathName = usePathname()
  //
  const [addr, setAddr] = useState(savedAddress);
  const [hold, setHold] = useState(!!0);
  const [isLoading, setIsLoading] = useState(!!0);
  const [isClient, setIsClient] = useState(!!0);
  const [checking, setChecking] = useState(!!0);
  //
  useAutoConnect({
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
  //     if (!pa//       if && address) {
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
  // }, [params.userA, address, isLoading, isLoaded, isClient]);
  //
  // useEffect(() => {
  //   if( load > 0 && status === "disconnected" && pathName !== "/"){
  //     setIsLoading(!!1)
  //     router.push("/");
  //   }
  // }, [status]);
  //
  
  const checkAuth = async (address: string) => {
    l(320)
    setChecking(!!1)
    const res = await getAuth(address)
    if (res) {
      l(321)
      if (!pathName.includes("user")) {
        l(322)
        router.replace(`/user/${address}`)
        setAuth(!!1)
      } else {
        l(323)
        
      setHold(!!1)
        setAuth(!!1)
        setIsLoading(!!1)
      }
    } else {
      l(324)
      if (pathName.includes("user")) {
        l(325)
        router.replace(`/`)
      } else {
        l(326)
        setIsLoading(!!1)
        setHold(!!1)
      }
    }
    setChecking(!!0)
  }
  
  const Init = async () => {
    l(33)
    const address = activeAccount?.address || addr || savedAddress
    if (pathName.includes("/connect-wallet")) {
      l(34)
      
      // alert(`1 - ${address} - ${savedAddress}`);
      if (status === "connected") {
        l(35)
        if (!checking) await checkAuth(address)
      } else {
        l(36)
        // alert(`2 - ${activeAccount?.address} - ${addr}`);
        if (status === "disconnected" && !auth) {
          l(37)
          if (!activeAccount?.address) {
            l(38)
          router.replace(`/`);
          }
        } else {
          l(39)
          // setRedo(Math.random())
        }
      }
    } else if (pathName.includes("/user/")) {
      l(310)
      if (status === "connected") {
        l(311)
        if (!address) {
          l(312)
          // setRedo(Math.random())
        } else {
          l(313)
          if (address !== params.userAddress) {
            l(314)
            // setHold(!!1)
            router.replace(`/`);
          } else {
            l(315)
            if (!checking) await checkAuth(address)
            // setIsLoading(!!1)
            // setHold(!!1)
          }
        }
      } else if (status === "disconnected" && !auth) {
        l(316)
        // setHold(!!1)
        router.replace(`/`);
      } else {
        l(317)
        // setRedo(Math.random())
      }
    } else {
      l(318)
      const getLive = sessionStorage.getItem('connect-walletBtn-check')
      // console.log({getLive})
      if (!getLive) {
        l(319)
        setIsLoading(!!1)
        setHold(!!1)
      }
    }
  }
  
  useEffect(() => {
    l(31)
    if (isClient) {
      Init();
      l(32)
    }
  }, [isClient, status])
  
  useEffect(() => {
    setIsClient(!!1);
  }, []);
  
  // console.log({isLoading, isClient, hold})
  if (!isLoading || !isClient || !hold) {
    return <Preloader/>;
  }
  
  return (
    <>{children}</>
  )
}

export default AuthContext;
