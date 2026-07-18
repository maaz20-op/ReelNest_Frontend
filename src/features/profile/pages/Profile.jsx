import { useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { BorderDiv } from "../../../utils/BorderDiv";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Button } from "../../../components/reusableComponents/Button";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { UserInfoCard } from "../components/userInfoCard";
import { UserInfoCardSkeleton } from "../../../skeleton/profile/userInfoCard";
import { GridMediaLayoutProfile } from "../components/GridMediaLayout";
import { useGetUserByIdQuery } from "../../../services/users/user";
import { GiTrumpet } from "react-icons/gi";
import { useEffect } from "react";
import { Spinner } from "../../../components/reusableComponents/Spinner";
import { GridVideoLayoutSkeleton } from "../../../skeleton/video/GridVideoSkeleton";
import {
  useLazyGetVideoPostsByuserIdQuery,
  useLazyGetImagePostsByUserIdQuery,
} from "../../../services/posts/post";

import { VideosImagesToggleTab } from "../../../components/reusableComponents/videosImagesTab";
import { ConnectionInfo } from "../components/userConnectionsData";
import {
  setPagesAndCallApiInfiniteScroll,
  useInfinteScroll,
} from "../../../utils/useInfiniteScroll";

export const Profile = () => {
  const { iconsColor, isDark } = contextThemeSetup();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { user } = useAuth();
  const [isLoggedInUser, setLoggedInUser] = useState(true);
  const location = useLocation();
  const userData = location.state;

  const [isConnectionClicked, setIsConnectionClicked] = useState(false);

  const userId = userData?.userId ? userData?.userId : user?._id;

  const [isVideoTab, setVideoTab] = useState(true);
  const [isEndOfPosts, setEndOfPosts] = useState(false);

  // get Profile User
  const { data, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  const { isBottomOfContainer, setBtmContainer, handleScroll } =
    useInfinteScroll();

  // get profile User Videos
  const [
    fetchVideos,
    {
      data: userVideoPosts,
      isLoading: isUserVideoPostsLoading,
      isFetching: isFetchingVideo,
    },
  ] = useLazyGetVideoPostsByuserIdQuery();

  const [
    fetchImages,
    {
      data: userImagePosts,
      isLoading: isUserImagePostsLoading,
      isFetching: isFetchingImages,
    },
  ] = useLazyGetImagePostsByUserIdQuery();

  const hasNextPage = isVideoTab
    ? userVideoPosts?.data[1]
    : userImagePosts?.data[1];
  const limit = 12;

  console.log(userVideoPosts);

  const { apiData: posts, page } = setPagesAndCallApiInfiniteScroll({
    hasNextPage,
    isBottomOfContainer,
    setBtmContainer,
    postsRawData: isVideoTab
      ? userVideoPosts?.data[0]
      : userImagePosts?.data[0],
    setEndOfPosts,
    userId: data?.data[0]?._id,
    queryObject: {
      isVideoTab: isVideoTab,
      limit: limit,
      userId: data?.data[0]?._id,
    },
    fetchData: isVideoTab ? fetchVideos : fetchImages,
    data: isVideoTab ? userVideoPosts : userImagePosts,
    isFetching: isVideoTab ? isFetchingVideo : isFetchingImages,
    isPostsEnd: isEndOfPosts,
  });

  const profileContainerRef = useRef(null);

  useEffect(() => {
    if (data?.data[0]?._id !== user?._id) setLoggedInUser(false);
    else if (data?.data[0]?._id === user?._id) setLoggedInUser(true);
  }, [data?.data[0]]);

  return (
    <div
      onScroll={handleScroll}
      ref={profileContainerRef}
      className="w-full min-h-0 account-settings overflow-y-auto flex flex-col "
    >
      {/* user info Card top */}
      {isLoading || error || !data ? (
        <UserInfoCardSkeleton />
      ) : (
        <UserInfoCard
          user={data?.data[0]}
          setIsConnectionClicked={setIsConnectionClicked}
          isLoggedInUser={isLoggedInUser}
        />
      )}

      {isConnectionClicked && (
        <ConnectionInfo
          isConnectionInfoClicked={isConnectionClicked}
          setIsConnectionClicked={setIsConnectionClicked}
          userId={userId}
        />
      )}

      <div className="user-content-area  flex flex-col">
        <VideosImagesToggleTab setVideoTab={setVideoTab} />
        <BorderDiv />

        {/* grid video Layout*/}

        {isVideoTab ? (
          isUserVideoPostsLoading || !userVideoPosts ? (
            <GridVideoLayoutSkeleton />
          ) : userVideoPosts?.data[0].length > 0 ? (
            <GridMediaLayoutProfile
              user={data?.data[0]}
              posts={posts}
              isVideoTab={isVideoTab}
              mainContainerRef={profileContainerRef}
              page={page}
              limit={limit}
            />
          ) : (
            <div className="flex flex-col justify-center h-100 items-center gap-6">
              <img className="h-30 w-30" src="/no-posts.svg" alt="no-friends" />
              <div className="flex flex-col gap-0 justify-center items-center">
                <p className="w-50   text-center text-(--text-secondary)">
                  No Posts Uploaded By{" "}
                </p>
                <span className="text-(--text-primary)">
                  {userId === user?._id ? "You" : userData?.name}!
                </span>
              </div>
            </div>
          )
        ) : (
          <GridMediaLayoutProfile
            user={data?.data[0]}
            isVideoTab={isVideoTab}
            posts={posts}
            mainContainerRef={profileContainerRef}
            page={page}
            limit={limit}
          />
        )}
        {isBottomOfContainer && !isEndOfPosts && <Spinner />}
      </div>
    </div>
  );
};
