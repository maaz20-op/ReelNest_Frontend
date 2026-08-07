import { useEffect, useLayoutEffect, useState } from "react";
import {
  useDeleteMessageMutation,
  useLazyGetMessagesQuery,
} from "../../../../../../services/message/message";
import {
  setPagesAndCallApiInfiniteScroll,
  useInfinteScroll,
} from "../../../../../../utils/useInfiniteScroll";
import { useSocketContext } from "../../../../../../contexts/socketContext";

export const getMessageFunctions = ({
  selectedChatUser,
  oldUser,
  onlineUsers,
  user,
  chatContainerRef,
}) => {
  const [fetchMessages, { data, isFetching, isLoading, error }] =
    useLazyGetMessagesQuery();
  const [deleteMsg] = useDeleteMessageMutation();

  const [isEndOfMessages, setEndOfMessages] = useState(false);
  const [message, setMessage] = useState("");
  const { handleScroll, isBottomOfContainer, setBtmContainer } =
    useInfinteScroll(undefined, true);
  const { socket } = useSocketContext();

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
    userId: selectedChatUser?._id,
    isBottomOfContainer,
    isFetching,
    fetchData: fetchMessages,
    queryObject: {
      limit: limit,
      chatedUserId: selectedChatUser?._id,
    },
  });

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

    setMessage("");
    setTimeout(() => scrollToBottom("smooth"), 50);
  };

  useLayoutEffect(() => {
    const id = setTimeout(() => scrollToBottom("auto", true), 500);
    return () => clearTimeout(id);
  }, [msgs]);

  useLayoutEffect(() => {
    if (page === 1 && selectedChatUser?._id) {
      setTimeout(() => scrollToBottom("auto"), 500);
    }
    oldUser.current = selectedChatUser?._id;
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

  useEffect(() => {
    if (selectedChatUser?._id === oldUser?.current) {
      setApiData([]);
    }
  }, [selectedChatUser?._id]);

  return {
    sendMessage,
    handleScroll,
    deleteMsg,
    setMessage,
    isLoading,
    error,
    msgs,
    setApiData,
    isBottomOfContainer,
    isEndOfMessages,
    page,
    message,
  };
};
