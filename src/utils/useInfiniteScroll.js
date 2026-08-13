import { useEffect, useState, useCallback } from "react";
import { useScrollUpAndDownContext } from "../contexts/hideHeaderOnScroll";

export const useInfinteScroll = (lastScrollTop, reverseScroll) => {
  const [isBottomOfContainer, setBtmContainer] = useState(false);
  const { setScrollingDown } = useScrollUpAndDownContext();

  const handleScroll = useCallback(
    (e) => {
      const target = e.currentTarget;
      const totalHeight = target.scrollHeight;
      const scrolledView = target.scrollTop;
      const clientHeight = target.clientHeight;

      // Hide/Show Header
      if (lastScrollTop && lastScrollTop.current !== undefined) {
        const currentScrollTop = target.scrollTop;
        const previousScrollTop = lastScrollTop.current;

        if (currentScrollTop > previousScrollTop && currentScrollTop > 50) {
          setScrollingDown((prev) => (prev !== true ? true : prev));
        } else if (currentScrollTop < previousScrollTop) {
          setScrollingDown((prev) => (prev !== false ? false : prev));
        }

        lastScrollTop.current = currentScrollTop;
      }

      // Infinite Scroll logic
      if (reverseScroll) {
        if (scrolledView === 0) {
          setBtmContainer(true);
        }
      } else {
        if (Math.ceil(scrolledView + clientHeight) >= totalHeight - 10) {
          setBtmContainer(true);
        }
      }
    },
    [lastScrollTop, reverseScroll, setScrollingDown],
  );

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
  reverse = false,
  fetchData,
  userId,
  queryObject,
}) => {
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);

  const finalObj = {
    ...queryObject,
    page: page,
  };

  const isVideo = queryObject?.isVideoTab;

  let isValid = Object.values(finalObj).every(
    (value) => value !== undefined && value !== null,
  );

  // calling api
  useEffect(() => {
    if (!isValid) return;
    if (page > 1 && !hasNextPage) return setBtmContainer(false);
    fetchData(finalObj);
    setBtmContainer(true);
  }, [page, isValid, isVideo, userId]);

  useEffect(() => {
    setPage(1);
  }, [isVideo, userId]);

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
          return reverse
            ? [...newUniquePosts, ...prev]
            : [...prev, ...newUniquePosts];
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
      setBtmContainer(false);
      return;
    }

    setPage((prev) => prev + 1);
  }, [isBottomOfContainer]);

  return { apiData, setApiData, page };
};
