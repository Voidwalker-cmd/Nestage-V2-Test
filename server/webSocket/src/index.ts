import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(cors());
const PORT = process.env.PORT || 9999;


const wss = new WebSocketServer({ port: Number(PORT) });
console.log(`WebSocket server running on port ${PORT}`);

const clients = new Map<string, WebSocket>();

wss.on("connection", (ws) => {
  console.log("New client connected");
  
  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      if (data.type === "REGISTER") {
        const { address, role } = data;
        if (!address) return;
        clients.set(address, ws);
        
        if (role === "admin") {
          console.log(`Admin connected: ${address}`);
          clients.set(address, ws);
        } else {
          console.log(`User connected: ${address}`);
          clients.set(address, ws);
          sendUnreadNotifications(ws, address);
        }
      }
      
      if (data.type === "MARK_AS_READ") {
        const { id, address } = data;
        await prisma.notification.update({ where: { id }, data: { isRead: true } });
        sendUnreadNotifications(ws, address);
      }
      
      if (data.type === "NEW_NOTIFICATION" && data.role === "admin") {
        const { title, message, userAddress } = data;
        const getUserId = await prisma.user.findFirst({
          where: { walletId: userAddress },
        });
        if (!getUserId) return;
        const newNotification = await prisma.notification.create({
          data: { title, message, userUuid: getUserId.uuid, isRead: false },
        });
        
        if (clients.has(userAddress)) {
          clients.get(userAddress)?.send(JSON.stringify({ type: "NEW_NOTIFICATION", data: newNotification }));
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  
  ws.on("close", () => {
    clients.forEach((clientWs, address) => {
      if (clientWs === ws) {
        clients.delete(address);
      }
    });
  });
});

async function sendUnreadNotifications(ws: WebSocket, address: string) {
  const getUserId = await prisma.user.findFirst({
    where: { walletId: address },
  });
  if (!getUserId) return;
  const unreadNotifications = await prisma.notification.findMany({
    where: { userUuid: getUserId.uuid, isRead: false },
  });
  
  ws.send(JSON.stringify({ type: "UNREAD_NOTIFICATIONS", data: unreadNotifications }));
}
