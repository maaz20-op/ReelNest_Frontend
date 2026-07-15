import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { TooltipMenu } from "../../../utils/tooltip";
import { useDeleteLoggedInUserPostMutation } from "../../../services/posts/post";
import { GridItem } from "./GridItem";

export const GridMediaLayoutProfile = ({
  user,
  posts,
  isVideoTab = "video",
  isMyCollectionPage = false,
}) => {
  const { user: loggedInUser } = useAuth();
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const isloggedInUser = user?._id === loggedInUser?._id;
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [postCreaterInformation, setPostCreaterInformation] = useState({});

  // delete LoggedIn User Post
  const [deletePost, { data, isLoading }] = useDeleteLoggedInUserPostMutation();

  const handlePreferenceClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveTooltipId((prevId) => (prevId === id ? null : id));
    console.log(activeTooltipId);
  };

  const handleDeleteLoggedInUserPost = async (postId, mediaType) => {
    try {
      await deletePost({ postId, userId: loggedInUser?._id, mediaType });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSavedPost = async (postId, mediaType) => {
    try {
      await deletePost({ postId, userId: loggedInUser?._id, mediaType });
    } catch (err) {
      console.error(err);
    }
  };

  const getTooltipOptions = (postId, mediaType) => [
    {
      label: "Delete Post",
      icon: Icons.delete,
      action: () => handleDeleteLoggedInUserPost(postId, mediaType),
    },
    {
      label: "Edit Caption",
      icon: Icons.pencil,
      action: () => console.log("clicked"),
    },
  ];

  return (
    <div className="video-container p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.isArray(posts) &&
        posts.map((post, indx) => (
          <GridItem
            key={post?._id}
            post={post}
            user={user}
            isVideoTab={isVideoTab}
            isloggedInUser={isloggedInUser}
            videoRef={videoRef}
            posts={posts}
            activeTooltipId={activeTooltipId}
            setActiveTooltipId={setActiveTooltipId}
            handlePreferenceClick={handlePreferenceClick}
            getTooltipOptions={getTooltipOptions}
            setPostCreaterInformation={setPostCreaterInformation}
            isMyCollectionPage={isMyCollectionPage}
          />
        ))}
    </div>
  );
};
