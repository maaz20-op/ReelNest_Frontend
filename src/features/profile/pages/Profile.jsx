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
import { GridVideoLayoutSkeleton } from "../../../skeleton/video/GridVideoSkeleton";
import {
  useGetVideoPostsByuserIdQuery,
  useGetImagePostsByUserIdQuery,
} from "../../../services/posts/post";
import { ConnectionInfo } from "../components/connectionlist.jsx";
import { VideosImagesToggleTab } from "../../../components/reusableComponents/videosImagesTab.jsx";

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

  // get Profile User
  const { data, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  // get profile User Videos
  const { data: userVideoPosts, isLoading: isUserVideoPostsLoading } =
    useGetVideoPostsByuserIdQuery(data?.data[0]?._id, {
      skip: !data?.data[0]?._id || !isVideoTab,
    });

  const { data: userImagePosts, isLoading: isUserImagePostsLoading } =
    useGetImagePostsByUserIdQuery(data?.data[0]?._id, {
      skip: !data?.data[0]?._id || isVideoTab,
    });

  useEffect(() => {
    if (data?.data[0]?._id !== user?._id) setLoggedInUser(false);
    else if (data?.data[0]?._id === user?._id) setLoggedInUser(true);
  }, [data?.data[0]]);

  return (
    <div className="w-full min-h-0 account-settings overflow-y-auto flex flex-col ">
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
              posts={userVideoPosts?.data[0]}
              isVideoTab={isVideoTab}
            />
          ) : (
            <div className="flex flex-col justify-center h-100 items-center gap-6">
              <img className="h-30 w-30" src="/no-posts.svg" alt="no-friends" />
              <div className="flex flex-col gap-0 justify-center items-center">
                <p className="w-50   text-center text-(--text-secondary)">
                  No Posts Uploaded By{" "}
                </p>
                <span className="text-(--text-primary)">
                  {userId === user?._id ? "You" : obj?.name}!
                </span>
              </div>
            </div>
          )
        ) : (
          <GridMediaLayoutProfile
            user={data?.data[0]}
            isVideoTab={isVideoTab}
            posts={userImagePosts?.data[0]}
          />
        )}
      </div>
    </div>
  );
};
