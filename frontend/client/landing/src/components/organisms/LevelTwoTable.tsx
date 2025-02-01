"use client"

import {FC} from "react";
import {Card, CardDescription, CardHeader} from "../ui/card";
import {useAuthStore} from "@/store/auth";
import * as T from "@/types";
import LevelTwoNewRefModal from "@/components/organisms/LevelTwoNewRefModal";

const ReferralStats: FC<{ user: T.getSelfRefResponse }> = ({user}) => {
  return (
    <div className="p-0 lg:px-8 lg:py-4 flex items-center justify-center">
      {user.code !== "" ? (
        <Card className="!rounded-xl !shadow-lg !p-6 !w-full !max-w-2xl">
          {/* Current User */}
          <CardHeader className="!text-center !mb-4">
            <h2 className="text-2xl font-bold">Your Referral Stats</h2>
          </CardHeader>
          
          {/* Upline */}
          {user.uplineCode && (
            <Card className="!bg-transparent !p-4 !rounded-lg !mb-6">
              <CardHeader className="!text-lg !font-semibold !text-blue-700 !px-4 !pb-1">Direct Upline</CardHeader>
              <CardDescription className="!text-blue-600 !px-4">Code: {user.uplineCode}</CardDescription>
            </Card>
          )}
          
          {/* Downlines Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="!p-4 !rounded-lg !text-center">
              <h3 className="text-lg font-semibold text-green-700">1st Level</h3>
              <p className="text-3xl font-bold text-green-600">{user.downlines.firstLevel}</p>
            </Card>
            
            <Card className="!p-4 !rounded-lg !text-center">
              <h3 className="text-lg font-semibold text-yellow-700">2nd Level</h3>
              <p className="text-3xl font-bold text-yellow-600">{user.downlines.secondLevel}</p>
            </Card>
            
            <Card className="!p-4 !rounded-lg !text-center">
              <h3 className="text-lg font-semibold text-red-700">3rd Level</h3>
              <p className="text-3xl font-bold text-red-600">{user.downlines.thirdLevel}</p>
            </Card>
          </div>
        </Card>
      ) : (
        <Card className="!rounded-xl !shadow-lg !p-6 !w-full !max-w-2xl">
          <CardHeader className="!text-center !mb-4">
            <h2 className="text-2xl font-bold">Your Referral Stats</h2>
          </CardHeader>
          <CardDescription className="!text-center !mb-6 !flex flex-col !justify-center !items-center gap-3">
            <span className="italic font-bold">You haven't referred any users yet.</span>
            <span className="italic">You have to Activate Level Two to get your Referral Code/Link.</span>
            <LevelTwoNewRefModal/>
          </CardDescription>
        </Card>
      )}
    </div>
  );
};

export default function LevelTwoTable() {
  const userData = useAuthStore((state) => state.user)
  return <ReferralStats user={userData}/>;
}