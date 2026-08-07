import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Icons } from "../../../assets/icons";

import { useAuth } from "../../auth/hooks/useAuth";
import {
  useDeleteMessageMutation,
  useLazyGetMessagesQuery,
} from "../../../services/message/message";
import { ChatScreenSkeleton } from "../../../skeleton/message/mainChatScreen";
import { useToastContext } from "../../../contexts/toast";
import {
  setPagesAndCallApiInfiniteScroll,
  useInfinteScroll,
} from "../../../utils/useInfiniteScroll";
import { Spinner } from "../../../components/reusableComponents/Spinner";
import { VirtualList } from "../../../utils/useVirtualization";
import { useNavigate } from "react-router-dom";
import { CallConfirmationPrompt } from "./subComponents/callConfrimationPrompt";
import { useSocketContext } from "../../../contexts/socketContext";
import { TooltipMenu } from "../../../utils/tooltip";
import { ChatMsgHeader } from "./subComponents/chatMsg/chatMsgHeader";
import { ChatMsgScreen } from "./subComponents/chatMsg/chatMsgMainScreen";
import { ChatMsgTypingArea } from "./subComponents/chatMsg/chatMsgTypingArea";
import { getMessageFunctions } from "./subComponents/chatMsg/hook/getMessageFunctions";

export const ChatScreen = ({
  selectedChatUser,

  iconsColor,
  isDark,
  onlineUsers,
}) => {
  const messagesEndRef = useRef(null);

  const chatContainerRef = useRef(null);
  const oldContainerChatHeight = useRef(0);

  const { socket } = useSocketContext();

  // Helper to force scroll to bottom

  const oldUser = useRef(null);

  const { showToast } = useToastContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    sendMessage,
    handleScroll,
    deleteMsg,
    message,
    setMessage,
    isLoading,
    error,
    page,
    msgs,
    setApiData,
    isBottomOfContainer,
    isEndOfMessages,
  } = getMessageFunctions({
    selectedChatUser,
    oldUser,
    chatContainerRef,
    onlineUsers,
    user,
    messagesEndRef,
  });

  if (isLoading || error) return <ChatScreenSkeleton />;

  return (
    <div className="chat-screen flex flex-col h-[90%] lg:h-[80vh] w-full bg-(--bg-primary) overflow-hidden">
      {/* 1. HEADER SECTION */}
      <ChatMsgHeader
        selectedChatUser={selectedChatUser}
        onlineUsers={onlineUsers}
      />
      {/* 2. MESSAGES SECTION */}
      {isBottomOfContainer && !isEndOfMessages && <Spinner />}
      <ChatMsgScreen
        handleScroll={handleScroll}
        msgs={msgs}
        chatContainerRef={chatContainerRef}
        messagesEndRef={messagesEndRef}
        setApiData={setApiData}
        user={user}
        selectedChatUser={selectedChatUser}
        deleteMsg={deleteMsg}
      />

      {/* 3. TYPING AREA SECTION */}
      <ChatMsgTypingArea
        setMessage={setMessage}
        sendMessage={sendMessage}
        message={message}
      />
    </div>
  );
};
