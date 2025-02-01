"use client"

import {ConnectButton, useActiveWalletConnectionStatus} from "thirdweb/react";
import {Button} from "../ui/button";
import useDeviceSize from "@/hooks/useMediaQuery"
import {bsc, bscTestnet} from "thirdweb/chains";
import {createThirdwebClient} from "thirdweb";
import {useEffect, useState} from "react";

import {NETWORK_MODE, SITE_MODE} from "@/config";
import {createWallet} from "thirdweb/wallets";
import {useWeb3Store} from "@/store";
import {useAuthStore} from "@/store/auth";
import {searchStringInArray} from "@/functions";

import {useRouter} from 'next/navigation';
import {getReferrals} from "@/actions";
import UserAvatar from "@/components/molecules/UserAvatar";
import {useGetStakers} from "@/hooks/useWeb3";

interface ConnectWalletProps {
  state?: string;
  isDashboard?: boolean
}

export const client = createThirdwebClient({
  clientId: "520d55c9ed1eb0dc52af37d81000ce76",
});

const type = 'dark'

const activeChainT = bscTestnet;
const activeChainM = bsc;

const ConnectWallet = ({state, isDashboard = !!0}: ConnectWalletProps) => {
  const router = useRouter();
  const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();
  
  const setAddress = useWeb3Store((state) => state.setAddress);
  // const addr = useWeb3Store((state) => state.address);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const address = useWeb3Store((state) => state.address);
  const stakers = useGetStakers();
  
  const [shouldFetchStakers, setShouldFetchStakers] = useState(!!0);
  const [isLoading, setIsLoading] = useState(!!1);
  const [hasStake, setHasStake] = useState(!!0);
  const [isNew, setIsNew] = useState(!!1)
  const [hasRef, setHasRef] = useState(!!0);
  const [disabled, setDisabled] = useState(!!1);
  const [viewDashBoard] = useState(!!0);
  const [init, setInit] = useState(1);
  
  const initX = async () => {
    console.log("checking - ")
    let result = !!0;
    console.log({params: {stakers, address}})
    if (stakers.length) result = await searchStringInArray(stakers, address);
    console.log(result)
    setHasStake(result);
    setIsNew(!!0)
  }
  
  const Redirect = () => {
    // console.log
    if (hasStake || hasRef) {
      setDisabled(!!1)
      router.push(`/user/${address}`)
    } else {
      setDisabled(!!0)
      setIsLoading(!!0)
    }
  }
  
  const Nav = () => {
    setIsLoading(!!1)
    router.push("/connect-wallet")
  }
  
  useEffect(() => {
    if (shouldFetchStakers) {
      console.log("checking")
      initX()
      // setShouldFetchStakers(!!0);
    }
  }, [shouldFetchStakers, stakers]);
  
  useEffect(() => {
    console.log({hasStake, hasRef, init, disabled, isLoading})
    setDisabled(!!1)
    if (init > 1) {
      setIsLoading(!!1)
      Redirect()
    } else {
      setDisabled(!!0)
    }
  }, [hasStake, hasRef, init]);
  
  useEffect(() => {
    if (status === "disconnected" && !isNew) {
      resetState()
    }
    if (status === "connected" && address) {
      const checkNew = async () => {
        setAddress(address);
        setIsAuth(!!0);
        checkLvlOne();
        await checkLvlTwo(address);
      }
      checkNew()
    }
  }, [address])
  
  const resetState = () => {
    setIsAuth(!!0)
    setAddress("")
    setHasStake(!!0)
    setHasRef(!!0)
    setInit(1)
    setShouldFetchStakers(!!0)
  }
  
  const checkLvlOne = () => {
    console.log("should check")
    setShouldFetchStakers(!!1);
  }
  
  const checkLvlTwo = async (addr: string) => {
    const res = await getReferrals({address: addr})
    setHasRef(res)
    setInit(2)
    setIsNew(!!0)
  }
  
  const welcomeScreen = {
    title: "Connect your wallet to Nestage and begin your Staking journey.",
    subtitle: "Connect your wallet to get started",
    img: {
      src: `https://res.cloudinary.com/dkjaod6nu/image/upload/v1717115769/nestage/logos/${type === "dark" ? "wh" : "bk"
      }-icon-text.png`,
      width: 235,
      height: 235,
    },
  }
  
  // const CC = () => {
  //     return (
  //         <h1>Hello</h1>
  //     )
  // }
  
  const size = useDeviceSize()
  return (
    <>
      {status === "connected" && !isDashboard ? (
        <>
          {disabled ? (
            init === 1 ? (
              <Button
                disabled={viewDashBoard}
                variant="default"
                className={`text-semibold rounded-full border border-gray-500 text-white font-semibold ${
                  state === "fill" ? "bg-[#06351C]" : "bg-transparent"
                } cursor-not-allowed opacity-50`}
              >
                Connecting
              </Button>
            ) : init > 1 ? (
              <Button
                disabled={viewDashBoard}
                variant="default"
                className={`text-semibold rounded-full border border-gray-500 text-white font-semibold ${
                  state === "fill" ? "bg-[#06351C]" : "bg-transparent"
                } cursor-not-allowed opacity-50`}
              >
                Redirecting to Dashboard
              </Button>
            ) : null
          ) : isLoading ? (
            <Button
              variant="default"
              disabled={!!1}
              className={`text-semibold rounded-full border border-gray-500 text-white font-semibold ${
                state === "fill" ? "bg-[#06351C]" : "bg-transparent"
              } cursor-not-allowed opacity-50`}
            >
              Loading
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={Nav}
              disabled={!!0}
              className={`text-semibold rounded-full border border-gray-500 text-white font-semibold ${
                state === "fill" ? "bg-[#06351C]" : "bg-transparent"
              } cursor-pointer`}
            >
              Register
            </Button>
          )}
        </>
      ) : (
        <ConnectButton
          client={client}
          chain={NETWORK_MODE === "mainnet" ? activeChainM : activeChainT}
          theme={type}
          connectModal={{
            title: size === "sm" ? "Connect Wallet to Nestage" : "Connect to Nestage",
            titleIcon: `https://res.cloudinary.com/dkjaod6nu/image/upload/v1717115769/nestage/logos/${type === "dark" ? "wh" : "bk"}-icon.png`,
            size: size === "sm" ? "compact" : "wide",
            privacyPolicyUrl: "https://nestage.io/",
            termsOfServiceUrl: "https://nestage.io/terms",
            showThirdwebBranding: !!0,
            welcomeScreen: welcomeScreen,
          }}
          wallets={[
            createWallet("io.metamask"),
            createWallet("com.trustwallet.app"),
            createWallet("walletConnect"),
            createWallet("com.okex.wallet"),
            createWallet("com.binance"),
            createWallet("us.binance"),
            createWallet("com.blockchain"),
            createWallet("com.coinbase.wallet"),
            createWallet("com.safepal"),
            createWallet("com.bitpay"),
            createWallet("com.brave.wallet"),
          ]}
          recommendedWallets={[
            createWallet("io.metamask"),
            createWallet("com.trustwallet.app"),
            createWallet("walletConnect"),
          ]}
          showAllWallets={!!0}
          connectButton={{
            label: "Connect Wallet",
            className: `${state === 'fill' ? "!bg-[#06351C]" : "!bg-transparent"} !inline-flex !items-center !justify-center !gap-2 !whitespace-nowrap !text-sm !transition-colors focus-visible:!outline-none focus-visible:!ring-1 focus-visible:!ring-ring disabled:!? "cursor ":""pointer-events-none disabled:!? "cursor  ":""opacity-50 [&_svg]:!pointer-events-none [&_svg]:!size-4 [&_svg]:!shrink-0 !shadow hover:!bg-[#06351C] hover:!bg-opacity-60 !h-9 !px-4 !rounded-full border !border-gray-500 hover:!border-opacity-100 !py-3 !text-white !font-semibold`,
            style: {border: '1px solid gray', color: "#ffffff"}
          }}
          detailsButton={{
            render: () => (
              <>
                <UserAvatar/>
              </>
            )
          }}
          detailsModal={{
            hideBuyFunds: !!1,
            hideReceiveFunds: !!1,
            hideSendFunds: !!1,
            hideSwitchWallet: !!1,
            connectedAccountAvatarUrl: "https://github.com/shadcn.png",
            showBalanceInFiat: "USD",
            showTestnetFaucet: SITE_MODE === "prod" ? !!0 : !!1,
            manageWallet: {allowLinkingProfiles: !!0}
          }}
          onConnect={async (wallet) => {
            const address = wallet.getAccount()?.address || "";
            setAddress(address);
            setIsAuth(!!0);
            checkLvlOne();
            await checkLvlTwo(address);
          }}
          onDisconnect={() => {
            setAddress("")
          }}
        />)}
    
    </>
  )
}

export default ConnectWallet