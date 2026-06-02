import { Icons } from "../../../assets/icons";
import { Button } from "../../../components/reusable/Button";

export const Comments = ({
  isCommentsOpen,
  setCommentsOpen,
  iconsColor,
  translateCommentsX,
  isDark,
  commentsContainerWidth,
}) => {
  return (
    <>
      {/* Comments box */}

      <div
        className={` ${isDark ? "bg-black" : "bg-white"}  hidden border-2 border-(--border-color) md:h-110 md:w-4/5 lg:h-150 lg:w-6/7 2xl:w-2/3 rounded-xl md:flex flex-col p-1   xl:p-3 `}
      >
        <div className="user-info w-full h-35 flex  bg-(--bg-secondary) p-2 rounded-xl">
          <div className="w-1/2  flex flex-col  gap-5">
            <div className="back-btn h-12  flex items-center">
              <div onClick={() => setCommentsOpen(false)} className="p-3">
                <Icons.back className="h-5 w-5" color={iconsColor} />
              </div>
              <h1 className="text-red-600 lg:text-xs xl:text-base">
                Go To Feed
              </h1>
            </div>
            <div className="user-info flex gap-3">
              <div className="profile-img h-10 w-10 flex flex-col shrink-0  rounded-full ">
                <img
                  className="h-full w-full rounded-full"
                  src="https://iili.io/BZuCZ57.jpg"
                  alt=""
                />
              </div>
              <div className="user-name flex flex-col items-start  lg:text-xs xl:text-base justify-center">
                <h1 className="text-(--text-primary) line-clamp-1">
                  Malaika Qamar
                </h1>
                <span className="text-(--text-secondary) line-clamp-1">
                  angel-20
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/2  flex flex-col lg:text-sm xl:text-base items-center justify-center gap-10">
            <h1 className="text-(--text-secondary)">
              Followers <span className="text-(--text-primary)">16.2M</span>
            </h1>
            <Button
              content="Follow"
              padding="md"
              background={isDark ? "bg-pink-800" : "bg-pink-300"}
              border="rounded-xl"
            />
          </div>
        </div>
        <div className="h-19 w-full bg-(--bg-secondary) rounded-xl mt-2">
          <div className="w-full p-2 flex flex-col gap-2">
            <h1 className="w-full text-sm text-(--text-secondary) line-clamp-1">
              Sidhu Moose Wala AAHAH HAHAH HAH AH HAH HA SSKSSKSKSKS sdfdfdss
            </h1>
            <div className="comments-count flex items-center justify-between">
              <h1 className="text-base lg:text-xs xl:text-base text-(--text-primary)">
                10K Comments
              </h1>
              <div className="comments-category flex gap-1">
                {["Top", "Oldest", "Latest"].map((cate, indx) => (
                  <span
                    className={`${isDark ? "bg-black" : "white"} text-xs rounded p-1 xl:p-2 text-(--text-primary)`}
                  >
                    {cate}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="comments-container account-settings  overflow-y-auto mt-2 min-h-0 h-80 flex flex-col gap-2">
          {[...Array(10)].map((_, indx) => (
            <div
              key={indx}
              className="comment-div  flex items-center lg:gap-3  xl:gap-10  px-2 py-3 rounded"
            >
              <div className="profile-img h-10 shrink-0 flex  w-10 rounded-full ">
                <img
                  className="h-full w-full rounded-full"
                  src="https://iili.io/BZuCZ57.jpg"
                  alt=""
                />
              </div>
              <div className="div-content w-full  overflow-hidden flex  flex-col">
                <h1 className="lg:text-xs xl:text-sm line-clamp-1 text-(--text-secondary) ">
                  Malaika_Qamar
                </h1>
                <p className="text-(--text-primary) text-xs xl:text-sm">
                  this is my comment my name is maaz, malaika meri jan you are
                  really looking beatutiful
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              onClick={() => setCommentsOpen(false)}
              color={iconsColor}
              size={23}
            />
            <h1 className="text-(--text-primary) border-b border-(--border-color) py-3 text-xl text-center">
              Comments 10K
            </h1>
          </div>

          <div className="comments-category flex gap-1">
            {["Top", "Oldest", "Latest"].map((cate, indx) => (
              <span
                className={`${isDark ? "bg-black" : "white"} text-xs rounded  p-2 text-(--text-primary)`}
              >
                {cate}
              </span>
            ))}
          </div>
        </div>

        <div className="comments-container account-settings  overflow-y-auto   max-h-[70%]  flex flex-col gap-2">
          {[...Array(10)].map((_, indx) => (
            <div
              key={indx}
              className="comment-div  flex items-center gap-10  px-2 py-3 rounded"
            >
              <div className="profile-img h-10 shrink-0 flex  w-10 rounded-full ">
                <img
                  className="h-full w-full rounded-full"
                  src="https://iili.io/BZuCZ57.jpg"
                  alt=""
                />
              </div>
              <div className="div-content w-full  overflow-hidden flex  flex-col">
                <h1 className="text-sm line-clamp-1 text-(--text-secondary) ">
                  Malaika_Qamar
                </h1>
                <p className="text-(--text-primary)">
                  this is my comment my name is maaz, malaika meri jan you are
                  really looking beatutiful
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-30 w-full p-2">
          <form className="flex items-center gap-8   w-full">
            <input
              className="outline-none p-2 text-(--text-primary) rounded-2xl w-2/3 border-2 border-(--border-color)"
              type="text"
              placeholder="Share your thoughts..."
            />
            <Icons.send color={iconsColor} size={30} />
          </form>
        </div>
      </div>
    </>
  );
};
