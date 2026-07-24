import { useEffect, useState } from "react";
import { Icons } from "../../../../assets/icons";
import { Button } from "../../../../components/reusableComponents/Button";
import { Avatar } from "../../../../components/reusableComponents/Avatar";
import { useGetAuthMeQuery } from "../../../../services/auth/auth";
import { useAuth } from "../../../auth/hooks/useAuth";
import { VideoActions } from "./Actions";
import {
  useFollowUser,
  useUnfollowUser,
} from "../../../../hooks/useFollowUser";
import { useVideoControls } from "../../../../utils/videoControls";
import { useReducer } from "react";
import { useRef } from "react";
import { useCommentsContext } from "../../../comments/hooks/useIsCommentsOpen";
import { handleRedirectToUserProfile } from "../../../../utils/handleRedirectToUserProfile";
import { useNavigate } from "react-router-dom";

export const Video = ({
  videoRef,
  nextPost,
  data,
  isAlreadyFollowed,
  setCount,
}) => {
  const [isFollow, setFollow] = useState(isAlreadyFollowed);
  const [isAutoScroll, setAutoScroll] = useState(false);
  const { setIsCommentsOpen } = useCommentsContext();
  const navigate = useNavigate();

  // next Post = scrolled Post and data = clicked post in profile or on search feed
  const currentPost = nextPost?.user || nextPost?.postOwner ? nextPost : data;
  const currentPostUser = nextPost?.user
    ? nextPost?.user
    : nextPost?.postOwner || data;

  const { user } = useAuth();
  const handleFollowClick = useFollowUser({
    userData: {
      _id: currentPost?._id,
      fullname: currentPost?.fullname,
      username: currentPost?.username,
      profileImage: currentPost?.avatar || currentPost?.profileImage,
    },
    setFollow,
  });
  const handleUnfollowClick = useUnfollowUser({
    unfollowUserId:
      currentPost?.userId ||
      currentPost?.postOwner?._id ||
      currentPost?.user?._id,
    setFollow,
    userId: user?._id,
  });

  //play video on Scroll
  useEffect(() => {
    if (videoRef?.current) {
      videoRef?.current.play();
    }
  }, [currentPost?._id]);

  // sync the Followed State
  useEffect(() => {
    if (isAlreadyFollowed !== undefined) {
      setFollow(isAlreadyFollowed);
    }
  }, [isAlreadyFollowed]);

  const touchStartY = useRef(0);

  // handling Scroll Effect For Mobile/tabs Devices
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;

    const distance = touchStartY.current - touchEndY;
    const threshold = 60;

    // Swipe Up -> Next Video
    if (distance > threshold) {
      setCount((prev) => prev + 1);
    }

    // Swipe Down -> Previous Video
    else if (distance < -threshold) {
      setCount((prev) => prev - 1);
    }
  };

  // video Controls Encapsulation
  const {
    handleProgressBar,
    handleClick,
    isPlay,
    setPlay,
    progressBarWidth,
    hidePlayPauseIcon,
    setHide,
  } = useVideoControls(videoRef);

  const videoSrc = currentPost?.mediaUrl;

  return (
    <div className="video-container h-full w-full   flex justify-center gap-2">
      <div
        className={` main-video-div relative h-full md:h-[95%] md:w-100 w-full `}
      >
        <video
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPlay={() => setPlay(true)}
          ref={videoRef}
          onClick={() => setHide(false)}
          onEnded={() => {
            if (isAutoScroll) {
              setCount((prev) => prev + 1);
              setIsCommentsOpen(false);
            }
          }}
          onTimeUpdate={handleProgressBar}
          className="h-full w-full bg-black touch-none"
          src={videoSrc}
        />
        <div
          onClick={() => {
            const handleRedirect = handleRedirectToUserProfile(
              currentPostUser?.userId || currentPostUser?._id,
              currentPostUser?.fullname,
              navigate,
            );

            handleRedirect();
          }}
          className="creater-info flex ml-8 items-center text-white gap-4 absolute top-5 w-full "
        >
          <Avatar
            size="md"
            src={
              currentPost.user?.profileImage ||
              currentPost.postOwner?.profileImage ||
              currentPost?.avatar
            }
          />
          <div className="username w-30  leading-tight flex flex-col">
            <h1 className="text-base line-clamp-1">
              {currentPost?.user?.fullname ||
                currentPost?.postOwner?.fullname ||
                currentPost?.fullname}
            </h1>
            <h2 className="text-sm line-clamp-1">
              {currentPost?.user?.username ||
                currentPost.postOwner?.username ||
                currentPost?.username}
            </h2>
          </div>
          <Button
            content={
              isFollow &&
              !(
                nextPost?.user?._id === user?._id ||
                nextPost?.postOwner?._id === user?._id
              ) ? (
                <div className="flex gap-2 items-center">
                  <h1>Followed </h1>
                  <Icons.followedIcon color="white" size={19} />{" "}
                </div>
              ) : nextPost?.user || nextPost?.postOwner ? (
                nextPost?.user?._id.toString() === user?._id.toString() ||
                nextPost?.postOwner?._id === user?._id ? (
                  "You"
                ) : (
                  "Follow"
                )
              ) : data?.userId === user?._id ? (
                "You"
              ) : (
                "Follow"
              )
            }
            fnc={isFollow ? handleUnfollowClick : handleFollowClick}
            background="bg-pink-600"
            border="rounded"
          />
        </div>
        <div className="video-metadata w-70 ml-5  absolute bottom-10 text-white">
          <h1 className="video-title line-clamp-3 font-bold">
            {currentPost?.postdata || currentPost?.title} #reelnest
          </h1>
        </div>

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
        <div className="progress-bar h-1 absolute bottom-0 w-full bg-gray-400">
          <div
            style={{ width: progressBarWidth + "%" }}
            className="h-1 bg-red-500 "
          ></div>
        </div>
      </div>
      <VideoActions
        key={nextPost?._id || data?._id}
        likesLength={
          nextPost?.likes ? nextPost?.likes.length : data?.likes.length
        }
        setAutoScroll={setAutoScroll}
        isAutoScroll={isAutoScroll}
        data={data}
        nextPost={nextPost}
      />
    </div>
  );
};
