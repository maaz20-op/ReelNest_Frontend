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

export const Video = ({ videoRef, nextPost, data, isAlreadyFollowed }) => {
  const [isPlay, setPlay] = useState(false);
  const { user } = useAuth();
  let [isVideoTimeUpdating, setTimeUpdating] = useState(false);
  const [isFollow, setFollow] = useState(isAlreadyFollowed);
  const [progressBarWidth, setWidth] = useState(0);
  const [hidePlayPauseIcon, setHide] = useState(false);
  console.log("$$$$$$$$", isFollow, isAlreadyFollowed);
  const currentPost = nextPost?.user ? nextPost : data;
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
    if (isAlreadyFollowed !== undefined) {
      console.log("useEffet", isAlreadyFollowed);
      setFollow(isAlreadyFollowed);
    }
  }, [isAlreadyFollowed]);

  const handleUnfollowClick = useUnfollowUser({
    unfollowUserId: currentPost?.userId || currentPost?.user?._id,
    setFollow,
    userId: user?._id,
  });
  console.log("$$$$$$$$", isFollow, isAlreadyFollowed);
  const videoSrc = currentPost?.mediaUrl;

  useEffect(() => {
    if (!isPlay) return;
    const timeoutId = setTimeout(() => {
      setHide(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isPlay]);

  const handleProgressBar = () => {
    const totalDuration = Math.floor(videoRef?.current.duration);
    const currentPlayTime = Math.floor(videoRef?.current.currentTime);

    const progress = (currentPlayTime / totalDuration) * 100;

    setWidth(progress);
  };

  const handleClick = () => {
    setPlay((prev) => !prev);
    if (isPlay) return videoRef?.current.pause();

    videoRef?.current.play();
    setHide(false);
  };

  return (
    <div className="video-container h-full w-full flex justify-center gap-2">
      <div
        className={` main-video-div relative h-full md:h-[95%] md:w-100 w-full bg-black`}
      >
        <video
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
            src={currentPost.user?.profileImage || currentPost?.avatar}
          />
          <div className="username w-30  leading-tight flex flex-col">
            <h1 className="text-base line-clamp-1">
              {currentPost?.user?.fullname || currentPost?.fullname}
            </h1>
            <h2 className="text-sm line-clamp-1">
              {currentPost?.user?.username || currentPost?.username}
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
                nextPost?.user?._id === user?._id ? (
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
