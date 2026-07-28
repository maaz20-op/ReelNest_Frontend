import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_BACKEND_DEVELOPMENT_SOCKET_SERVER ||
    import.meta.env.VITE_BACKEND_SOCKET_SERVER_VERCEL,
  {
    autoConnect: false,
  },
);
