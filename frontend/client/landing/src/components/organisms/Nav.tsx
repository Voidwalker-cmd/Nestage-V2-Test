"use client"

import { Static } from "@/assets/image"
import Image from "next/image"
import { MenuIcon } from "../atoms/Icons"
import useDeviceSize from "@/hooks/useMediaQuery"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ConnectWallet from "../molecules/ConnectWallet"


const Nav = () => {
  const size = useDeviceSize()
  return (
    <div className="flex items-center justify-between w-full gap-1 lg:gap-5 mx-auto py-1 px-2 lg:px-10">
      <div className="flex items-center gap-1 lg:gap-2">
        <Image src={Static.Logo} alt="logo" width={size === 'sm' ? 65 : 85} height={size === 'sm' ? 65 : 85} />
        <h2 className="capitalize text-white tracking-wide lg:tracking-wider font-semibold lg:font-bold text-lg lg:text-2xl">nestage</h2>
      </div>
      <div className="text-white items-center gap-2 justify-center hidden lg:flex">
        <p className="text-semibold">Roadmap</p>
        <p className="text-semibold">Terms of use</p>
        <p className="text-semibold">Docs</p>
      </div>
      <div className="flex items-center gap-2 justify-center z-10">
        <ConnectWallet />
        <p className="hidden lg:inline uppercase text-sm px-3 text-white font-semibold">eng</p>
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="text-white inline-block lg:hidden ml-3 w-7 h-7" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="align-left block">Menu</SheetTitle>
               <SheetDescription className="text-black items-center gap-5 justify-center flex flex-col mt-3">
                  <span className="text-semibold">Roadmap</span>
                  <span className="text-semibold">Terms of use</span>
                  <span className="text-semibold">Docs</span>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

      </div>
    </div>
  )
}

export default Nav