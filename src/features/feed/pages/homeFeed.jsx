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

export const FeedPage = () => {
  const { iconsColor, isDark } = contextThemeSetup();
  const [commentsData, setCurrentPostCommentsData] = useState(null);

  const [isPostsEnd, setEndOfPosts] = useState(false);

  const { isCommentsOpen, setIsCommentsOpen } = useCommentsContext();

  // For scroll Loader
  const [isBottomOfContainer, setBtmContainer] = useState(false);

  // post container Refrence
  const suggestionContainerRef = useRef(null);
  const postContainerRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const isHoverd = showScrollBarOnHover(suggestionContainerRef);

  const handleScroll = (e) => {
    const totalHeight = e.currentTarget.scrollHeight;
    const scrolledView = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;

    if (totalHeight <= Math.round(scrolledView + clientHeight)) {
      setBtmContainer(true);
    }
  };

  useEffect(() => {
    return () => setIsCommentsOpen(false);
  }, []);

  return (
    <div className="min-h-0 pl-2 lg:pl-5 xl:pl-10  py-3 md:grid md:grid-cols-[400px_1fr] lg:grid-cols-[340px_1fr] 2xl:grid-cols-[480px_1fr] xl:grid-cols-[450px_1fr] flex flex-col gap-4 ">
      <div
        onScroll={handleScroll}
        ref={postContainerRef}
        className={`${isCommentsOpen ? "overflow-hidden" : "overflow-y-auto "} min-h-0    account-settings`}
      >
        <FriendSection />
        {/* Media */}
        <Media
          isBottomOfContainer={isBottomOfContainer}
          iconsColor={iconsColor}
          setBtmContainer={setBtmContainer}
          isPostsEnd={isPostsEnd}
          setEndOfPosts={setEndOfPosts}
          setCurrentPostCommentsData={setCurrentPostCommentsData}
        />
        {!isPostsEnd && isBottomOfContainer && (
          <div className="flex items-center justify-center space-x-2">
            {/* The Spinner Circle */}
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-(--bg-primary)" />
            <span className="text-gray-500 font-medium">Loading...</span>
          </div>
        )}
      </div>

      {isCommentsOpen && (
        <div className="comments-box h-full flex justify-end p-2">
          <Comments
            postId={commentsData?.postId}
            createrInfo={commentsData?.createrInfo}
            title={commentsData?.title}
          />
        </div>
      )}

      {!isCommentsOpen && (
        <div className="justify-center hidden md:flex w-full items-start pt-12">
          <div className="2xl:w-85 xl:w-80 lg:w-70">
            <div className="flex flex-col w-full p-2 rounded-2xl border-2 border-(--border-color) h-125">
              <div className="p-2 border-b-2 border-(--border-color)">
                <h1 className="text-(--text-primary) text-center ">
                  Suggestions For You
                </h1>
              </div>

              <div
                ref={suggestionContainerRef}
                className={`${isHoverd ? "overflow-y-auto" : "overflow-y-hidden"} other-profile-container  scrollbar-gutter-stable flex flex-col gap-2 flex-1 min-h-0 mt-5  py-5 `}
              >
                {loading ? (
                  <FriendsListSkeleton
                    isDark={isDark}
                    elementRef={suggestionContainerRef}
                    isHoverd={isHoverd}
                  />
                ) : (
                  [...Array(12)].map((_, indx) => (
                    <div
                      key={indx}
                      className="friend-div md:gap-4 lg:gap-2 flex items-center justify-between hover:bg-(--bg-secondary) lg:px-1 lg:py-1 2xl:px-2 2xl:py-3 rounded"
                    >
                      <div className="flex gap-4 lg:w-6/7  xl:w-5/6  rounded-full ">
                        <Avatar size="md" />
                        <div className="div-content md:text-base xl:text-sm text-xs overflow-hidden flex  flex-col">
                          <h1 className=" line-clamp-1 text-(--text-primary) ">
                            Malaika Qamar
                          </h1>
                          <h2 className="text-sm  line-clamp-1 text-(--text-secondary)">
                            @angel-20
                          </h2>
                        </div>
                      </div>

                      <Button
                        background={isDark ? "bg-pink-400" : "bg-pink-100"}
                        content="Add Friend"
                        font="font-medium"
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
