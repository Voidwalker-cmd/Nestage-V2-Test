import {mockReferrals} from "@/lib/data/mock-stakers"
import {RefferalTable} from "@/components/organisms/referral-table.tsx";

export function ReferralDashboard() {
  return (
    <div className="py-1">
      <RefferalTable data={mockReferrals} />
    </div>
  )
}

