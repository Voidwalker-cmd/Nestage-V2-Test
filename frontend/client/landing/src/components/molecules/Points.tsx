"use client"
import {useAuthStore} from "@/store/auth";
import {Formatter} from "@/utils";

export const Points = () => {
  const user = useAuthStore((state) => state.user)
  return (
    <>
      {user.points > 0 ? Formatter(user.points, {type: "d", decimalOptions: {n: 0, m: 0}}) : 0} pts
    </>
  );
};