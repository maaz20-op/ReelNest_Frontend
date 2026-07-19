import { useEffect, useMemo, useState } from "react";
import { Icons } from "../../../../assets/icons";
import { debounce } from "../../../../utils/debounce";
import { useAuth } from "../../../auth/hooks/useAuth";
import { useLikePostMutation } from "../../../../services/posts/post";
import { useCommentsContext } from "../../../comments/hooks/useIsCommentsOpen";
import { useLike } from "../../../../hooks/useLike";

export const VideoActions = ({ nextPost, data }) => {
  const { user } = useAuth();

  const { setIsCommentsOpen } = useCommentsContext();
  const currentPost = nextPost || data;
  const postCreaterId = data?.userId;
  const postId = currentPost?._id;

  const likesArray = currentPost?.likes || [];

  // 1. For Opstimistic Ui update
  const likesData = useLike({ currentPost, postCreaterId, likesArray });
  const handleLikeClick = likesData?.handleLikeClick || function () {};
  const localLikesCount = likesData?.localLikesCount || 0;
  const localHasLiked = likesData?.localHasLiked;

  return (
    <div className="actions w-19 h-full absolute top-0 right-0 md:relative">
      <ul className="flex text-(--text-primary) flex-col h-full gap-4 items-center justify-center">
        {[
          {
            name: localLikesCount,
            icon: Icons?.heart,
            fnc: handleLikeClick,
            size: 25,
            isHighlighted: localHasLiked,
            highlightColor: "#FF1D8D",
          },
          {
            name: currentPost?.comments?.length || 0,
            icon: Icons?.comments,
            fnc: () => setIsCommentsOpen((prev) => !prev),
            size: 26,
          },
          {
            name: "Share",
            icon: Icons?.share,
            fnc: async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: "Check this out!",
                    text: "Amazing post on ReelNest",
                    url: window.location.href,
                  });

                  console.log("Shared successfully");
                } catch (err) {
                  console.log("Share cancelled", err);
                }
              } else {
                alert("Sharing is not supported on this browser.");
              }
            },
            size: 35,
          },
          {
            name: "Loop",
            icon: Icons?.loop,
            fnc: () => console.log("clicked"),
            size: 25,
          },
        ].map(
          (
            { fnc, size, name, icon: Icon, isHighlighted, highlightColor },
            indx,
          ) => (
            <li
              onClick={fnc}
              key={indx}
              className="flex flex-col items-center cursor-pointer"
            >
              <Icon
                size={size}
                color={isHighlighted ? highlightColor : "white"}
              />
              <span className="text-sm">{name}</span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
