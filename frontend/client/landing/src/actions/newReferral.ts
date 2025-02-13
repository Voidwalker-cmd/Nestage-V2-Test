"use client";

import * as T from "@/types";
import {contractAddress, getAdminAddress} from "./newStake";
import {BrowserProvider, Contract, parseUnits} from "ethers";
import {nestageAddress, NETWORK_MODE, refKey} from "@/config";
import BUSD_ABI from "@/web3/NestageNw.json";
import PLAIN_BUSD_ABI from "../web3/PlainBUSD_ABI.json";
import {btnStateTwo} from "@/components/molecules/LevelTwo";
import {Axios} from "@/lib/Axios/client";
import {btnStateTwoModal} from "@/components/organisms/LevelTwoNewRefModal";

const updateBtnState = (newValue: string) => {
  btnStateTwo.value = newValue;
};

const updateBtnStateTwo = (newValue: string) => {
  console.log("yu")
  btnStateTwoModal.value = newValue;
};

export const newReferral = async (form: T.refData) => {
  // dispatch(getWallets({ blank: 0 }));
  const {data: adminWallets, status} = await getAdminAddress();
  
  if (status !== 200)
    return {status: "error", errorMessage: "Unable to proceed, Try Again!"};
  
  const refAdmin = adminWallets.refAdmin.address;
  // let result: T.MiningResult = {
  //   isLoading: !!1,
  //   data: null,
  //   error: "x",
  // };
  
  // try {
  // //   dispatch(setTransactionState({ state: "initializing" }));
  
  // } catch (error) {
  //   const errorMessage = (error as Error).message;
  //   result = {
  //     isLoading: !!0,
  //     data: null,
  //     error: errorMessage,
  //   };
  // }
  
  const {amount, address, referral, place} = form;
  const xamt = parseUnits(amount.toString(), "ether");
  
  const refCode = referral;
  
  try {
    let info;
    const createNewRef = !!1
    
    if (refCode) {
      // const refs = await dispatch(getRefByCode({ code: refCode }));
      const {data: raw, status} = await Axios.get<T.getRefByCodeResponse>(
        `referral?withcode=${refCode}`
      );
      if (status === 200) {
        const {data: drefs} = raw
        console.log({drefs})
        const up = drefs?.upline;
        const fstUplineAddress = drefs?.address;
        const list = drefs?.uplines;
        // sessionStorage.setItem("temp", code);
        
        if (up >= 1) {
          const yy = [fstUplineAddress];
          const l = list.length;
          for (let i = 0; i < l; i++) {
            yy.push(list[i].address);
          }
          info = [yy, refAdmin];
        } else {
          info = [[fstUplineAddress], refAdmin];
        }
      } else {
        info = [[], refAdmin];
      }
    } else {
      info = [[], refAdmin];
    }
    
    const _rates = [40, 30, 20];
    const SCALE = 100;
    
    if (window.ethereum) {
      // const provider = new eth.providers.Web3Provider(window.ethereum, "any");
      
      // const signer = provider.getSigner();
      // const contract = new eth.Contract(nestageAddress, BUSD_ABI, signer);
      // const busdContract = new eth.Contract(
      //   contractAddress,
      //   PLAIN_BUSD_ABI,
      //   signer
      //   );
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const contract = new Contract(nestageAddress!, BUSD_ABI, signer);
      const busdContract = new Contract(
        contractAddress,
        PLAIN_BUSD_ABI,
        signer
      );
      
      try {
        //   const currentAllowance = await busdContract.allowance(
        //     await signer.getAddress(),
        //     nestageAddress
        //   );
        if (place !== 'modal') updateBtnState("Awaiting Approval")
        if (place === 'modal') updateBtnStateTwo("Awaiting Approval");
        
        const approvalTx = await busdContract.approve(nestageAddress, xamt);
        //   dispatch(setTransactionState({ state: "approving" }));
        await approvalTx.wait();
        //   dispatch(setTransactionState({ state: "approved" }));
        
        //   setTimeout(() => {
        //     // dispatch(setTransactionState({ state: "awaiting payment" }));
        //   }, 1200);
        
        const startNewReferral = contract.getFunction("startNewReferral");
        
        const gasEstimate = await startNewReferral.estimateGas(
          info![0],
          info![1],
          xamt
        );
        if (place !== 'modal') updateBtnState("Approved")
        if (place === 'modal') updateBtnStateTwo("Approved");
        
        const gasLimit = Math.ceil(Number(gasEstimate) * 1.1);
        if (place !== 'modal') updateBtnState("Awaiting Confirmation")
        if (place === 'modal') updateBtnStateTwo("Awaiting Confirmation");
        const tx = await startNewReferral(info![0], info![1], xamt, {
          gasLimit,
        });
        //   dispatch(setTransactionState({ state: "paying" }));
        
        await tx.wait();
        if (place !== 'modal') updateBtnState("Confirming")
        if (place === 'modal') updateBtnStateTwo("Confirming");
        const {data: Tx} = await Axios.get(`tx?hash=${tx.hash}`);
        
        // const Tx: T.bscscan = verifiedTx?.payload;
        
        // const { result: Txx } = Tx;
        
        let perform = !!0
        let amt = 0,
          didTransfer = 0,
          adminReward = 0;
        let userPay: { address: string; amount: string }[] = [];
        let adminPay = {address: refAdmin, amount: ""};
        
        console.log({Tx})
        
        if (NETWORK_MODE === 'mainnet') {
          if (Tx.data.result.status === "1") {
            perform = !!1
          }
        } else if (Tx.data.status === "1") {
          perform = !!1
        }
        if (perform) {
          if (place !== 'modal') updateBtnState("Confirmed")
          if (place === 'modal') updateBtnStateTwo("Confirmed");
          if (createNewRef) {
            await (async () => {
              if (place !== 'modal') updateBtnState("Finalizing")
              if (place === 'modal') updateBtnStateTwo("Finalizing");
              const code = refCode === null ? null : String(refCode);
              let details: T.createRefParams = {address: address};
              details = code !== null ? {...details, code} : {...details};
              //   await dispatch(createRefs(details));
              await Axios.post("referral", details);
            })();
          }
          
          const lx = info![0];
          const len = lx.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              amt = Number(amount) * (_rates[i] / SCALE);
              didTransfer += amt;
              //   await dispatch(createPay({ address: l[i], amount: String(amt) }));
              userPay = [...userPay, {address: lx[i], amount: String(amt)}];
            }
            adminReward = Number(amount) - didTransfer;
            
            adminPay = {...adminPay, amount: String(adminReward)};
          } else {
            adminPay = {...adminPay, amount: String(amount)};
          }
          await Axios.post("referralPay", {adminPay, userPay});
          await Axios.post("tx", {type: "levelTwo", amount, address, level: "two", refBonus: {hasRef: !!0}});
          localStorage.removeItem(refKey)
        }
        
        
        //   dispatch(saveStat({ type: "levelTwo", amount }));
        //   dispatch(setTransactionState({ state: "payed" }));
        if (place !== 'modal') updateBtnState("Completed")
        if (place === 'modal') updateBtnStateTwo("Completed");
        return {
          status: "success",
        };
      } catch (error) {
        console.log({error})
        // const idx = sessionStorage.getItem("temp");
        // const rm = async () => {
        //   // const resx = await dispatch(removeRef({ id: String(idx) }));
        //   resx.meta.requestStatus !== "rejected" &&
        //     sessionStorage.removeItem("temp");
        // };
        // if (idx) rm();
        if (place !== 'modal') updateBtnState("Initializing")
        if (place === 'modal') updateBtnStateTwo("Initializing");
        return {
          status: "error",
          errorMessage: "Error!",
        };
      }
    } else {
      console.error("Dapp is not installed!");
      if (place !== 'modal') updateBtnState("Initializing")
      if (place === 'modal') updateBtnStateTwo("Initializing");
      return {
        status: "error",
        errorMessage: "Dapp not found!",
      };
    }
  } catch (error) {
    if (place !== 'modal') updateBtnState("Initializing")
    if (place === 'modal') updateBtnStateTwo("Initializing");
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
