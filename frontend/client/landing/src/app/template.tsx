"use client"

import { ThirdwebProvider } from "thirdweb/react";
import { useEffect, useState } from 'react';
import Preloader from "@/components/molecules/Loader";
import { useSearchParams } from 'next/navigation'
import { saveRef } from "@/functions/saveRef";
import { refKey } from "@/config";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  const saveRefHandler = async (ref: string) => {
    const { data, status } = await saveRef(ref);
    if (status === 200) {
      localStorage.setItem(refKey, data);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const ref = searchParams.get('ref');
      if (ref) {
        saveRefHandler(ref);
      }
    }
  }, [isClient, searchParams]);

  if (!isClient) {
    return <Preloader />;
  }

  return (
    <div>
      <ThirdwebProvider>
        {children}
      </ThirdwebProvider>
    </div>
  );
}