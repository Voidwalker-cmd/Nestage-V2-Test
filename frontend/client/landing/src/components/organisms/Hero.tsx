"use client"

import Image from "next/image"
import { Static } from '@/assets/image';
import useDeviceSize from "@/hooks/useMediaQuery";
import ConnectWallet from "../molecules/ConnectWallet";

const Hero = () => {
    const size = useDeviceSize();

    return (
        <div className="container mx-auto px-10 inline-flex lg:flex items-center justify-center gap-5 h-[70vh] lg:h-auto lg:max-h-screen py-20 "> 
            <div className="z-10 lg:z-0 pt-2 lg:pt-0 text-center lg:text-left max-w-lg flex flex-col items-center lg:items-start gap-5">
                <h4 className="text-white tracking-wide font-semibold leading-normal">Nestage is an innovative platform combining DeFi Staking and affiliate marketing through decentralized networks and smart contracts, offering transparency and security. Join Nestage to transform your cryptocurrency earning and staking experience.</h4>
                <ConnectWallet state="fill" />
                {/* <p className="text-white">{address}</p> */}
            </div>
            <div className="absolute lg:relative flex items-center justify-center ml-0 lg:ml-5"> 
                <Image src={Static.HeroImg} alt="hero" width={size === 'lg' ? 500 : 1000} height={size === 'lg' ? 250 : 500} />
            </div>
        </div>
    )
}

export default Hero