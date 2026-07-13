import { useEffect, useState } from "react";

export const useInfinteScroll = () => {
  const [isBottomOfContainer, setBtmContainer] = useState(false);

  const handleScroll = (e) => {
    const totalHeight = e.currentTarget.scrollHeight;
    const scrolledView = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;

    if (totalHeight <= Math.round(scrolledView + clientHeight)) {
      setBtmContainer(true);
    }
  };

  return {
    setBtmContainer,
    isBottomOfContainer,
    handleScroll,
  };
};

export const setPagesAndCallApiInfiniteScroll = ({
  hasNextPage,
  setBtmContainer,
  postsRawData,
  data,
  isPostsEnd,
  setEndOfPosts,
  isBottomOfContainer,
  isFetching,
  fetchData,

  queryObject,
}) => {
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);
  console.log(queryObject?.postId);
  const finalObj = {
    ...queryObject,
    page: page,
  };
  console.log(finalObj);
  // calling api
  useEffect(() => {
    if (page > 1 && !hasNextPage) return setBtmContainer(false);
    fetchData(finalObj);
    setBtmContainer(true);
  }, [page]);

  // settings data
  useEffect(() => {
    if (postsRawData && Array.isArray(postsRawData)) {
      if (page === 1) {
        setApiData(postsRawData);
      } else {
        setApiData((prev) => {
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

  return { apiData, page };
};
