"use client"
import * as T from "../types";

export const searchStringInArray = (
  array: T.ParsedStakersData[],
  searchString: string
): boolean => {
  const result = array.filter((obj) => obj.staker === searchString);
  const res = result.length ? !!1 : !!0;
  return res;
};


const url = window.location.protocol + "//" + window.location.hostname;
const port = window.location.port ? `:${window.location.port}` : "";

export const SiteUrl = `${url}${port}`;