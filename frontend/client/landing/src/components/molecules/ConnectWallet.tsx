"use client"

import { ConnectButton, useActiveWalletConnectionStatus } from "thirdweb/react";
import { Button } from "../ui/button";
import useDeviceSize from "@/hooks/useMediaQuery"
import { bsc, bscTestnet } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { useEffect, useState } from "react";

import { NETWORK_MODE } from "@/config";
import { createWallet } from "thirdweb/wallets";
import { useWeb3Store } from "@/store";
import { useAuthStore } from "@/store/auth";
import { useGetStakers } from "@/hooks/useWeb3";
import { searchStringInArray } from "@/functions";

import { useRouter } from 'next/navigation';
import { getReferrals } from "@/actions";

interface ConnectWalletProps {
    state?: string;
}

export const client = createThirdwebClient({
    clientId: "520d55c9ed1eb0dc52af37d81000ce76",
});

const type = 'dark'

const activeChainT = bscTestnet;
const activeChainM = bsc;

const ConnectWallet = ({ state }: ConnectWalletProps) => {
    const router = useRouter();
    const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();

    const setAddress = useWeb3Store((state) => state.setAddress);
    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const address = useWeb3Store((state) => state.address);

    const [shouldFetchStakers, setShouldFetchStakers] = useState(!!0);
    const [isLoading, setIsLoading] = useState(!!0);
    const [off, setOff] = useState(!!0);
    const [hasStake, setHasStake] = useState(!!0);
    const [hasRef, setHasRef] = useState(!!0);
    const [disabled, setDisabled] = useState(!!1);
    const [init, setInit] = useState(1);
    const stakers = useGetStakers();

    const initX = async () => {
        let result = !!0;
        if (stakers.length) result = await searchStringInArray(stakers, address);
        setHasStake(result);
    }

    const Redirect = () => {
        if (hasStake || hasRef) {
            setDisabled(!!1)
            router.push(`/user/${address}`)
        } else {
            setDisabled(!!0)
        }
    }
    
    const Nav = () => {
        setOff(!!1)
        setIsLoading(!!1)
        router.push("/connect-wallet")
    }

    useEffect(() => {
        if (shouldFetchStakers) {
            initX()
            // setShouldFetchStakers(!!0);
        }
    }, [shouldFetchStakers, stakers]);

    useEffect(() => {
        setDisabled(!!1)
        if (init > 1) {
            Redirect()
        } else { setDisabled(!!0) }
    }, [hasStake, hasRef, init]);

    const checkLvlOne = () => {
        setShouldFetchStakers(!!1);
    }

    const checkLvlTwo = async (addr: string) => {
        const res = await getReferrals({ address: addr })
        setHasRef(res)
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
            {status === "connected" ? (
                <>
                    {disabled ? (
                        <Button
                            disabled={init === 1 || disabled ? !!1 : !!0}
                            variant="default"
                            className={`text-semibold rounded-full border border-gray-500 text-white font-semibold ${state === 'fill' ? "bg-[#06351C]" : "bg-transparent"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        >
                            {init === 1 ? "Connecting" : "View Dashboard"}
                        </Button>
                    ) : (
                        <Button
                            variant="default"
                            onClick={Nav}
                            disabled={off}
                            className={`text-semibold rounded-full border border-gray-500 text-white font-semibold ${state === 'fill' ? "bg-[#06351C]" : "bg-transparent"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        >
                            {!isLoading ? "Register" : "Loading"}
                        </Button>
                    )}
                </>
               ) : (
            <ConnectButton
                client={client}
                chain = {NETWORK_MODE === "mainnet" ? activeChainM : activeChainT }
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
                    style: { border: '1px solid gray', color: "#ffffff" }
                }}
                detailsButton={{
                    render: () => (
                        <>
                            {disabled ? (
                                <Button
                                    disabled={disabled}
                                    variant="default"
                                    className={`text-semibold rounded-full border border-gray-500 text-white font-semibold ${state === 'fill' ? "bg-[#06351C]" : "bg-transparent"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                >
                                    {init === 1 ? "Connecting" : "View Dashboard"}
                                </Button>
                            ) : (
                                    <Button
                                        variant="default"
                                        onClick={Nav}
                                        className={`text-semibold rounded-full border border-gray-500 text-white font-semibold ${state === 'fill' ? "bg-[#06351C]" : "bg-transparent"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                    >
                                        Registerx
                                    </Button>
                            )}
                        </>
                    )
                }}
                onConnect={async (wallet) => {
                    const address = await wallet.getAccount()?.address || "";
                    await setAddress(address);
                    await setIsAuth(!!0);
                    await checkLvlOne();
                    await checkLvlTwo(address);
                    setInit(2)
                }}
                onDisconnect={() => {
                    setAddress("")
                }}
            />)}

        </>
    )
}

export default ConnectWallet