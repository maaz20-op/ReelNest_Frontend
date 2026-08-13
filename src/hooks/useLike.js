import { useEffect, useMemo, useState } from "react";
import { debounce } from "../utils/debounce";
import { useLikePostMutation } from "../services/posts/post";
import { useAuth } from "../features/auth/hooks/useAuth";

export const useLike = ({ currentPost, postCreaterId, likesArray }) => {
  const { user } = useAuth();
  const userId = user?._id;

  const initialTotalLikes = likesArray?.length || 0;
  const initialHasUserLiked = likesArray ? likesArray.includes(userId) : false;
  const postId = currentPost?.postId || currentPost?._id;

  // 1. REF SE STATE PAR SHIFT: `dispatch` na hone par reactive status maintain karne ke liye state zaroori hai
  const [localHasLiked, setLocalHasLiked] = useState(initialHasUserLiked);
  const [localLikesCount, setLocalLikesCount] = useState(initialTotalLikes);
  const [likePost] = useLikePostMutation();

  // 2. EFFECT PROPS SYNC: Jab bhi database/props badlein tabhi local state sync ho
  useEffect(() => {
    setLocalHasLiked(initialHasUserLiked);
    setLocalLikesCount(initialTotalLikes);
  }, [initialHasUserLiked, initialTotalLikes, postId, userId]);

  const debouncedLikePost = useMemo(() => {
    return debounce(async (shouldLike) => {
      try {
        await likePost({
          postId,
          userId: postCreaterId,
          loggedInUser: userId,
        }).unwrap();
      } catch (error) {
        console.error("Mutation failed, rolling back UI states:", error);

        // Agar network request fail ho jaye, toh wapas UI states rollback kar dein
        setLocalHasLiked(!shouldLike);
        setLocalLikesCount((prev) => (shouldLike ? prev - 1 : prev + 1));
      }
    }, 500);
  }, [likePost, postId, postCreaterId, userId]);

  const handleLikeClick = () => {
    if (!userId) return;

    const nextLikedState = !localHasLiked;

    // ✅ STATE GUARD LOCK: Agar state pehle se wahi hai jo hum assign kar rahe hain,
    // toh return ho jao taaki faltu re-renders aur rapid double-clicks block ho sakein!
    if (localHasLiked === nextLikedState) {
      return;
    }

    // Local UI states ko instantly update karein (Optimistic Update)
    setLocalHasLiked(nextLikedState);
    setLocalLikesCount((prev) => (nextLikedState ? prev + 1 : prev - 1));

    // Background network API call trigger karein
    debouncedLikePost(nextLikedState);
  };

  return {
    handleLikeClick,
    localLikesCount,
    localHasLiked,
  };
};
