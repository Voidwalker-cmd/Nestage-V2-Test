"use client";

import * as T from "@/types";
import { contractAddress, getAdminAddress } from "./newStake";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { nestageAddress } from "@/config";
import BUSD_ABI from "@/web3/NestageNw.json";
import PLAIN_BUSD_ABI from "../web3/PlainBUSD_ABI.json";
import { btnStateTwo } from "@/components/molecules/LevelTwo";
import { Axios } from "@/lib/Axios/client";

export const newReferral = async (form: T.refData) => {
  // dispatch(getWallets({ blank: 0 }));
  const { data: adminWallets, status } = await getAdminAddress();

  if (status !== 200)
    return { status: "error", errorMessage: "Unable to proceed, Try Again!" };

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

  const { amount, address, referral } = form;
  const xamt = parseUnits(amount.toString(), "ether");

  const refCode = referral;

  try {
    let info: [string[] | [], string];
    const createNewRef = !!1;

    if (refCode) {
      // const refs = await dispatch(getRefByCode({ code: refCode }));
      const { data: drefs, status } = await Axios.get<T.getRefByCodeResponse>(
        `referral?withcode=${refCode}`
      );
      if (status === 200) {
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
          btnStateTwo.value = "Awaiting Approval";

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

        btnStateTwo.value = "Approved";

        const gasLimit = Math.ceil(Number(gasEstimate) * 1.1);

          btnStateTwo.value = "Awaiting Confirmation";
        const tx = await startNewReferral(info![0], info![1], xamt, {
          gasLimit,
        });
        //   dispatch(setTransactionState({ state: "paying" }));

        await tx.wait();
        const { data: Tx }: T.bscScan = await Axios.get(`tx?hash=${tx.hash}`);

        // const Tx: T.bscscan = verifiedTx?.payload;

        // const { result: Txx } = Tx;

        let perform = !!0
        let amt = 0,
          didTransfer = 0,
          adminReward = 0;
        let userPay: { address: string; amount: string }[] = [];
        let adminPay = { address: refAdmin, amount: "" };

          if (Tx.result.status === "1") {
            perform = !!1
          } else if (Tx.status === "1") {
              perform = !!1
          }
          if (perform) {
              btnStateTwo.value = "Confirmed";
          if(createNewRef){
            (async () => {
                btnStateTwo.value = "Finalizing";
              const code = refCode === null ? null : String(refCode);
              let details: T.createRefParams = { address: address };
              details = code !== null ? { ...details, code } : { ...details };
              //   await dispatch(createRefs(details));
              await Axios.post("referral", details);
                  })();
          }

          const lx: string[] = info![0];
          const len = lx.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              amt = Number(amount) * (_rates[i] / SCALE);
              didTransfer += amt;
              //   await dispatch(createPay({ address: l[i], amount: String(amt) }));
              userPay = [...userPay, { address: lx[i], amount: String(amt) }];
            }
            adminReward = Number(amount) - didTransfer;

            adminPay = { ...adminPay, amount: String(adminReward) };
          } else {
          adminPay = { ...adminPay, amount: String(amount) };
        }
        Axios.post("referralPay", { adminPay, userPay });
        Axios.post("tx", { type: "levelTwo", amount, address, refBonus: {hasRef: !!0} });
          }


        //   dispatch(saveStat({ type: "levelTwo", amount }));
          //   dispatch(setTransactionState({ state: "payed" }));
          btnStateTwo.value = "Completed";
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
        btnStateTwo.value = "Initializing";
    return {
        status: "error",
        errorMessage: "Error!",
      };
      }
    } else {
      console.error("Dapp is not installed!");
      btnStateTwo.value = "Initializing";
    return {
        status: "error",
        errorMessage: "Dapp not found!",
      };
    }
  } catch (error) {
    btnStateTwo.value = "Initializing";
    const errorMessage = (error as Error).message;
    // result = {
    //   isLoading: !!0,
    //   data: null,
    //   error: errorMessage,
    // };
    console.log({ errorMessage });
    return {
      status: "error",
      errorMessage,
    };
  }
};
