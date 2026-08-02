import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Icons } from "../../../assets/icons";
import { Button } from "../../../components/reusableComponents/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { CallConfirmationPrompt } from "../../message/components/subComponents/callConfrimationPrompt";
import { useSocketContext } from "../../../contexts/socketContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { useIncomingCallPopupContext } from "../../../utils/useIncomingCallContext";
import { usePeerContext } from "../../../utils/usePeerContext";
import { useToastContext } from "../../../contexts/toast";

export const VideoCallScreenPage = () => {
  const [myStream, setMyStream] = useState(null);

  const myStreamRef = useRef(null);

  const obj = useLocation()?.state;
  const user = obj?.user;
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  const { showToast } = useToastContext();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const {
    createOffer,
    stopPeerConnection,
    remoteStream,
    setRemoteStream,
    createAnswer,
    setRemoteAnswer,
    isCallPromptOpen,
    setIsCallPromptOpen,
    sendMyStream,
  } = usePeerContext();

  const { socket } = useSocketContext();
  const {
    isCallAccepted,
    setCallingUser,
    callingUser,
    setCallAccepted,
    setIsCallIncoming,
  } = useIncomingCallPopupContext();

  const targetUser = user || callingUser;
  const targetUsername = user?.username || callingUser?.username;

  const updateMyStream = (stream) => {
    myStreamRef.current = stream;
    setMyStream(stream);
  };

  const getAndAttachStream = async () => {
    if (myStreamRef.current) {
      sendMyStream(myStreamRef.current);
      return myStreamRef.current;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      updateMyStream(stream);
      sendMyStream(stream);
      return stream;
    } catch (error) {
      console.error("Camera access error:", error);
      return null;
    }
  };

  const handleStartVideoCall = async () => {
    if (!targetUsername || !loggedInUser) return;
    await getAndAttachStream();

    socket.emit("initialize-call-request", {
      to: targetUsername,
      from: loggedInUser?.username,
      callingUser: loggedInUser,
    });
  };

  const sendOffer = useCallback(async () => {
    if (!targetUsername) return;

    await getAndAttachStream();

    const offer = await createOffer();
    socket.emit("call-user", {
      offer: offer,
      username: targetUsername,
      from: loggedInUser?.username,
    });
  }, [createOffer, targetUsername, loggedInUser]);

  const handleIncomingOffer = useCallback(
    async ({ offer, from }) => {
      await getAndAttachStream();

      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { answer: ans, from });
    },
    [createAnswer, socket],
  );

  const handleCallAccepted = useCallback(
    async ({ answer }) => {
      await setRemoteAnswer(answer);
    },
    [setRemoteAnswer],
  );

  const cleanUpCall = useCallback(() => {
    stopPeerConnection({
      myStream: myStreamRef.current,
      localVideoRef,
      setRemoteStream,
      setMyStream: updateMyStream,
      remoteVideoRef,
    });
  }, [stopPeerConnection, setRemoteStream]);

  const handleRemoteCallEnded = useCallback(
    ({ callended, declined }) => {
      if (!callended) return;
      if (declined) showToast("Call declined!", false);

      setIsCallIncoming(false);
      console.log("call ended");
      cleanUpCall();

      navigate("/message");
    },
    [cleanUpCall, navigate, showToast],
  );

  useEffect(() => {
    return () => {
      cleanUpCall();
      setCallAccepted(false);
      setCallingUser(null);
      setIsCallPromptOpen(true);
    };
  }, [cleanUpCall]);

  useEffect(() => {
    if (user) setCallingUser(user);
  }, [user, setCallingUser]);

  useEffect(() => {
    if (localVideoRef.current && myStream) {
      localVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Trigger offer when call is accepted by receiver
  useEffect(() => {
    if (isCallAccepted) {
      sendOffer();
    }
  }, [isCallAccepted, sendOffer]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("call-user", handleIncomingOffer);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("call:ended", handleRemoteCallEnded);

    return () => {
      socket.off("call-user", handleIncomingOffer);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("call:ended", handleRemoteCallEnded);
    };
  }, [socket, handleIncomingOffer, handleCallAccepted, handleRemoteCallEnded]);

  const handleBackAndStop = () => {
    cleanUpCall();

    socket.emit("call:ended", {
      to: callingUser?.username,
      isCallEndedBeforeRemoteExpect: remoteStream ? false : true,
    });
    navigate("/message");
  };

  return (
    <div className="relative bg-(--bg-primary) w-full h-full overflow-hidden">
      {/* Back Button */}
      {!isCallPromptOpen && !remoteStream && (
        <Button
          fnc={handleBackAndStop}
          content={
            <div className="flex gap-2 justify-center items-center">
              <Icons.back color="white" />
              <p>Back</p>
            </div>
          }
          otherStyles="absolute left-2 top-4 z-20"
        />
      )}

      {/* Confirmation Dialog */}
      {isCallPromptOpen && !isCallAccepted && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <CallConfirmationPrompt
            user={targetUser}
            setIsCallPromptOpen={setIsCallPromptOpen}
            handleStartVideoCall={handleStartVideoCall}
          />
        </div>
      )}

      {/* User Info overlay during call initialization */}
      {!isCallPromptOpen && !remoteStream && (
        <div className="user-info absolute min-h-0 text-(--text-primary) flex flex-col items-center gap-3 top-[15%] left-1/2 -translate-x-1/2 z-20">
          <Avatar size="xl" src={targetUser?.profileImage} />
          <div className="flex flex-col">
            <h1 className="text-center">{targetUser?.fullname}</h1>
            <h2 className="text-center">Calling...</h2>
          </div>
        </div>
      )}

      {/* Main Remote Video Stream */}
      <video
        ref={remoteVideoRef}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted
        autoPlay
      />

      {/* Floating Local Picture-in-Picture Stream */}
      <video
        ref={localVideoRef}
        className="absolute z-10 bottom-12 right-4 h-36 w-24 md:h-44 md:w-32 rounded-xl object-cover -scale-x-100 border border-white/20 shadow-lg"
        playsInline
        muted
        autoPlay
      />

      {/* End Call Controls */}
      {!isCallPromptOpen && (
        <div
          onClick={handleBackAndStop}
          className="bg-red-600 absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white font-medium cursor-pointer z-20 shadow-xl hover:bg-red-700 transition"
        >
          End Call
        </div>
      )}
    </div>
  );
};
