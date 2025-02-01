import {create} from "zustand";
import * as T from "@/types";

export const useNotificationStore = create<T.NotificationState>((set, get) => ({
  notifications: [],
  address: null,
  socket: null,  // ✅ Initialize socket
  
  setNotifications: (notifications) => set({notifications}),
  setAddress: (address) => set({address}),
  setSocket: (socket) => set({socket}),
  
  markAsRead: async (uuid) => {
    const {address, socket} = get();
    if (!address || !socket) return;
    
    socket.send(JSON.stringify({type: "MARK_AS_READ", uuid, address}));
  },
}));
