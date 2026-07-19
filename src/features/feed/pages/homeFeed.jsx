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
import { SuggestedUsers } from "../components/homeFeed/sugggestedUsers";

export const FeedPage = () => {
  const [commentsData, setCurrentPostCommentsData] = useState(null);
  const [isPostsEnd, setEndOfPosts] = useState(false);

  const { iconsColor, isDark } = contextThemeSetup();
  const { isCommentsOpen, setIsCommentsOpen } = useCommentsContext();

  // Shared scroll container used by the virtualized feed and
  // infinite scroll observer to avoid listening to window scrolling.
  const mainScrollContainerRef = useRef(null);

  const scrollData = useInfinteScroll();

  useEffect(() => {
    return () => setIsCommentsOpen(false);
  }, []);

  return (
    <div
      onScroll={scrollData?.handleScroll}
      ref={mainScrollContainerRef}
      className={`${isCommentsOpen ? "overflow-hidden" : "overflow-y-scroll "} min-h-0    account-settings  pl-2 lg:pl-5 xl:pl-10  py-3 md:grid md:grid-cols-[400px_1fr] lg:grid-cols-[340px_1fr] 2xl:grid-cols-[480px_1fr] xl:grid-cols-[450px_1fr] flex flex-col gap-4 `}
    >
      <div>
        {/* Show Friends on Top Section (Mobile Devices) */}
        <FriendSection />

        {/* Media (Videos Images) for Home Feed*/}
        <Media
          isBottomOfContainer={scrollData?.isBottomOfContainer}
          iconsColor={iconsColor}
          setBtmContainer={scrollData?.setBtmContainer}
          isPostsEnd={isPostsEnd}
          setEndOfPosts={setEndOfPosts}
          setCurrentPostCommentsData={setCurrentPostCommentsData}
          mainScrollContainerRef={mainScrollContainerRef}
        />

        {/* show Spinner  while Backend Fetching Data */}
        {!isPostsEnd && scrollData?.isBottomOfContainer && <Spinner />}
      </div>

      {/* comments suggested User Toggle */}
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
        <SuggestedUsers />
      )}
    </div>
  );
};
