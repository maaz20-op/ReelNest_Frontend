import { useLocation } from "react-router-dom";
import { Media } from "../../posts/components/Media";
import { Avatar } from "../../../components/Avatar";
import { Button } from "../../../components/reusableComponents/Button";
import { Icons } from "../../../assets/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Comments } from "../../comments/components/Comments";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useGetPostsCommentsQuery } from "../../../services/comments/comment";
import { useLikePostMutation } from "../../../services/posts/post";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { debounce } from "../../../utils/debounce";
import { checkIsFollowed } from "../../../utils/checkisFollowed";

export const ScrollableFeed = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isPlay, setPlay] = useState(false);
  const [nextPost, setPost] = useState(null);
  const [count, setCount] = useState(1);
  const videoContainerRef = useRef(null);
  const { iconsColor, isDark } = contextThemeSetup();
  const [likePost, { isLoading: loading }] = useLikePostMutation();
  const [dislike, setDislike] = useState(false);
  const videoRef = useRef(null);
  const [progressBarWidth, setWidth] = useState(0);
  let [isVideoTimeUpdating, setTimeUpdating] = useState(false);
  const [hidePlayPauseIcon, setHide] = useState(false);
  const [isCommentsOpen, setComments] = useState(false);
  const data = location?.state;
  const { isFollow } = checkIsFollowed(data?.userId);
  const { data: commentData, isLoading } = useGetPostsCommentsQuery(
    nextPost ? nextPost?._id : data?._id,
    {
      skip: !data?._id || !isCommentsOpen,
    },
  );
  console.log("commets", commentData);
  const [isLike, setLike] = useState(false);
  const [setLikes, setLikesLength] = useState(
    nextPost ? nextPost?.likes.length : data?.likes,
  );
  const [userAction, setAction] = useState(null);

  const debouncedLikePost = useMemo(() => {
    return debounce(async () => {
      console.log("hi efhskjfj@*&&^&^@$");
      try {
        // 2. Trigger your RTK Query mutation
        await likePost({
          postId: nextPost ? nextPost?._id : data?._id,
          userId: user?._id,
        }).unwrap();
      } catch (error) {
        console.error("Mutation failed:", error);
      }
    }, 5000);
  }, [likePost]);

  const handleGoDown = () => {
    if (count > 7) {
      setCount(0);
    }
    setCount((prev) => prev + 1);

    console.log(count);
    setPost(data?.nextPosts[count]);
    setLikesLength(nextPost?.likes?.length);
    setAction(null);
    setLike(false);
    console.log(data?.nextPosts[count], nextPost);
  };
  console.log(nextPost);
  const handleGoUp = () => {};

  const handleClick = () => {
    setPlay((prev) => !prev);
    if (isPlay) return videoRef?.current.pause();
    videoRef?.current.play();
    setHide(false);
  };

  const handleProgressBar = () => {
    console.log(Math.floor(videoRef?.current.duration));
    const totalDuration = Math.floor(videoRef?.current.duration);
    const currentPlayTime = Math.floor(videoRef?.current.currentTime);

    const progress = (currentPlayTime / totalDuration) * 100;

    setWidth(progress);
  };
  return (
    <div className="h-full w-full overflow-hidden flex justify-center relative bg-(--bg-secondary)">
      <div className="video-container h-full w-full flex justify-center gap-2">
        <div
          ref={videoContainerRef}
          className="main-video-div relative h-full md:h-[95%] md:w-100 w-full bg-black"
        >
          <video
            onPlay={() => setPlay(true)}
            ref={videoRef}
            onClick={() => setHide(false)}
            onTimeUpdate={handleProgressBar}
            className="h-full w-full bg-black"
            src={nextPost ? nextPost?.mediaUrl : data?.videoSrc}
          />
          <div className="creater-info flex ml-8 items-center text-white gap-4 absolute top-5 w-full ">
            <Avatar size="md" src={data?.avatar} />
            <div className="username w-30  leading-tight flex flex-col">
              <h1 className="text-base line-clamp-1">{data?.fullname}</h1>
              <h2 className="text-sm line-clamp-1">@maaz-20</h2>
            </div>
            <Button
              content={
                isFollow ? (
                  <div className="flex gap-2 items-center">
                    <h1>Followed </h1>
                    <Icons.followedIcon color="white" size={19} />{" "}
                  </div>
                ) : nextPost ? (
                  nextPost?.user === user?._id ? (
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
              background="bg-pink-600"
              border="rounded"
            />
          </div>
          <div className="video-metadata w-70 ml-5  absolute bottom-10 text-white">
            <h1 className="video-title line-clamp-3 font-bold">
              {nextPost ? nextPost?.postdata : data?.title} #reelnest
            </h1>
          </div>
          !
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
        <div className="actions w-19 h-full absolute top-0 right-0  md:relative">
          <ul className="flex text-(--text-primary) flex-col h-full gap-4 items-center justify-center">
            {[
              {
                name: setLikes,
                icon: Icons?.heart,
                fnc: () => {
                  let nextAction;
                  if (isLike === false) {
                    setAction("like");
                    nextAction = "like";
                    setLikesLength((prev) => prev + 1);
                    setLike(true);
                  } else if (isLike === true) {
                    setAction("dislike");
                    setLikesLength((prev) => prev - 1);
                    nextAction = "dislike";
                    setLike(false);
                  }
                  console.log(setLikes);
                  console.log(")(#(*(#*)(#(%", nextAction);
                  if (nextAction === "like") {
                    console.log("user action for api call", userAction);
                    debouncedLikePost();
                  }
                },
                size: 25,
              },
              {
                name: nextPost?.comments
                  ? nextPost?.comments?.length
                  : data?.comments,
                icon: Icons?.comments,
                fnc: () => setComments((prev) => !prev),
                size: 26,
              },

              {
                name: "Share",
                icon: Icons?.share,
                fnc: () => console.log("clicked"),
                size: 35,
              },
              {
                name: "Loop",
                icon: Icons?.loop,
                fnc: () => console.log("clicked"),
                size: 25,
              },
            ].map(({ fnc, size, name, icon: Icon }, indx) => (
              <li
                onClick={fnc}
                key={indx}
                className="flex flex-col items-center"
              >
                <Icon
                  size={size}
                  color={`${(indx == 0 && userAction === "like") || (indx == 0 && nextPost?.likes.includes(user?._id)) ? "#FF1D8D" : "white"}  `}
                />
                <span className="text-sm">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isCommentsOpen ? (
        <Comments
          isCommentsOpen={isCommentsOpen}
          setCommentsOpen={setComments}
          iconsColor={iconsColor}
          isDark={isDark}
          loading={isLoading}
          title={data?.title}
          isFollow={isFollow}
          comments={commentData?.data[0]?.comments}
          createrInfo={{
            avatar: data?.avatar,
            fullname: data?.fullname,
            createrId: data?.userId,
            username: data?.username,
            followers: data?.followers,
          }}
        />
      ) : (
        <div className="up-down-video-controls lg:flex hidden text-(--text-primary) absolute right-7 gap-4 top-[40%] w-18 flex-col">
          <div
            onClick={handleGoUp}
            className="w-22 flex justify-center items-center gap-2 h-10 p-2 rounded-full text-center bg-(--bg-primary)"
          >
            <span>Up</span>
            <Icons.arrowUp size={20} />
          </div>
          <div
            onClick={handleGoDown}
            className="w-22 gap-2 flex justify-center items-center h-10 p-2 rounded-full bg-(--bg-primary) text-center"
          >
            <span>Down</span>
            <Icons.arrowDown size={20} />
          </div>
        </div>
      )}
    </div>
  );
};
