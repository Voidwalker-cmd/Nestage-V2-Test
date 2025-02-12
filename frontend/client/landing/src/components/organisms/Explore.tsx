import {Static} from "@/assets/image"
import useDeviceSize from "@/hooks/useMediaQuery"
import Image from "next/image"
import {Button} from "../ui/button"

const Explore = () => {
  const size = useDeviceSize()
  return (
    <div className="py-20">
      <div
        className="flex flex-col lg:flex-row gap-5 lg:gap-8 justify-center items-center relative container mx-auto px-5 text-center">
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-offset="100">
          <Image src={Static.Whitepaper} alt="whitepaper" width={size === 'lg' ? 300 : 1000}
                 height={size === 'lg' ? 100 : 500}/>
        </div>
        <div
          className="lg:max-w-md pl-0 lg:pl-10 lg:text-left mt-7 lg:my-0 flex flex-col items-start justify-center gap-2">
          <div className="">
            <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="100"
                className="tracking-widest text-2xl lg:text-3xl font-bold text-white text-left lg:text-center">
              Explore our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8CC34B] to-[#FFEB3B]">NST Token</span> Whitepaper
            </h1>
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="100"
               className="text-white py-5 tracking-wide text-pretty text-base text-left">Dive into our comprehensive
              whitepaper to understand the full scope of the NST token. This document provides detailed insights into
              our security features, tokenomics, and vision.</p>
          </div>
          <Button
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-offset="100"
            className="hover:bg-[#EF9414] hover:text-white bg-[#EF9414] text-white rounded-lg border border-gray-500 py-2 text-semibold">Learn
            More</Button>
        </div>
      </div>
    </div>
  )
}

export default Explore