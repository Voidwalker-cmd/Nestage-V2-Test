"use client"

import { create } from 'zustand';
import * as T from "@/types"

export const useWeb3Store = create<T.web3Store>((set) => ({
    address: "",
    balance: "",
    symbol: "",

    setAddress: (address: string) => set({ address }),
    setBalance: (balance: string) => set({ balance }),
    setSymbol: (symbol: string) => set({ symbol }),
}))