import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { TooltipMenu } from "../../../utils/tooltip";

export const GridMediaLayoutProfile = ({
  user,
  posts,
  isVideoTab = "video",
}) => {
  const { user: loggedInUser } = useAuth();
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const isloggedInUser = user?._id === loggedInUser?._id;
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (likes, postdata, _id, mediaUrl, comments) => {
    if (activeTooltipId) {
      setActiveTooltipId(null);
      return;
    }

    navigate("/feed", {
      state: {
        _id,
        likes,
        isVideoTab,
        userId: user?._id,
        comments,
        nextPosts: posts,
        mediaUrl,
        title: postdata || "ReelNest video #reelnest",
        avatar: user?.profileImage,
        fullname: user?.fullname || "Guest",
        username: user?.username || "@user",
        followers: user?.followers?.length,
      },
    });
  };

  const handlePreferenceClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveTooltipId((prevId) => (prevId === id ? null : id));
    console.log(activeTooltipId);
  };

  const getTooltipOptions = (postId) => [
    {
      label: "Delete Post",
      icon: "🗑️",
      action: () => console.log("Delete triggered for:", postId),
    },
    {
      label: "Edit Caption",
      icon: "✏️",
      action: () => console.log("Edit triggered for:", postId),
    },
  ];

  return (
    <div className="video-container p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.isArray(posts) &&
        posts.map(({ postdata, likes, comments, _id, mediaUrl }, indx) => (
          <div
            key={_id || indx}
            onClick={() =>
              handleClick(likes, postdata, _id, mediaUrl, comments)
            }
            className="grid-video h-90 w-full rounded-xl relative overflow-hidden bg-black cursor-pointer"
          >
            <div
              className={`relative h-full w-full ${!isVideoTab ? "flex justify-center items-center" : ""}`}
            >
              {/* Header Info & Actions */}
              <div className="flex gap-3 w-[90%] absolute top-2 left-2 items-center justify-between z-20">
                <div className="user-info flex gap-1 items-center">
                  <Avatar size="sm" src={user?.profileImage} />
                  <h1 className="text-xs sm:text-sm line-clamp-1 text-white">
                    {user?.fullname}
                  </h1>
                </div>

                {isloggedInUser && (
                  <div
                    className="relative p-2 cursor-pointer hit-target"
                    onClick={(e) => handlePreferenceClick(e, _id)}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Icons.videoPreference size={22} color="white" />

                    {activeTooltipId === _id && (
                      <TooltipMenu
                        options={getTooltipOptions(_id)}
                        onClose={() => setActiveTooltipId(null)}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Media Element */}
              {isVideoTab ? (
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src={mediaUrl}
                ></video>
              ) : (
                <img
                  src={mediaUrl}
                  className="h-full w-full object-cover"
                  alt="post"
                />
              )}

              <h1 className="text-white absolute bottom-3 line-clamp-2 left-2 z-10">
                {postdata}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};
