import { Virtuoso } from "react-virtuoso";
import { useLazyGetPostsQuery } from "../../../services/posts/post";
import { PostCardSkeleton } from "../../../skeleton/homeFeed/postCard";
import { PostCard } from "./PostCard";
import { setPagesAndCallApiInfiniteScroll } from "../../../utils/useInfiniteScroll";
import { VirtualList } from "../../../utils/useVirtualization";
import { useEffect } from "react";
import { useToastContext } from "../../../contexts/toast";

export const Media = ({
  setCommentsOpen,
  isCommentsOpen,
  setBtmContainer,
  isBottomOfContainer,
  isPostsEnd,
  setEndOfPosts,
  setCurrentPostCommentsData,
  mainScrollContainerRef,
}) => {
  const [fetchPosts, { data, isLoading, error, isFetching }] =
    useLazyGetPostsQuery();

  // Extract the current page of posts returned by the API.
  const postsRawData = data?.data?.[0];
  // Checking more Posts are Avalaible
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

  if (isLoading) return <PostCardSkeleton />;

  if (error) return <p>Something went wrong.</p>;

  if (!Array.isArray(posts) || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="w-full">
      <VirtualList
        mainContainerRef={mainScrollContainerRef}
        data={posts}
        itemRendered={(post) => (
          <PostCard
            post={post}
            setCurrentPostCommentsData={setCurrentPostCommentsData}
          />
        )}
      />
    </div>
  );
};
