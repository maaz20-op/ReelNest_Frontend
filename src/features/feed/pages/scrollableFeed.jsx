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
  const userId = data?.userId;
  const postId = nextPost ? nextPost?._id : data?._id;

  const { isFollow } = checkIsFollowed(userId);

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
    <div className="h-full w-full overflow-hidden flex justify-center relative bg-(--bg-secondary)">
      {data?.isVideoTab ? (
        <Video videoRef={videoRef} data={data} nextPost={nextPost} />
      ) : (
        <Image nextPost={nextPost} data={data} isFollow={isFollow} />
      )}

      {/* Toggle comments and scroll up-down buttons */}
      {isCommentsOpen ? (
        <Comments
          title={data?.title}
          isFollow={isFollow}
          postId={postId}
          createrInfo={{
            avatar: data?.avatar,
            fullname: data?.fullname,
            createrId: data?.userId,
            username: data?.username,
            followers: data?.followers,
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
