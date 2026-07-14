import { useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useLazyGetPostsQuery } from "../../../services/posts/post";
import { PostCardSkeleton } from "../../../skeleton/homeFeed/postCard";
import { PostCard } from "./PostCard";
import { setPagesAndCallApiInfiniteScroll } from "../../../utils/useInfiniteScroll";

export const Media = ({
  setCommentsOpen,
  isCommentsOpen,
  setBtmContainer,
  isBottomOfContainer,
  isPostsEnd,
  setEndOfPosts,
  setCurrentPostCommentsData,
}) => {
  const [fetchPosts, { data, isLoading, error, isFetching }] =
    useLazyGetPostsQuery();

  const postsRawData = data?.data?.[0];
  const hasNextPage = data?.data?.[1];

  const { apiData: posts } = setPagesAndCallApiInfiniteScroll({
    hasNextPage,
    setBtmContainer,
    postsRawData,
    isPostsEnd,
    setEndOfPosts,
    data,
    isBottomOfContainer,
    queryObject: {},
    isFetching,
    fetchData: fetchPosts,
  });

  if (isLoading || error) return <PostCardSkeleton />;

  return (
    <div className="posts-container">
      {Array.isArray(posts) &&
        posts.map((post) => {
          const uniqueId = crypto.randomUUID();
          return (
            <PostCard
              key={uniqueId}
              setCurrentPostCommentsData={setCurrentPostCommentsData}
              post={post}
            />
          );
        })}
    </div>
  );
};
