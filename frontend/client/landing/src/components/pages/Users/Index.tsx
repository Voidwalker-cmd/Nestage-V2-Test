"use client"
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Loader2} from "lucide-react";
import {Formatter} from "@/utils";
import {LevelStatus} from "@/components/molecules/LevelStatus";
import {useAuthStore} from "@/store/auth";
import {SiteUrl} from "@/functions/site";
import CopyBtn from "@/components/molecules/CopyBtn";
import {useUserContext} from "@/context/UserContext";


const UserIndex = () => {
  const user = useAuthStore((state) => state.user)
  
  const {balLoading, totalProfit, lvlOne, lvlTwo} = useUserContext()
  
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
                <LevelStatus levelOne={lvlOne} levelTwo={user.code}/>
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