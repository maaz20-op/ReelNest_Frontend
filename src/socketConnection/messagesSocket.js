import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_REELNEST_BACKEND_URL_RAILWAY_SERVER,
  {
    autoConnect: false,
  },
);
