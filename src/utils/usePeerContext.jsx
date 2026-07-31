import { useContext } from "react";
import { PeerContext } from "../contexts/peerContext";

export const usePeerContext = () => useContext(PeerContext);
