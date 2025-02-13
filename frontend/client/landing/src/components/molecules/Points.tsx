"use client"
import {useAuthStore} from "@/store/auth";
import {Formatter} from "@/utils";

export const Points = () => {
  const points = useAuthStore((state) => state.points)
  return (
    <>
      {points > 0 ? Formatter(points, {type: "d", decimalOptions: {n: 0, m: 0}}) : 0} pts
    </>
  );
};