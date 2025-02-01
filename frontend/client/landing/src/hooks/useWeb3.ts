"use client";

// import { useWeb3Store } from "@/store";
import * as T from "../types";
import {units} from "@/lib";
import {toBigInt} from "ethers";
import {bsc, bscTestnet} from "thirdweb/chains";
import {getContract} from "thirdweb";
import {client} from "@/components/molecules/ConnectWallet";
import {nestageAddress, NETWORK_MODE} from "@/config";
import {useReadContract} from "thirdweb/react";
// import {useAuthStore} from "@/store/auth";

export const useGetStakers = (): T.ParsedStakersData[] | [] => {
  // // const setStakers = useAuthStore((state) => state.setStakers)
  const contract = getContract({
    client: client,
    address: nestageAddress!,
    chain: NETWORK_MODE === "mainnet" ? bsc : bscTestnet,
  });
  // const stakers: T.stakersData[] = await contract?.call("getAllStakes");

  const { data: stakers } = useReadContract({
    contract,
    method:
      "function getAllStakes() view returns ((uint256 id, uint256 amount, uint256 startDate, uint256 endDate, uint256 profit, address staker)[])",
    params: [],
  });

  
  try {
    const parsedStakers: T.ParsedStakersData[] | undefined = stakers?.map(
      (staker): T.ParsedStakersData => ({
        staker: staker.staker,
        amount: units(staker.amount, "ether"),
        startDate: Number(toBigInt(staker.startDate)),
        endDate: Number(toBigInt(staker.endDate)),
        profit: units(staker.profit, "ether"),
      })
    );
    // setStakers(parsedStakers || [])
    return parsedStakers || [];
  } catch (error) {
    console.log(error);
    //   dispatch(setCheckState({ state: "not-found" }));
    // setStakers([])
    return []
  }
};

// export const setBalance = () =>
