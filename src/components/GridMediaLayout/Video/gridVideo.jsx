import { Avatar } from "../../Avatar";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useRef } from "react";
import { useEffect } from "react";
import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetPostsCommentsQuery } from "../../../services/comments/comment";
import { useGetPostsByuserIdQuery } from "../../../services/posts/post";

export const GridVideoLayout = ({ user, posts }) => {
  const containerRef = useRef(null);
  const [postId, setPostId] = useState("");
  const [currentPost, setCurrentPost] = useState({});

  console.log("posts", posts, user?._id);
  const videoRef = useRef(null);
  const [isFullScreen, setFullScreen] = useState(false);

  const navigate = useNavigate();
  console.log(user, "30955949549549549");
  const handleClick = (likes, postdata, _id, mediaUrl, comments) => {
    console.log(likes);
    console.log("mediAURL");
    setPostId(_id);
    navigate("/feed", {
      state: {
        _id: _id,
        likes: likes,
        userId: user?._id,
        comments: comments,
        nextPosts: posts,
        videoSrc:
          mediaUrl ||
          "https://res.cloudinary.com/ddl6cgcbp/video/upload/q_auto,f_auto/v1780243901/ReelNest/videos/y210e5kldpqfzzvdvdhr.mp4",
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
            <div className="video-content relative h-full w-full">
              <div className="user-info absolute flex gap-2 items-center   top-2 left-4">
                <Avatar size="sm" src={user?.profileImage} />

                <h1 className="text-sm  text-white">{user?.fullname}</h1>
              </div>

              <video
                ref={videoRef}
                className="h-full w-full  "
                src={mediaUrl}
              ></video>
              <h1 className="text-white absolute bottom-3 line-clamp-2 [&:fullscreen]:absolute [&:fullscreen]:left-60 left-2">
                {postdata}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};
