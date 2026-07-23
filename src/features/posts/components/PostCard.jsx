import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Icons } from "../../../assets/icons";
import { debounce } from "../../../utils/debounce";
import { useFollowUserMutation, userApi } from "../../../services/users/user";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useAuth } from "../../auth/hooks/useAuth";
import { useCommentsContext } from "../../comments/hooks/useIsCommentsOpen";
import { useLike } from "../../../hooks/useLike";
import { useNavigate } from "react-router-dom";
import { handleRedirectToUserProfile } from "../../../utils/handleRedirectToUserProfile";
import { useCreateUserSavedPinsMutation } from "../../../services/pins/pin";
import { useFollowUser } from "../../../hooks/useFollowUser";
import { checkIsFollowed } from "../../../utils/checkisFollowed";
import { useToastContext } from "../../../contexts/toast";
import { useVideoControls } from "../../../utils/videoControls";
import { useSavePost } from "../../../hooks/savePost";

export const PostCard = ({
  post,
  setCurrentPostCommentsData,
  isMute,
  setMute,
}) => {
  const {
    _id,
    mediaUrl,
    postdata,
    userData,
    likesUsersData,
    likes,
    createdAt,
  } = post;
  let date = new Date(createdAt);
  const [isFollow, setFollow] = useState(false);
  const videoRef = useRef(null);

  // custom  hooks
  const { user } = useAuth();
  const { isCommentsOpen, setIsCommentsOpen } = useCommentsContext();
  const { iconsColor } = contextThemeSetup();
  const { showToast } = useToastContext();
  const navigate = useNavigate();
  const handleRedirectToCreaterProfile = handleRedirectToUserProfile(
    userData?._id,
    userData?.fullname,
    navigate,
  );

  // Manages optimistic like updates and synchronizes them with the backend.
  const likesData = useLike({
    likesArray: likes,
    currentPost: post,
    postCreaterId: userData?._id,
  });
  const handleLikeClick = likesData?.handleLikeClick;
  const localHasLiked = likesData?.localHasLiked;
  const localLikesCount = likesData?.localLikesCount;
  const isLiked = likes.includes(user?._id);

  // Automatically play/pause the video based on its visibility
  // to avoid playing off-screen media.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef?.current.play();
          return;
        }
        videoRef?.current.pause();
      },
      { threshold: 0.4 },
    );

    if (videoRef?.current) observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [post?._id]);

  //handle save Post
  const handleSavePost = useSavePost(_id, userData);

  // following user otimistically
  const handleFollowClick = useFollowUser({ userData, setFollow });
  const isFollowed = checkIsFollowed(userData?._id);

  const {
    handleProgressBar,
    handleClick,
    isPlay,
    setPlay,
    setHide,
    progressBarWidth,
    hidePlayPauseIcon,
  } = useVideoControls(videoRef);

  return (
    <div className="video-image-card py-6 flex flex-col gap-2  max-w-full px-2">
      {/* Profile image - username */}
      <div
        onClick={handleRedirectToCreaterProfile}
        className="profile-info items-center  p-4 flex justify-between gap-2 "
      >
        <div className="flex gap-4">
          <Avatar size="md" src={userData?.profileImage} />
          <div className="user-name flex flex-col leading-4 justify-center">
            <h1 className="text-(--text-primary) font-bold text-sm">
              {userData?.fullname}
            </h1>
            <h2 className="text-(--text-secondary) font-medium text-sm">
              @{userData?.username}
            </h2>
          </div>
        </div>

        <div className="flex mt-3 flex-col justify-center items-center gap-2">
          <div onClick={handleFollowClick}>
            {userData?.followers?.includes(user?._id) ||
            isFollow ||
            isFollowed?.isFollow ? (
              <Icons.followedIcon color={iconsColor} size={25} />
            ) : (
              userData?._id !== user?._id && (
                <Icons.followIcon color={iconsColor} size={25} />
              )
            )}
          </div>
          <span className="text-(--text-muted) font-medium text-xs">
            {date.toLocaleDateString().replaceAll("/", "-")}
          </span>
        </div>
      </div>

      {/* Image - video content */}

      <div className="video/image-container w-full relative h-full bg-black rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          className="w-full  object-cover h-[600px] sm:h-[540px] lg:h-[580px] 2xl:h-[620px] rounded-2xl"
          src={mediaUrl}
          onPlay={() => setPlay(true)}
          onClick={() => {
            setHide(false);
            setMute((prev) => !prev);
          }}
          onTimeUpdate={handleProgressBar}
          muted={isMute}
          preload="metadata"
        ></video>
        {!hidePlayPauseIcon && (
          <div
            onClick={handleClick}
            className="play-pause-icon absolute top-[45%]  flex justify-center items-center p-4 rounded-full left-[44%] "
          >
            {isPlay ? (
              <Icons.pause size={30} color="white" />
            ) : (
              <Icons.play size={30} color="white" />
            )}
          </div>
        )}
        <div
          onClick={() => setMute((prev) => !prev)}
          className="mute-unmute h-5 w-5 sm:h-7 sm:w-7 flex justify-center items-center rounded-full bg-black absolute bottom-2 right-1"
        >
          {isMute ? (
            <Icons.mute
              size={window.innerWidth > 450 ? 20 : 14}
              color="white"
            />
          ) : (
            <Icons.unmute
              size={window.innerWidth > 450 ? 20 : 14}
              color="white"
            />
          )}
        </div>
        <div className="progress-bar h-1 absolute bottom-0 w-full bg-gray-400">
          <div
            style={{ width: progressBarWidth + "%" }}
            className="h-1 bg-red-500 "
          ></div>
        </div>
      </div>

      {/* Like comments Button */}
      <div className="action-icons px-2 mt-2 flex justify-between">
        <div className="flex gap-8">
          <Icons.heart
            onClick={handleLikeClick} // Toggle like state
            color={localHasLiked ? "#E41A7F" : iconsColor}
            size={23}
          />
          <Icons.comments
            onClick={() => {
              setCurrentPostCommentsData({
                postId: _id,
                createrInfo: userData,
                title: postdata,
              });
              setIsCommentsOpen((prev) => !prev);
            }}
            color={isCommentsOpen ? "red" : iconsColor}
            size={23}
          />
          <Icons.send
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: "Check this out!",
                    text: "Amazing post on ReelNest",
                    url: window.location.href,
                  });
                } catch (err) {
                  console.error(err);
                }
              } else {
                alert("Sharing is not supported on this browser.");
              }
            }}
            color={iconsColor}
            size={23}
          />
        </div>
        <Icons.save onClick={handleSavePost} color={iconsColor} size={23} />
      </div>

      {/* Likes and video title */}
      <div className="mt-4 text-sm  flex flex-col gap-3">
        {likesUsersData?.length > 0 && Array.isArray(likesUsersData) ? (
          <div className="text-(--text-secondary) flex items-center gap-2">
            <div className="relative h-12 w-10 ">
              <span className="absolute top-0 right-4">
                <Avatar size="sm" src={likesUsersData?.[0]?.profileImage} />
              </span>
              <span className="absolute top-0">
                <Avatar size="sm" src={likesUsersData?.[1]?.profileImage} />
              </span>
            </div>{" "}
            Liked by{" "}
            <span className="text-(--text-primary)">
              {likesUsersData?.[0]?.name?.split(" ")[0]},{" "}
              {likesUsersData?.[1]?.name?.split(" ")[0]}
            </span>
            {likesUsersData.length > 2 && (
              <span className="text-(--text-primary)">
                and others {Math.abs(likesUsersData.length - 2)}
              </span>
            )}
          </div>
        ) : (
          <div className="text-(--text-secondary) ">No Likes Yet!</div>
        )}
        <div className="flex flex-col gap-1 text-(--text-primary) w-full min-w-0">
          <p className="line-clamp-1 font-bold">
            {userData?.username || "ReelNest_User"}_posted:
          </p>

          <p className="text-(--text-secondary) text-xs md:text-sm break-words whitespace-normal w-full ">
            {postdata || "Reelnest Video"}
          </p>
        </div>
      </div>
    </div>
  );
};
