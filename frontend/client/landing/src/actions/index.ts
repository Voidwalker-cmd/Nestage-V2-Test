"use client"
import {Axios} from "@/lib/Axios/client"
import * as T from "@/types"
import {defaultRefResponse} from "@/const";

export const getReferrals = async ({address}: { address: string }) => {
  try {
    const {data} = await Axios.get(`referral?address=${address}`)
    const {status} = data
    return status === 200 ? !!1 : !!0
    // T-ODO: return to above code
    // return !!1
  } catch (e) {
    console.log({e})
    return !!0
  }
}

export const getReferrerProfits = async (address: string) => {
  try {
    const {data} = await Axios.get(`referral?mode=pay;address=${address}`)
    const {status, data: d}: { data: number | string; status: number } = data
    return status === 200 ? d : 0
  } catch (e) {
    console.log({e})
    return 0
  }
}

export const getStakerInfo = async (
  address: string
) => {
  try {
    const {data} = await Axios.get(`referral?mode=getRef;address=${address}`)
    const {status, data: d}: { data: T.getSelfRefResponse | string; status: number } = data
    return status === 200 ? d as T.getSelfRefResponse : defaultRefResponse
  } catch (e) {
    console.log({e})
    return defaultRefResponse
  }
}

export const getAuth = async (address: string) => {
  try {
    const {data} = await Axios.get(`user?address=${address}`)
    const {status} = data
    return status === 200 ? !!1 : !!0
  } catch (e) {
    console.log({e})
    return !!0
  }
}