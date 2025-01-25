"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAutoConnect, useActiveWalletConnectionStatus } from "thirdweb/react";
// import { client } from '@/components/molecules/ConnectWallet';
import { Wallet } from 'thirdweb/wallets';
import Preloader from '@/components/molecules/Loader';
import { CLIENT_ID } from "@/config";
import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
    clientId: "520d55c9ed1eb0dc52af37d81000ce76",
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();

  const router = useRouter();
  const params = useParams<{ userAddress: string }>();

  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(!!1);
  const [isClient, setIsClient] = useState(!!0);

  const { data: autoConnected, isLoading: isLoaded } = useAutoConnect({
    client,
    onConnect: (w: Wallet) => {
      const address = w.getAccount()?.address || "";
      setAddress(address);
    },
    timeout: 3500,
    onTimeout: () => router.push("/")
  });

  useEffect(() => {
    if (isClient) {
      const path = params.userAddress;

      if (!path) {
        if(autoConnected && address) {
          router.push(`/user/${address}`);
        }
        // setIsLoading(!!0);
      }

      if (path && address && autoConnected) {
        if (path !== address) {
          if(status === "connected") {
            router.push(`/user/${address}`);
          } else {
            router.push("/");
          }
        } else {
          setIsLoading(!!0);
        }
      }
    }
  }, [params.userAddress, address, autoConnected, isLoading, isLoaded, isClient]);

  useEffect(() => {
    setIsClient(!!1);
  }, []);

  if (isLoading || !isClient) {
    return <Preloader />;
  }

  return (
    <>{children}</>
  )
}

export default AuthProvider;
