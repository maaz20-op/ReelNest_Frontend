import { useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { BorderDiv } from "../../../utils/BorderDiv";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useMemo, useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Button } from "../../../components/reusableComponents/Button";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { UserInfoCard } from "../components/userInfoCard";
import { UserInfoCardSkeleton } from "../../../skeleton/profile/userInfoCard";
import { GridMediaLayoutProfile } from "../components/GridMediaLayout";
import {
  useGetUserByIdQuery,
  useGetUserConnectionsByIdQuery,
} from "../../../services/users/user";
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
import { checkIsFollowed } from "../../../utils/checkisFollowed";

export const Profile = () => {
  const [isConnectionClicked, setIsConnectionClicked] = useState(false);
  const [isLoggedInUser, setLoggedInUser] = useState(true);
  const [isVideoTab, setVideoTab] = useState(true);
  const [isEndOfPosts, setEndOfPosts] = useState(false);
  const [isBlockedUser, setBlockedUser] = useState(false);

  const navigate = useNavigate();

  const profileContainerRef = useRef(null);
  const inputRef = useRef();

  const { iconsColor, isDark } = contextThemeSetup();
  const { user } = useAuth();

  // location state Data
  const location = useLocation();
  const userData = location.state;

  const userId = userData?.userId ? userData?.userId : user?._id;
  const obj = checkIsFollowed(userId);

  // get Profile User From Backend
  const { data, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  // get profile User Videos
  const [
    fetchVideos,
    {
      data: userVideoPosts,
      isLoading: isUserVideoPostsLoading,
      isFetching: isFetchingVideo,
    },
  ] = useLazyGetVideoPostsByuserIdQuery();

  // get Profile User Images
  const [
    fetchImages,
    {
      data: userImagePosts,
      isLoading: isUserImagePostsLoading,
      isFetching: isFetchingImages,
    },
  ] = useLazyGetImagePostsByUserIdQuery();

  // Infinite Scroll Setup
  const { isBottomOfContainer, setBtmContainer, handleScroll } =
    useInfinteScroll();

  const hasNextPage = isVideoTab
    ? userVideoPosts?.data[1]
    : userImagePosts?.data[1];
  const limit = 12;

  const { apiData: posts, setApiData } = setPagesAndCallApiInfiniteScroll({
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

  useEffect(() => {
    setIsConnectionClicked(false);
  }, [userId]);

  const profileUser = data?.data[0];
  useEffect(() => {
    if (profileUser?._id !== user?._id) setLoggedInUser(false);
    else if (profileUser?._id === user?._id) setLoggedInUser(true);
  }, [profileUser?._id]);

  useEffect(() => {
    if (!isLoggedInUser && user) {
      setBlockedUser(user?.blockedUserId.includes(userId.toString()));
    }
  }, [isLoggedInUser, userId, user]);

  const { data: connectionData, isLoading: isConnectionLoading } =
    useGetUserConnectionsByIdQuery(userId, {
      skip: !userId,
    });

  const connectionCate = useMemo(() => {
    return {
      Friends: connectionData?.data[2] || [],
      Following: connectionData?.data[1] || [],
      Followers: connectionData?.data[0] || [],
    };
  }, [userId, connectionData?.data, isConnectionClicked]);

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
          isBlockedUser={isBlockedUser}
          setIsConnectionClicked={setIsConnectionClicked}
          isLoggedInUser={isLoggedInUser}
          setBlockedUser={setBlockedUser}
          isAlreadyFollowed={obj.isFollow}
          connectionCate={connectionCate}
        />
      )}

      {isConnectionClicked && !isBlockedUser && (
        <ConnectionInfo
          isConnectionInfoClicked={isConnectionClicked}
          setIsConnectionClicked={setIsConnectionClicked}
          userId={userId}
          navigate={navigate}
          connectionCate={connectionCate}
          isLoading={isConnectionLoading}
        />
      )}

      <div className="user-content-area  flex flex-col">
        <VideosImagesToggleTab setVideoTab={setVideoTab} />
        <BorderDiv />

        {/* grid video Layout*/}

        {isVideoTab ? (
          isUserVideoPostsLoading || !userVideoPosts ? (
            <GridVideoLayoutSkeleton />
          ) : posts.length > 0 && !isBlockedUser ? (
            <GridMediaLayoutProfile
              user={data?.data[0]}
              posts={posts}
              setApiData={setApiData}
              isVideoTab={isVideoTab}
              mainContainerRef={profileContainerRef}
              limit={limit}
            />
          ) : (
            <div className="flex flex-col justify-center h-100 items-center gap-6">
              {!isBlockedUser && (
                <img
                  className="h-30 w-30"
                  src="/no-posts.svg"
                  alt="no-friends"
                />
              )}
              <div className="flex flex-col gap-0 justify-center items-center">
                <p className="w-50   text-center text-(--text-secondary)">
                  {isBlockedUser ? (
                    <span className="flex flex-col justify-center items-center gap-3">
                      <Icons.private size={35} color={iconsColor} />
                      <span className="font-bold">
                        Account Not Found of this User!
                      </span>
                    </span>
                  ) : (
                    "No Posts Uploaded By"
                  )}
                </p>
                {!isBlockedUser && (
                  <span className="text-(--text-primary)">
                    {userId === user?._id ? "You" : userData?.name}!
                  </span>
                )}
              </div>
            </div>
          )
        ) : posts.length > 0 ? (
          <GridMediaLayoutProfile
            user={data?.data[0]}
            isVideoTab={isVideoTab}
            posts={posts}
            mainContainerRef={profileContainerRef}
            setApiData={setApiData}
            limit={limit}
          />
        ) : (
          <div className="flex mt-50 flex-col gap-0 justify-center items-center">
            <p className="w-50   text-center text-(--text-secondary)">
              {isBlockedUser ? (
                <span className="flex flex-col justify-center items-center gap-3">
                  <Icons.private size={35} color={iconsColor} />
                  <span className="font-bold">
                    Account Not Found of this User!
                  </span>
                </span>
              ) : (
                "No Posts Uploaded By"
              )}
            </p>
            {!isBlockedUser && (
              <span className="text-(--text-primary)">
                {userId === user?._id ? "You" : userData?.name}!
              </span>
            )}
          </div>
        )}
        {isBottomOfContainer && !isEndOfPosts && <Spinner />}
      </div>
    </div>
  );
};
