"use client";

import {ThirdwebProvider} from "thirdweb/react";
import {useEffect, useState} from "react";
import Preloader from "@/components/molecules/Loader";
import {saveRef} from "@/functions/saveRef";
import {refKey} from "@/config";
import AuthContext from "@/context/AuthContext";
import {AppProvider} from "@/context/AppContext";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  const SaveRef = async (ref: string) => {
    const { data, status } = await saveRef(ref);
    if (status === 200) {
      localStorage.setItem(refKey, data);
    }
  };
  
  // const PINGSERVER = async () => {
  //   let pingUrl = "https://api.nestage.io/api/v1/ping"
  //   if (SITE_MODE === 'dev') {
  //     pingUrl = "http://localhost:1335/api/v1/ping"
  //   } else if (SITE_MODE === 'prev') {
  //     pingUrl = "https://prev-api.nestage.io/api/v1/ping"
  //   }
  //   const lastPing = sessionStorage.getItem("lastPing");
  //   const now = Date.now();
  //
  //   if (!lastPing || now - parseInt(lastPing, 10) > 14 * 60 * 1000) {
  //     try {
  //       await axios.get(pingUrl);
  //       sessionStorage.setItem("lastPing", now.toString());
  //     } catch (error) {
  //       console.error("PING request failed: ", error);
  //     }
  //   }
  // }
  //
  // useEffect(() => {
  //   PINGSERVER()
  // }, [])

  useEffect(() => {
    if (isClient) {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");

      if (ref) {
        SaveRef(ref as string);
      }
    }
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Preloader />;
  }

  return (
    <>
      <ThirdwebProvider>
        <AuthContext>
          <AppProvider>
          {children}
          </AppProvider>
        </AuthContext>
      </ThirdwebProvider>
    </>
  );
}
