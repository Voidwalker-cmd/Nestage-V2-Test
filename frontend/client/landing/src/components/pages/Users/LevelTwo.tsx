"use client"

import { useState } from "react"

// CardDescription,
// CardHeader,
// CardTitle,
import {
  Card,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LevelTwo = () => {
  const [loaded] = useState<boolean>(!!0)
  return (
    <div className="space-y-5">
        <h1 className="font-bold text-xl">Level Two</h1>
        <div>
            {loaded ? (<Card className="!h-80 lg:!h-[500px]">

            </Card>) : (
              <Skeleton className="w-full !h-80 lg:!h-[500px] rounded-lg" />
            )}
        </div>
    </div>
  )
}

export default LevelTwo