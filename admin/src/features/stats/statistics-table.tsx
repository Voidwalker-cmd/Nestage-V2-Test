import {mockStatData} from "@/lib/data/mock-stakers"
import {StatsTable} from "@/components/organisms/stats-table";

export function StatisticsTable() {
  return (
    <div className="py-1">
      <StatsTable data={mockStatData} />
    </div>
  )
}

