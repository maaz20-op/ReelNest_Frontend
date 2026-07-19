import { useEffect, useMemo } from "react";
import { useState } from "react";
import { debounce } from "../utils/debounce";
import { useLikePostMutation } from "../services/posts/post";
import { useAuth } from "../features/auth/hooks/useAuth";

export const useLike = ({ currentPost, postCreaterId, likesArray }) => {
  const { user } = useAuth();
  const userId = user?._id;

  const initialTotalLikes = likesArray.length;
  const initialHasUserLiked = likesArray.includes(userId);

  const postId = currentPost?._id;
  const [localHasLiked, setLocalHasLiked] = useState(initialHasUserLiked);
  const [localLikesCount, setLocalLikesCount] = useState(initialTotalLikes);
  const [likePost] = useLikePostMutation();

  const debouncedLikePost = useMemo(() => {
    return debounce(async (shouldLike) => {
      try {
        await likePost({
          postId,
          userId: postCreaterId,
          loggedInUser: user?._id,
        }).unwrap();
      } catch (error) {
        console.error("Mutation failed, rolling back UI:", error);

        setLocalHasLiked(!shouldLike);
        setLocalLikesCount((prev) => (shouldLike ? prev - 1 : prev + 1));
      }
    }, 500);
  }, [likePost, postId, userId]);

  const handleLikeClick = () => {
    const nextLikedState = !localHasLiked;

    setLocalHasLiked(nextLikedState);
    setLocalLikesCount((prev) => (nextLikedState ? prev + 1 : prev - 1));

    debouncedLikePost(nextLikedState);
  };

  return { handleLikeClick, localLikesCount, localHasLiked };
};
