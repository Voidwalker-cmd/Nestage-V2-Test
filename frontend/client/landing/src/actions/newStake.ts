"use client";
import {BrowserProvider, Contract, parseUnits} from "ethers";
import * as T from "@/types";
import {Axios} from "@/lib/Axios/client";
import {mAddress, nestageAddress, NETWORK_MODE, nullAddress, refKey, tAddress,} from "@/config";
import BUSD_ABI from "@/web3/NestageNw.json";
import PLAIN_BUSD_ABI from "../web3/PlainBUSD_ABI.json";
import {btnState} from "@/components/molecules/LevelOne";
import {btnStateModal} from "@/components/organisms/LevelOneNewStakeModal";
import {getTempRef, updateTempRef} from "@/actions/index";

const updateBtnState = (newValue: string) => {
  btnState.value = newValue;
};

const updateBtnStateTwo = (newValue: string) => {
  btnStateModal.value = newValue;
};

export const contractAddress = NETWORK_MODE === "testnet" ? tAddress : mAddress;

export const getAdminAddress = async (): Promise<T.getAdminAddressResponse> => {
  const {data, status} = await Axios.get("adminAddress");
  
  return {data: data.data, status};
};

export const newStake = async (form: T.StakingData) => {
  const {data: adminWallets, status} = await getAdminAddress();
  
  if (status !== 200)
    return {status: "error", errorMessage: "Unable to proceed, Try Again!"};
  
  const admin = adminWallets.admin.address;
  
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
    
    let hasRef = !!0
    let fstUplineAddress = nullAddress
    
    const checkTemp = await getTempRef(address)
    
    const refCode = localStorage.getItem(refKey) ?? checkTemp.code ?? "";
    
    const firstTime = checkTemp.lvlOne
    
    console.log({checkTemp, refCode, firstTime})
    
    if (refCode && !firstTime) {
      const {data: raw, status} = await Axios.get<T.getRefByCodeResponse>(
        `referral?withcode=${refCode}`
      );
      console.log({raw, status})
      if (status === 200) {
        const {data: drefs} = raw
        fstUplineAddress = drefs?.address;
        
        const bonus = Number(amount) * (10 / 100)
        pay = parseUnits(bonus.toString(), "ether");
        payUpline = {
          hasUpline: !!1,
          uplineAddress: fstUplineAddress,
          pay,
        };
        hasRef = !!1
      }
    }
    
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
        if (place !== "modal") updateBtnState("Awaiting Approval")
        if (place === "modal") updateBtnStateTwo("Awaiting Approval");
        await busdContract.allowance(await signer.getAddress(), nestageAddress);
        const approvalTx = await busdContract.approve(nestageAddress, amt);
        await approvalTx.wait();
        
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
        if (place !== "modal") updateBtnState("Approved")
        if (place === "modal") updateBtnStateTwo("Approved");
        
        const gasLimit = Math.ceil(Number(gasEstimate) * 1.1);
        
        if (place !== "modal") updateBtnState("Awaiting Confirmation")
        if (place === "modal") updateBtnStateTwo("Awaiting Confirmation");
        
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
        
        await tx.wait();
        if (place !== "modal") updateBtnState("Confirming")
        if (place === "modal") updateBtnStateTwo("Confirming");
        const {data: Tx} = await Axios.get(`tx?hash=${tx.hash}`);
        
        if (NETWORK_MODE === 'mainnet') {
          if (Tx.data.result.status === "1") {
            await Axios.post("tx", {
              type: "levelOne",
              amount,
              address,
              level: "one",
              refBonus: {hasRef, address: fstUplineAddress}
            });
            await updateTempRef(address)
            if (place !== "modal") updateBtnState("Confirmed")
            if (place === "modal") updateBtnStateTwo("Confirmed");
          }
        } else {
          if (Tx.data.status === "1") {
            await Axios.post("tx", {
              type: "levelOne",
              amount,
              address,
              level: "one",
              refBonus: {hasRef, address: fstUplineAddress}
            });
            await updateTempRef(address)
            if (place !== "modal") updateBtnState("Confirmed");
            if (place === "modal") updateBtnStateTwo("Confirmed");
          }
          // localStorage.removeItem(refKey)
        }
        return {
          status: "success",
        };
      } catch (error) {
        console.error("Error calling startNewStake:", error);
        if (place !== "modal") updateBtnState("Initializing");
        if (place === "modal") updateBtnStateTwo("Initializing");
        return {
          status: "error",
          errorMessage: "Error processing your transaction!",
        };
      }
    } else {
      if (place !== "modal") updateBtnState("Initializing")
      if (place === "modal") updateBtnStateTwo("Initializing");
      console.error("Dapp is not installed!");
      return {
        status: "error",
        errorMessage: "Dapp not found!",
      };
    }
  } catch (error) {
    if (place !== "modal") updateBtnState("Initializing")
    if (place === "modal") updateBtnStateTwo("Initializing");
    const errorMessage = (error as Error).message;
    console.log({errorMessage});
    return {
      status: "error",
      errorMessage,
    };
  }
};
