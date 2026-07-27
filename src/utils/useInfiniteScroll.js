import { useEffect, useState } from "react";
import { useScrollUpAndDownContext } from "../contexts/hideHeaderOnScroll";

export const useInfinteScroll = (lastScrollTop, reverseScroll) => {
  const [isBottomOfContainer, setBtmContainer] = useState(false);
  const { setScrollingDown } = useScrollUpAndDownContext();

  const handleScroll = (e) => {
    const totalHeight = e.currentTarget.scrollHeight;
    const scrolledView = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.scrollTop;

    console.log(
      "scrollHeight",
      e.currentTarget.scrollHeight,
      "scrolltop",
      scrolledView + clientHeight,
    );

    // hide header and bottom nav on mobile devices on scrollDown
    if (lastScrollTop) {
      const currentScrollTop = e.target.scrollTop;

      if (currentScrollTop > lastScrollTop.current) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }

      lastScrollTop.current = currentScrollTop;
    }

    if (reverseScroll) {
      if (!scrolledView) {
        setBtmContainer(true);
      }
    } else {
      if (totalHeight <= Math.round(scrolledView + clientHeight)) {
        setBtmContainer(true);
      }
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
