import {useDisconnect, useActiveWallet} from "thirdweb/react";
import {Button} from "@/components/ui/button"
import {PowerOffIcon} from "@/components/atoms/Icons"
import {useRouter} from 'next/navigation';

const DisconnectWallet = () => {
  const {disconnect} = useDisconnect();
  const wallet = useActiveWallet();
  const router = useRouter();

  return (
    <Button size="icon" variant="ghost" onClick={() => {
      disconnect(wallet!)
      router.replace("/")
      }}
      className="px-2 text-red-600 hover:text-red-700 transition-all">
        <PowerOffIcon className="size-5"/>
    </Button>
  );
}

export default DisconnectWallet;