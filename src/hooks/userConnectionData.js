import { useContext } from "react";
import { ConnectionContext } from "../contexts/useConnections";

export const useConnectionsData = () => {
  const connectionsData = useContext(ConnectionContext);

  return connectionsData;
};
