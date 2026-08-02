import React, { createContext, useContext, useEffect, useState } from "react";
import { IncomingCallPopup } from "../components/reusableComponents/incomingCallPopup";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

export const IncomingCallPopupContext = createContext(null);

export const IncomingCallPopupProvider = ({ children }) => {
  const [isCallIncoming, setIsCallIncoming] = useState(false);

  const [callingUser, setCallingUser] = useState(null);
  const [isCallAccepted, setCallAccepted] = useState(false);

  useEffect(() => {
    const ringtone = new Audio("/so-high.mp3");

    if (!isCallIncoming) return;

    ringtone.loop = true;

    const playRingTone = async () => {
      await ringtone.play();
    };

    playRingTone();

    return () => {
      ringtone.currentTime = 0;
      ringtone.pause();
      // Reset back to start on cleanup
    };
  }, [isCallIncoming]);

  return (
    <IncomingCallPopupContext.Provider
      value={{
        isCallIncoming,
        setIsCallIncoming,
        callingUser,
        setCallingUser,
        isCallAccepted,
        setCallAccepted,
      }}
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
