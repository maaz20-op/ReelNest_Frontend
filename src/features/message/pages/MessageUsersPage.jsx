import { useRef, useState } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import {
  ChatMsg,
  ChatScreenHeader,
  ChatScreenTypingArea,
} from "../components/ChatMsg";
import { FriendsMsgUI } from "../components/FriendsMsg";
import { showScrollBarOnHover } from "../../../utils/showSideBarOnHover";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { FriendsMessageListSkeleton } from "../../../skeleton/message/friendsMsgList";
import {
  MainChatScreenSkeleton,
  MainChatScreenTopHeaderSkeleton,
  MainChatScreenTypingAreaSkeleton,
} from "../../../skeleton/message/mainChatScreen";

export const MessageUsersPage = () => {
  const msgUpdateRef = useRef(null);
  const mainMsgContainerRef = useRef(null);

  const { iconsColor, isDark } = contextThemeSetup();
  const isMsgUpdateContHoverd = showScrollBarOnHover(msgUpdateRef);
  const ismainMsgContHoverd = showScrollBarOnHover(mainMsgContainerRef);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full flex flex-col px-(--page-x-padding) min-h-0  ">
      {/* Header */}
      <div className="py-4 ">
        <h1 className="text-center text-2xl text-(--text-primary)">My Chats</h1>
      </div>

      {/* Messages Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0 gap-20   border-t-2 border-(--border-color)">
        {/* Friends Msg UI */}
        <div
          ref={msgUpdateRef}
          className={`${isMsgUpdateContHoverd ? "overflow-y-auto" : "overflow-y-hidden"} all-messages flex flex-col border-x-2 border-(--border-color)  min-h-0  account-settings  rounded-xl`}
        >
          {loading ? <FriendsMessageListSkeleton /> : <FriendsMsgUI />}
        </div>
        {/* Main Chat Screen */}
        <div className="main-chat-screen hidden rounded  border-x-2 border-(--border-color) lg:flex lg:flex-col min-h-0">
          {/* Chat screen Header */}
          {loading ? (
            <MainChatScreenTopHeaderSkeleton />
          ) : (
            <ChatScreenHeader iconsColor={iconsColor} isDark={isDark} />
          )}

          {/* Main Msg Screen */}
          <div
            ref={mainMsgContainerRef}
            className={`${ismainMsgContHoverd ? "overflow-y-auto" : "overflow-y-hidden"} main-msg-screen relative   flex-1 min-h-0  p-2 account-settings`}
          >
            {loading ? <MainChatScreenSkeleton /> : <ChatMsg />}
          </div>

          {/* Message Typing Area */}
          {loading ? (
            <MainChatScreenTypingAreaSkeleton />
          ) : (
            <ChatScreenTypingArea iconsColor={iconsColor} />
          )}
        </div>
      </div>
    </div>
  );
};
