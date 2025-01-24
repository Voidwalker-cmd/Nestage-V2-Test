"use client";

import { useEffect, useState } from "react";
import * as T from "@/types";
import { SITE_MODE, refKey } from '@/config';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useWeb3Store } from "@/store";
import { djs, Formatter, shortenHexString, uuid } from "@/utils";
import { useBNB, getBUSD } from "@/hooks/useBalance";
import RightSide from "./RightSide";
import { newStake } from "@/actions/newStake";
import { SiteUrl } from "@/functions";
import { signal } from "@preact/signals-react";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';

export const btnState = signal("Initializing");

const LevelOne = ({ setStage }: T.ModalProps) => {
    const router = useRouter();
    const address = useWeb3Store((state) => state.address);
    const { balance: bnb, symbol } = useBNB(address);
    const [busd, setBusd] = useState<number | string>(0);
    const [hasErr, setHasErr] = useState<boolean>(!!0)
    const [err, setErr] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(!!0)

    const [bal, setBal] = useState<number | string>(0);
    const [disabled, setDisabled] = useState(!!1);
    const [amount, setAmount] = useState<string>("");
    const [refCode, setRefCode] = useState<string>("");

    useEffect(() => {
        const ref = localStorage.getItem(refKey);
        if(ref) {
            setRefCode(ref)
        }
    }, [])

    useEffect(() => {
        const fetchBusd = async () => {
            const { balance } = await getBUSD(address);
            setBusd(balance);
        };
        fetchBusd();
    }, [address]);

    const minAllow = SITE_MODE === 'test' ? 2 : 10;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[1-9][0-9]*$/;
        let val = e.target.value;
        if (!regex.test(val)) val = ""
        setAmount(val);

        // Disable button if input amount is less than the balance
        if(SiteUrl.includes("testing") || SiteUrl.includes(":4110")){
            if(val === "") {
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
        if(!SiteUrl.includes("testing") || !SiteUrl.includes(":4110")){
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
            address
        };
        setLoading(!!1)
        const res = await newStake(send)
        
        console.log({res})
        if (res.status === 'error') {
            setHasErr(!!1);
            // setDisabled(!!1)
            setErr(res.errorMessage!); 
            btnState.value = "Initializing" 
            return;
        } else {
            btnState.value = "Redirecting" 
            // setLoading(!!0)
            router.push(`/user/${address}`)
        }
    }

    useEffect(() => {
        if (bnb) {
            // setBal(100);
            setBal(bnb);
        }
    }, [bnb]);


    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-6 space-y-6 md:space-y-0 md:space-x-6">
            {/* Left Section */}
            <div className="w-full md:w-2/5 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-xl font-bold mb-4">Level 1 De-Fi Staking</h1>

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
                            <button className="text-blue-500">Copy</button>
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
                                        decimalOptions: { n: 8, m: 8 },
                                    })} 
                                </span>
                                <span className="px-0.5 hidden lg:inline"> | </span>
                                <span>
                                    <span className="pr-0.5">{symbol}</span>
                                    {Formatter(bal, {
                                        type: "d",
                                        decimalOptions: { n: 8, m: 8 },
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

                    <div className="flex items-center justify-between py-5">
                        <Button
                            onClick={() => setStage(0)}
                            className="px-4 py-2 rounded-full bg-gray-300 text-black font-semibold hover:bg-gray-400"
                        >
                            Back
                        </Button>
                        {!loading ? (
                            <Button
                            disabled={disabled}
                            onClick={startStake}
                            className="px-4 py-2 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800"
                        >
                            Register
                        </Button>
                        ) : (
                            <Button
                            disabled={!!1}
                            className="px-4 py-2 rounded-full bg-green-800 text-white font-semibold hover:bg-green-700 cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {btnState}
                        </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <RightSide />
        </div>
    );
};

export default LevelOne;
