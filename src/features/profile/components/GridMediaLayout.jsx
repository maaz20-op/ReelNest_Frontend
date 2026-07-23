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
import { useUpdateUiAfterDeletePost } from "../../../utils/optimisticDeletePost";

export const GridMediaLayoutProfile = ({
  user,
  posts,
  isVideoTab = "video",
  isMyCollectionPage = false,
  isSearchPage = false,
  limit,
  setDeletePost,
  setApiData,
  mainContainerRef,
}) => {
  const { user: loggedInUser } = useAuth();
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const isloggedInUser = user?._id === loggedInUser?._id;
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [postCreaterInformation, setPostCreaterInformation] = useState({});

  // delete LoggedIn User Post
  const [deletePost, { data, isLoading }] = useDeleteLoggedInUserPostMutation();
  const [deleteSavedPost] = useDeleteSavedPostMutation();

  const handlePreferenceClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveTooltipId((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteLoggedInUserPost = async (postId, mediaType, page) => {
    if (!postId) return;

    const { updatePostsUi, rollBack } = useUpdateUiAfterDeletePost({
      setApiData,
      postId,
      posts,
    });

    updatePostsUi();

    try {
      const res = await deletePost({
        postId,
        page: page,
        limit: limit,
        userId: loggedInUser?._id,
        isVideoTab,
        mediaType,
      }).unwrap();

      if (!res.success) rollBack();
    } catch (err) {
      rollBack();
      console.error(err);
    }
  };

  const handleDeleteSavedPost = async (postId, mediaType, page) => {
    if (!postId) return;
    const { updatePostsUi, rollBack } = useUpdateUiAfterDeletePost({
      setApiData,
      postId,
      posts,
    });

    updatePostsUi();
    try {
      const res = await deleteSavedPost({
        postId,
        mediaType,
        page,
        limit,
      }).unwrap();
      if (!res.success) rollBack();
    } catch (err) {
      rollBack();
      console.error(err);
    }
  };

  const getTooltipOptions = (postId, mediaType, page) => [
    {
      label: isMyCollectionPage ? "Delete Saved Post" : "Delete Post",
      icon: Icons.delete,
      action: () =>
        isMyCollectionPage
          ? handleDeleteSavedPost(postId, mediaType, page)
          : handleDeleteLoggedInUserPost(postId, mediaType, page),
    },
    {
      label: "Edit Caption",
      icon: Icons.pencil,
      action: () => console.log("clicked"),
    },
  ];

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
