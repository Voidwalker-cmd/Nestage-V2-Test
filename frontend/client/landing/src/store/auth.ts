"use client"

import {create} from 'zustand';
import * as T from "@/types"
import {defaultRefResponse} from "@/const";

export const useAuthStore = create<T.AuthStore>((set) => ({
  isAuth: !!0,
  
  stakers: [],
  
  user: defaultRefResponse,
  
  setIsAuth: (isAuth: boolean) => set({isAuth}),
  
  setUser: (user: T.getSelfRefResponse) => set({user, ...user}),
  
  setStakers: (stakers: T.ParsedStakersData[]) => set({stakers})
}))