import { useRef } from "react";
import { Avatar } from "../../../../components/reusableComponents/Avatar";
import { Button } from "../../../../components/reusableComponents/Button";
import { useConnectionsData } from "../../../../hooks/userConnectionData";
import { FriendsListSkeleton } from "../../../../skeleton/leftDesktopPanel";
import { contextThemeSetup } from "../../../../utils/contextSetup";
import { showScrollBarOnHover } from "../../../../utils/showSideBarOnHover";
import { handleRedirectToUserProfile } from "../../../../utils/handleRedirectToUserProfile";
import { useNavigate } from "react-router-dom";

export const SuggestedUsers = () => {
  const { isDark } = contextThemeSetup();
  const userConnectionData = useConnectionsData();
  const Followers = userConnectionData?.connectionList?.Followers;
  const isConnectionLoading = userConnectionData?.isLoading;
  const navigate = useNavigate();

  const suggestionContainerRef = useRef(null);
  const isHoverd = showScrollBarOnHover(suggestionContainerRef);
  const handleRedirectToFollowerProfile = handleRedirectToUserProfile();

  return (
    <div className="justify-center h-full    hidden md:flex w-full items-start pt-12">
      <div className="2xl:w-85 fixed xl:w-80 lg:w-70">
        <div className="flex flex-col w-full p-2 rounded-2xl border-2 border-(--border-color) h-125">
          <div className="p-2 border-b-2 border-(--border-color)">
            <h1 className="text-(--text-primary) text-center ">
              Suggestions For You
            </h1>
          </div>

          <div
            ref={suggestionContainerRef}
            className={`${isHoverd ? "overflow-y-auto" : "overflow-y-hidden"} account-settings  scrollbar-gutter-stable flex flex-col gap-2 flex-1 min-h-0 mt-5  py-5 `}
          >
            {!isConnectionLoading || !Followers?.length === 0 ? (
              Array.isArray(Followers) &&
              Followers.map(({ data }, indx) => (
                <div
                  onClick={() => {
                    const handleRedirectToFollowerProfile =
                      handleRedirectToUserProfile(
                        data?._id,
                        data?.fullname,
                        navigate,
                      );

                    handleRedirectToFollowerProfile();
                  }}
                  key={data?._id}
                  className="friend-div md:gap-4 lg:gap-2 flex items-center justify-between hover:bg-(--bg-secondary) lg:px-1 lg:py-1 2xl:px-2 2xl:py-3 rounded"
                >
                  <div className="flex gap-4 lg:w-6/7  xl:w-5/6  rounded-full ">
                    <Avatar size="md" src={data?.profileImage} />
                    <div className="div-content md:text-base xl:text-sm text-xs overflow-hidden flex  flex-col">
                      <h1 className=" line-clamp-1 font-medium text-(--text-primary) ">
                        {data?.fullname}
                      </h1>
                      <h2 className="text-sm  line-clamp-1 text-(--text-secondary)">
                        @{data?.username}
                      </h2>
                    </div>
                  </div>

                  <Button
                    background={isDark ? "bg-pink-400" : "bg-pink-100"}
                    content="View Profile"
                    font="font-medium"
                    width="w-30"
                    textSize="sm"
                    otherStyles={`${isDark ? "hover:bg-pink-600" : "hover:bg-pink-300"} lg:text-xs xl:text-sm `}
                  />
                </div>
              ))
            ) : (
              <FriendsListSkeleton isDark={isDark} isHoverd={isHoverd} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
