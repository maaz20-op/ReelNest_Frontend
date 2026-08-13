import { useEffect, useMemo, useState } from "react";
import { debounce } from "../utils/debounce";
import { useLikePostMutation } from "../services/posts/post";
import { useAuth } from "../features/auth/hooks/useAuth";

export const useLike = ({
  currentPost,
  postCreaterId,
  likesArray,
  posts,
  setApiData,
}) => {
  const { user } = useAuth();
  const userId = user?._id;

  const initialTotalLikes = likesArray?.length || 0;
  const initialHasUserLiked = likesArray ? likesArray.includes(userId) : false;
  const postId = currentPost?.postId || currentPost?._id;

  // 1. REF REMOVED: Pehle useState banaya pure functional tracking ke liye
  const [localHasLiked, setLocalHasLiked] = useState(initialHasUserLiked);
  const [localLikesCount, setLocalLikesCount] = useState(initialTotalLikes);
  const [likePost] = useLikePostMutation();

  const targetPostFromFeed = useMemo(() => {
    if (!posts || !posts.length) return null;
    return posts.find((p) => (p._id || p.postId) === postId);
  }, [posts, postId]);

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
        console.error(
          "Mutation failed, rolling back UI and parent state:",
          error,
        );

        // Fallback local state if API breaks down
        setLocalHasLiked(!shouldLike);
        setLocalLikesCount((prev) => (shouldLike ? prev - 1 : prev + 1));

        // Rollback parent API data states array safely
        if (setApiData) {
          setApiData((prevPosts) =>
            prevPosts.map((p) => {
              if ((p._id || p.postId) === postId) {
                const freshLikes = shouldLike
                  ? p.likes.filter(
                      (id) => id?.toString() !== userId?.toString(),
                    )
                  : [...p.likes, userId];
                return { ...p, likes: freshLikes };
              }
              return p;
            }),
          );
        }
      }
    }, 500);
  }, [likePost, postId, postCreaterId, userId, setApiData]);

  const handleLikeClick = () => {
    if (!userId) return;

    const nextLikedState = !localHasLiked;

    if (localHasLiked === nextLikedState) {
      return;
    }

    setLocalHasLiked(nextLikedState);
    setLocalLikesCount((prev) => (nextLikedState ? prev + 1 : prev - 1));

    if (setApiData && targetPostFromFeed) {
      setApiData((prevPosts) =>
        prevPosts.map((p) => {
          if ((p._id || p.postId) === postId) {
            // Shallow clone target array to make it extensible
            let updatedLikesArray = [...p.likes];

            if (nextLikedState) {
              // Ensure duplicate user id element isn't inserted
              if (!updatedLikesArray.includes(userId)) {
                updatedLikesArray.push(userId);
              }
            } else {
              updatedLikesArray = updatedLikesArray.filter(
                (id) => id?.toString() !== userId?.toString(),
              );
            }

            // Return clean shallow un-frozen object clone instance
            return { ...p, likes: updatedLikesArray };
          }
          return p;
        }),
      );
    }

    debouncedLikePost(nextLikedState);
  };

  return {
    handleLikeClick,
    localLikesCount,
    localHasLiked,
  };
};
