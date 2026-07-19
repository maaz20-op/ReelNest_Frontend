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

export const Video = ({ videoRef, nextPost, data, isAlreadyFollowed }) => {
  const { user } = useAuth();

  const [isFollow, setFollow] = useState(isAlreadyFollowed);

  const currentPost = nextPost?.user || nextPost?.postOwner ? nextPost : data;
  console.log("nextPost", nextPost);
  const handleFollowClick = useFollowUser({
    userData: {
      _id: currentPost?._id,
      fullname: currentPost?.fullname,
      username: currentPost?.username,
      profileImage: currentPost?.avatar || currentPost?.profileImage,
    },
    setFollow,
  });

  useEffect(() => {
    if (videoRef?.current) {
      videoRef?.current.play();
    }
  }, [currentPost?._id]);

  useEffect(() => {
    if (isAlreadyFollowed !== undefined) {
      console.log("useEffet", isAlreadyFollowed);
      setFollow(isAlreadyFollowed);
    }
  }, [isAlreadyFollowed]);

  const handleUnfollowClick = useUnfollowUser({
    unfollowUserId:
      currentPost?.userId ||
      currentPost?.postOwner?._id ||
      currentPost?.user?._id,
    setFollow,
    userId: user?._id,
  });

  const videoSrc = currentPost?.mediaUrl;

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    console.log("waijwi");
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    const threshold = 50; // Minimum swipe distance

    // Horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          console.log("Swiped Left");
        } else {
          console.log("Swiped Right");
        }
      }
    }
    // Vertical swipe
    else {
      if (Math.abs(diffY) > threshold) {
        if (diffY > 0) {
          console.log("Swiped Up");
        } else {
          console.log("Swiped Down");
        }
      }
    }
  };

  const {
    handleProgressBar,
    handleClick,
    isPlay,
    setPlay,
    progressBarWidth,
    hidePlayPauseIcon,
    setHide,
  } = useVideoControls(videoRef);

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
          onTimeUpdate={handleProgressBar}
          className="h-full w-full bg-black"
          src={videoSrc}
        />
        <div className="creater-info flex ml-8 items-center text-white gap-4 absolute top-5 w-full ">
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
              isFollow ? (
                <div className="flex gap-2 items-center">
                  <h1>Followed </h1>
                  <Icons.followedIcon color="white" size={19} />{" "}
                </div>
              ) : nextPost ? (
                nextPost?.user?._id ||
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
        data={data}
        nextPost={nextPost}
      />
    </div>
  );
};
