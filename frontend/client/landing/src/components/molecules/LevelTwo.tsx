"use client";

import { useEffect, useState } from "react";
import * as T from "@/types";
import { Button } from "../ui/button";
import { useWeb3Store } from "@/store";
import { Formatter, shortenHexString } from "@/utils";
import {getBUSD, useBNB} from "@/hooks/useBalance";
import RightSide from "./RightSide";
import { SITE_MODE } from "@/config";

const LevelOne = ({ setStage }: T.ModalProps) => {
    const address = useWeb3Store((state) => state.address);
    const { balance, symbol } = useBNB(address);

    const minAllow = SITE_MODE === 'test' ? 1 : 5;

    const [bal, setBal] = useState<number | string>(0);
    const [busd, setBusd] = useState<number | string>(0);
    const [lowBUSD, setLowBUSD] = useState<boolean>(!!0);
    const [lowBNB, setLowBNB] = useState<boolean>(!!0);

    const checkLowBalance = () => {
        if(Number(bal) < minAllow) {
            setLowBUSD(!!1)
         } else { 
            setLowBUSD(!!0);
         }
        if(Number(busd) < minAllow) {
            setLowBNB(!!1)
         } else { 
            setLowBNB(!!0);
         }
    };

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
            const { balance } = await getBUSD(address);
            setBusd(balance);
        };
        fetchBusd();
    }, [address]);
    
    useEffect(() => {
        const fetchBusd = async () => {
            const { balance } = await getBUSD(address);
            setBusd(balance);
        };
        fetchBusd();
    }, [address]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-6 space-y-6 md:space-y-0 md:space-x-6">
            {/* Left Section */}
            <div className="w-full md:w-2/5 p-6 rounded-lg shadow-lg text-white">
                <h1 className="text-xl font-bold mb-4">Level 2 Decentralized Matrix</h1>

                <div className="py-5">
                    <div className="mb-2">
                        <p className="block text-sm font-semibold mb-1 text-center py-2">Upline</p>
                        <div className="w-full px-4 py-2 rounded-lg bg-gray-500 flex justify-center font-medium">1</div>
                    </div>

                    <div className="mb-2 flex items-center justify-start gap-2">
                        <label className="block text-sm font-medium mb-1">Wallet:</label>
                        <div className="flex items-center font-medium justify-between px-4 py-2 gap-3">
                            <span>{shortenHexString(address || "")}</span>
                            <button className="text-blue-500">Copy</button>
                        </div>
                    </div>

                    <div className="mb-2 flex items-center justify-start gap-2">
                        <label className="block text-sm font-medium mb-1">Busd balance:</label>
                        <div className="flex items-center font-medium justify-between px-4 py-2 gap-3">
                            <span className="">{symbol}</span>
                            <span>
                                {Formatter(bal, {
                                    type: "d",
                                    decimalOptions: { n: 8, m: 8 },
                                })}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-5">
                        <Button
                            onClick={() => setStage(0)}
                            className="px-4 py-2 rounded-full bg-gray-300 text-black font-semibold hover:bg-gray-400"
                        >
                            Back
                        </Button>
                        <Button
                            disabled={lowBUSD || lowBNB}
                            className="px-4 py-2 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800"
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <RightSide />
        </div>
    );
};

export default LevelOne;
