"use client"

import {useEffect, useState} from "react";
import { CopyIcon, CopiedIcon } from "@/components/atoms/Icons"
import {SiteUrl} from "@/functions/site";
import {CB} from "@/lib";

const CopyBtn = ({ value }: {value?: string}) => {
  const [txt, setTxt] = useState('copy');
  const [code] = useState('A1B2C3');
  const [text, setText] = useState(`${SiteUrl}/?ref=${code}`);
  
  useEffect(() => {
    if(value) {
      setText(value);
    }
  }, [value]);
  
  const onCopy = () => {
    setTxt('copied');
    setTimeout(() => {
      setTxt('copy');
    }, 1300);
  }
  
  return (
    <>
      <CB
        text={text}
        onCopy={onCopy}
      >
        <div className="relative inline-block cbBtn">
          {txt === "copy" ? (
            <CopyIcon
              className={`size-4 font-semibold text-blue-700`}
            />
          ) : (
            <CopiedIcon
              className={`size-4 font-semibold text-green-700`}
            />
          )}
        </div>
      </CB>
    </>
  );
};

export default CopyBtn;