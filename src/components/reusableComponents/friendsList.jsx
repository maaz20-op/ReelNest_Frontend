import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const msgs = {
  Friends: {
    text: "Discover Friends & Start Conversation!",
    src: "/no-friends.svg",
  },
  Followers: {
    text: "Make Followers by Follwing Peoples!",
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

export const FriendsList = ({
  elementRef,
  isHoverd,
  isDark,
  followersList,
  selectedSection,
}) => {
  const navigate = useNavigate();
  const [noFollowers, setNoFollowers] = useState(false);

  useEffect(() => {
    if (followersList?.length === 0) {
      setNoFollowers(true);
    } else if (followersList?.length > 0) {
      setNoFollowers(false);
    }
  }, [followersList]);

  console.log(isHoverd);

  return (
    <div
      ref={elementRef}
      className={`${noFollowers ? "flex  items-center justify-center" : isHoverd ? "overflow-y-auto " : "overflow-y-hidden"} account-settings  flex flex-col gap-2 flex-1 min-h-0  mt-5  pb-5 `}
    >
      {followersList?.length > 0 ? (
        followersList.map((data, indx) => (
          <div
            key={indx}
            onClick={() => {
              navigate("/profile", {
                state: {
                  userId: data?.data?._id || data?._id,
                  name: data?.data?.fullname || data?.fullname,
                },
              });
            }}
            className="friend-div flex items-center bg-(--bg-secondary) rounded-xl justify-center lg:gap-1 xl:gap-2 px-2 py-3 rounded"
          >
            <Avatar
              size="md"
              src={data?.data?.profileImage || data?.profileImage}
            />
            <div className="div-content lg:w-40 xl:w-45 overflow-hidden flex  flex-col">
              <h1 className="text-sm line-clamp-1 text-(--text-primary) ">
                {data?.data?.fullname || data?.fullname}
              </h1>
              <h2 className="text-sm  line-clamp-1 text-(--text-secondary)">
                {data?.data?.username || data?.username}
              </h2>
            </div>

            <Button
              background="bg-tranparent"
              content={btnContent[selectedSection]}
              font="font-light"
              textSize="sm"
              width="w-30"
              border="rounded-2xl"
              otherStyles={`${isDark ? "hover:bg-red-500" : "hover:bg-red-300"} w-40 text-xs hover:scale-[1.04] duration-300 border border-(--border-color)`}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center gap-6">
          <img
            className="h-30 w-30"
            src={msgs[selectedSection]?.src}
            alt="no-friends"
          />
          <p className="w-30 text-center text-(--text-primary)">
            {msgs[selectedSection]?.text}
          </p>
        </div>
      )}
    </div>
  );
};
