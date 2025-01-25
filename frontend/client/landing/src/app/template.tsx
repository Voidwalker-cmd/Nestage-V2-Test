"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { useEffect, useState } from "react";
import Preloader from "@/components/molecules/Loader";
import { saveRef } from "@/functions/saveRef";
import { refKey } from "@/config";
import AuthProvider from "@/context/AuthProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  const SaveRef = async (ref: string) => {
    const { data, status } = await saveRef(ref);
    if (status === 200) {
      console.log({ data });
      localStorage.setItem(refKey, data);
    }
  };

  useEffect(() => {
    if (isClient) {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");

      if (ref) {
        console.log(ref);
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
