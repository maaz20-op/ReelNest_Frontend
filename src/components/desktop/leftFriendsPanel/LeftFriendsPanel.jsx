import { useRef, useState } from "react";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { showScrollBarOnHover } from "../../../utils/showSideBarOnHover";
import { use } from "react";
import { FriendsList } from "./compoenents/friendsList";
import { FriendsListSkeleton } from "../../../skeleton/leftDesktopPanel";

import { useGetFollowersQuery } from "../../../services/users/user";

const sectionKey = "maaz_key";
export const LeftFriendsPanelDesktop = () => {
  const [activeIndx, setActive] = useState(0);

  const { isDark } = contextThemeSetup();
  const [selectedSection, setSection] = useState("Friends");
  const elementRef = useRef(null);
  const isHoverd = showScrollBarOnHover(elementRef);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useGetFollowersQuery();

  const setList = {
    Friends: data?.data[2],
    Following: data?.data[1],
    Followers: data?.data[0],
  };

  const handleClick = (indx, sec) => {
    setSection(sec);
    setActive(indx);
  };
  return (
    <div className="lg:flex lg:flex-col xl:p-5 hidden lg:p-2  border border-r border-(--border-color) py-4 min-h-0 ">
      <div className="sections text-(--text-secondary)   flex justify-between gap-2">
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
      {isLoading || error ? (
        <FriendsListSkeleton isDark={isDark} />
      ) : (
        <FriendsList
          elementRef={elementRef}
          isDark={isDark}
          followersList={setList[selectedSection]}
          isHoverd={isHoverd}
          selectedSection={selectedSection}
        />
      )}
    </div>
  );
};
