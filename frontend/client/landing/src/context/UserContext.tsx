"use client"
import {useWeb3Store} from "@/store";
import {createContext, useContext, useEffect, useState} from "react";
import {getReferrerProfits, getStakerInfo} from "@/actions";
import {useAuthStore} from "@/store/auth";
import {getProfit} from "@/functions";
import * as T from "@/types"
import {useAuthContext} from "@/context/AuthContext";

interface UserContextType {
  stakers: [] | T.ParsedStakersData[] | undefined;
  balLoading: boolean;
  lvlOne: number;
  lvlTwo: number;
  getBalances: () => void;
  totalProfit: () => number;
  stakesLoading: boolean
  // getProfit: (stakers: T.ParsedStakersData[], address: string) => Promise<number[]>;
  
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: React.ReactNode }) => {
  const address = useWeb3Store((state) => state.address);
  const setUser = useAuthStore((state) => state.setUser)
  // const stakers = useGetStakers();
  const {stakeItems: stakers, stakesLoading} = useAuthContext()
  
  
  const getUserInfo = async () => {
    const res = await getStakerInfo(address)
    setUser(res)
  }
  
  const [lvlOne, setLvlOne] = useState(0)
  const [lvlTwo, setLvlTwo] = useState(0)
  const [balLoading, setBalLoading] = useState(!!1)
  
  const getBalances = async () => {
    if (stakers) {
      if (stakers?.length && address) {
        const one = await levelOne()
        const two = await levelTwo()
        
        if (one && two) {
          setBalLoading(!!0)
        }
      }
    } else {
      setBalLoading(!!0)
    }
  }
  
  const levelOne = async () => {
    let profit = 0, p = 0;
    const staker = await getProfit(stakers!, address)
    for (let i = 0; i < staker.length; i++) {
      p = Number(staker[i]?.profit)
      profit = profit + p;
    }
    const t = isNaN(profit) ? 0 : profit;
    setLvlOne(t);
    return !!1
  };
  
  const levelTwo = async () => {
    const res = await getReferrerProfits(address)
    setLvlTwo(Number(res))
    return !!1
  }
  
  const totalProfit = () => lvlOne + lvlTwo
  
  useEffect(() => {
    // alert(`${address} - ${stakers.length}`)
    getBalances()
  }, [stakers, address]);
  
  useEffect(() => {
    if (address) getUserInfo()
  }, [address]);
  
  const value = {
    stakers,
    balLoading,
    lvlOne,
    lvlTwo,
    totalProfit,
    getBalances,
    stakesLoading,
    // levelOne,
  }
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AppProvider");
  }
  return context;
};