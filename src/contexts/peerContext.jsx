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

export const PeerContext = createContext(null);

export const PeerProvider = ({ children }) => {
  const [myStream, setMyStream] = useState(null);
  const iceCandidatesQueue = useRef([]);
  const peerRef = useRef(null);
  const [isPeerTrigger, setPeerTrigger] = useState(0);
  const { socket } = useSocketContext();

  const { setIsCallIncoming } = useIncomingCallPopupContext();

  const getActivePeer = useCallback(() => {
    // Agar connection uninitialized hai ya close ho chuka hai
    if (!peerRef.current || peerRef.current.signalingState === "closed") {
      const temporaryFreshPeer = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turns:openrelay.metered.ca:443?transport=tcp",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
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
        // FIXED: Condition variable assignment ko sahi kiya (`const alreadyAdded`)
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

  const flushIceQueue = useCallback(async () => {
    const peer = getActivePeer();

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
      try {
        await peer.setRemoteDescription(new RTCSessionDescription(answer));

        // Safe delay taake internals register ho sakein
        setTimeout(async () => {
          await flushIceQueue();
        }, 50);
      } catch (error) {
        console.error("Critical Error in setRemoteAnswer:", error);
      }
    },
    [flushIceQueue, getActivePeer],
  );

  const handleRemoteCandidate = useCallback(
    async ({ candidate }) => {
      const peer = getActivePeer();
      try {
        if (peer && peer.remoteDescription && peer.remoteDescription.type) {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
          console.log("Direct ICE Candidate added successfully!");
        } else {
          iceCandidatesQueue.current.push(candidate);
        }
      } catch (error) {
        console.error("Error adding ice candidate:", error);
      }
    },
    [getActivePeer], // iceCandidatesQueue ref hai, dependency mein zaroorat nahi hai
  );

  const handleIncomingCall = useCallback(
    async ({ username, offer, from }) => {
      setIsCallIncoming(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setMyStream(stream);
      sendMyStream(stream);

      const ans = await createAnswer(offer);

      socket.emit("call-accepted", { from, answer: ans });
    },
    [createAnswer, getActivePeer, socket],
  );

  useEffect(() => {
    socket.on("call-user", handleIncomingCall);

    return () => handleIncomingCall;
  }, [handleIncomingCall]);

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

        if (peerRef.current) {
          peerRef.current.onicecandidate = null;
          peerRef.current.ontrack = null;
          peerRef.current.close();

          // FIXED: Variable ko null karein taake agli call par getActivePeer bilkul naya instance banaye
          peerRef.current = null;
          iceCandidatesQueue.current = [];
        }
      } catch (err) {
        console.error("Error to Stop Call:", err);
      }
    },
    [], // getActivePeer nikal diya taake cleanup logic robust rahe
  );

  return (
    <PeerContext.Provider
      value={{
        createOffer,
        myStream,
        setMyStream,
        handleIncomingCall,
        createAnswer,
        isPeerTrigger,
        stopPeerConnection,
        handleRemoteCandidate,
        setRemoteAnswer,
        get peer() {
          return peerRef.current;
        },
        sendMyStream,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};
