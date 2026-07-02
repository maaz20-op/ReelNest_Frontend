import React, { useMemo, useState } from "react";
import { Avatar } from "../../../components/Avatar";
import { Icons } from "../../../assets/icons";
import { debounce } from "../../../utils/debounce";
import { useFollowUserMutation } from "../../../services/users/user";

export const PostCard = ({
  post,
  user,
  iconsColor,
  setCommentsOpen,
  isCommentsOpen,
}) => {
  const { _id, mediaUrl, postdata, userData, likesUsersData } = post;

  const [isFollow, setFollow] = useState(false);
  const [isLiked, setLike] = useState(false);
  const [followUser, { isLoading, data }] = useFollowUserMutation();

  const debouncedFollow = useMemo(() => {
    return debounce(() => {
      console.log("code runned after 5 sec");
      followUser(userData?._id); // send backend request after updating Ui
    }, 5000);
  }, []);

  const handleFollowClick = () => {
    setFollow((prev) => !prev);
    debouncedFollow();
  };

  return (
    <div className="video-image-card py-6 flex flex-col gap-2 w-full px-2">
      {/* Profile image - username */}
      <div className="profile-info items-center p-4 flex justify-between gap-2 ">
        <div className="flex gap-4">
          <Avatar size="md" src={userData?.profileImage} />
          <div className="user-name flex flex-col leading-4 justify-center">
            <h1 className="text-(--text-primary) text-sm">
              {userData?.fullname}
            </h1>
            <h2 className="text-(--text-secondary) text-sm">
              @{userData?.username}
            </h2>
          </div>
        </div>

        <div onClick={handleFollowClick}>
          {userData?.followers?.includes(user?._id) || isFollow ? (
            <Icons.followedIcon color={iconsColor} size={25} />
          ) : (
            userData?._id !== user?._id && (
              <Icons.followIcon color={iconsColor} size={25} />
            )
          )}
        </div>
      </div>

      {/* Image - video content */}
      <div className="video/image-container w-full ">
        <video
          className="w-full aspect-square object-cover h-140 rounded-2xl"
          src={
            mediaUrl
              ? mediaUrl
              : "https://res.cloudinary.com/ddl6cgcbp/video/upload/q_auto,f_auto/v1752447426/ReelNest/videos/x764nhgtfjojbau5h23i.mp4"
          }
          controls
        ></video>
      </div>

      {/* Like comments Button */}
      <div className="action-icons px-2 mt-2 flex justify-between">
        <div className="flex gap-8">
          <Icons.heart
            onClick={() => setLike((prev) => !prev)} // Toggle like state
            color={isLiked ? "#E41A7F" : iconsColor}
            size={23}
          />
          <Icons.comments
            onClick={() => setCommentsOpen((prev) => !prev)}
            color={isCommentsOpen ? "red" : iconsColor}
            size={23}
          />
          <Icons.send color={iconsColor} size={23} />
        </div>
        <Icons.save color={iconsColor} size={23} />
      </div>

      {/* Likes and video title */}
      <div className="mt-4 text-sm">
        {likesUsersData?.length > 0 && Array.isArray(likesUsersData) ? (
          <div className="text-(--text-secondary) ">
            Liked by{" "}
            <span className="text-(--text-primary)">
              {likesUsersData?.[0]?.name?.split(" ")[0]},{" "}
              {likesUsersData?.[1]?.name?.split(" ")[0]}
            </span>{" "}
            {likesUsersData.length > 2 && (
              <span className="text-(--text-primary)">
                {Math.abs(likesUsersData.length - 2)} and others
              </span>
            )}
          </div>
        ) : (
          <div className="text-(--text-secondary) ">No Likes Yet!</div>
        )}
        <div className="flex gap-1 flex-col sm:flex-row text-(--text-primary) ">
          <p>{userData?.username || "user"}_posted: </p>
          <p className="text-(--text-secondary) ">{postdata}</p>
        </div>
      </div>
    </div>
  );
};
