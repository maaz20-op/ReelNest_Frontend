import { useEffect, useRef, useState } from "react";
import { Icons } from "../../../assets/icons";
import { Button } from "../../../components/reusableComponents/Button";
import {
  CommentBoxDesktopFeedSkeleton,
  MobileCommentBoxSkeleton,
} from "../../../skeleton/comments/commentsBoxSkeleton";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useCommentsContext } from "../hooks/useIsCommentsOpen";
import { contextThemeSetup } from "../../../utils/contextSetup";
import {
  useCreateCommentMutation,
  useLazyGetPostsCommentsQuery,
} from "../../../services/comments/comment";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { checkIsFollowed } from "../../../utils/checkisFollowed";
import {
  setPagesAndCallApiInfiniteScroll,
  useInfinteScroll,
} from "../../../utils/useInfiniteScroll";
import { Spinner } from "../../../components/reusableComponents/Spinner";
import { VirtualList } from "../../../utils/useVirtualization";

export const Comments = ({
  postId,
  createrInfo,
  title,
  isHomeFeed = false,
}) => {
  const { user } = useAuth();
  const { isCommentsOpen, setIsCommentsOpen } = useCommentsContext();
  const { isDark, iconsColor } = contextThemeSetup();
  const isFollow = checkIsFollowed(createrInfo?._id);
  const [comment, setComment] = useState("");
  const [createComment] = useCreateCommentMutation();

  const [isEndofComments, setEndOfcomments] = useState(false);
  const [fetchComments, { data: commentData, isLoading: loading, isFetching }] =
    useLazyGetPostsCommentsQuery();

  const commentsLimit = 20;

  const commentsRawData = commentData?.data[0];
  const commentsContainerRef = useRef(null);

  const hasNextPage = commentData?.data[1];
  const { isBottomOfContainer, setBtmContainer, handleScroll } =
    useInfinteScroll();
  const { apiData: comments, page } = setPagesAndCallApiInfiniteScroll({
    isBottomOfContainer,
    setBtmContainer,
    fetchData: fetchComments,
    isEndOfPosts: isEndofComments,
    setEndOfPosts: setEndOfcomments,
    postsRawData: commentsRawData,
    hasNextPage,
    data: commentData,
    queryObject: {
      limit: commentsLimit,
      postId: postId,
    },
    isFetching,
  });

  const handleCreateComment = async () => {
    const commentObj = {
      text: comment,
      postId: postId,
      commentOwner: {
        fullname: user?.fullname,
        username: user?.username,
        profileImage: user?.profileImage,
      },
    };
    setComment("");
    try {
      await createComment({ comment: commentObj, limit: commentsLimit, page });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Comments box  Desktop*/}

      {loading ? (
        <CommentBoxDesktopFeedSkeleton
          setCommentsOpen={setIsCommentsOpen}
          iconsColor={iconsColor}
          isDark={isDark}
          isHomeFeed={isHomeFeed}
        />
      ) : (
        <div
          className={` ${isDark ? "bg-black" : "bg-white"} ${isHomeFeed ? "h-full" : "md:h-110 md:w-4/5 lg:h-150 lg:w-6/7 2xl:w-2/3"}  hidden border-2 border-(--border-color)  rounded-xl md:flex flex-col p-1   xl:p-3 `}
        >
          <div className="user-info w-full h-35 flex  bg-(--bg-secondary) p-2 rounded-xl">
            <div className="w-1/2  flex flex-col  gap-5">
              <div className="back-btn h-12  flex items-center">
                <div onClick={() => setIsCommentsOpen(false)} className="p-3">
                  <Icons.back className="h-5 w-5" color={iconsColor} />
                </div>
                <h1 className="text-red-600 lg:text-xs xl:text-base">
                  Go To Feed
                </h1>
              </div>
              <div className="user-info flex gap-3">
                <Avatar src={createrInfo?.avatar} size="lg" />
                <div className="user-name flex flex-col items-start  lg:text-xs xl:text-base justify-center">
                  <h1 className="text-(--text-primary) line-clamp-1">
                    {createrInfo?.fullname}
                  </h1>
                  <span className="text-(--text-secondary) line-clamp-1">
                    @{createrInfo?.username}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-1/2  flex flex-col lg:text-sm xl:text-base items-center justify-center gap-10">
              <h1 className="text-(--text-secondary)">
                Followers{" "}
                <span className="text-(--text-primary)">
                  {createrInfo?.followers?.length || createrInfo?.followers}
                </span>
              </h1>
              <Button
                content={
                  createrInfo?.createrId !== user?._id ? (
                    isFollow ? (
                      <div className="flex gap-2 items-center">
                        <p>Followed</p>
                        <Icons.followedIcon color="white" size={19} />
                      </div>
                    ) : (
                      "Follow"
                    )
                  ) : (
                    "You"
                  )
                }
                padding="md"
                background={isDark ? "bg-pink-800" : "bg-pink-300"}
                border="rounded-xl"
              />
            </div>
          </div>
          <div className="h-19 w-full bg-(--bg-secondary) rounded-xl mt-2">
            <div className="w-full p-2 flex flex-col gap-2">
              <h1 className="w-full text-sm text-(--text-secondary) line-clamp-1">
                {title}
              </h1>
              <div className="comments-count flex items-center justify-between">
                <h1 className="text-base lg:text-xs xl:text-base text-(--text-primary)">
                  {Array.isArray(comments) && comments?.length} Comments
                </h1>
                <div className="comments-category flex gap-1">
                  {["Top", "Oldest", "Latest"].map((cate, indx) => (
                    <span
                      key={indx}
                      className={`${isDark ? "bg-black" : "white"} text-xs rounded p-1 xl:p-2 text-(--text-primary)`}
                    >
                      {cate}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            ref={commentsContainerRef}
            onScroll={handleScroll}
            className="comments-container account-settings relative overflow-y-auto mt-2 min-h-0 h-80 flex flex-col gap-2"
          >
            {comments?.length === 0 && Array.isArray(comments) && (
              <div className="text-(--text-primary) absolute top-[50%] left-[40%]">
                {" "}
                No Comments...
              </div>
            )}
            <VirtualList
              mainContainerRef={commentsContainerRef}
              data={comments}
              itemRendered={({ commentOwner, text, _id }, indx) => {
                return (
                  <div
                    key={_id || indx}
                    className="comment-div  flex items-center lg:gap-3  xl:gap-10  px-2 py-3 rounded"
                  >
                    <Avatar size="md" src={commentOwner?.profileImage} />
                    <div className="div-content w-full  overflow-hidden flex  flex-col">
                      <h1 className="lg:text-xs xl:text-sm line-clamp-1 text-(--text-secondary) ">
                        {commentOwner?.fullname}
                      </h1>
                      <p className="text-(--text-primary) text-xs xl:text-sm">
                        {text}
                      </p>
                    </div>
                  </div>
                );
              }}
            />

            {!isEndofComments && isBottomOfContainer && (
              <Spinner size="md" text="md" />
            )}
          </div>
          <div className="h-15 w-full p-2 flex items-center">
            <form className="flex items-center gap-8   w-full">
              <Button content="Hide" background="bg-(--bg-secondary)" />
              <input
                className="outline-none p-2 text-(--text-primary) rounded-2xl w-2/3 border-2 border-(--border-color)"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
              />
              <div
                onClick={handleCreateComment}
                className="flex justify-center items-center"
              >
                <Icons.send color={iconsColor} size={30} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comment Box Mobile */}
      {loading ? (
        <MobileCommentBoxSkeleton
          isCommentsOpen={isCommentsOpen}
          setCommentsOpen={setIsCommentsOpen}
          iconsColor={iconsColor}
          isDark={isDark}
        />
      ) : (
        <div
          className={`
    ${isCommentsOpen ? "fixed bottom-0 right-0 left-0" : "hidden"}
    h-2/3
    bg-(--bg-primary)
    border-2 border-(--border-color) md:hidden block p-2
  `}
        >
          <div className=" flex gap-3 items-center justify-between  border-b border-(--border-color) ">
            <div className="flex items-center gap-4">
              <Icons.back
                onClick={() => setIsCommentsOpen(false)}
                color={iconsColor}
                size={23}
              />
              <h1 className="text-(--text-primary) border-b border-(--border-color) py-3 text-base text-center">
                {comments?.length} comments
              </h1>
            </div>

            <div className="comments-category flex gap-1">
              {["Top", "Oldest", "Latest"].map((cate, indx) => (
                <span
                  key={indx}
                  className={`${isDark ? "bg-black" : "bg-white"} text-xs rounded  p-2 text-(--text-primary)`}
                >
                  {cate}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={commentsContainerRef}
            onScroll={handleScroll}
            className="comments-container account-settings  overflow-y-auto   h-[73%]  flex flex-col gap-2"
          >
            {comments?.length === 0 && Array.isArray(comments) && (
              <div className="text-(--text-primary) absolute top-[50%] left-[40%]">
                {" "}
                No Comments...
              </div>
            )}
            <VirtualList
              mainContainerRef={commentsContainerRef}
              data={comments}
              itemRendered={({ commentOwner, text, _id }, indx) => (
                <div
                  key={_id}
                  className="comment-div  flex items-center gap-10  px-2 py-3 rounded"
                >
                  <Avatar size="md" src={commentOwner?.profileImage} />

                  <div className="div-content w-full  overflow-hidden flex  flex-col">
                    <h1 className="text-sm line-clamp-1 text-(--text-secondary) ">
                      {commentOwner?.fullname}
                    </h1>
                    <p className="text-(--text-primary)">{text}</p>
                  </div>
                </div>
              )}
            />

            {!isEndofComments && isBottomOfContainer && <Spinner />}
          </div>
          <div className="h-12   w-full p-2 py-2">
            <form className="flex h-full items-center gap-8   w-full">
              <input
                className="outline-none p-2 text-(--text-primary) rounded-2xl w-2/3 border-2 border-(--border-color)"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
              />
              <Icons.send
                onClick={handleCreateComment}
                color={iconsColor}
                size={30}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};
