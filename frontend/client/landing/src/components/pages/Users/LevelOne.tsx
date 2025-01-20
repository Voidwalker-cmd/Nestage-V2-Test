"use client"

import { useState } from "react"

// CardDescription,
// CardHeader,
// CardTitle,
import {
  Card,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LevelOne = () => {
  const [loaded, setLoaded] = useState<boolean>(!!0)
  return (
    <div className="space-y-5">
        <h1 className="font-bold text-xl">Level One</h1>
        <div>
            {loaded ? (<Card className="!h-80 lg:!h-[500px]">

            </Card>) : (
              <Skeleton className="w-full !h-80 lg:!h-[500px] rounded-lg z-[-1]" />
            )}
        </div>
    </div>
  )
}

export default LevelOne