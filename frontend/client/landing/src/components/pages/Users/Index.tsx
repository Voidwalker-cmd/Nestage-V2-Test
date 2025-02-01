"use client"
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Loader2} from "lucide-react";
import {useEffect, useState} from "react";
import {useWeb3Store} from "@/store";
import {getProfit} from "@/functions";
import {Formatter} from "@/utils";
import {getReferrerProfits} from "@/actions";
import {LevelStatus} from "@/components/molecules/LevelStatus";
import {useAuthStore} from "@/store/auth";
import {SiteUrl} from "@/functions/site";
import CopyBtn from "@/components/molecules/CopyBtn";
import {useGetStakers} from "@/hooks/useWeb3";


const UserIndex = () => {
  const address = useWeb3Store((state) => state.address);
  const user = useAuthStore((state) => state.user)
  const stakers = useGetStakers();
  
  const [lvlOne, setLvlOne] = useState(0)
  const [lvlTwo, setLvlTwo] = useState(0)
  const [balLoading, setBalLoading] = useState(!!1)
  
  const getBalances = async () => {
    const one = await levelOne()
    const two = await levelTwo()
    
    if (one && two) {
      setBalLoading(!!0)
    }
  }
  
  const levelOne = async () => {
    let profit = 0, p = 0;
    const staker = await getProfit(stakers, address)
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
    getBalances()
  }, []);
  
  return (
    <>
      <Card className="!p-3">
        <div className="!grid !grid-cols-4 lg:!grid-cols-12 !gap-3 lg:!gap-5">
          <Card className="!w-auto !col-span-4 lg:!col-span-4">
            <CardHeader>
              <CardDescription>Total Earnings</CardDescription>
              <CardTitle>{balLoading ? <Loader2
                className="h-5 w-5 animate-spin"/> : totalProfit() === 0 ? "$0" : `${Formatter(totalProfit(), {type: "c"})}`}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="!w-auto !col-span-4 lg:!col-span-4">
            <CardHeader>
              <CardDescription>Level One</CardDescription>
              <CardTitle>{balLoading ? <Loader2
                className="h-5 w-5 animate-spin"/> : lvlOne === 0 ? "$0" : `${Formatter(lvlOne, {type: "c"})}`}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="!w-auto !col-span-4 lg:!col-span-4">
            <CardHeader>
              <CardDescription>Level Two</CardDescription>
              <CardTitle>{balLoading ? <Loader2
                className="h-5 w-5 animate-spin"/> : lvlTwo === 0 ? "$0" : `${Formatter(lvlTwo, {type: "c"})}`}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="!grid !grid-cols-6 lg:!grid-cols-12 !gap-3 lg:!gap-5 !mt-2">
          <Card
            className="!border-0 !w-auto !col-span-3 lg:!col-span-3 !bg-transparent dark:!bg-inherit !shadow-none dark:!shadow">
            <CardHeader>
              <CardDescription>Status</CardDescription>
              <CardTitle>
                <LevelStatus levelOne={lvlOne} levelTwo={lvlTwo}/>
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            className="!border-0 !w-auto !col-span-3 lg:!col-span-9 !bg-transparent dark:!bg-inherit !shadow-none dark:!shadow">
            <CardHeader>
              <div className="!flex !justify-start lg:!justify-end">
                <div>
                  <CardDescription>Link</CardDescription>
                  <CardTitle>{user.code ?
                    <span className={"flex items-center gap-1 lg:gap-3"}>{`${SiteUrl}/?ref=${user.code}`} <CopyBtn
                      value={`${SiteUrl}/?ref=${user.code}`}/></span> :
                    <p className="text-sm italic text-gray-500 dark:text-gray-300">Activate Level Two to get
                      Link.</p>}</CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>
        
        </div>
      </Card>
    </>
  )
}

export default UserIndex