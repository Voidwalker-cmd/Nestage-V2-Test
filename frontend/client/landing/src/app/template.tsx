"use client"

import {
  ThirdwebProvider,
} from "thirdweb/react";
import { useEffect, useState } from 'react';
import Preloader from "@/components/molecules/Loader";
import { useSearchParams } from 'next/navigation'
import { saveRef } from "@/functions";
import { refKey } from "@/config";

export default function Template({ children }: { children: React.ReactNode }) {

  const [isClient, setIsClient] = useState(false);

  const searchParams = useSearchParams()

  const SaveRef = async (ref: string) => {
    const { data, status } = await saveRef(ref)
    if (status === 200) {
      console.log({ data })
      localStorage.setItem(refKey, data);
    }
  }

  useEffect(() => {
    const ref = searchParams.get('ref')

    if (ref && isClient) {
      console.log(ref)
      SaveRef(ref as string);
    }

  }, [searchParams, isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Preloader />;
  }

  return (
    <div>
      <ThirdwebProvider>
        {children}
      </ThirdwebProvider>
    </div>)
}