import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useConnectionsData } from "../../hooks/userConnectionData";
import { contextThemeSetup } from "../../utils/contextSetup";
import { handleRedirectToUserProfile } from "../../utils/handleRedirectToUserProfile";
import { Avatar } from "../reusableComponents/Avatar";
import { FriendSectionSkeleton } from "../../skeleton/friendSectionSkeleton";

export const FriendSection = () => {
  const { user } = useAuth();
  const { iconsColor } = contextThemeSetup();
  const navigate = useNavigate();
  const userConnectionData = useConnectionsData();
  const Friends = userConnectionData?.connectionList?.Friends;

  if (userConnectionData?.isLoading) {
    return <FriendSectionSkeleton />;
  }

  return (
    <div className="wrapper lg:hidden">
      <div className="h-30 max-w-full flex  items-center">
        <div className="friends-container w-[95%] mx-auto flex overflow-x-auto account-settings gap-1 px-2 py-2 ">
          <div className="friend-card flex gap-1 justify-center items-center flex-col   px-2 py-2 rounded-2xl text-(--text-primary)">
            <div className="h-14 relative w-14 rounded-full object-cover bg-black">
              <img
                className="w-full h-full rounded-full"
                src={user?.profileImage}
                alt="user profile"
              />
              <Icons.plus
                className="absolute bottom-0 -left-2"
                color={iconsColor}
                size={19}
              />
            </div>
            <h1 className="text-(--text-secondary) font-bold">You</h1>
          </div>
          {Array.isArray(Friends) &&
            Friends.map(({ _id, fullname, profileImage }, indx) => (
              <div
                key={indx}
                onClick={() => {
                  const redirectToProfile = handleRedirectToUserProfile(
                    _id,
                    fullname,
                    navigate,
                  );
                  redirectToProfile();
                }}
                className="friend-card flex gap-1 justify-center items-center flex-col   px-2 py-2 rounded-2xl text-(--text-primary)"
              >
                <div className="h-14 w-14 rounded-full object-cover bg-black">
                  <img
                    className="w-full h-full rounded-full"
                    src={profileImage}
                    alt="user profile"
                  />
                </div>
                <h1 className="text-xs text-center w-15 line-clamp-1 text-(--text-secondary)">
                  {fullname}
                </h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
