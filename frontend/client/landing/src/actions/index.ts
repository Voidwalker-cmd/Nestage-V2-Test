"use client"
import { Axios } from "@/lib/Axios/client"

export const getReferrals = async ({address}: {address: string}) => {
    try {
        const { data } = await Axios.get(`get-referrals?address=${address}`)
        const { status } = data
        return status === 200 ? !!1 : !!0
    } catch (e) {
        console.log({e})
        return !!0
    }
} 