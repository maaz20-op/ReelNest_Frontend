import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "../utils/debounce";
import { useLikePostMutation, postApi } from "../services/posts/post"; // Apni exact post api slice import karein
import { useAuth } from "../features/auth/hooks/useAuth";
import { useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";

export const useLike = ({ currentPost, postCreaterId, likesArray }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const dispatch = useDispatch();

  const initialTotalLikes = likesArray?.length || 0;
  const initialHasUserLiked = likesArray ? likesArray.includes(userId) : false;

  const postId = currentPost?.postId || currentPost?._id;
  const localHasLiked = useRef(initialHasUserLiked);
  const [localLikesCount, setLocalLikesCount] = useState(initialTotalLikes);
  const [likePost] = useLikePostMutation();

  useEffect(() => {
    localHasLiked.current = initialHasUserLiked;
    setLocalLikesCount(initialTotalLikes);
  }, [initialHasUserLiked, postId, userId, initialTotalLikes]);

  const debouncedLikePost = useMemo(() => {
    return debounce(async (shouldLike) => {
      try {
        await likePost({
          postId,
          userId: postCreaterId,
          loggedInUser: userId,
        }).unwrap();
      } catch (error) {
        console.error("Mutation failed, rolling back cache:", error);

        dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft?.data?.find(
              (p) => (p._id || p.postId) === postId,
            );
            if (post) {
              if (shouldLike) {
                post.likes = post.likes.filter(
                  (id) => id?.toString() !== userId?.toString(),
                );
              } else {
                post.likes.push(userId);
              }
            }
          }),
        );
        localHasLiked.current = !shouldLike;
        setLocalLikesCount((prev) => (shouldLike ? prev - 1 : prev + 1));
      }
    }, 500);
  }, [likePost, postId, postCreaterId, userId, dispatch]);

  const handleLikeClick = () => {
    if (!userId) return;

    const nextLikedState = !localHasLiked.current;
    localHasLiked.current = nextLikedState;
    setLocalLikesCount((prev) => (nextLikedState ? prev + 1 : prev - 1));

    dispatch(
      postApi.util.updateQueryData("getPosts", undefined, (draft) => {
        const post = draft?.data?.find((p) => (p._id || p.postId) === postId);
        console.log(current(draft));
        if (post) {
          if (nextLikedState) {
            post.likes.push(userId); // Safe extensible operation here
          } else {
            post.likes = post.likes.filter(
              (id) => id?.toString() !== userId?.toString(),
            );
          }
        }
      }),
    );

    debouncedLikePost(nextLikedState);
  };

  return {
    handleLikeClick,
    localLikesCount,
    localHasLiked: localHasLiked.current,
  };
};
