"use client"
import * as T from "../types";

export const searchStringInArray = (
  array: T.ParsedStakersData[],
  searchString: string
): boolean => {
  const result = array.filter((obj) => obj.staker === searchString);
  return result.length ? !!1 : !!0;
};

export const getProfit = async (
  array: T.ParsedStakersData[],
  searchString: string
) => {
  let result: T.ParsedStakersData[] | [] = []
  if (array.length) {
    result = array.filter((obj: T.ParsedStakersData) => obj.staker === searchString);
    result = await Promise.all(
      result.map(async (x: T.ParsedStakersData, i: number) => {
        // const resa = await Helper.convertToUSD("BNB", x.amount);
        // const resb = await Helper.convertToUSD("BNB", x.profit);
        return {
          id: i + 1,
          // amtUSD: `$${resa.toFixed(2)}` ?? 0,
          // pftUSD: `$${resb.toFixed(2)}` ?? 0,
          ...x,
        };
      })
    );
    return result
  }
  return result
}

export const getLevelOne = (
  array: T.ParsedStakersData[],
  searchString: string
) => {
  const result: T.Investment[] = []
  if (array.length) {
    const x = array.filter((obj: T.ParsedStakersData) => obj.staker === searchString);
    
    if (x.length) {
      for (let i = 0; i < x.length; i++) {
        const {amount, startDate, endDate, profit} = x[i];
        result.push({id: i + 1, amount, startDate, endDate, profit})
      }
      return result
    }
    return result
  }
  return result
}