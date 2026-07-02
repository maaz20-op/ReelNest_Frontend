import { Icons } from "../../assets/icons";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/reusableComponents/Button";

export const CommentBoxDesktopFeedSkeleton = ({
  setCommentsOpen,
  iconsColor,
  isDark,
}) => {
  return (
    <div className="hidden border-2  border-(--border-color) md:h-110 md:w-4/5 lg:h-150 lg:w-6/7 2xl:w-2/3 rounded-xl md:flex flex-col p-1   xl:p-3">
      <div className="user-info w-full h-35 flex  bg-(--bg-secondary) p-2 rounded-xl">
        <div className="w-1/2  flex flex-col  gap-5">
          <div className="back-btn h-12  flex items-center">
            <div onClick={() => setCommentsOpen(false)} className="p-3">
              <Icons.back className="h-5 w-5" color={iconsColor} />
            </div>
            <h1 className="text-red-600 lg:text-xs xl:text-base">Go To Feed</h1>
          </div>
          <div className="user-info flex gap-3">
            <Avatar size="md" skeleton={true} bg="bg-(--bg-heavy-secondary)" />
            <div className="user-name flex flex-col items-start gap-2 animate-pulse   justify-center">
              <div className="bg-(--bg-heavy-secondary) w-22 h-4 " />
              <div className="bg-(--bg-heavy-secondary) w-18 h-3" />
            </div>
          </div>
        </div>
        <div className="w-1/2 animate-pulse  flex flex-col items-center justify-center gap-10">
          <div className="bg-(--bg-heavy-secondary)  h-5 w-20 rounded-2xl" />
          <div className="h-10 w-20 bg-(--bg-heavy-secondary) rounded-2xl" />
        </div>
      </div>
      <div className="h-19 w-full bg-(--bg-secondary) animate-pulse rounded-xl mt-2">
        <div className="w-full p-2 flex flex-col gap-2">
          <div className="w-full h-5 bg-(--bg-heavy-secondary) rounded-xl" />

          <div className="comments-count flex items-center justify-between">
            <div className="h-4 w-18 bg-(--bg-heavy-secondary) rounded-xl" />
            <div className="comments-category flex gap-1">
              {[...Array(3)].map((cate, indx) => (
                <span
                  key={indx}
                  className="text-xs rounded h-5 w-8 bg-(--bg-heavy-secondary)"
                >
                  {cate}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={` comments-container account-settings  overflow-y-auto mt-2 min-h-0 h-80 flex flex-col gap-2`}
      >
        {[...Array(8)].map((_, indx) => (
          <div
            key={indx}
            className="comment-div  flex items-center lg:gap-3  xl:gap-10  px-2 py-3 rounded"
          >
            <Avatar size="md" skeleton={true} bg="bg-(--bg-heavy-secondary)" />
            <div className="div-content w-full animate-pulse   overflow-hidden flex gap-1  flex-col">
              <div className="h-4 w-18 bg-(--bg-secondary) rounded" />
              <div className="bg-(--bg-heavy-secondary) w-35 h-3 " />
              <div className="bg-(--bg-heavy-secondary) w-28 h-3 " />
              <div className="bg-(--bg-heavy-secondary) w-20 h-3 " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MobileCommentBoxSkeleton = ({
  isCommentsOpen,
  setCommentsOpen,
  iconsColor,
  isDark,
}) => {
  return (
    <div
      className={`
    ${isCommentsOpen ? "fixed bottom-0 right-0 left-0" : "hidden"}
    h-2/3
    bg-(--bg-primary)
    border-2 border-(--border-color) md:hidden block p-2
  `}
    >
      <div className=" flex gap-3 items-center justify-between p-2 border-b border-(--border-color) ">
        <div className="flex items-center gap-4">
          <div className="h-6 w-6 bg-(--bg-secondary) rounded-full" />
          <div className="h-4 w-35 bg-(--bg-secondary) rounded-xl   py-3 text-xl text-center" />
        </div>

        <div className="comments-category flex gap-1">
          {[...Array(3)].map((cate, indx) => (
            <span
              key={indx}
              className={`bg-(--bg-secondary) text-xs rounded h-5 w-5  p-2 text-(--text-primary)`}
            />
          ))}
        </div>
      </div>

      <div className="comments-container account-settings  overflow-y-auto   max-h-[70%]  flex flex-col gap-2">
        {[...Array(8)].map((_, indx) => (
          <div
            key={indx}
            className="comment-div  gap-5 flex items-center  px-2 py-3 rounded"
          >
            <Avatar size="md" skeleton={true} />
            <div className="div-content w-full animate-pulse  overflow-hidden flex gap-1  flex-col">
              <div className="h-4 w-18 bg-(--bg-secondary) rounded" />
              <div className="bg-(--bg-secondary) w-35 h-3 " />
              <div className="bg-(--bg-secondary) w-28 h-3 " />
              <div className="bg-(--bg-secondary) w-20 h-3 " />
            </div>
          </div>
        ))}
      </div>
      <div className="h-30 w-full gap-12 flex p-2">
        <div className=" p-2 bg-(--bg-secondary) h-10 rounded-2xl w-2/3" />
        <div className="h-10 w-10 bg-(--bg-secondary) rounded-full"></div>
      </div>
    </div>
  );
};
