import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Icons } from "../../../assets/icons";
import { debounce } from "../../../utils/debounce";
import { useFollowUserMutation, userApi } from "../../../services/users/user";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useAuth } from "../../auth/hooks/useAuth";
import { useCommentsContext } from "../../comments/hooks/useIsCommentsOpen";
import { useLike } from "../../../hooks/useLike";
import { data, useNavigate } from "react-router-dom";
import { handleRedirectToUserProfile } from "../../../utils/handleRedirectToUserProfile";
import { useCreateUserSavedPinsMutation } from "../../../services/pins/pin";
import { useFollowUser } from "../../../hooks/useFollowUser";
import { checkIsFollowed } from "../../../utils/checkisFollowed";
import { useToastContext } from "../../../contexts/toast";

export const PostCard = ({ post, setCurrentPostCommentsData }) => {
  const { _id, mediaUrl, postdata, userData, likesUsersData, likes } = post;
  const videoRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isCommentsOpen, setIsCommentsOpen } = useCommentsContext();
  const isLiked = likes.includes(user?._id);
  const [isFollow, setFollow] = useState(false);
  const { iconsColor } = contextThemeSetup();

  const [savePost] = useCreateUserSavedPinsMutation();

  const likesData = useLike({
    likesArray: likes,
    currentPost: post,
    postCreaterId: userData?._id,
  });

  const handleLikeClick = likesData?.handleLikeClick;
  const localHasLiked = likesData?.localHasLiked;
  const localLikesCount = likesData?.localLikesCount;

  const handleFollowClick = useFollowUser({ userData, setFollow });

  const isFollowed = checkIsFollowed(userData?._id);
  const handleRedirectToCreaterProfile = handleRedirectToUserProfile(
    userData?._id,
    userData?.fullname,
    navigate,
  );

  const { showToast, setSuccessMsg } = useToastContext();
  // save Post
  const handleSavePostClick = async () => {
    try {
      showToast(`Post Saved By ${userData?.fullname}`);
      setSuccessMsg(true);
      await savePost(_id);
      if (!data?.success) {
        showToast(`Failed to Save Post By ${userData?.fullname}`);
        setSuccessMsg(false);
      } else {
        showToast(`Post Saved By ${userData?.fullname}`);
        setSuccessMsg(true);
      }
    } catch (err) {
      console.log(err);
      if (err || !data?.success) {
        showToast(`Failed to Save Post By ${userData?.fullname}`);
        setSuccessMsg(false);
      }
    }
  };

  return (
    <div className="video-image-card py-6 flex flex-col gap-2 w-full px-2">
      {/* Profile image - username */}
      <div
        onClick={handleRedirectToCreaterProfile}
        className="profile-info items-center p-4 flex justify-between gap-2 "
      >
        <div className="flex gap-4">
          <Avatar size="md" src={userData?.profileImage} />
          <div className="user-name flex flex-col leading-4 justify-center">
            <h1 className="text-(--text-primary) text-sm">
              {userData?.fullname}
            </h1>
            <h2 className="text-(--text-secondary) text-sm">
              @{userData?.username}
            </h2>
          </div>
        </div>

        <div onClick={handleFollowClick}>
          {userData?.followers?.includes(user?._id) || isFollowed?.isFollow ? (
            <Icons.followedIcon color={iconsColor} size={25} />
          ) : (
            userData?._id !== user?._id && (
              <Icons.followIcon color={iconsColor} size={25} />
            )
          )}
        </div>
      </div>

      {/* Image - video content */}

      <div className="video/image-container w-full bg-black rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          className="w-full aspect-square object-cover h-[500px] sm:h-[540px] lg:h-[580px] rounded-2xl"
          src={mediaUrl}
          controls
          preload="metadata"
        ></video>
      </div>

      {/* Like comments Button */}
      <div className="action-icons px-2 mt-2 flex justify-between">
        <div className="flex gap-8">
          <Icons.heart
            onClick={handleLikeClick} // Toggle like state
            color={localHasLiked ? "#E41A7F" : iconsColor}
            size={23}
          />
          <Icons.comments
            onClick={() => {
              setCurrentPostCommentsData({
                postId: _id,
                createrInfo: userData,
                title: postdata,
              });
              setIsCommentsOpen((prev) => !prev);
            }}
            color={isCommentsOpen ? "red" : iconsColor}
            size={23}
          />
          <Icons.send color={iconsColor} size={23} />
        </div>
        <Icons.save
          onClick={handleSavePostClick}
          color={iconsColor}
          size={23}
        />
      </div>

      {/* Likes and video title */}
      <div className="mt-4 text-sm">
        {likesUsersData?.length > 0 && Array.isArray(likesUsersData) ? (
          <div className="text-(--text-secondary) flex items-center gap-2">
            <div className="relative h-12 w-10 ">
              <span className="absolute top-0 right-4">
                <Avatar size="sm" src={likesUsersData?.[0]?.profileImage} />
              </span>
              <span className="absolute top-0">
                <Avatar size="sm" src={likesUsersData?.[1]?.profileImage} />
              </span>
            </div>{" "}
            Liked by{" "}
            <span className="text-(--text-primary)">
              {likesUsersData?.[0]?.name?.split(" ")[0]},{" "}
              {likesUsersData?.[1]?.name?.split(" ")[0]}
            </span>
            {likesUsersData.length > 2 && (
              <span className="text-(--text-primary)">
                and others {Math.abs(likesUsersData.length - 2)}
              </span>
            )}
          </div>
        ) : (
          <div className="text-(--text-secondary) ">No Likes Yet!</div>
        )}
        <div className="flex gap-1 flex-col sm:flex-row text-(--text-primary) ">
          <p>{userData?.username || "user"}_posted: </p>
          <p className="text-(--text-secondary) ">
            {postdata || "Reelnest Video"}
          </p>
        </div>
      </div>
    </div>
  );
};
