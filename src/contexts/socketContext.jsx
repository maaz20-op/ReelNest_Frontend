import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:3000", {
    transports: ["websocket", "polling"],
    withCredentials: true,
  });
  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};
