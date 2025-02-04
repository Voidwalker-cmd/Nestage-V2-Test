"use client";
import {createContext, ReactNode, useContext, useState} from "react";

interface AppContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  isRouting: boolean;
  setIsRouting: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  navigating: boolean;
  setNavigating: (value: boolean) => void;
  auto: boolean;
  setAuto: (value: boolean) => void;
  checking: boolean;
  setChecking: (value: boolean) => void;
  addr: string;
  setAddr: (value: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isRouting, setIsRouting] = useState(!!1);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);
  const [auto, setAuto] = useState(true);
  const [checking, setChecking] = useState(false);
  const [addr, setAddr] = useState("");
  
  return (
    <AppContext.Provider
      value={
        {
          isAuth,
          setIsAuth,
          isRouting,
          setIsRouting,
          loading,
          setLoading,
          navigating,
          setNavigating,
          auto,
          setAuto,
          checking,
          setChecking,
          addr,
          setAddr,
        }
      }
    >
      {
        children
      }
    </AppContext.Provider>
  )
    ;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
