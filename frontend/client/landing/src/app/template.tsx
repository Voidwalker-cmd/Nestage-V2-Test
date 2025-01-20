"use client"

import {
  ThirdwebProvider,
} from "thirdweb/react";
import { useEffect, useState } from 'react';
import Preloader from "@/components/molecules/Loader";

// import { useWeb3Store } from "@/store";
// import { useRouter } from "next/navigation"

// import {
//   coinbaseWallet,
//   metamaskWallet,
//   okxWallet,
//   trustWallet,
//   walletConnect,
// } from "thirdweb/wallet";

// import { bsc, bscTestnet } from "thirdweb/chains";
// import { CLIENT_ID, NETWORK_MODE } from "@/config";

export default function Template({ children }: { children: React.ReactNode }) {
  // const router = useRouter()
  //     const address = useWeb3Store((state) => state.address);
  //     if(!address) router.replace("/")


  // const activeChainT = bscTestnet;
  // const activeChainM = bsc;


  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures this only runs on the client
    setIsClient(true);
  }, []);
   if (!isClient) {
     return <Preloader />;
  }
  return (
    <div>
      {/* clientId={CLIENT_ID} */}
      {/* activeChain={NETWORK_MODE === "mainnet" ? activeChainM : activeChainT} */}
      {/* supportedChains={[bsc, bscTestnet]} */}
      {/* supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        trustWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
        okxWallet(),
      ]} */}
      <ThirdwebProvider>
        {children}
      </ThirdwebProvider>
    </div>)
}