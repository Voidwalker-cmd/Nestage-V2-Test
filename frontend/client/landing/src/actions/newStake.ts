"use client";
import {BrowserProvider, Contract, parseUnits} from "ethers";
// import { eth } from "@/lib";
import * as T from "@/types";
import {Axios} from "@/lib/Axios/client";
import {SiteUrl} from "@/functions/site";
import {mAddress, nestageAddress, NETWORK_MODE, nullAddress, tAddress,} from "@/config";
import BUSD_ABI from "@/web3/NestageNw.json";
import PLAIN_BUSD_ABI from "../web3/PlainBUSD_ABI.json";
import {btnState} from "@/components/molecules/LevelOne";
import {btnStateModal} from "@/components/organisms/LevelOneNewStakeModal";
// import { useAuthStore } from "@/store/auth";

const updateBtnState = (newValue: string, place: string) => {
  if (place !== "modal") {
    btnState.value = newValue;
  } else {
    btnStateModal.value = newValue;
  }
};

export const contractAddress = NETWORK_MODE === "testnet" ? tAddress : mAddress;

export const getAdminAddress = async (): Promise<T.getAdminAddressResponse> => {
  const {data, status} = await Axios.get("adminAddress");
  
  return {data: data.data, status};
};

// Function to create a new mining
export const newStake = async (form: T.StakingData) => {
  // const isAuth = useAuthStore((state) => state.isAuth);
  
  // if(!isAuth) return { status: "error", errorMessage: "Wallet not conneted" }
  
  const {data: adminWallets, status} = await getAdminAddress();
  
  if (status !== 200)
    return {status: "error", errorMessage: "Unable to proceed, Try Again!"};
  
  const admin = adminWallets.admin.address;
  
  // dispatch(setTransactionState({ state: "initializing" }));
  // dispatch(getWallets({ blank: 0 }));
  // let result: T.MiningResult = {
  //   isLoading: !!1,
  //   data: null,
  //   error: "x",
  // };
  
  // try {
  // } catch (error) {
  //   const errorMessage = (error as Error).message;
  //   result = {
  //     isLoading: !!0,
  //     data: null,
  //     error: errorMessage,
  //   };
  // }
  
  const {amount, profit, startDate, endDate, address, place} = form;
  try {
    
    const amt = parseUnits(amount.toString(), "ether");
    const prt = parseUnits(profit.toString(), "ether");
    
    let pay = parseUnits("0.0", "ether");
    
    let payUpline: T.payUpline = {
      hasUpline: !!0,
      uplineAddress: nullAddress,
      pay,
    };
    
    // function findUplineByCode(
    //   data: T.getRefResponse,
    //   code: string
    // ): T.Upline | undefined {
    //   return data.uplines.find((upline) => upline.code === code);
    // }
    
    let hasRef = !!0
    let fstUplineAddress = nullAddress
    
    if (!window.location.pathname.includes("/user/")) {
      const refCode = localStorage.getItem("ref");
      if (refCode) {
        const {data: drefs, status} = await Axios.get<T.getRefByCodeResponse>(
          `referral?withcode=${refCode}`
        );
        if (status === 200) {
          fstUplineAddress = drefs?.address;
          
          const bonus =
            SiteUrl.includes("testing") || SiteUrl.includes(":4110")
              ? 0.5
              : 1.5;
          pay = parseUnits(bonus.toString(), "ether");
          payUpline = {
            hasUpline: !!1,
            uplineAddress: fstUplineAddress,
            pay,
          };
          hasRef = !!1
        }
      }
      
      // const upline = findUplineByCode(
      //   refs.payload,
      //   refs.payload.uplineCode
      // );
      
      // if (upline) {
      //   const bonus = SiteUrl.includes("testing") ? 0.5 : 1.5;
      //   pay = parseUnits(bonus.toString(), "ether");
      //   payUpline = {
      //     hasUpline: !!1,
      //     uplineAddress: upline.address,
      //     pay,
      //   };
      // }
    }
    
    // const data = await contract?.call("startNewStake", sending, {
    //   value: amt,
    // });
    
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const contract = new Contract(nestageAddress!, BUSD_ABI, signer);
      const busdContract = new Contract(
        contractAddress,
        PLAIN_BUSD_ABI,
        signer
      );
      
      try {
        updateBtnState("Awaiting Approval", place);
        await busdContract.allowance(await signer.getAddress(), nestageAddress);
        
        // if (!currentAllowance.lt(amount)) {
        const approvalTx = await busdContract.approve(nestageAddress, amt);
        //   dispatch(setTransactionState({ state: "approving" }));
        await approvalTx.wait();
        //   dispatch(setTransactionState({ state: "approved" }));
        
        // setTimeout(() => {
        //   // dispatch(setTransactionState({ state: "awaiting payment" }));
        // }, 1200);
        // }
        
        const startNewStake = contract.getFunction("startNewStake");
        
        const gasEstimate = await startNewStake.estimateGas(
          amt,
          admin,
          startDate,
          endDate,
          prt,
          payUpline.hasUpline,
          payUpline.uplineAddress,
          payUpline.pay
        );
        updateBtnState("Approved", place);
        
        const gasLimit = Math.ceil(Number(gasEstimate) * 1.1);
        
        updateBtnState("Awaiting Confirmation", place);
        
        const tx = await startNewStake(
          amt,
          admin,
          startDate,
          endDate,
          prt,
          payUpline.hasUpline,
          payUpline.uplineAddress,
          payUpline.pay,
          {
            gasLimit,
          }
        );
        
        //   dispatch(setTransactionState({ state: "paying" }));
        
        await tx.wait();
        updateBtnState("Confirming", place);
        
        const {data: Tx} = await Axios.get(`tx?hash=${tx.hash}`);
        // await dispatch(validateHash({ txHash: tx.hash }));
        
        // const Tx: T.bscscan = verifiedTx?.payload;
        
        // const { result: Txx } = Tx;
        
        if (NETWORK_MODE === 'mainnet') {
          if (Tx.data.result.status === "1") {
            //   dispatch(setTransactionState({ state: "payed" }));
            //   dispatch(saveStat({ type: "levelOne", amount }));
            await Axios.post("tx", {type: "levelOne", amount, address, refBonus: {hasRef, address: fstUplineAddress}});
            updateBtnState("Confirmed", place);
          }
        } else {
          if (Tx.data.status === "1") {
            //   dispatch(setTransactionState({ state: "payed" }));
            //   dispatch(saveStat({ type: "levelOne", amount }));
            await Axios.post("tx", {type: "levelOne", amount, address, refBonus: {hasRef, address: fstUplineAddress}});
            updateBtnState("Confirmed", place);
          }
          
        }
        return {
          status: "success",
        };
        
        // result = {
        //   isLoading: !!0,
        //   data: !!1,
        //   error: "x",
        // };
        // }
      } catch (error) {
        console.log(typeof error);
        console.error("Error calling startNewStake:", error);
        updateBtnState("Initializing", place);
        return {
          status: "error",
          errorMessage: "Error processing your transaction!",
        };
      }
    } else {
      updateBtnState("Initializing", place);
      console.error("Dapp is not installed!");
      return {
        status: "error",
        errorMessage: "Dapp not found!",
      };
    }
  } catch (error) {
    updateBtnState("Initializing", place);
    const errorMessage = (error as Error).message;
    // result = {
    //   isLoading: !!0,
    //   data: null,
    //   error: errorMessage,
    // };
    console.log({errorMessage});
    return {
      status: "error",
      errorMessage,
    };
  }
};
