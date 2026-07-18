import { useRef, useState, useEffect } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { Comments } from "../../comments/components/Comments";
import { Media } from "../../posts/components/Media";

import { Button } from "../../../components/reusableComponents/Button";
import { showScrollBarOnHover } from "../../../utils/showSideBarOnHover";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { FriendsList } from "../../../components/reusableComponents/friendsList";
import { FriendsListSkeleton } from "../../../skeleton/leftDesktopPanel";
import { useCommentsContext } from "../../comments/hooks/useIsCommentsOpen";
import { FriendSection } from "../../../components/mobile/FriendsHeaderSection";
import { useInfinteScroll } from "../../../utils/useInfiniteScroll";
import { Spinner } from "../../../components/reusableComponents/Spinner";
import { useConnectionsData } from "../../../hooks/userConnectionData";
import { handleRedirectToUserProfile } from "../../../utils/handleRedirectToUserProfile";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";

export const FeedPage = () => {
  const { iconsColor, isDark } = contextThemeSetup();
  const [commentsData, setCurrentPostCommentsData] = useState(null);

  const [isPostsEnd, setEndOfPosts] = useState(false);

  const { isCommentsOpen, setIsCommentsOpen } = useCommentsContext();
  const navigate = useNavigate();

  // For scroll Loader

  const userConnectionData = useConnectionsData();
  const Followers = userConnectionData?.connectionList?.Followers;
  const isConnectionLoading = userConnectionData?.isLoading;

  // post container Refrence
  const suggestionContainerRef = useRef(null);
  const postContainerRef = useRef(null);

  const isHoverd = showScrollBarOnHover(suggestionContainerRef);

  const scrollData = useInfinteScroll();
  const mainScrollContainerRef = useRef(null);
  useEffect(() => {
    return () => setIsCommentsOpen(false);
  }, []);

  return (
    <div
      onScroll={scrollData?.handleScroll}
      ref={mainScrollContainerRef}
      className={`${isCommentsOpen ? "overflow-hidden" : "overflow-y-scroll "} min-h-0    account-settings  pl-2 lg:pl-5 xl:pl-10  py-3 md:grid md:grid-cols-[400px_1fr] lg:grid-cols-[340px_1fr] 2xl:grid-cols-[480px_1fr] xl:grid-cols-[450px_1fr] flex flex-col gap-4 `}
    >
      <div ref={postContainerRef}>
        {/* Mobile Devices */}
        <FriendSection />

        {/* Media */}
        <Media
          isBottomOfContainer={scrollData?.isBottomOfContainer}
          iconsColor={iconsColor}
          setBtmContainer={scrollData?.setBtmContainer}
          isPostsEnd={isPostsEnd}
          setEndOfPosts={setEndOfPosts}
          setCurrentPostCommentsData={setCurrentPostCommentsData}
          mainScrollContainerRef={mainScrollContainerRef}
        />
        {!isPostsEnd && scrollData?.isBottomOfContainer && <Spinner />}
      </div>

      {isCommentsOpen ? (
        <div className="comments-box h-full w-full  flex items-center justify-end p-2">
          <div className="fixed top-24  md:h-120 md:w-1/3 lg:h-150 lg:w-1/4 2xl:w-1/4   flex justify-end">
            <Comments
              postId={commentsData?.postId}
              createrInfo={commentsData?.createrInfo}
              title={commentsData?.title}
              isHomeFeed={true}
            />
          </div>
        </div>
      ) : (
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
                {isConnectionLoading || Followers?.length === 0 ? (
                  <FriendsListSkeleton isDark={isDark} isHoverd={isHoverd} />
                ) : (
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
                        console.log("vclffi");
                        handleRedirectToFollowerProfile();
                      }}
                      key={data?._id}
                      className="friend-div md:gap-4 lg:gap-2 flex items-center justify-between hover:bg-(--bg-secondary) lg:px-1 lg:py-1 2xl:px-2 2xl:py-3 rounded"
                    >
                      <div className="flex gap-4 lg:w-6/7  xl:w-5/6  rounded-full ">
                        <Avatar size="md" src={data?.profileImage} />
                        <div className="div-content md:text-base xl:text-sm text-xs overflow-hidden flex  flex-col">
                          <h1 className=" line-clamp-1 text-(--text-primary) ">
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
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
