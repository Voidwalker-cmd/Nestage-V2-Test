"use client";

import {useEffect, useState} from "react";
import * as T from "@/types";
import {Button} from "../ui/button";
import {useWeb3Store} from "@/store";
import {Formatter, shortenHexString} from "@/utils";
import {getBUSD, useBNB} from "@/hooks/useBalance";
import RightSide from "./RightSide";
import {refKey, SITE_MODE} from "@/config";
import {signal} from "@preact/signals-react";
import {Loader2} from "lucide-react";
import {useRouter} from 'next/navigation';
import {newReferral} from "@/actions/newReferral";
import CopyBtn from "@/components/molecules/CopyBtn";

export const btnStateTwo = signal("Initializing");

const LevelOne = ({setStage}: T.ModalProps) => {
  const router = useRouter();
  const address = useWeb3Store((state) => state.address);
  const {balance, symbol} = useBNB(address);
  
  const minAllow = SITE_MODE === 'test' || SITE_MODE === 'prev' ? 1 : 5;
  
  const [bal, setBal] = useState<number | string>(0);
  const [busd, setBusd] = useState<number | string>(0);
  const [lowBUSD, setLowBUSD] = useState<boolean>(!!0);
  const [lowBNB, setLowBNB] = useState<boolean>(!!0);
  const [loading, setLoading] = useState<boolean>(!!0);
  const [hasErr, setHasErr] = useState<boolean>(!!0)
  const [err, setErr] = useState<string>("")
  
  const [refCode, setRefCode] = useState<string>("");
  
  useEffect(() => {
    const ref = localStorage.getItem(refKey);
    if (ref) {
      console.log({ref})
      setRefCode(ref)
    }
  }, [])
  
  const checkLowBalance = () => {
    if (Number(bal) <= 0) {
      setLowBUSD(!!1)
    } else {
      setLowBUSD(!!0);
    }
    if (Number(busd) < minAllow) {
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
      place: "Nmodal"
    }
    
    const res = await newReferral(send)
    
    // console.log({res})
    if (res.status === 'error') {
      setHasErr(!!1);
      setLoading(!!0)
      // setDisabled(!!0)
      setErr(res.errorMessage!);
      btnStateTwo.value = "Initializing"
      return;
    } else {
      btnStateTwo.value = "Redirecting"
      // setLoading(!!0)
      router.push(`/user/${address}`)
    }
  }
  
  useEffect(() => {
    checkLowBalance();
  }, [bal, busd]);
  
  useEffect(() => {
    if (balance) {
      // setBal(100);
      setBal(balance);
    }
  }, [balance]);
  
  useEffect(() => {
    const fetchBusd = async () => {
      const {balance} = await getBUSD(address);
      setBusd(balance);
    };
    fetchBusd();
  }, [address]);
  
  useEffect(() => {
    const fetchBusd = async () => {
      const {balance} = await getBUSD(address);
      setBusd(balance);
    };
    fetchBusd();
  }, [address]);
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 space-y-6 md:space-y-0 md:space-x-6">
      {/* Left Section */}
      <div className="w-full md:w-2/5 p-6 rounded-lg shadow-lg text-white">
        <h1 className="text-xl font-bold mb-4">Level 2 Decentralized Matrix.</h1>
        
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
          
          {hasErr && <span className="py-2 text-sm text-red-500 italic">{err}</span>}
          
          <div className="flex items-center justify-between py-5">
            <Button
              onClick={() => setStage(0)}
              className="px-4 py-2 rounded-full bg-gray-300 text-black font-semibold hover:bg-gray-400"
            >
              Back
            </Button>
            {loading ? (
              <Button
                disabled={!!1}
                className="px-4 py-2 rounded-full bg-green-800 text-white font-semibold hover:bg-green-700 cursor-not-allowed flex justify-center items-center gap-2"
              >
                <Loader2 className="h-3 w-3 animate-spin"/>
                {btnStateTwo}
              </Button>
            ) : (
              <Button
                onClick={StartReferral}
                disabled={lowBUSD || lowBNB}
                className="px-4 py-2 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800"
              >
                Activate with ${minAllow}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Right Section */}
      <RightSide/>
    </div>
  );
};

export default LevelOne;
