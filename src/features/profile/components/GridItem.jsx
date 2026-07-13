import { useEffect } from "react";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Button } from "../../../components/reusableComponents/Button";
import { Icons } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { TooltipMenu } from "../../../utils/tooltip";

export const GridItem = ({
  post,
  user,
  setPostCreaterInformation,
  isloggedInUser,
  isVideoTab,
  videoRef,
  getTooltipOptions,
  setActiveTooltipId,
  posts,
  handlePreferenceClick,
  activeTooltipId,
}) => {
  const userId = post?.user?._id;
  const fullname = user?.fullname || post?.user?.fullname;
  const username = user?.username || post?.user?.username;
  const profileImage = user?.profileImage || post?.user?.profileImage;
  const followers = user?.followers?.length || post?.user?.followers?.length;
  const _id = post?._id;
  const comments = post?.comments || [];
  const mediaUrl = post?.mediaUrl;
  const likes = post?.likes || [];
  const postdata = post?.postdata;
  const mediaType = post?.mediaType;

  const navigate = useNavigate();

  const handleClick = (likes, postdata, _id, mediaUrl, comments) => {
    if (activeTooltipId) {
      setActiveTooltipId(null);
      return;
    }

    navigate("/feed", {
      state: {
        _id,
        likes,
        isVideoTab,
        userId: user?._id || userId,
        comments,
        nextPosts: posts,
        mediaUrl,
        title: postdata || "ReelNest video #reelnest",
        avatar: user?.profileImage || profileImage,
        fullname: user?.fullname || fullname || "Guest",
        username: user?.username || username || "@user",
        followers: user?.followers || followers,
      },
    });
  };

  return (
    <div
      key={_id || indx}
      onClick={() => handleClick(likes, postdata, _id, mediaUrl, comments)}
      className="grid-video h-90 w-full rounded-xl relative overflow-hidden bg-black cursor-pointer"
    >
      <div
        className={`relative h-full w-full ${!isVideoTab ? "flex justify-center items-center" : ""}`}
      >
        {/* Header Info & Actions */}
        <div className="flex gap-3 w-[90%] absolute top-2 left-2 items-center justify-between z-2">
          <div className="user-info flex gap-1 items-center">
            <Avatar size="sm" src={profileImage} />
            <h1 className="text-xs sm:text-sm line-clamp-1 text-white">
              {fullname}
            </h1>
          </div>

          {isloggedInUser && (
            <div
              className="relative p-2 cursor-pointer hit-target"
              onClick={(e) => handlePreferenceClick(e, _id)}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
            >
              <Icons.videoPreference size={22} color="white" />

              {activeTooltipId === _id && (
                <TooltipMenu
                  options={getTooltipOptions(_id, mediaType)}
                  onClose={() => setActiveTooltipId(null)}
                />
              )}
            </div>
          )}
        </div>

        {/* Media Element */}
        {isVideoTab ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={mediaUrl}
          ></video>
        ) : (
          <img
            src={mediaUrl}
            className="h-full w-full object-cover"
            alt="post"
          />
        )}

        <h1 className="text-white absolute bottom-3 line-clamp-2 left-2 z-10">
          {postdata}
        </h1>
      </div>
    </div>
  );
};
