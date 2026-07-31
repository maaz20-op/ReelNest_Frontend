import { useContext } from "react";
import { IncomingCallPopupContext } from "../contexts/incomingCallPopupContext";

export const useIncomingCallPopupContext = () =>
  useContext(IncomingCallPopupContext);
