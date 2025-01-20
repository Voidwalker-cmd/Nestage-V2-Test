"use client";

// import { useWeb3Store } from "@/store";
import * as T from "../types";
import { units } from "@/lib";
import { toBigInt } from "ethers";
import { bsc, bscTestnet } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { client } from "@/components/molecules/ConnectWallet";
import { NETWORK_MODE, nestageAddress } from "@/config";
import { useReadContract } from "thirdweb/react";

export const useGetStakers = (): T.ParsedStakersData[] => {
  const activeChainT = bscTestnet;
  const activeChainM = bsc;

  const contract = getContract({
    client: client,
    address: nestageAddress!,
    chain: NETWORK_MODE === "mainnet" ? activeChainM : activeChainT,
  });
  // const stakers: T.stakersData[] = await contract?.call("getAllStakes");

  const { data: stakers } = useReadContract({
    contract,
    method:
      "function getAllStakes() view returns ((uint256 id, uint256 amount, uint256 startDate, uint256 endDate, uint256 profit, address staker)[])",
    params: [],
  });

  
  try {
    const parsedStakers = stakers?.map(
      (staker): T.ParsedStakersData => ({
        staker: staker.staker,
        amount: units(staker.amount, "ether"),
        startDate: Number(toBigInt(staker.startDate)),
        endDate: Number(toBigInt(staker.endDate)),
        profit: units(staker.profit, "ether"),
      })
    );

    return parsedStakers || [];
  } catch (error) {
    console.log(error);
    //   dispatch(setCheckState({ state: "not-found" }));
    return [];
  }
};

// export const setBalance = () =>
