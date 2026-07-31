import { useEffect, useRef, useState } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { ChatScreen } from "../components/ChatMsg";
import { FriendsMsgUI } from "../components/FriendsMsg";
import { showScrollBarOnHover } from "../../../utils/showSideBarOnHover";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useAuth } from "../../auth/hooks/useAuth";
import { CallConfirmationPrompt } from "../components/subComponents/callConfrimationPrompt";
import { useSocketContext } from "../../../contexts/socketContext";

export const MessageUsersPage = () => {
  const msgUpdateRef = useRef(null);
  const mainMsgContainerRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { user } = useAuth();
  const { socket } = useSocketContext();

  const { iconsColor, isDark } = contextThemeSetup();
  const isMsgUpdateContHoverd = showScrollBarOnHover(msgUpdateRef);
  const [isChatUserBoxClicked, setIsChatUserBoxSelected] = useState(false);
  const ismainMsgContHoverd = showScrollBarOnHover(mainMsgContainerRef);
  const [selectedChatUser, setTargetChatUser] = useState(null);

  useEffect(() => {
    if (!user?.username) return;
    socket.emit("register", user?.username);

    return () => socket.off("register");
  }, [user?.username]);

  return (
    <div className=" min-h-0   h-full">
      <div className="w-full flex    flex-col px-(--page-x-padding) h-full">
        {/* Header */}
        <div className="py-4 ">
          <h1 className="text-center text-2xl text-(--text-primary)">
            My Chats
          </h1>
        </div>

        {/* Messages Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr]   xl:grid-cols-2 flex-1  gap-20 h-[30%]   border-t-2 border-(--border-color)">
          {/* Friends Msg UI */}
          {window.innerWidth < 1024 && !isChatUserBoxClicked && (
            <div
              ref={msgUpdateRef}
              className={`${isMsgUpdateContHoverd ? "overflow-y-auto" : "overflow-y-hidden"} h-full all-messages flex flex-col   min-h-0  account-settings  rounded-xl`}
            >
              <FriendsMsgUI
                setIsChatUserBoxSelected={setIsChatUserBoxSelected}
                setTargetChatUser={setTargetChatUser}
                setOnlineUsers={setOnlineUsers}
                onlineUsers={onlineUsers}
              />
            </div>
          )}

          {window.innerWidth > 1024 && (
            <div
              ref={msgUpdateRef}
              className={`${isMsgUpdateContHoverd ? "overflow-y-auto" : "overflow-y-hidden"} h-full all-messages flex flex-col border-x-2 border-(--border-color)  min-h-0  account-settings  rounded-xl`}
            >
              <FriendsMsgUI
                setIsChatUserBoxSelected={setIsChatUserBoxSelected}
                setTargetChatUser={setTargetChatUser}
                setOnlineUsers={setOnlineUsers}
                onlineUsers={onlineUsers}
              />
            </div>
          )}
          {/* Main Chat Screen */}

          {isChatUserBoxClicked && selectedChatUser?.username && (
            <ChatScreen
              selectedChatUser={selectedChatUser}
              iconsColor={iconsColor}
              onlineUsers={onlineUsers}
              isDark={isDark}
            />
          )}

          {!isChatUserBoxClicked && window.innerWidth > 1024 && (
            <p className="text-(--text-primary) font-bold text-center mt-70 text-xl ">
              Select A Friend for Chating!{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
