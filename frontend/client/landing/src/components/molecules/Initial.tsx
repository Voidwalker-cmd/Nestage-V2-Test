"use client"

import { Button } from "../ui/button"
import * as T from "@/types";

    const Initial = ({ setStage }: T.ModalProps) => {
  return (
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full lg:max-w-2xl h-full px-10 lg:px-0 py-5 lg:py-0 mt-5">
          <div className="w-full px-10 mx-auto bg-gray-800 text-white rounded-xl shadow-lg p-6">
              <h2 className="text-center text-xl font-bold mb-1">LEVEL 1</h2>
              <p className="text-center text-base font-medium mb-4">Nestage DeFi Staking</p>
              <ul className="py-5 space-y-2 text-base font-normal">
                  <li>• Minimum entry fee 10 BUSD</li>
                  <li>• 30% profit on your stake</li>
                  <li>• Instant transactions</li>
                  <li>• Zero effort required</li>
                  <li>• Fixed profit and fall protection</li>
                  <li>• Low network commissions</li>
              </ul>
              <Button onClick={() => setStage(1)} className="mt-6 w-full bg-green-900 hover:bg-green-800 text-white font-semibold text-sm py-2 px-4 rounded-full transition">
                  select
              </Button>
          </div>

          <div className="w-full px-10 mx-auto bg-gray-800 text-white rounded-xl shadow-lg p-6">
              <h2 className="text-center text-xl font-bold mb-1">LEVEL 2</h2>
              <p className="text-center text-base font-medium mb-4">Nestage Decentralized Matrix</p>
              <ul className="py-5 space-y-2 text-base font-normal">
                  <li>• Entry fee 5 BUSD</li>
                  <li>• Network-based earnings</li>
                  <li>• Transparency and automation</li>
                  <li>• 3 level matrix</li>
                  <li>• Earnings are not limited</li>
                  <li>• Network Growth</li>
              </ul>
              <Button onClick={() => setStage(2)} className="mt-6 w-full bg-green-900 hover:bg-green-800 text-white font-semibold text-sm py-2 px-4 rounded-full transition">
                  select
              </Button>
          </div>
      </div>
  )
}

export default Initial