// import { Button } from '@/components/ui/button'
import {createWallet} from "thirdweb/wallets";
import {bsc, bscTestnet} from "thirdweb/chains";
import {createThirdwebClient} from "thirdweb";
import {CLIENTID, NETWORK_MODE, MODE} from "@/config";
import {ConnectButton, useActiveAccount} from "thirdweb/react"; //useActiveWalletConnectionStatus
import {useIsMobile} from "@/hooks/use-mobile";
import {useWeb3Store} from "@/stores/web3Store";
import {Button} from "@/components/ui/button";
import { useEffect } from "react";
// import {useAuth} from "@/context/AuthProvider";

export const client = createThirdwebClient({
  clientId: CLIENTID,
});

const type = 'dark'

const activeChainT = bscTestnet;
const activeChainM = bsc;

export function ProfileDropdown() {
  const setMasterAddress = useWeb3Store((state) => state.setMasterAddress)
  const setIsConnetced = useWeb3Store((state) => state.setIsConnected)
  const activeAccount = useActiveAccount();
  
  // const { checkWallets } = useAuth()
  
  useEffect(() => {
    if(activeAccount?.address) {
      setMasterAddress(activeAccount.address)
      setIsConnetced(true)
    }
  }, [activeAccount?.address])
  
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
  
  // const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();
  
  const size = useIsMobile()
  return (
    <ConnectButton
      client={client}
      chain={NETWORK_MODE === "mainnet" ? activeChainM : activeChainT}
      theme={type}
      connectModal={{
        title: size ? "Connect Wallet to Nestage" : "Connect to Nestage",
        titleIcon: `https://res.cloudinary.com/dkjaod6nu/image/upload/v1717115769/nestage/logos/${type === "dark" ? "wh" : "bk"}-icon.png`,
        size: size ? "compact" : "wide",
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
        label: "Connect Admin Wallet",
        className: `!inline-flex !items-center !justify-center !gap-2 !whitespace-nowrap !rounded-md !text-sm !font-medium !transition-colors focus-visible:!outline-none focus-visible:!ring-1 focus-visible:!ring-ring disabled:!pointer-events-none disabled:!opacity-50 [&_svg]:!pointer-events-none [&_svg]:!size-4 [&_svg]:!shrink-0 !bg-primary !text-primary-foreground !shadow hover:!bg-primary/90 !h-9 !px-4 !py-2`,
      }}
      detailsButton={{
        render: () => (
          <>
            {/*<UserAvatar/>*/}
            <Button>Connected</Button>
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
        showTestnetFaucet: MODE === "prod" ? !!0 : !!1,
        manageWallet: {allowLinkingProfiles: !!0}
      }}
      onConnect={async (wallet) => {
        // setAuto(!!0)
        const address = wallet.getAccount()?.address || "";
        setMasterAddress(address)
        setIsConnetced(!!1)
        // setAddress(address);
        // setAddr(address);
        // setAuth(!!1);
        
        // let vRef = ''
        // const params = new URLSearchParams(window.location.search);
        // const ref = params.get("ref") ?? localStorage.getItem(refKey) ?? ""
        // const SaveRef = async (ref: string) => {
        //   const {data, status} = await saveRef(ref);
        //   if (status === 200) {
        //     localStorage.setItem(refKey, data.code);
        //     vRef = data.code
        //     if(vRef) await saveTempRef(address, vRef);
        //   }
        // };
        // if(ref) SaveRef(ref)
        // await checkAuth(address);
        // checkLvlOne();
        // await checkLvlTwo(address);
      }}
      onDisconnect={() => {
        setMasterAddress("")
        setIsConnetced(!!0)
      }}
    />
  )
}
