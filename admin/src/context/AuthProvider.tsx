import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate, useLocation} from "@tanstack/react-router";
// import { useWalletStore } from "@/store/walletStore";
import {useAuthStore} from "@/stores/authStore";
import {Loader2} from "lucide-react";
import {useAllUsers, useCheckAuth, useGetAdminAddress, useGetLevelTwoSum, useGetOverview} from "@/hooks/useAuth";
import {useWeb3Store} from "@/stores/web3Store.ts";
import {toast} from "@/hooks/use-toast.ts";
import {useActiveWalletConnectionStatus, useReadContract} from "thirdweb/react";
import {createThirdwebClient, getContract} from "thirdweb";
import * as T from '@/types'
import {units} from "@/lib";
import {toBigInt} from "ethers";
import {bsc, bscTestnet} from "thirdweb/chains";
import {nestageAddress, NETWORK_MODE, CLIENTID} from "@/config";
import {useQuery} from "@tanstack/react-query";


async function fetchStakers(stakers: T.rawStakers[] | []) {
  if (!stakers) return []
  try {
    const parsedStakers: T.ParsedStakersData[] | undefined = stakers?.map(
      (staker): T.ParsedStakersData => ({
        staker: staker.staker,
        amount: units(staker.amount, "ether"),
        startDate: Number(toBigInt(staker.startDate)),
        endDate: Number(toBigInt(staker.endDate)),
        profit: units(staker.profit, "ether"),
      })
    );
    return parsedStakers || [];
  } catch (error) {
    console.log(error);
    return []
  }
}

type UserDetails = {
  id: number;
  uuid: string;
};

export interface allUserTypes {users: UserDetails[]; total: number}

export type OverviewsRaw = {
  month: string;
  data: {
    users: number;
    levelOne: number;
    levelTwo: number;
  }
}

export interface Overviews {
  month: string;
  users: number;
  levelOne: number;
  levelTwo: number;
};

interface AuthContextType {
  loading: boolean;
  checkWallets: () => void;
  lvlOne: number;
  lvlTwo: number;
  lvlOneUSD: number;
  lvlTwoUSD: number;
  getTotalLevelOne: () => void;
  stakeError: Error | null;
  stakesLoading: boolean;
  refetchStakes: () => void;
  getTotalLevelTwo: () => void;
  levelTwoLoading: boolean;
  levelTwoError: Error | null;
  levelTwoRefetch: () => void;
  allUser: UserDetails[];
  totalUsers: number;
  allUserLoading: boolean;
  allUserRefetch: () => void;
  allUserError: Error | null;
  transformOverviewData: () => Overviews[];
  overviewLoading: boolean;
  overviewRefetch: () => void;
  overviewError: Error | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const client = createThirdwebClient({
  clientId: CLIENTID,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const masterAddress = useWeb3Store((state) => state.masterAddress)
  const refAddress = useWeb3Store((state) => state.refAddress)
  const setRefAddress = useWeb3Store((state) => state.setRefAddress)
  const [lvlOne, setLevelOne] = useState(0)
  const [lvlOneUSD, setLevelOneUSD] = useState(0)
  const [lvlTwo, setLevelTwo] = useState(0)
  const [lvlTwoUSD, setLevelTwoUSD] = useState(0)
  const [allUser, setAllUser] = useState<UserDetails[] | []>([])
  const [totalUsers, setTotalUsers] = useState(0)
  
  const navigate = useNavigate();
  const location = useLocation();
  // const { walletAddress } = useWalletStore();
  const [loading, setLoading] = useState(true);
  const [allStakers, setAllStakers] = useState<T.rawStakers[]>([]);
  
  const contract = getContract({
    client: client,
    address: nestageAddress!,
    chain: NETWORK_MODE === "mainnet" ? bsc : bscTestnet,
  });
  
  const {data: rawStakers} = useReadContract({
    contract,
    method:
      "function getAllStakes() view returns ((uint256 id, uint256 amount, uint256 startDate, uint256 endDate, uint256 profit, address staker)[])",
    params: [],
  });
  
  useEffect(() => {
    if (!rawStakers) {
      setAllStakers([])
    } else if (rawStakers) {
      setAllStakers([...rawStakers])
    }
  }, [rawStakers])
  
  const checkAuthMutation = useCheckAuth();
  const {
    data: adminWalletAddress,
    isLoading: isAdminAddressLoading,
    refetch
  } = useGetAdminAddress();
  
  const {data: stakeItems, error: stakeError, isLoading: stakesLoading, refetch: refetchStakes} = useQuery<T.ParsedStakersData[]>({
    queryKey: ["stakeItmes", masterAddress],
    queryFn: () => fetchStakers(allStakers),
    enabled: !!masterAddress,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 30000,
  });
  
  const {
    data: levelTwoData,
    isLoading: levelTwoLoading,
    refetch: levelTwoRefetch,
    error: levelTwoError,
  } = useGetLevelTwoSum(refAddress);
  
  const {
    data: allUsers,
    isLoading: allUserLoading,
    refetch: allUserRefetch,
    error: allUserError,
  } = useAllUsers();
  
  const {
    data: overviewsRaw,
    isLoading: overviewLoading,
    refetch: overviewRefetch,
    error: overviewError,
  } = useGetOverview(masterAddress);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuth) {
          const response = await checkAuthMutation.mutateAsync();
          if (response.message === "ok") {
            setIsAuth(true);
            navigate({to: "/dashboard"})
          } else {
            if (location.pathname !== '/') {
              navigate({to: "/", search: {nexturl: location.pathname}});
            } else {
              navigate({to: "/"})
            }
            return;
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
        if (location.pathname !== '/') {
          navigate({to: "/", search: {nexturl: location.pathname}});
        } else {
          navigate({to: "/"})
        }
        return;
      }
    };
    
    const init = async () => {
      await checkAuth();
      setLoading(false);
    };
    
    init();
  }, [isAuth, navigate, location.pathname, setIsAuth]);
  
  useEffect(() => {
    setAllUser(allUsers?.users ?? [])
    setTotalUsers(allUsers?.total ?? 0)
  }, [allUsers]);
  
  const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();
  
  // console.log({adminWalletAddress, masterAddress, isAdminAddressLoading, lp: location.pathname})
  // useEffect(() => {
  //   if (!isAdminAddressLoading && adminWalletAddress?.admin.address && masterAddress && location.pathname !== '/') {
  //     if (adminWalletAddress?.admin.address !== masterAddress) {
  //       navigate({to: "/", search: {nexturl: location.pathname}});
  //     }
  //   }
  // }, [adminWalletAddress, masterAddress, location.pathname]);
  
  const checkWallets = () => {
    if (status === "connected") {
      if (adminWalletAddress?.admin.address !== masterAddress) {
        toast({
          variant: "destructive",
          title: "Wallet Error!",
          description: "Please switch to the admin wallet to access the dashboard."
        });
        navigate({to: "/", search: {nexturl: location.pathname}});
      }
    }
  }
  
  const transformOverviewData = (): Overviews[] | [] => {
    if(!overviewsRaw) return []
    return overviewsRaw.map(({ month, data }) => ({
      month,
      users: data.users,
      levelOne: data.levelOne,
      levelTwo: data.levelTwo,
    }));
  };
  
  useEffect(() => {
    const x = async () => {
      if (masterAddress && !adminWalletAddress) {
        await refetch()
        checkWallets()
      }
    }
    x()
  }, [masterAddress]);
  
  useEffect(() => {
    setRefAddress(adminWalletAddress?.refAdmin.address ?? "")
  }, [adminWalletAddress]);
  
  const getTotalLevelOne = () => {
    let amount = 0;
    const gs = stakeItems ?? [];
    if (gs.length > 0) {
      gs.forEach((x) => {
        amount += Number(x.amount);
      });
    }
    const amt = Number(amount.toFixed(2));
    const usd = Number(amount.toFixed(2));
    setLevelOne(amt);
    setLevelOneUSD(usd);
  };
  
  const getTotalLevelTwo = () => {
    const amount = levelTwoData?.total ?? 0
    if(amount !== 0) {
      const amt = Number(amount.toFixed(2));
      const usd = Number(amount.toFixed(2));
      setLevelTwo(amt);
      setLevelTwoUSD(usd);
    }
  };
  
  const value = {
    loading,
    checkWallets,
    lvlOne,
    lvlOneUSD,
    getTotalLevelOne,
    stakeError,
    stakesLoading,
    refetchStakes,
    lvlTwo,
    lvlTwoUSD,
    getTotalLevelTwo,
    levelTwoLoading,
    levelTwoError,
    levelTwoRefetch,
    allUser,
    totalUsers,
    allUserLoading,
    allUserRefetch,
    allUserError,
    transformOverviewData,
    overviewLoading,
    overviewRefetch,
    overviewError,
  }
  
  return (
    <AuthContext.Provider value={value}>
      {loading || isAdminAddressLoading ? (
        <div className="bg-gray-100 w-full h-screen flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Loader2 className="size-7 animate-spin text-black"/>
            {isAdminAddressLoading ? <p className="italic font-base">Verifying Wallet address</p> : ""}
          </div>
        </div>) : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
