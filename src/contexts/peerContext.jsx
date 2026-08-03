import {
  useMemo,
  useRef,
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useSocketContext } from "./socketContext";
import { useIncomingCallPopupContext } from "../utils/useIncomingCallContext";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useToastContext } from "./toast";

export const PeerContext = createContext(null);

export const PeerProvider = ({ children }) => {
  const iceCandidatesQueue = useRef([]);
  const peerRef = useRef(null);
  const [isCallPromptOpen, setIsCallPromptOpen] = useState(true);

  const [remoteStream, setRemoteStream] = useState(null);
  const [isPeerTrigger, setPeerTrigger] = useState(0);
  const { user } = useAuth();

  const { socket } = useSocketContext();

  const { setIsCallIncoming, setCallingUser, callingUser, isCallAccepted } =
    useIncomingCallPopupContext();

  const getActivePeer = useCallback(() => {
    if (!peerRef.current || peerRef.current.signalingState === "closed") {
      const username = "e1991c4309e092b68a28f791";
      const credential = "Tl/COf+B8JFz9cJu";

      const temporaryFreshPeer = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.relay.metered.ca:80" },
          {
            urls: "turn:global.relay.metered.ca:80",
            username,
            credential,
          },
          {
            urls: "turn:global.relay.metered.ca:80?transport=tcp",
            username,
            credential,
          },
          {
            urls: "turn:global.relay.metered.ca:443",
            username,
            credential,
          },
          {
            urls: "turns:global.relay.metered.ca:443?transport=tcp",
            username,
            credential,
          },
        ],

        // iceServers: [
        //   // Standard Free STUN Server
        //   {
        //     urls: "stun:stun.l.google.com:19302",
        //   },
        //   // Metered TURN Server (Standard UDP Port 80)
        //   {
        //     urls: "turn:reelnest-turn-server.metered.live:80",
        //     username: "e1991c4309e092b68a28f791",
        //     credential: "bc87383f04063714a916d853fcd7a129b142",
        //   },
        //   // Metered TURN Server (TCP Port 443 - Firewalls Bypass)
        //   {
        //     urls: "turn:reelnest-turn-server.metered.live:443?transport=tcp",
        //     username: "e1991c4309e092b68a28f791",
        //     credential: "bc87383f04063714a916d853fcd7a129b142",
        //   },
        //   // Metered TURNS Server (Encrypted SSL/TLS - High Reliability)
        //   {
        //     urls: "turns:reelnest-turn-server.metered.live:443?transport=tcp",
        //     username: "e1991c4309e092b68a28f791",
        //     credential: "bc87383f04063714a916d853fcd7a129b142",
        //   },
        // ],
        //backup
        // iceServers: [
        //   { urls: "stun:stun.l.google.com:19302" },
        //   {
        //     urls: "turn:openrelay.metered.ca:80",
        //     username: "openrelayproject",
        //     credential: "openrelayproject",
        //   },
        //   {
        //     urls: "turn:openrelay.metered.ca:443",
        //     username: "openrelayproject",
        //     credential: "openrelayproject",
        //   },
        //   {
        //     urls: "turns:openrelay.metered.ca:443?transport=tcp",
        //     username: "openrelayproject",
        //     credential: "openrelayproject",
        //   },
        // ],
      });
      setPeerTrigger((prev) => prev + 1);
      // FIXED: Sahi instance assign karein ref ko
      peerRef.current = temporaryFreshPeer;
    }
    return peerRef.current;
  }, []);

  const sendMyStream = useCallback(
    (stream) => {
      if (!stream) return;

      const peer = getActivePeer();

      stream.getTracks().forEach((track) => {
        const alreadyAdded = peer
          .getSenders()
          .some((sender) => sender.track === track);

        if (!alreadyAdded) {
          peer.addTrack(track, stream);
        }
      });
    },
    [getActivePeer],
  );

  useEffect(() => {
    const peer = getActivePeer();

    peer.onicecandidate = (event) => {
      if (!event.candidate || !user?.username || !callingUser?.username) return;

      socket.emit("ice-candidate", {
        from: user?.username,
        to: callingUser?.username,
        candidate: event.candidate,
      });
    };

    peer.ontrack = (event) => {
      if (event?.streams?.[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    return () => {
      peer.onicecandidate = null;
      peer.ontrack = null;
    };
  }, [getActivePeer, user?.username, callingUser?.username]);

  const flushIceQueue = useCallback(async () => {
    const peer = getActivePeer();
    console.log(iceCandidatesQueue.length, iceCandidatesQueue);
    while (iceCandidatesQueue.current.length > 0) {
      const candidate = iceCandidatesQueue.current.shift();

      try {
        if (candidate && peer.remoteDescription) {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (candidateError) {
        console.warn("candidate error", candidateError);
      }
    }
  }, [getActivePeer]);

  const createOffer = useCallback(async () => {
    const peer = getActivePeer();
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  }, [getActivePeer]);

  const createAnswer = useCallback(
    async (offer) => {
      const peer = getActivePeer();
      try {
        await peer.setRemoteDescription(new RTCSessionDescription(offer));

        setTimeout(async () => {
          await flushIceQueue();
        }, 50);

        const ans = await peer.createAnswer();
        await peer.setLocalDescription(ans);
        console.log("answer", ans);
        return ans;
      } catch (err) {
        console.error("error to create answer", err);
      }
    },
    [flushIceQueue, getActivePeer],
  );

  const setRemoteAnswer = useCallback(
    async (answer) => {
      const peer = getActivePeer();
      console.log("setting rmewote answer", answer);
      try {
        await peer.setRemoteDescription(new RTCSessionDescription(answer));

        setTimeout(async () => {
          await flushIceQueue();
        }, 50);

        setIsCallPromptOpen(false);
      } catch (error) {
        console.error("Critical Error in setRemoteAnswer:", error);
      }
    },
    [flushIceQueue, getActivePeer],
  );

  const handleRemoteCandidate = useCallback(
    async ({ candidate }) => {
      const peer = getActivePeer();
      console.log("remote coandate", candidate);
      try {
        if (peer && peer.remoteDescription && peer.remoteDescription.type) {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
          iceCandidatesQueue.current.push(candidate);
        }
      } catch (error) {
        console.error("Error adding ice candidate:", error);
      }
    },
    [getActivePeer],
  );

  const handleIncomingCallRequest = useCallback(
    async ({ username, offer, from, callingUser }) => {
      console.log(callingUser);
      setIsCallIncoming(true);
      setCallingUser(callingUser);
    },
    [createAnswer, getActivePeer, socket],
  );

  const handleRemoteCallEndedBeforeOffer = useCallback(
    ({ callended, isCallEndedBeforeRemoteExpect }) => {
      if (isCallEndedBeforeRemoteExpect) setIsCallIncoming(false);
    },
    [socket],
  );

  useEffect(() => {
    socket.on("initialize-call-request", handleIncomingCallRequest);
    socket.on("ice-candidate", handleRemoteCandidate);
    socket.on("call:ended", handleRemoteCallEndedBeforeOffer);

    return () => {
      socket.off("ice-candidate", handleRemoteCandidate);
      socket.off("initialize-call-request", handleIncomingCallRequest);
      socket.off("call:ended", handleRemoteCallEndedBeforeOffer);
    };
  }, [handleRemoteCandidate, handleIncomingCallRequest]);

  const stopPeerConnection = useCallback(
    ({
      myStream,
      localVideoRef,
      setRemoteStream,
      setMyStream,
      remoteVideoRef,
    }) => {
      try {
        if (myStream)
          myStream.getTracks().forEach((track) => {
            track.stop();
          });

        if (localVideoRef?.current?.srcObject)
          localVideoRef.current.srcObject = null;

        if (remoteVideoRef?.current?.srcObject)
          remoteVideoRef.current.srcObject = null;

        if (setMyStream) setMyStream(null);
        if (setRemoteStream) setRemoteStream(null);

        if (peerRef?.current) {
          peerRef.current.onicecandidate = null;
          peerRef.current.ontrack = null;
          peerRef.current.close();

          peerRef.current = null;
          iceCandidatesQueue.current = [];
        }
      } catch (err) {
        console.error("Error to Stop Call:", err);
      }
    },
    [],
  );

  return (
    <PeerContext.Provider
      value={{
        createOffer,
        remoteStream,
        isCallPromptOpen,
        setIsCallPromptOpen,
        createAnswer,
        isPeerTrigger,
        setRemoteAnswer,
        stopPeerConnection,
        get peer() {
          return peerRef.current;
        },
        sendMyStream,
        setRemoteStream,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};
