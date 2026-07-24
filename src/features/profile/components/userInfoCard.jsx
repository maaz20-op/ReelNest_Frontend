import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Button } from "../../../components/reusableComponents/Button";
import { Icons } from "../../../assets/icons";
import { checkIsFollowed } from "../../../utils/checkisFollowed";
import { useEffect, useRef, useState } from "react";
import { contextThemeSetup } from "../../../utils/contextSetup";
import {
  useBlockOtherUserMutation,
  useUpdateAvatarMutation,
} from "../../../services/users/user";
import { useFollowUser, useUnfollowUser } from "../../../hooks/useFollowUser";
import { useAuth } from "../../auth/hooks/useAuth";
import { Loader } from "../../../components/reusableComponents/Loader";
import { TooltipMenu } from "../../../utils/tooltip";
import { useBlockUnBlockUser } from "../../../hooks/useBlockUnblockUser";

export const UserInfoCard = ({
  user,
  isLoggedInUser,
  setIsConnectionClicked,
  setBlockedUser,
  isBlockedUser,
  connectionCate,
  isAlreadyFollowed,
}) => {
  const navigate = useNavigate();
  const { user: loggedInUser, isLoading } = useAuth();
  const [profileImgSrc, setImgSrc] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const inputRef = useRef(null);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  const [currentFollow, setFollow] = useState(isAlreadyFollowed);
  const { iconsColor, isDark } = contextThemeSetup();
  const { handleBlockUser, handleUnBlockUser } =
    useBlockUnBlockUser(setBlockedUser);

  //update Avatar
  const [updateAvatar] = useUpdateAvatarMutation();

  const [blockUser] = useBlockOtherUserMutation();

  const getTooltipOptions = () => [
    {
      label: isBlockedUser ? "UnBlock" : "Block",
      icon: Icons.blockedUser,
      action: () => {
        if (!user) return;
        console.log(loggedInUser, isBlockedUser);
        if (!isBlockedUser) {
          handleBlockUser(user);
        } else {
          handleUnBlockUser(user);
        }
      },
    },
  ];

  const handleFollowClick = useFollowUser({
    userData: user,
    setFollow,
  });

  useEffect(() => {
    setFollow(isAlreadyFollowed);
  }, [user?._id]);

  const handleUnfollowClick = useUnfollowUser({
    unfollowUserId: user?._id,
    setFollow,
    userId: loggedInUser?._id,
  });

  useEffect(() => {
    if (isAlreadyFollowed !== undefined) {
      setFollow(isAlreadyFollowed);
    }
  }, [isAlreadyFollowed]);

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      setImgSrc(result);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("profileImage", file);

    // call backend to update profile pic
    try {
      await updateAvatar({ formData, userId: user?._id }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvatarClick = (e) => setIsImageFullScreen((prev) => !prev);

  const showLoggedInUserCollections = () => {
    if (isLoggedInUser) return navigate("/profile/collection");
  };

  return (
    <div className="profile-Card rounded   md:flex md:flex-row-reverse md:justify-end h-6/7 md:h-40 px-6 py-4 w-14/15 md:w-9/10 lg:w-[97%] mx-auto mt-4 bg-(--bg-secondary)">
      {isLoggedInUser ? (
        <div className="flex justify-end">
          <Icons.settings
            onClick={() => navigate("/settings")}
            size={23}
            color={iconsColor}
          />
        </div>
      ) : (
        <div className="relative">
          <Icons.videoPreference
            onClick={() => setShowMenu((prev) => !prev)}
            color={iconsColor}
            size={23}
          />

          {showMenu && <TooltipMenu options={getTooltipOptions()} />}
        </div>
      )}
      <div className="flex flex-col md:gap-6 2xl:gap-8  md:flex-row gap-2 [&>*:last-child]:mt-3 items-center">
        <div className="flex shrink-0  flex-col p-1 2xl:flex-row 2xl:w-1/4 items-center gap-2   ">
          {/* userprofileImage  full screen */}
          {isImageFullScreen && (
            <div className="absolute  z-20 md:top-30 md:left-[32%] lg:top-30 lg:left-[37%]">
              <Avatar
                fn={() => setIsImageFullScreen(false)}
                size="full"
                src={
                  isBlockedUser
                    ? "https://iili.io/FnrRren.png"
                    : profileImgSrc
                      ? profileImgSrc
                      : user?.profileImage
                }
              />
            </div>
          )}
          {/* User Profile Img */}
          <div className="relative">
            <Avatar
              fn={handleAvatarClick}
              size="xl"
              src={
                isBlockedUser
                  ? "https://iili.io/FnrRren.png"
                  : profileImgSrc
                    ? profileImgSrc
                    : user?.profileImage
              }
            />

            {isLoggedInUser && (
              <Icons.pencil
                onClick={() => inputRef?.current.click()}
                className="absolute top-3 right-0"
                size={12}
                color={iconsColor}
              />
            )}
            <form className="hidden">
              <input
                ref={inputRef}
                type="file"
                onChange={handleUpdateAvatar}
                accept="image/*"
              />
            </form>
          </div>

          {/* user Names */}
          <div className="content flex flex-col justify-center md:w-full  items-center">
            <h1 className="text-base line-clamp-1 font-md text-(--text-primary)">
              {" "}
              {isBlockedUser ? "ReelNest User" : user?.fullname || "Guest"}
            </h1>
            <h2 className="text-sm md:text-base text-(--text-secondary) lg:text-sm">
              @{isBlockedUser ? "reelnestu-user" : user?.username || "user"}
            </h2>
          </div>
        </div>
        <p className="user-bio md:text-sm  line-clamp-2 md:w-30 lg:w-30 xl:w-45 lg:line-clamp-3 mt-2 md:mt-4 text-md text-center text-(--text-secondary)">
          {isBlockedUser
            ? "No Details Found of This User!"
            : user?.bio || "Write your bio which describes your nature!"}
        </p>

        <div
          onClick={() => setIsConnectionClicked((prev) => !prev)}
          className="followers  md:w-1/2 md:text-sm mt-2 md:mt-4 justify-center lg:w-50 xl:w-60  flex gap-4"
        >
          {[
            { label: "Friends", count: connectionCate?.Friends?.length },
            { label: "Following", count: connectionCate?.Following?.length },
            { label: "Followers", count: connectionCate?.Followers?.length },
          ].map(({ label, count }, indx) => (
            <div
              key={indx}
              className="flex flex-col justify-center text-sm items-center gap-2"
            >
              <h2 className="text-(--text-primary)">{label}</h2>
              <h3 className="text-(--text-secondary)">
                | {isBlockedUser ? "N/A" : count} |
              </h3>
            </div>
          ))}
        </div>

        <Button
          padding="md"
          background={isDark ? "bg-pink-800" : "bg-pink-400"}
          border="rounded-2xl"
          width="w-40 md:w-60 lg:w-40 xl:w-60"
          content={
            isBlockedUser ? (
              <div className="flex gap-2 items-center">
                <p>UnBlock</p>
                <Icons.unblockProfile color="white" size={19} />
              </div>
            ) : isLoggedInUser ? (
              "My Collection"
            ) : currentFollow ? (
              <div className="flex gap-2 items-center">
                <p>Followed</p>
                <Icons.followedIcon color="white" size={19} />
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <p>Follow</p>
                <Icons.followIcon color="white" size={19} />
              </div>
            )
          }
          fnc={
            isBlockedUser
              ? () => handleUnBlockUser(user)
              : isLoggedInUser
                ? showLoggedInUserCollections
                : currentFollow
                  ? handleUnfollowClick
                  : handleFollowClick
          }
          otherStyles="md:text-sm "
        />
      </div>
    </div>
  );
};
