import { useEffect, useMemo, useState } from "react";
import { useLazyGetPostsQuery } from "../../../services/posts/post";
import { PostCardSkeleton } from "../../../skeleton/homeFeed/postCard";
import { useAuth } from "../../auth/hooks/useAuth";
import { debounce } from "../../../utils/debounce";
import { PostCard } from "./PostCard";

export const Media = ({
  iconsColor,
  setCommentsOpen,
  isCommentsOpen,
  setBtmContainer,
  isBottomOfContainer,
  setEndOfPosts,
}) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const [fetchPosts, { data, isLoading, error, isFetching }] =
    useLazyGetPostsQuery();

  const postsRawData = data?.data?.[0];
  const hasNextPage = data?.data?.[1];

  // calling api
  useEffect(() => {
    if (page > 1 && !hasNextPage) return;
    fetchPosts({ page: page });
  }, [page]);

  // settings data
  useEffect(() => {
    if (data?.data) {
      if (page === 1) return setPosts(postsRawData);

      setPosts((prev) => [...prev, ...postsRawData]);
      setBtmContainer(false);
    }
  }, [data]);

  // updating page
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
            post={post}
            user={user}
            iconsColor={iconsColor}
            setCommentsOpen={setCommentsOpen}
            isCommentsOpen={isCommentsOpen}
          />
        ))}
    </div>
  );
};
