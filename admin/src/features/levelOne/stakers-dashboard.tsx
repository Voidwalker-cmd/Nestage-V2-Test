import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StakersTable } from "@/components/organisms/stakers-table"
import { mockStakers } from "@/lib/data/mock-stakers"
import type { Staker } from "@/lib/types/staker"

export function StakersDashboard() {
  const [activeTab, setActiveTab] = useState("all")

  const filterStakers = (status: string): Staker[] => {
    if (status === "all") return mockStakers
    return mockStakers.filter((staker) => staker.status === status)
  }

  return (
    <div className="py-1">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Stakers</TabsTrigger>
          <TabsTrigger value="passed">Passed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="achieved">Achieved</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <StakersTable data={filterStakers("all")} type="all" />
        </TabsContent>
        <TabsContent value="passed">
          <StakersTable data={filterStakers("passed")} type="passed" />
        </TabsContent>
        <TabsContent value="upcoming">
          <StakersTable data={filterStakers("upcoming")} type="upcoming" />
        </TabsContent>
        <TabsContent value="achieved">
          <StakersTable data={filterStakers("achieved")} type="achieved" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

