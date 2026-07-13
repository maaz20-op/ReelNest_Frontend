import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Button } from "../../../components/reusableComponents/Button";
import { Icons } from "../../../assets/icons";
import { checkIsFollowed } from "../../../utils/checkisFollowed";
import { useEffect, useRef, useState } from "react";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useUpdateAvatarMutation } from "../../../services/users/user";
import { useFollowUser, useUnfollowUser } from "../../../hooks/useFollowUser";
import { useAuth } from "../../auth/hooks/useAuth";

export const UserInfoCard = ({
  user,
  isLoggedInUser,
  setIsConnectionClicked,
}) => {
  const obj = checkIsFollowed(user?._id);

  const navigate = useNavigate();
  const { user: loggedInUser } = useAuth();
  const [profileImgSrc, setImgSrc] = useState("");
  const inputRef = useRef(null);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  let isAlreadyFollowed = obj?.isFollow;
  const [currentFollow, setFollow] = useState(isAlreadyFollowed);
  const { iconsColor, isDark } = contextThemeSetup();

  //update Avatar
  const [updateAvatar] = useUpdateAvatarMutation();

  const handleFollowClick = useFollowUser({ userData: user, setFollow });

  console.log(user?._id);

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

  console.log("current value", currentFollow, isAlreadyFollowed);
  const handleAvatarClick = (e) => setIsImageFullScreen((prev) => !prev);

  const showLoggedInUserCollections = () => {
    if (isLoggedInUser) return navigate("/profile/collection");
  };

  return (
    <div className="profile-Card rounded   md:flex md:flex-row-reverse md:justify-end h-6/7 md:h-40 px-6 py-4 w-14/15 md:w-9/10  mx-auto mt-4 bg-(--bg-secondary)">
      {isLoggedInUser && (
        <div className="flex justify-end">
          <Icons.settings
            onClick={() => navigate("/settings")}
            size={23}
            color={iconsColor}
          />
        </div>
      )}
      <div className="flex flex-col md:gap-6 2xl:gap-8  md:flex-row gap-2 [&>*:last-child]:mt-3 items-center">
        <div className="flex shrink-0 flex-col p-1 2xl:flex-row 2xl:w-1/3 items-center gap-2   ">
          {/* userprofileImage  full screen */}
          {isImageFullScreen && (
            <div className="absolute  z-20 md:top-30 md:left-[32%] lg:top-30 lg:left-[37%]">
              <Avatar
                fn={() => setIsImageFullScreen(false)}
                size="full"
                src={profileImgSrc ? profileImgSrc : user?.profileImage}
              />
            </div>
          )}
          {/* User Profile Img */}
          <div className="relative">
            <Avatar
              fn={handleAvatarClick}
              size="xl"
              src={profileImgSrc ? profileImgSrc : user?.profileImage}
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
              {user?.fullname || "Guest"}
            </h1>
            <h2 className="text-sm md:text-base text-(--text-secondary) lg:text-sm">
              @{user?.username || "user"}
            </h2>
          </div>
        </div>
        <p className="user-bio md:text-sm  line-clamp-2 md:w-30 lg:w-40 xl:w-70 lg:line-clamp-3 mt-2 md:mt-4 text-md text-center text-(--text-secondary)">
          {user?.bio ||
            "This is Malaika Qamar, my husband is maaz and we are happy family"}
        </p>

        <div
          onClick={() => setIsConnectionClicked((prev) => !prev)}
          className="followers  md:w-1/2 md:text-sm mt-2 md:mt-4 justify-center flex gap-4"
        >
          {[
            { label: "Friends", count: user?.followers?.length },
            { label: "Following", count: user?.following?.length },
            { label: "Followers", count: user?.following?.length },
          ].map(({ label, count }, indx) => (
            <div
              key={indx}
              className="flex flex-col justify-center items-center gap-2"
            >
              <h2 className="text-(--text-primary)">{label}</h2>
              <h3 className="text-(--text-secondary)">| {count} |</h3>
            </div>
          ))}
        </div>

        <Button
          padding="md"
          background={isDark ? "bg-pink-800" : "bg-pink-400"}
          border="rounded-2xl"
          width="w-40"
          content={
            isLoggedInUser ? (
              "My Collection"
            ) : currentFollow ? (
              <div className="flex gap-2 items-center">
                <p>Followed</p>
                <Icons.followedIcon color="white" size={19} />
              </div>
            ) : (
              "Follow"
            )
          }
          fnc={
            isLoggedInUser
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
