import { Icons } from "../../../assets/icons";

export const Comments = ({
  isCommentsOpen,
  setCommentsOpen,
  iconsColor,
  translateCommentsX,
  commentsContainerWidth,
}) => {
  return (
    <>
      {/* Comments box */}
      <div
        className={`
    ${isCommentsOpen ? "fixed bottom-0 " : "hidden"}
    h-2/3
    bg-(--bg-primary)
    border-2 border-(--border-color)
    overflow-hidden translate-x-${translateCommentsX}
  `}
        style={{ width: commentsContainerWidth }}
      >
        <div className=" flex gap-30 items-center">
          <Icons.back
            onClick={() => setCommentsOpen(false)}
            color={iconsColor}
            size={23}
          />
          <h1 className="text-(--text-primary) py-3 text-2xl text-center">
            Comments
          </h1>
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
