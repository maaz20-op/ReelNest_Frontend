import { useLocation } from "react-router-dom";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Button } from "../../../components/reusableComponents/Button";
import { Icons } from "../../../assets/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Comments } from "../../comments/components/Comments";
import { contextThemeSetup } from "../../../utils/contextSetup";

import { useAuth } from "../../../features/auth/hooks/useAuth";
import { debounce } from "../../../utils/debounce";
import { checkIsFollowed } from "../../../utils/checkisFollowed";
import { useCommentsContext } from "../../comments/hooks/useIsCommentsOpen";
import { Video } from "../components/scrollFeed/video";
import { ScrollUpDown } from "../components/scrollFeed/ScrollUpDown";
import { Image } from "../components/scrollFeed/Images";

export const ScrollableFeed = () => {
  const [nextPost, setPost] = useState(null);
  const [count, setCount] = useState(null);

  const { user } = useAuth();
  const { iconsColor, isDark } = contextThemeSetup();
  const { isCommentsOpen, setIsCommentsOpen } = useCommentsContext();

  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  const location = useLocation();
  const data = location?.state;
  const userId =
    nextPost?.postOwner || nextPost?.user
      ? nextPost?.postOwner?._id || nextPost?.user?._id
      : data?.userId;
  const postId = nextPost ? nextPost?._id : data?._id;

  const isAlreadyFollowed = checkIsFollowed(userId);

  useEffect(() => {
    // find index of redirect post and set to Count to Play Video
    const index = data.nextPosts.findIndex((p) => p?._id === data?._id);
    setCount(index);
  }, []);

  useEffect(() => {
    return () => {
      setIsCommentsOpen(false);
    };
  }, []);

  useEffect(() => {
    if (!data?.nextPosts?.length) return;

    if (count < 0) {
      setCount(data.nextPosts.length - 1);
      return;
    }

    if (count >= data.nextPosts.length) {
      setCount(0);
      return;
    }

    setPost(data.nextPosts[count]);
  }, [count, data]);

  const handleGoDown = () => {
    setCount((prev) => prev + 1);
  };

  const handleGoUp = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div className="h-[94vh] lg:h-full w-full overflow-hidden flex justify-center relative bg-(--bg-secondary)">
      {/* toggle video Image tab */}
      {data?.isVideoTab ? (
        <Video
          videoRef={videoRef}
          data={data}
          setCount={setCount}
          nextPost={nextPost}
          isAlreadyFollowed={isAlreadyFollowed?.isFollow}
        />
      ) : (
        <Image
          nextPost={nextPost}
          data={data}
          isAlreadyFollowed={isAlreadyFollowed?.isFollow}
        />
      )}

      {/* Toggle comments and scroll up-down buttons */}
      {isCommentsOpen ? (
        <Comments
          title={data?.title}
          isAlreadyFollowed={isAlreadyFollowed?.isFollow}
          postId={postId}
          createrInfo={{
            avatar: nextPost?.user
              ? nextPost?.user?.profileImage
              : data?.avatar,
            fullname: nextPost?.user
              ? nextPost?.user?.fullname
              : data?.fullname,
            createrId: nextPost?.user ? nextPost?.user?.userId : data?.userId,
            username: nextPost?.user
              ? nextPost?.user?.username
              : data?.username,
            followers: nextPost?.user
              ? nextPost?.followers?.followe
              : data?.followers,
          }}
        />
      ) : (
        <ScrollUpDown
          handleGoUp={handleGoUp}
          data={data}
          handleGoDown={handleGoDown}
        />
      )}
    </div>
  );
};
