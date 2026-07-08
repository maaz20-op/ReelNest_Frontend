import { useEffect, useMemo, useState } from "react";
import { useLazyGetPostsQuery } from "../../../services/posts/post";
import { PostCardSkeleton } from "../../../skeleton/homeFeed/postCard";
import { PostCard } from "./PostCard";

export const Media = ({
  setCommentsOpen,
  isCommentsOpen,
  setBtmContainer,
  isBottomOfContainer,
  setEndOfPosts,
  setCurrentPostCommentsData,
}) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const [fetchPosts, { data, isLoading, error, isFetching }] =
    useLazyGetPostsQuery();

  const postsRawData = data?.data?.[0];
  const hasNextPage = data?.data?.[1];

  // calling api
  useEffect(() => {
    if (page > 1 && !hasNextPage) return setBtmContainer(false);
    fetchPosts({ page: page });
    setBtmContainer(true);
  }, [page]);

  // settings data
  useEffect(() => {
    if (postsRawData && Array.isArray(postsRawData)) {
      if (page === 1) {
        setPosts(postsRawData);
      } else {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const newUniquePosts = postsRawData.filter(
            (p) => !existingIds.has(p._id),
          );
          return [...prev, ...newUniquePosts];
        });
      }
      setBtmContainer(false);
    }
  }, [data]);

  useEffect(() => {
    if (!isBottomOfContainer) return;
    if (isFetching) return;
    if (!hasNextPage) {
      setEndOfPosts(true);
      return;
    }

    setPage((prev) => prev + 1);
  }, [isBottomOfContainer]);

  if (isLoading || error) return <PostCardSkeleton />;

  return (
    <div className="posts-container">
      {Array.isArray(posts) &&
        posts.map((post) => (
          <PostCard
            key={post._id}
            setCurrentPostCommentsData={setCurrentPostCommentsData}
            post={post}
          />
        ))}
    </div>
  );
};
