import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { TooltipMenu } from "../../../utils/tooltip";
import { useDeleteLoggedInUserPostMutation } from "../../../services/posts/post";
import { GridItem } from "./GridItem";
import { useDeleteSavedPostMutation } from "../../../services/pins/pin";
import { VirtualList } from "../../../utils/useVirtualization";

export const GridMediaLayoutProfile = ({
  user,
  posts,
  isVideoTab = "video",
  isMyCollectionPage = false,
  isSearchPage = false,
  limit,
  page,
  mainContainerRef,
}) => {
  const { user: loggedInUser } = useAuth();
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const isloggedInUser = user?._id === loggedInUser?._id;
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [postCreaterInformation, setPostCreaterInformation] = useState({});
  console.log(isMyCollectionPage);
  // delete LoggedIn User Post
  const [deletePost, { data, isLoading }] = useDeleteLoggedInUserPostMutation();
  const [deleteSavedPost] = useDeleteSavedPostMutation();

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

  const handleDeleteSavedPost = async (postId, mediaType) => {
    try {
      await deleteSavedPost({ postId, mediaType, page, limit });
    } catch (err) {
      console.error(err);
    }
  };

  const getTooltipOptions = (postId, mediaType) => [
    {
      label: isMyCollectionPage ? "Delete Saved Post" : "Delete Post",
      icon: Icons.delete,
      action: () =>
        isMyCollectionPage
          ? handleDeleteSavedPost(postId, mediaType)
          : handleDeleteLoggedInUserPost(postId, mediaType),
    },
    {
      label: "Edit Caption",
      icon: Icons.pencil,
      action: () => console.log("clicked"),
    },
  ];

  console.log(posts);
  return !isSearchPage ? (
    <VirtualList
      mainContainerRef={mainContainerRef}
      data={posts}
      isGrid={true}
      itemRendered={(post) => (
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
      )}
    />
  ) : (
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
