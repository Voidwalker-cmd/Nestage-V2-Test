import {BigNumberish} from "ethers";
import {Dispatch, ReactNode, SetStateAction} from "react";

export interface IconProps {
  className?: string;
}

export interface SocialIconProps extends IconProps {
  url: string;
  network: string;
}

export interface web3Store {
  address: string;
  balance: string;
  symbol: string;
  // contract: ethers.Contract | unknown;
  // connect: () => void;
  // status: string;
  // getMinings: () => Promise<any[]>;
  // newMining: (form: FormData) => Promise<MiningResult>;
  // newReferral: (form: refData) => Promise<MiningResult>;
  // getBUSDBalance: (walletAddress: string) => Promise<string>;
  // handleApprove: (amount: number) => Promise<void>;
  setAddress: (address: string) => void;
  setBalance: (balance: string) => void;
  setSymbol: (symbol: string) => void;
}

export interface Web3ContextProps {
  children: ReactNode;
}

export interface ParsedStakersData {
  staker: string;
  id?: number;
  uuid?: string;
  amount: string;
  amtUSD?: number;
  pftUSD?: number;
  startDate: number;
  endDate: number;
  profit: string;
}

export interface stakersData {
  amount: string;
  endDate: BigNumberish;
  staker: string;
  planId: BigNumberish;
  profit: string;
  startDate: BigNumberish;
}

export interface MiningResult {
  status: string;
  message: string;
}

export interface refData {
  referral?: string;
  amount: string;
  address: string;
  place: string;
}

export interface ModalProps {
  setStage: Dispatch<SetStateAction<number>>;
}

export interface DecimalOptions {
  n?: number;
  m?: number;
}

export interface FormatterOptions {
  type?: "c" | "d";
  currency?: string;
  decimalOptions?: DecimalOptions;
}

export interface StakingData {
  planId: number;
  rawAmount?: number;
  uuid: string;
  amount: string;
  startDate: string;
  endDate: string;
  profit: string;
  address: string;
  place: string;
}

export interface payUpline {
  hasUpline: boolean;
  uplineAddress: string;
  pay?: BigNumberish;
}

export interface Upline {
  id: number;
  address: string;
  code: string;
  uplinkId: number | null;
}

export interface Downline {
  firstLevel: number;
  secondLevel: number;
  thirdLevel: number;
}

export interface getRefResponse {
  id: number;
  address: string;
  code: string;
  uplinkId: number;
  uplineCode: string | null;
  userID: number;
  upline: number;
  uplines: Array<Upline> | [];
  downlines: Downline;
}

export interface rawRetRefByCodeResponse
  extends Omit<getRefResponse, "downlines"> {
  additionalProperty?: string;
}

export interface getRefByCodeResponse {
  data: rawRetRefByCodeResponse;
  status: number
}

export interface PointResponse {
  points: number
}

export interface AuthStore {
  isAuth: boolean;
  points: number;
  stakers: ParsedStakersData[] | []
  user: getRefResponse;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: getRefResponse) => void;
  setStakers: (stakers: ParsedStakersData[]) => void;
  setPoints: (points: number) => void;
}

export interface bscScan {
  data: {
    status: string;
    message: string;
    result: {
      status: string;
    };
  };
  status: number
}


export interface getAdminAddressResponse {
  data: {
    admin: {
      id: number;
      adminId: number;
      type: string;
      address: string;
      active: boolean;
    };
    refAdmin: {
      id: number;
      adminId: number;
      type: string;
      address: string;
      active: boolean;
    };
  };
  status: number;
}

export interface createRefParams {
  address: string;
  code?: string;
}

export type Notification = {
  id: number;
  uuid: string;
  title: string;
  message: string;
};

export interface NotificationState {
  notifications: Notification[];
  address: string | null;
  socket: WebSocket | null;
  
  setNotifications: (notifications: Notification[]) => void;
  setAddress: (address: string) => void;
  setSocket: (socket: WebSocket) => void
  markAsRead: (uuid: string) => void;
}

export type Investment = {
  id: number
  amount: string
  startDate: number
  endDate: number
  profit: string
}

export type tGetTempResponse = {
  code: string,
  lvlOne: boolean
}