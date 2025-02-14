"use client"

import {useEffect, useState} from "react";
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
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {AddIcon} from "@/components/atoms/Icons";
import {useWeb3Store} from "@/store"
import {getBUSD, useBNB} from "@/hooks/useBalance"
import {refKey, SITE_MODE} from "@/config"
import {SiteUrl} from "@/functions/site";
import {djs, Formatter, shortenHexString, uuid} from "@/utils";
import {newStake} from "@/actions/newStake";
import CopyBtn from "@/components/molecules/CopyBtn";
import {Loader2} from "lucide-react";
import {signal} from "@preact/signals-react";
import {useUserContext} from "@/context/UserContext";
import {getTempRef} from "@/actions";

export const btnStateModal = signal("Initializing");

const LevelOneNewStakeModal = ({size}: { size: string }) => {
  const address = useWeb3Store((state) => state.address)
  const {balance: bnb, symbol} = useBNB(address);
  const {stakers, stakesLoading} = useUserContext()
  
  const [busd, setBusd] = useState<number | string>(0);
  const [hasErr, setHasErr] = useState<boolean>(!!0)
  const [err, setErr] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(!!0)
  
  const [bal, setBal] = useState<number | string>(0);
  const [disabled, setDisabled] = useState(!!1);
  const [amount, setAmount] = useState<string>("");
  const [render] = useState(!!1);
  const [refCode, setRefCode] = useState<string>("");
  
  useEffect(() => {
    async function I() {
      const checkTemp = await getTempRef(address)
      
      const ref = localStorage.getItem(refKey) ?? checkTemp.code ?? "";
      if (ref) {
        setRefCode(ref)
      }
    }
    I()
  }, [])
  
  useEffect(() => {
    if (stakers && !stakesLoading) {
      if (!stakers.length) {
        // setRender(!!0)
      }
    }
  }, [stakers]);
  
  useEffect(() => {
    const fetchBusd = async () => {
      const {balance} = await getBUSD(address);
      setBusd(balance);
    };
    fetchBusd();
  }, [address]);
  
  const minAllow = SITE_MODE === 'test' || SITE_MODE === 'prev' ? 2 : 10;
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[1-9][0-9]*$/;
    let val = e.target.value;
    if (!regex.test(val)) val = ""
    setAmount(val);
    
    // Disable button if input amount is less than the balance
    if (SiteUrl.includes("testing") || SiteUrl.includes(":4110")) {
      if (val === "") {
        setDisabled(!!1)
      } else {
        setDisabled(!!0)
      }
    } else {
      setDisabled(Number(val) > Number(busd) || Number(val) < minAllow || val === "");
    }
  };
  
  const startStake = async () => {
    setHasErr(!!0);
    if (!SiteUrl.includes("testing") || !SiteUrl.includes(":4110")) {
      if (Number(bal) === 0.0) {
        setHasErr(!!1);
        setDisabled(!!1)
        setErr("You have 0BNB balance for GasFee.");
        return;
      }
    }
    
    let p: string | number = Number(amount) * 0.3;
    p = String(Number(amount) + p);
    
    const a = djs().valueOf();
    const b = djs()
      .add(SiteUrl.includes("testing") || SiteUrl.includes(":4110") ? 1 : 25, "days")
      .valueOf();
    const send = {
      amount,
      startDate: String(a),
      endDate: String(b),
      profit: p,
      planId: 0,
      uuid,
      address,
      place: "modal"
    };
    setLoading(!!1)
    const res = await newStake(send)
    
    // console.log({res})
    if (res.status === 'error') {
      setLoading(!!0)
      setHasErr(!!1);
      setDisabled(!!0)
      setErr(res.errorMessage!);
      btnStateModal.value = "Initializing"
      return;
    } else {
      btnStateModal.value = "Redirecting"
      // setLoading(!!0)
      window.location.reload()
    }
  }
  
  useEffect(() => {
    if (bnb) {
      // setBal(100);
      setBal(bnb);
    }
  }, [bnb]);
  
  const ResetStates = () => {
    setBusd(0);
    setHasErr(!!0)
    setErr("")
    setLoading(!!0)
    setBal(0);
    setDisabled(!!1);
    setAmount("");
  }
  
  return (
    <>{render ? (
      <Dialog>
        <DialogTrigger asChild>
          {size == "icon" ? (
            <Button size="icon" variant="outline" className={"setBtn"}>
              <AddIcon className='w-6 h-6'/>
            </Button>
          ) : (
            <Button className="w-2/5 lg:!w-1/5">Start New Stake</Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] !bg-accent">
          <DialogHeader>
            <DialogTitle>Level 1 De-Fi Staking.</DialogTitle>
            <DialogDescription>
              Take advantage of Nestage De-Fi Staking and earn profits.
            </DialogDescription>
          </DialogHeader>
          <div className="py-5">
            {refCode !== "" ? (
              <div className="mb-2">
                <p className="block text-sm font-semibold mb-1 text-center py-2">Upline</p>
                <div className="w-full px-4 py-2 rounded-lg bg-gray-500 flex justify-center font-medium">{refCode}</div>
              </div>) : ("")}
            
            <div className="mb-2 flex items-center justify-start gap-2">
              <label className="block text-sm font-medium mb-1">Wallet address:</label>
              <div className="flex items-center font-medium justify-between px-4 py-2 gap-3">
                <span>{shortenHexString(address || "")}</span>
                <CopyBtn value={address}/>
              </div>
            </div>
            
            <div className="mb-2 flex items-center justify-start gap-2">
              <label className="block text-sm font-medium mb-1">BUSD balance:</label>
              <div className="flex items-center font-medium justify-between px-4 py-2">
                <span>
                  {Formatter(busd, {
                    type: "d",
                    decimalOptions: {n: 2, m: 4},
                  })}
                </span>
              </div>
            </div>
            
            <div className="mb-2 flex items-center justify-start gap-2">
              <label className="block text-sm font-medium mb-1">{symbol} balance:</label>
              <div className="flex items-center font-medium justify-between px-4 py-2">
                            <span className="flex flex-col lg:flex-row justify-center items-center gap-1">
                                <span>
                                  {Formatter(bal, {
                                    type: "d",
                                    decimalOptions: {n: 4, m: 8},
                                  })}
                                </span>
                            </span>
              </div>
            </div>
            
            <div className="mb-2 w-full">
              <Label htmlFor="amount" className="block text-sm font-medium mb-1">
                Enter amount: {hasErr && <span className="px-3 text-sm text-red-500 italic">{err}</span>}
              </Label>
              <Input
                onInput={onChange}
                value={amount}
                className="w-full"
                type="number"
                id="amount"
                placeholder={`Enter a minimum of ${minAllow} ${"BUSD"}`}
              />
            </div>
            
          </div>
          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <DialogClose asChild>
                <Button onClick={ResetStates} className="setBtn !border !border-gray-500" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              {!loading ? (
                <Button disabled={disabled} onClick={startStake}>Pay ${minAllow}</Button>
              ) : (
                <Button disabled>
                  <Loader2 className="animate-spin"/>
                  {btnStateModal.value}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ) : ("")}
    </>)
}

export default LevelOneNewStakeModal