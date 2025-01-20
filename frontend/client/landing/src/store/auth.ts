"use client"

import { create } from 'zustand';
import * as T from "@/types"

export const useAuthStore = create<T.AuthStore>((set) => ({
    isAuth: !!0,

    setIsAuth: (isAuth: boolean) => set({ isAuth }),
}))