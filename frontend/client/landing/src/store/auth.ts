"use client"

import {create} from 'zustand';
import * as T from "@/types"
import {defaultRefResponse} from "@/const";

export const useAuthStore = create<T.AuthStore>((set) => ({
  isAuth: !!0,
  
  stakers: [],
  
  points: 0,
  
  user: defaultRefResponse,
  
  setIsAuth: (isAuth: boolean) => set({isAuth}),
  
  setUser: (user: T.getRefResponse) => set({user, ...user}),
  
  setStakers: (stakers: T.ParsedStakersData[]) => set({stakers}),
  
  setPoints: (points: number) => set({points})
}))