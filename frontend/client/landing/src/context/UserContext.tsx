import {useWeb3Store} from "@/store";
import {useEffect} from "react";
import {getStakerInfo} from "@/actions";
import {useAuthStore} from "@/store/auth";

const UserContext = ({children}: { children: React.ReactNode }) => {
  const address = useWeb3Store((state) => state.address);
  const setUser = useAuthStore((state) => state.setUser)
  
  const getUserInfo = async () => {
    const res = await getStakerInfo(address)
    setUser(res)
  }
  
  useEffect(() => {
    if (address) getUserInfo()
  }, [address]);
  
  return (
    <>
      {children}
    </>
  );
};

export default UserContext