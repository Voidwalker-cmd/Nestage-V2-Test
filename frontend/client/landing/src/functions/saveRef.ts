"use client"

import {Axios} from "@/lib/Axios/client" 

export const saveRef = async (ref: string) => {
  const { data } = await Axios.get(`referral?ref=${ref}`)
  return data
}