// SocketLayout.jsx
import { Outlet } from "react-router-dom";
import { SocketProvider } from "../contexts/socketContext";

export function SocketLayout() {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}
