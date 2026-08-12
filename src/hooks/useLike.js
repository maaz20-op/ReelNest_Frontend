import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { debounce } from "../utils/debounce";
import { useLikePostMutation } from "../services/posts/post";
import { useAuth } from "../features/auth/hooks/useAuth";

export const useLike = ({ currentPost, postCreaterId, likesArray }) => {
  const { user } = useAuth();
  const userId = user?._id;

  const initialTotalLikes = likesArray.length;
  const initialHasUserLiked = likesArray.includes(userId);

  const postId = currentPost?.postId || currentPost?._id;
  const localHasLiked = useRef(initialHasUserLiked);

  useEffect(() => {
    localHasLiked.current = initialHasUserLiked;
  }, [initialHasUserLiked, postId, user?._id, initialTotalLikes]);
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

        localHasLiked.current = !shouldLike;
        setLocalLikesCount((prev) => (shouldLike ? prev - 1 : prev + 1));
      }
    }, 500);
  }, [likePost, postId, userId]);

  const handleLikeClick = () => {
    const nextLikedState = !localHasLiked?.current;

    localHasLiked.current = nextLikedState;
    setLocalLikesCount((prev) => (nextLikedState ? prev + 1 : prev - 1));
    if (nextLikedState) {
      currentPost?.likes.push(userId);
    } else {
      currentPost.likes = currentPost?.likes.filter(
        (_id) => _id?.toString() !== userId?.toString(),
      );
    }

    debouncedLikePost(nextLikedState);
  };

  return {
    handleLikeClick,
    localLikesCount,
    localHasLiked: localHasLiked?.current,
  };
};
