import {useEffect} from "react";
import {useNotificationStore} from "@/store/notifications";
import {SITE_MODE} from "@/config";

const WS_URL = SITE_MODE === 'dev' ? "ws://localhost:1335" : SITE_MODE === 'prev' ? "wss://prev-wss.nestage.io" : "wss://prev-wss.nestage.io";

export const useWebSocket = () => {
  const {address, setNotifications} = useNotificationStore();
  
  useEffect(() => {
    if (!address) return;
    
    const socket = new WebSocket(WS_URL);
    
    socket.onopen = () => {
      
      // Register user with address
      socket.send(JSON.stringify({type: "REGISTER", address, role: "028777bc-b97c-4c20-870e-33a556e84801"}));
    };
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === "UNREAD_NOTIFICATIONS") {
        setNotifications(data.data);
      }
    };
    
    socket.onclose = () => {
    };
    
    return () => {
      socket.close();
    };
  }, [address]);
};
