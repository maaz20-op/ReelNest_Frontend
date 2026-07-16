import { Grid2X2 } from "lucide-react";
import { BorderDiv } from "../../../utils/BorderDiv";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { GridMediaLayoutProfile } from "../../profile/components/GridMediaLayout";
import { useAuth } from "../../auth/hooks/useAuth";
import { GridVideoLayoutSkeleton } from "../../../skeleton/video/GridVideoSkeleton";
import {
  useLazyGetSavedImagePostsQuery,
  useLazyGetSavedVideoPostsQuery,
} from "../../../services/pins/pin";
import { VideosImagesToggleTab } from "../../../components/reusableComponents/videosImagesTab";
import { useRef, useState } from "react";
import {
  setPagesAndCallApiInfiniteScroll,
  useInfinteScroll,
} from "../../../utils/useInfiniteScroll";
import { Spinner } from "../../../components/reusableComponents/Spinner";
import { VirtualList } from "../../../utils/useVirtualization";

export const SavedPost = () => {
  const { isDark } = contextThemeSetup();
  const { user } = useAuth();
  const [isVideoTab, setVideoTab] = useState(true);

  // fetch saved videos
  const [isEndofPosts, setEndOfPosts] = useState(false);
  const savedPostContainerRef = useRef(null);
  const { handleScroll, isBottomOfContainer, setBtmContainer } =
    useInfinteScroll();

  const [
    fetchSavedVideos,
    {
      data: savedPostsVideo,
      isLoading,
      error,
      isFetching: isSavedVideosFetching,
    },
  ] = useLazyGetSavedVideoPostsQuery();
  const savedVideoPins = savedPostsVideo?.data?.[0] || [];
  console.log(savedPostsVideo);
  // fetch saved images
  const [
    fetchSavedImages,
    { data: savedPostsImage, isFetching: isSavedImagesFetching },
  ] = useLazyGetSavedImagePostsQuery();
  const savedImagesPins = savedPostsImage?.data[0] || [];

  const hasNextPage = isVideoTab
    ? savedPostsVideo?.data?.[1]
    : savedPostsImage?.data[1];
  console.log(hasNextPage);
  const limit = 12;
  const { apiData: posts, page } = setPagesAndCallApiInfiniteScroll({
    hasNextPage,
    setBtmContainer,
    isBottomOfContainer,
    data: isVideoTab ? savedPostsVideo : savedPostsImage,
    limit,
    postsRawData: isVideoTab ? savedVideoPins : savedImagesPins,
    isPostsEnd: isEndofPosts,
    setEndOfPosts,
    queryObject: { limit },
    fetchData: isVideoTab ? fetchSavedVideos : fetchSavedImages,
    isFetching: isVideoTab ? isSavedVideosFetching : isSavedImagesFetching,
  });
  console.log(posts);

  return (
    <div className="p-3 min-h-0 flex flex-col">
      <h1 className="text-(--text-primary) mt-4 text-2xl text-center font-bold">
        Saved Posts
      </h1>

      {/* Images videos toggle */}
      <VideosImagesToggleTab setVideoTab={setVideoTab} />
      <BorderDiv />

      <div
        ref={savedPostContainerRef}
        onScroll={handleScroll}
        className="min-h-0 account-settings overflow-y-auto w-full h-full"
      >
        {savedVideoPins.length === 0 && isVideoTab && (
          <div className="text-(--text-primary) h-full w-full flex justify-center items-center">
            No Saved video Posts yet...
          </div>
        )}
        {savedImagesPins.length === 0 && !isVideoTab && (
          <div className="text-(--text-primary) h-full w-full flex justify-center items-center">
            No Saved Images Posts yet...
          </div>
        )}
        {isLoading || error ? (
          <GridVideoLayoutSkeleton />
        ) : isVideoTab ? (
          <GridMediaLayoutProfile
            user={user}
            posts={posts}
            isVideoTab={isVideoTab}
            isMyCollectionPage={true}
            page={page}
            limit={limit}
            mainContainerRef={savedPostContainerRef}
          />
        ) : (
          <GridMediaLayoutProfile
            user={user}
            posts={posts}
            isVideoTab={isVideoTab}
            isMyCollectionPage={true}
          />
        )}
        {isBottomOfContainer && !isEndofPosts && <Spinner />}
      </div>
    </div>
  );
};
