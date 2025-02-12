"use client"

import Image from "next/image"
import {Static} from '@/assets/image';
import useDeviceSize from "@/hooks/useMediaQuery";
import ConnectWallet from "../molecules/ConnectWallet";
import GradientText from "@/components/atoms/GradientText";

const Hero = () => {
  const size = useDeviceSize();
  
  return (
    <div
      className="container mx-auto px-2 lg:px-10 inline-flex lg:flex items-center justify-center gap-5 h-[70vh] lg:h-auto lg:max-h-screen py-20 ">
      <div
        className="z-10 lg:z-0 pt-2 lg:pt-0 text-center lg:text-left max-w-lg flex flex-col items-center lg:items-start gap-5">
        <h4 className="text-white tracking-wide text-base lg:text-xl font-semibold leading-normal inline"
            data-aos="fade-up" data-aos-duration="1500">Nestage is an innovative platform combining <GradientText
          animationSpeed={3}
        >
          DeFi Staking and affiliate marketing
        </GradientText> through <GradientText
          animationSpeed={3.5}
        >
          decentralized networks and smart contracts
        </GradientText>, offering transparency and security. Join Nestage to transform your cryptocurrency earning and
          staking experience.</h4>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
          <ConnectWallet state="fill"/>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500"
           className="absolute lg:relative flex items-center justify-center ml-0 lg:ml-5">
        <Image src={Static.HeroImg} alt="hero" width={size === 'lg' ? 500 : 1000} height={size === 'lg' ? 250 : 500}/>
      </div>
    </div>
  )
}

export default Hero