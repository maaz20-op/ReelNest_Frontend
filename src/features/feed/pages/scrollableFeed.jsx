import { useLocation } from "react-router-dom";
import { Media } from "../../posts/components/Media";
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
  const { user } = useAuth();
  const location = useLocation();

  const [nextPost, setPost] = useState(null);
  const [count, setCount] = useState(1);
  const videoContainerRef = useRef(null);
  const { iconsColor, isDark } = contextThemeSetup();

  const videoRef = useRef(null);

  const { isCommentsOpen, setIsCommentsOpen } = useCommentsContext();
  const data = location?.state;
  const userId =
    nextPost?.postOwner || nextPost?.user
      ? nextPost?.postOwner?._id || nextPost?.user?._id
      : data?.userId;
  const postId = nextPost ? nextPost?._id : data?._id;

  const isAlreadyFollowed = checkIsFollowed(userId);
  console.log(isAlreadyFollowed);
  useEffect(() => {
    return () => setIsCommentsOpen(false);
  }, []);

  const handleGoDown = () => {
    if (count > data?.nextPosts.length) {
      setCount(0);
    }
    setCount((prev) => prev + 1);

    setPost(data?.nextPosts[count]);
  };

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

  const handleGoUp = () => {
    if (count < 0) {
      console.log("setting arr");
      setCount(Number(data?.nextPosts?.length - 1));
      setPost(data?.nextPosts[count]);
      return;
    }

    if (count >= data?.nextPost?.length) {
      setCount(0);
    }

    setCount((prev) => prev - 1);

    setPost(data?.nextPosts[count]);
  };

  return (
    <div className="h-[94vh] w-full overflow-hidden flex justify-center relative bg-(--bg-secondary)">
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
