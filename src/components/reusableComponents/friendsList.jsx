import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { showScrollBarOnHover } from "../../utils/showSideBarOnHover";

const msgs = {
  Friends: {
    text: "Discover Friends & Start Conversation!",
    src: "/no-friends.svg",
  },
  Followers: {
    text: "Make Followers by Following People!",
    src: "/no-followers.svg",
  },
  Following: {
    text: "Find Friends & Follow Them",
    src: "/no-following.svg",
  },
};

const btnContent = {
  Friends: "Message",
  Following: "View Profile",
  Followers: "Follow Back",
};

export const FriendsList = ({ isDark, followersList, selectedSection }) => {
  const navigate = useNavigate();
  const [noFollowers, setNoFollowers] = useState(false);
  const elementRef = useRef(null);
  const isHovered = showScrollBarOnHover(elementRef);

  useEffect(() => {
    setNoFollowers(!followersList || followersList.length === 0);
  }, [followersList]);

  return (
    <div
      ref={elementRef}
      className={`p-3 ${
        noFollowers ? "flex items-center justify-center" : ""
      } ${
        isHovered ? "overflow-y-auto" : "overflow-y-hidden"
      } w-full account-settings flex flex-col gap-2 flex-1 min-h-0 mt-3 pb-5`}
    >
      {followersList?.length > 0 ? (
        followersList.map((data, indx) => {
          const userObj = data?.data || data;
          const fullName = userObj?.fullname || "Unknown User";
          const username = userObj?.username ? `@${userObj.username}` : "";

          return (
            <div
              key={userObj?._id || indx}
              onClick={() => {
                navigate("/profile", {
                  state: {
                    userId: userObj?._id,
                    name: fullName,
                  },
                });
              }}
              className="friend-div flex items-center justify-between gap-3 bg-(--bg-secondary) rounded-xl p-2.5 cursor-pointer hover:bg-(--bg-tertiary) transition-all duration-200"
            >
              {/* Avatar + User Names Wrapper */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <Avatar size="md" src={userObj?.profileImage} />
                <div className="div-content overflow-hidden flex flex-col min-w-0 flex-1">
                  <h1 className="text-xs xl:text-sm font-medium truncate text-(--text-primary)">
                    {fullName}
                  </h1>
                  <h2 className="text-[11px] xl:text-xs truncate text-(--text-secondary)">
                    {username}
                  </h2>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <Button
                  background="bg-transparent"
                  content={btnContent[selectedSection]}
                  textSize="xs"
                  fnc={(e) => {
                    e.stopPropagation();
                    navigate("/message");
                  }}
                  font="font-medium"
                  border="rounded-xl"
                  otherStyles={`${
                    isDark ? "hover:bg-red-500/20" : "hover:bg-red-300/30"
                  } px-2.5 py-1.5 hover:scale-[1.02] text-[12px] duration-200 border border-(--border-color) whitespace-nowrap`}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center gap-4 py-8 px-2 text-center">
          <img
            className="h-24 w-24 object-contain"
            src={msgs[selectedSection]?.src}
            alt="empty state"
          />
          <p className="text-xs xl:text-sm text-(--text-secondary) max-w-[200px]">
            {msgs[selectedSection]?.text}
          </p>
        </div>
      )}
    </div>
  );
};
