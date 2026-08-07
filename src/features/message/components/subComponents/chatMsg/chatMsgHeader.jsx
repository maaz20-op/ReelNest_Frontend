import { useNavigate } from "react-router-dom";
import { contextThemeSetup } from "../../../../../utils/contextSetup";
import { Avatar } from "../../../../../components/reusableComponents/Avatar";
import { Icons } from "../../../../../assets/icons";

export const ChatMsgHeader = ({ selectedChatUser, onlineUsers }) => {
  const navigate = useNavigate();
  const { isDark, iconsColor } = contextThemeSetup();

  const handleRedirecttoVideoCall = () => {
    if (!selectedChatUser?.fullname) return;
    navigate("/videoCall", {
      state: {
        user: selectedChatUser,
      },
    });
  };

  return (
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
              <span className=" flex ml-auto justify-center items-center text-(--text-primary) p-1 h-4 w-4 rounded-full" />
              <span className="text-[8px] sm:text-xs  text-(--text-muted)">
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
            onClick={handleRedirecttoVideoCall}
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
  );
};
