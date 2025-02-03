"use client"

import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {useRouter} from "next/navigation";
import {useWeb3Store} from "@/store";
import {getBUSD} from "@/hooks/useBalance";
import {refKey, SITE_MODE} from "@/config";
import {useEffect, useState} from "react";
import {newReferral} from "@/actions/newReferral";
import {Formatter, shortenHexString} from "@/utils";
import CopyBtn from "@/components/molecules/CopyBtn";
import {Loader2} from "lucide-react";
import {signal} from "@preact/signals-react";
import {useActiveAccount} from "thirdweb/react";

export const btnStateTwoModal = signal("Initializing");

const LevelTwoNewRefModal = () => {
  const router = useRouter();
  const addr = useWeb3Store((state) => state.address);
  const activeAccount = useActiveAccount();
  const [address] = useState(addr || activeAccount?.address!)
  
  // const {balance, symbol: sym, isError, isLoading} = useBNB(address);
  
  const [bnb] = useState<string | number>(0)
  const [symbol] = useState("bnb")
  
  const minAllow = SITE_MODE === 'test' || SITE_MODE === 'prev' ? 1 : 5;
  
  const [busd, setBusd] = useState<number | string>(0)
  const [lowBUSD, setLowBUSD] = useState<boolean>(!!0);
  const [lowBNB, setLowBNB] = useState<boolean>(!!0)
  const [loading, setLoading] = useState<boolean>(!!0);
  const [hasErr, setHasErr] = useState<boolean>(!!0)
  const [err, setErr] = useState<string>("")
  
  const [refCode, setRefCode] = useState<string>("");
  
  useEffect(() => {
    const ref = localStorage.getItem(refKey);
    if (ref) {
      setRefCode(ref)
    }
  }, [])
  
  // useEffect(() => {
  //   setBnb(balance);  // Always a valid number (default 0)
  //   setSymbol(sym); // Always a valid string (default "bnb")
  // }, [balance, isError, isLoading]);

  
  // useEffect(() => {
  //   if(address) {
  //     const {balance, symbol } = getBNB(address)
  //     setBnb(balance!)
  //     setSymbol(symbol!)
  //   }
  // }, [address]);
  
  const checkLowBalance = () => {
    if (Number(busd) < minAllow) {
      setLowBUSD(!!1)
    } else {
      setLowBUSD(!!0);
    }
    if (Number(bnb) >= 0) {
      setLowBNB(!!1)
    } else {
      setLowBNB(!!0);
    }
  };
  
  const StartReferral = async () => {
    setLoading(!!1)
    
    if (lowBUSD) {
      setHasErr(!!1)
      setErr("Low BUSD Balance")
      setLoading(!!0)
      return
    }
    
    if (lowBNB) {
      setHasErr(!!1)
      setErr("Low BNB Balance to cover Gas Fee's")
      setLoading(!!0)
      return
    }
    
    const send = {
      address,
      referral: refCode,
      amount: String(minAllow),
      place: "modal"
    }
    
    const res = await newReferral(send)
    
    // console.log({res})
    if (res.status === 'error') {
      setHasErr(!!1);
      setLoading(!!0)
      // setDisabled(!!0)
      setErr(res.errorMessage!);
      btnStateTwoModal.value = "Initializing"
      return;
    } else {
      btnStateTwoModal.value = "Redirecting"
      // setLoading(!!0)
      router.refresh()
    }
  }
  
  useEffect(() => {
    checkLowBalance();
  }, [bnb, busd]);
  
  // useEffect(() => {
  //   if (balance) {
  //     // setBal(100);
  //     setBal(balance);
  //   }
  // }, [balance]);
  
  useEffect(() => {
    const fetchBusd = async () => {
      const {balance} = await getBUSD(address);
      setBusd(balance);
    };
    fetchBusd();
  }, [address]);
  
  const ResetStates = () => {
    // setBal(0);
    setBusd(0);
    setLowBUSD(!!0);
    setLowBNB(!!0);
    setLoading(!!0);
    setHasErr(!!0)
    setErr("")
  }
  
  // useEffect(() => {
  //   !loaded && ResetStates()
  // }, []);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-2/5 lg:!w-1/5">Activate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] !bg-accent">
        <DialogHeader>
          <DialogTitle>Activate Level 2 Decentralized Matrix</DialogTitle>
          <DialogDescription>
            Activate to get your referral code/link and start referring users to earn.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-2 flex items-center justify-start gap-2">
            <label className="block text-sm font-medium mb-1">Wallet address:</label>
            <div className="flex items-center font-medium justify-between px-4 py-2 gap-3">
              <span>{shortenHexString(address || "")}</span>
              <CopyBtn value={address}/>
            </div>
          </div>
          
          <div className="mb-2 flex items-center justify-start gap-2">
            <label className="block text-sm font-medium mb-1">Wallet balance:</label>
            <div className="flex items-center font-medium justify-between px-4 py-2">
              <span className="flex flex-col lg:flex-row justify-center items-center gap-1">
                <span>
                    <span className="pr-0.5">BUSD</span>
                  {Formatter(busd, {
                    type: "d",
                    decimalOptions: {n: 2, m: 4},
                  })}
                </span>
                <span className="px-0.5 hidden lg:inline"> | </span>
                <span>
                    <span className="pr-0.5">{symbol}</span>
                  {Formatter(bnb, {
                    type: "d",
                    decimalOptions: {n: 4, m: 8},
                  })}
                </span>
              </span>
            </div>
          </div>
          
          {hasErr && <span className="py-2 text-sm text-red-500 italic">{err}</span>}
        </div>
        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <DialogClose asChild>
              <Button onClick={ResetStates} className="setBtn !border !border-gray-500" variant="secondary">
                Close
              </Button>
            </DialogClose>
            {!loading ? (
              <Button onClick={StartReferral}>Pay ${minAllow}</Button>
            ) : (
              <Button disabled>
                <Loader2 className="animate-spin"/>
                {btnStateTwoModal.value}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LevelTwoNewRefModal