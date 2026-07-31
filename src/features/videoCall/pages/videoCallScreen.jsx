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

export const VideoCallScreenPage = () => {
  const { user } = useLocation().state;
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  const [remoteStream, setRemoteStream] = useState(null);
  const [isCallPromptOpen, setIsCallPromptOpen] = useState(true);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const {
    createOffer,
    createAnswer,
    isPeerTrigger,
    stopPeerConnection,
    handleRemoteCandidate,
    setRemoteAnswer,
    peer,
    myStream,
    setMyStream,
    handleIncomingCall,
    sendMyStream,
  } = usePeerContext();
  const { socket } = useSocketContext();
  const { isCallIncoming, setIsCallIncoming } = useIncomingCallPopupContext();

  // 1. Camera Start Function
  const handleStartVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
      sendMyStream(stream);

      const offer = await createOffer();
      socket.emit("call-user", {
        offer: offer,
        username: user?.username,
        from: loggedInUser?.username,
      });
    } catch (error) {
      console.error("Camera access error:", error);
    }
  };

  const handleCallAccepted = useCallback(
    async ({ answer, from }) => {
      await setRemoteAnswer(answer);
    },
    [peer],
  );

  const handleRemoteCallEnded = useCallback(
    ({ callended }) => {
      if (!callended) return;

      stopPeerConnection({
        myStream,
        localVideoRef,
        setRemoteStream,
        setMyStream,
        remoteVideoRef,
      });
    },
    [stopPeerConnection],
  );

  useEffect(() => {
    if (localVideoRef.current && myStream) {
      localVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    return () => {
      stopPeerConnection({
        myStream,
        localVideoRef,
        setRemoteStream,
        setMyStream,
        remoteVideoRef,
      });
    };
  }, []);

  useEffect(() => {
    if (peer) {
      peer.onicecandidate = (event) => {
        if (!event.candidate) return;

        socket.emit("ice-candidate", {
          from: loggedInUser?.username,
          to: user?.username,
          candidate: event.candidate,
        });
      };

      peer.ontrack = (event) => {
        if (event?.streams?.[0]) {
          setRemoteStream(event.streams[0]);
        }
      };
    }

    if (!socket) return;
    socket.on("ice-candidate", handleRemoteCandidate);

    return () => {
      socket.off("ice-candidate", handleRemoteCandidate);
      if (peer) peer.onicecandidate = null;
    };
  }, [peer, socket, handleRemoteCandidate, isPeerTrigger]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    socket.on("call-user", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("call:ended", handleRemoteCallEnded);

    return () => {
      socket.off("call-user", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("call:ended", handleRemoteCallEnded);
    };
  }, [handleIncomingCall, handleCallAccepted, handleRemoteCallEnded]);

  const handleBackAndStop = () => {
    stopPeerConnection({
      myStream,
      localVideoRef,
      setRemoteStream,
      setMyStream,
      remoteVideoRef,
    });
    navigate("/message");
  };

  return (
    <div className="relative bg-(--bg-primary) w-full h-full overflow-hidden">
      {/* chat-user info */}
      {!isCallPromptOpen && (
        <Button
          fnc={handleBackAndStop} // Back jane se pehle camera off karega
          content={
            <div className="flex gap-2 justify-center items-center">
              <Icons.back color="white" />
              <p>Back</p>
            </div>
          }
          otherStyles="absolute left-2 top-4 z-20"
        />
      )}

      {isCallPromptOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <CallConfirmationPrompt
            user={user}
            setIsCallPromptOpen={setIsCallPromptOpen}
            handleStartVideoCall={handleStartVideoCall}
          />
        </div>
      )}

      {!isCallPromptOpen && (
        <div className="user-info absolute min-h-0 text-(--text-primary) flex flex-col items-center gap-3 top-[15%] left-1/2 -translate-x-1/2 z-20">
          <Avatar size="xl" src={user?.profileImage} />
          <div className="flex flex-col">
            <h1 className="text-center">{user?.fullname}</h1>
            <h2 className="text-center">calling....</h2>
          </div>
        </div>
      )}

      {/* my Stream */}
      <video
        ref={
          remoteVideoRef?.current?.srcObject ? remoteVideoRef : localVideoRef
        }
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted
        autoPlay
      />

      {!isCallPromptOpen && (
        <div
          onClick={handleBackAndStop} // "End Call" par click karne se camera band hoga
          className="bg-red-600 absolute bottom-12 left-1/2 -translate-x-1/2 p-5 rounded-full text-(--text-primary) cursor-pointer z-20"
        >
          End Call
        </div>
      )}
    </div>
  );
};
