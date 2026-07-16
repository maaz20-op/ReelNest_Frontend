import { useEffect, useRef, useState } from "react";
import { contextThemeSetup } from "../../utils/contextSetup";
import { showScrollBarOnHover } from "../../utils/showSideBarOnHover";
import { use } from "react";
import { FriendsList } from "../reusableComponents/friendsList";
import { FriendsListSkeleton } from "../../skeleton/leftDesktopPanel";
import { useConnectionsData } from "../../hooks/userConnectionData";
import { useAuth } from "../../features/auth/hooks/useAuth";

export const LeftFriendsPanelDesktop = () => {
  const [activeIndx, setActive] = useState(0);
  const { isDark } = contextThemeSetup();
  const { user } = useAuth();
  const [selectedSection, setSection] = useState("Friends");

  const connectionData = useConnectionsData();

  const handleClick = (indx, sec) => {
    setSection(sec);
    setActive(indx);
  };
  return (
    <div className="lg:flex lg:flex-col  hidden  py-4   border border-r border-(--border-color)  min-h-0 ">
      <div className="sections text-(--text-secondary) px-4   flex justify-between gap-2">
        {["Friends", "Followers", "Following"].map((sec, indx) => (
          <h1
            key={indx}
            className={`border-red-600 transition-all  ${activeIndx == indx ? "border-b-2" : ""}`}
            onClick={() => handleClick(indx, sec)}
          >
            {sec}
          </h1>
        ))}
      </div>
      {connectionData?.isLoading || connectionData?.error ? (
        <FriendsListSkeleton isDark={isDark} />
      ) : (
        <FriendsList
          isDark={isDark}
          followersList={connectionData?.connectionList[selectedSection]}
          selectedSection={selectedSection}
        />
      )}
    </div>
  );
};
