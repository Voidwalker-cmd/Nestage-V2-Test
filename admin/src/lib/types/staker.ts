export type Staker = {
  sn: number
  wallet: string
  userid: string
  amount: number
  profit: number
  startdate: Date
  enddate: Date
  daysleft: string
  status: "active" | "passed" | "upcoming" | "achieved"
}


export interface Referral {
  sn: number;
  wallet: string;
  userid: string;
  referralCode: string
  firstUpline: number;
  secondUpline: number;
  thirdUpline: number;
}


export interface Stats {
  date: Date;
  levelone: number;
  levelTwo: number;
}