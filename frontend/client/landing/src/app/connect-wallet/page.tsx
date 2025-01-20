"use client"

import GoBackBtn from "@/components/molecules/GoBackBtn"
import ModalDetails from "@/components/molecules/ModalDetails"
import { useWeb3Store } from "@/store";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Preloader from "@/components/molecules/Loader";
// import { useActiveWalletConnectionStatus } from "thirdweb/react";

export default function Page() {
    const router = useRouter();
    // const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();

    const address = useWeb3Store((state) => state.address);
    const [isClient, setIsClient] = useState(false);

    // // useEffect(() => {
    // //     // Set isClient to true when the component mounts
    // //     // setIsClient(true);
    // // }, []);

    useEffect(() => {
        // if (status === "disconnected") router.push("/");
        if (address === "") router.push("/");
    }, [address]);

    useEffect(() => {
        setIsClient(!!1)
    }, [])

    if (!isClient) return null

    return (
        <div className="relative lg:h-screen bg-[#021009]">
            <div
                className="text-white fixed -top-48 -right-48 w-[600px] h-[600px] bg-gradient-radial from-[#0B4B29] via-transparent to-transparent opacity-50 rounded-full pointer-events-none"
            ></div>
            <GoBackBtn />
            <div className="flex justify-center items-center lg:items-center w-full border-none lg:border rounded-lg py-3 lg:py-10">
                {address !== "" ? <ModalDetails /> : <Preloader />}
            </div>
        </div>
    );
}
