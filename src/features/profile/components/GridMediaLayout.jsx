import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useRef } from "react";
import { useEffect } from "react";
import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetPostsCommentsQuery } from "../../../services/comments/comment";

export const GridMediaLayoutProfile = ({ user, posts, isVideoTab }) => {
  const containerRef = useRef(null);
  const [postId, setPostId] = useState("");
  const [currentPost, setCurrentPost] = useState({});

  const videoRef = useRef(null);
  const [isFullScreen, setFullScreen] = useState(false);

  const navigate = useNavigate();

  const handleClick = (likes, postdata, _id, mediaUrl, comments) => {
    setPostId(_id);
    navigate("/feed", {
      state: {
        _id: _id,
        likes: likes,
        isVideoTab: isVideoTab,
        userId: user?._id,
        comments: comments,
        nextPosts: posts,
        mediaUrl: mediaUrl,
        title: postdata || "ReelNest video #reelnest",
        avatar: user?.profileImage,
        fullname: user?.fullname || "Guest",
        username: user?.username || "@user",
        followers: user?.followers?.length,
      },
    });
  };
  return (
    <div className="video-container  p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.isArray(posts) &&
        posts.map(({ postdata, likes, comments, _id, mediaUrl }, indx) => (
          <div
            key={indx}
            ref={containerRef}
            onClick={() =>
              handleClick(likes, postdata, _id, mediaUrl, comments)
            }
            className="grid-video h-90 w-full   rounded-xl [&:fullscreen]: bg-black"
          >
            <div
              className={`${!isVideoTab ? "flex justify-center items-center" : "h-full"}video-content relative h-full w-full`}
            >
              <div className="user-info absolute flex gap-2 items-center   top-2 left-4">
                <Avatar size="sm" src={user?.profileImage} />

                <h1 className="text-sm  text-white">{user?.fullname}</h1>
              </div>

              {isVideoTab ? (
                <video
                  ref={videoRef}
                  className="h-full w-full  "
                  src={mediaUrl}
                ></video>
              ) : (
                <img src={mediaUrl} />
              )}
              <h1 className="text-white absolute bottom-3 line-clamp-2 [&:fullscreen]:absolute [&:fullscreen]:left-60 left-2">
                {postdata}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};
