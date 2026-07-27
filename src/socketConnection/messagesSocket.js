import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_REELNEST_BACKEND_URL_RAILWAY_SERVER,
  {
    transports: ["websocket", "polling"], // Allow both WebSocket and fallback polling
    withCredentials: true,
  },
);
