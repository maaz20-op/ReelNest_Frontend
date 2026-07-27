import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Icons } from "../../../assets/icons";
import { socket } from "../../../socketConnection/messagesSocket";
import { useAuth } from "../../auth/hooks/useAuth";
import { useLazyGetMessagesQuery } from "../../../services/message/message";
import { ChatScreenSkeleton } from "../../../skeleton/message/mainChatScreen";
import { useToastContext } from "../../../contexts/toast";
import {
  setPagesAndCallApiInfiniteScroll,
  useInfinteScroll,
} from "../../../utils/useInfiniteScroll";
import { Spinner } from "../../../components/reusableComponents/Spinner";
import { VirtualList } from "../../../utils/useVirtualization";

export const ChatScreen = ({
  selectedChatUser,
  iconsColor,
  isDark,
  onlineUsers,
}) => {
  const [message, setMessage] = useState("");
  const [isEndOfMessages, setEndOfMessages] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const oldContainerChatHeight = useRef(0);

  // Helper to force scroll to bottom
  const scrollToBottom = (behavior, customScroll = false) => {
    if (chatContainerRef.current && !customScroll) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "instant",
      });
    }
    if (chatContainerRef.current && customScroll) {
      chatContainerRef.current.scrollBy({
        top: 800,
        behavior: "instant",
      });
    }
  };

  const { showToast } = useToastContext();
  const { user } = useAuth();

  const [fetchMessages, { data, isFetching, isLoading, error }] =
    useLazyGetMessagesQuery();
  const { handleScroll, isBottomOfContainer, setBtmContainer } =
    useInfinteScroll(undefined, true);

  const messagesRawData = data?.data[0];
  const hasNextPage = data?.data[1];
  const limit = 20;

  const {
    apiData: msgs,
    setApiData,
    page,
  } = setPagesAndCallApiInfiniteScroll({
    hasNextPage,
    reverse: true,
    setBtmContainer,
    postsRawData: messagesRawData,
    data,
    isPostsEnd: isEndOfMessages,
    setEndOfPosts: setEndOfMessages,
    isBottomOfContainer,
    isFetching,
    fetchData: fetchMessages,
    queryObject: {
      limit: limit,
      chatedUserId: selectedChatUser?._id,
    },
  });

  useLayoutEffect(() => {
    const id = setTimeout(() => scrollToBottom("auto", true), 500);
    return () => clearTimeout(id);
  }, [msgs]);

  useLayoutEffect(() => {
    if (page === 1 && selectedChatUser?._id) {
      setTimeout(() => scrollToBottom("auto"), 500);
    }
  }, [page, selectedChatUser?._id, chatContainerRef?.current]);

  useEffect(() => {
    const handleIncomingMessage = (incomingMsg) => {
      setApiData((prev) => [...(prev || []), incomingMsg]);
      setTimeout(() => scrollToBottom("smooth"), 50);
    };

    socket.on("chat-msg", handleIncomingMessage);

    return () => {
      socket.off("chat-msg", handleIncomingMessage);
    };
  }, [setApiData]);

  const sendMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;
    if (!onlineUsers.includes(selectedChatUser?.username)) {
      return showToast("Can't send message to offline user");
    }
    if (!user?.username || !selectedChatUser?.username) return;

    socket.emit("chat-msg", {
      msg: trimmedMessage,
      to: selectedChatUser.username,
      from: user.username,
    });

    setApiData((prev) => [
      ...(prev || []),
      {
        msg: trimmedMessage,
        senderId: user._id,
        receiverId: selectedChatUser._id,
        createdAt: new Date().toISOString(),
      },
    ]);

    setMessage(""); // Reset input field
    setTimeout(() => scrollToBottom("smooth"), 50); // Scroll down only for your new message
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  if (isLoading || error) return <ChatScreenSkeleton />;

  return (
    <div className="chat-screen flex flex-col h-full w-full bg-(--bg-primary) overflow-hidden">
      {/* 1. HEADER SECTION */}
      <div className="header-chat-screen w-full h-20 border-b border-(--border-color) bg-(--bg-primary) z-10">
        <div className="user-info flex items-center justify-between px-4 py-3">
          <div className="flex gap-3 items-center">
            <Avatar size="lg" src={selectedChatUser?.profileImage} />
            <div className="div-content lg:w-30 xl:w-45 leading-tight overflow-hidden flex flex-col">
              <h1 className="text-[18px] font-semibold line-clamp-1 text-(--text-primary)">
                {selectedChatUser?.fullname}
              </h1>
              <h2 className="text-sm line-clamp-1 text-(--text-secondary)">
                @{selectedChatUser?.username}
              </h2>
            </div>
          </div>

          <div className="flex gap-2">
            {onlineUsers.includes(selectedChatUser?.username) && (
              <React.Fragment>
                <span className="bg-green-600 flex ml-auto justify-center items-center text-(--text-primary) p-1 h-4 w-4 rounded-full" />
                <span className="text-xs text-(--text-muted)">
                  Active Nester
                </span>
              </React.Fragment>
            )}
          </div>

          <div className="flex items-center gap-2 lg:gap-5">
            <button
              type="button"
              className={`${
                isDark ? "hover:bg-red-500/20" : "hover:bg-red-100"
              } p-2 flex justify-center items-center rounded-full transition-colors cursor-pointer`}
            >
              <Icons.call size={23} color={iconsColor} />
            </button>
            <button
              type="button"
              className={`${
                isDark ? "hover:bg-red-500/20" : "hover:bg-red-100"
              } p-2 flex justify-center items-center rounded-full transition-colors cursor-pointer`}
            >
              <Icons.videoCall size={23} color={iconsColor} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MESSAGES SECTION */}
      {isBottomOfContainer && !isEndOfMessages && <Spinner />}
      <div
        onScroll={handleScroll}
        ref={chatContainerRef}
        className="main-msg-screen h-screen account-settings flex-1 overflow-y-auto p-4 space-y-4"
      >
        <VirtualList
          mainContainerRef={chatContainerRef}
          data={msgs}
          itemRendered={(msg) => {
            const isMe = msg?.senderId?.toString() === user?._id?.toString();
            const chatUserMsg =
              msg?.senderId?.toString() === selectedChatUser?._id?.toString();

            const msgCreatedDate = new Date(msg?.createdAt || Date.now());
            const date = msgCreatedDate.toLocaleDateString("en-GB");
            const time = msgCreatedDate.toLocaleTimeString("en-US", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <React.Fragment key={msg?._id || msg?.createdAt}>
                {chatUserMsg && (
                  <div className="flex flex-col gap-2 justify-start my-2">
                    <div className="flex gap-2">
                      <span className="text-(--text-secondary) text-xs">
                        {date}
                      </span>
                      <span className="text-(--text-secondary) text-xs">
                        {time}
                      </span>
                    </div>
                    <p className="px-4 py-2.5 max-w-[70%] sm:max-w-[60%] text-(--text-primary) bg-(--bg-tertiary) rounded-2xl rounded-tl-none shadow-sm">
                      {msg?.msg}
                    </p>
                  </div>
                )}
                {isMe && (
                  <div className="flex flex-col items-end my-2">
                    <div className="flex gap-2">
                      <span className="text-(--text-secondary) text-xs">
                        {date}
                      </span>
                      <span className="text-(--text-secondary) text-xs">
                        {time}
                      </span>
                    </div>
                    <p className="px-4 py-2.5 max-w-[70%] sm:max-w-[60%] text-white bg-purple-500 rounded-2xl rounded-tr-none shadow-sm">
                      {msg?.msg}
                    </p>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* 3. TYPING AREA SECTION */}
      <div className="send-msg-input w-full p-3 border-t border-(--border-color) bg-(--bg-primary)">
        <form onSubmit={sendMessage} className="flex items-center gap-3">
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            value={message}
            rows={1}
            className="p-3 rounded-2xl flex-1 text-(--text-primary) bg-(--bg-tertiary) focus:ring-2 focus:ring-red-500 outline-none border border-(--border-color) resize-none"
            placeholder="Write Your Message..."
          />
          <button
            type="submit"
            className="p-2 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
          >
            <Icons.send className="text-red-500" size={28} />
          </button>
        </form>
      </div>
    </div>
  );
};
