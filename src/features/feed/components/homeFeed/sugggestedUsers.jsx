import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../../components/reusableComponents/Avatar";
import { Button } from "../../../../components/reusableComponents/Button";
import { useConnectionsData } from "../../../../hooks/userConnectionData";
import { FriendsListSkeleton } from "../../../../skeleton/leftDesktopPanel";
import { contextThemeSetup } from "../../../../utils/contextSetup";
import { showScrollBarOnHover } from "../../../../utils/showSideBarOnHover";
import { handleRedirectToUserProfile } from "../../../../utils/handleRedirectToUserProfile";

export const SuggestedUsers = () => {
  const { isDark } = contextThemeSetup();
  const userConnectionData = useConnectionsData();
  const Followers = userConnectionData?.connectionList?.Followers;
  const isConnectionLoading = userConnectionData?.isLoading;
  const navigate = useNavigate();

  const suggestionContainerRef = useRef(null);
  const isHovered = showScrollBarOnHover(suggestionContainerRef);
  const redirectToUserProfile = handleRedirectToUserProfile();

  return (
    // This says: Hide it by default, show on md, but force hide it strictly between 1024px and 1100px
    <aside className="w-full h-full hidden  md:block max-[1100px]:lg:hidden  lg:pl-4">
      {/* Sticky positioning instead of fixed prevents overlap */}
      <div className="fixed  top-40 w-full max-w-75   min-[760px]:right-12 screen1100:right-32 lg:max-w-86 mx-auto">
        <div className="flex flex-col w-full p-3 rounded-2xl border-2 border-(--border-color) h-[500px] bg-(--bg-primary)">
          {/* Header */}
          <div className="pb-3 border-b-2 border-(--border-color)">
            <h1 className="text-(--text-primary) text-center font-semibold text-base xl:text-lg">
              Suggestions For You
            </h1>
          </div>

          {/* Users List Container */}
          <div
            ref={suggestionContainerRef}
            className={`${
              isHovered ? "overflow-y-auto" : "overflow-y-hidden"
            } account-settings scrollbar-gutter-stable flex flex-col gap-3 flex-1 min-h-0 mt-3 py-2`}
          >
            {isConnectionLoading ? (
              <FriendsListSkeleton isDark={isDark} isHoverd={isHovered} />
            ) : Array.isArray(Followers) && Followers.length > 0 ? (
              Followers.map(({ data }) => (
                <div
                  key={data?._id}
                  onClick={() =>
                    redirectToUserProfile(data?._id, data?.fullname, navigate)
                  }
                  className="friend-div flex items-center justify-between gap-2 p-2 hover:bg-(--bg-secondary) rounded-xl cursor-pointer transition-colors duration-200"
                >
                  {/* User Avatar + Info */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Avatar size="md" src={data?.profileImage} />
                    <div className="div-content text-xs xl:text-sm overflow-hidden flex flex-col min-w-0">
                      <h1 className="truncate font-medium text-(--text-primary)">
                        {data?.fullname}
                      </h1>
                      <h2 className="text-xs truncate text-(--text-secondary)">
                        @{data?.username}
                      </h2>
                    </div>
                  </div>

                  {/* View Profile Action */}
                  <Button
                    background={isDark ? "bg-pink-400" : "bg-pink-100"}
                    content="View Profile"
                    font="font-medium"
                    textSize="xs"
                    otherStyles={`${
                      isDark ? "hover:bg-pink-500" : "hover:bg-pink-200"
                    } lg:px-2.5 lg:py-1.5 text-[10px] lg:text-[14px] whitespace-nowrap`}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-(--text-secondary) mt-5">
                No suggestions available
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
