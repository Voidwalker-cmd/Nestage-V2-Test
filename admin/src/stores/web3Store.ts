import {create} from 'zustand'
import * as T from "@/types";

export const useWeb3Store = create<T.Web3State>((set) => ({
    isConnected: !!0,
    masterAddress: "",
    refAddress: "",
    setIsConnected: (isConnected: boolean) => set({isConnected}),
    setMasterAddress: (masterAddress: string) => set({masterAddress}),
    setRefAddress: (refAddress: string) => set({refAddress})
}))
