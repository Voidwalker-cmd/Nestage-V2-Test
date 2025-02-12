"use client";

import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AosWrapper = ({children}: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
    
    window.addEventListener("load", AOS.refresh);
  }, []);
  
  return <>{children}</>;
};

export default AosWrapper;
