import {useEffect} from "react";
import {useNotificationStore} from "@/store/notifications";

const WS_URL = "ws://localhost:2210";

export const useWebSocket = () => {
  const {address, setNotifications} = useNotificationStore();
  
  useEffect(() => {
    if (!address) return;
    
    const socket = new WebSocket(WS_URL);
    
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      
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
      console.log("WebSocket connection closed");
    };
    
    return () => {
      socket.close();
    };
  }, [address]);
};
