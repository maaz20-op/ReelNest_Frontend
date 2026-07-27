import { io } from "socket.io-client";

export const socket = io("https://reelnestbackend-production.up.railway.app", {
  autoConnect: false,
});
