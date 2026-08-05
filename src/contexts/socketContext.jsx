import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = io(
    import.meta.env.VITE_BACKEND_DEVELOPMENT_SOCKET_SERVER ||
      import.meta.env.VITE_BACKEND_SOCKET_SERVER_RAILWAY,
    {
      transports: ["websocket", "polling"],
      withCredentials: true,
    },
  );
  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};
