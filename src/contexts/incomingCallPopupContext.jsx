import React, { createContext, useContext, useState } from "react";
import { IncomingCallPopup } from "../components/reusableComponents/incomingCallPopup";

export const IncomingCallPopupContext = createContext(null);

export const IncomingCallPopupProvider = ({ children }) => {
  const [isCallIncoming, setIsCallIncoming] = useState(false);
  const [callingUser, setCallingUser] = useState(null);
  const [isCallAccepted, setCallAccepted] = useState(false);
  return (
    <IncomingCallPopupContext.Provider
      value={{ isCallIncoming, setIsCallIncoming }}
    >
      {children}

      {isCallIncoming && (
        <IncomingCallPopup
          callingUser={callingUser}
          setIsCallIncoming={setIsCallIncoming}
          setCallAccepted={setCallAccepted}
        />
      )}
    </IncomingCallPopupContext.Provider>
  );
};
