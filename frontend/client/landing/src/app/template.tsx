"use client";

import {ThirdwebProvider} from "thirdweb/react";
import {useEffect, useState} from "react";
import Preloader from "@/components/molecules/Loader";
import {saveRef} from "@/functions/saveRef";
import {refKey} from "@/config";
import AuthProvider from "@/context/AuthProvider";
import {Axios} from "@/lib/Axios/client"

export default function Template({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  const SaveRef = async (ref: string) => {
    const { data, status } = await saveRef(ref);
    if (status === 200) {
      console.log({ data });
      localStorage.setItem(refKey, data);
    }
  };
  
  const PINGSERVER = async () => {
    const lastPing = sessionStorage.getItem("lastPing");
    const now = Date.now();
    
    if (!lastPing || now - parseInt(lastPing, 10) > 15 * 60 * 1000) {
      try {
        await Axios.get("/PING");
        sessionStorage.setItem("lastPing", now.toString());
      } catch (error) {
        console.error("PING request failed: ", error);
      }
    }
  }
  
  useEffect(() => {
    PINGSERVER()
  }, [])

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
    <div>
      <ThirdwebProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThirdwebProvider>
    </div>
  );
}
