import { useRef, useState, useEffect } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { Comments } from "../../comments/components/Comments";
import { Media } from "../../posts/components/Media";
import { useGetPostsQuery } from "../../posts/api/postApi";

export const FeedPage = () => {
  const { iconsColor } = contextThemeSetup();

  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const [translateCommentsX, setTranslateCommentsX] = useState(0);
  const [commentsContainerWidth, setCommentsContainerWidth] = useState(0);

  // post container Refrence
  const postContainerRef = useRef();

  useEffect(() => {
    const updateTranslateWidth = () => {
      const rect = postContainerRef?.current?.getBoundingClientRect();
      if (rect) {
        setTranslateCommentsX(rect.left);
        setCommentsContainerWidth(rect.width);
      }
    };
    updateTranslateWidth();
    window.addEventListener("resize", updateTranslateWidth);

    return () => window.removeEventListener("resize", updateTranslateWidth);
  }, []);

  return (
    <div className="min-h-0 px-2  py-3 md:grid md:grid-cols-[500px_1fr] lg:grid-cols-[400px_1fr] xl:grid-cols-[550px_1fr] flex flex-col gap-4 ">
      <div
        ref={postContainerRef}
        className={`${isCommentsOpen ? "overflow-hidden" : "overflow-y-auto "} min-h-0    account-settings`}
      >
        {/* Images */}
        <Media iconsColor={iconsColor} setCommentsOpen={setCommentsOpen} />
        <Comments
          isCommentsOpen={isCommentsOpen}
          setCommentsOpen={setCommentsOpen}
          iconsColor={iconsColor}
          translateCommentsX={translateCommentsX}
          commentsContainerWidth={commentsContainerWidth}
        />
      </div>

      {/* Discover More Users */}
      <div className="justify-center lg:hidden hidden md:flex w-full xl:flex items-start pt-12">
        <div className="flex flex-col p-2 rounded-2xl border-2 border-(--border-color) h-125">
          <div className="p-2">
            <h1 className="text-(--text-primary) text-center ">
              Suggestions For You
            </h1>
          </div>

          <div className="other-profile-container  flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto mt-5 px-2 py-5 ">
            {[...Array(12)].map((_, indx) => (
              <div
                key={indx}
                className="friend-div flex items-center gap-3  px-2 py-3 rounded"
              >
                <div className="profile-img h-10 flex shrink-0 w-10 rounded-full ">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://iili.io/BZuCZ57.jpg"
                    alt=""
                  />
                </div>
                <div className="div-content w-45  overflow-hidden flex  flex-col">
                  <h1 className="text-sm line-clamp-1 text-(--text-primary) ">
                    Malaika Qamar dnfdkjfdkjd
                  </h1>
                  <h2 className="text-sm  line-clamp-1 text-(--text-secondary)">
                    @angel-20
                  </h2>
                </div>

                <button className="px-1 py-1 text-sm border text-(--text-primary) bg-(--bg-tertiary)  border-(--border-color) rounded-2xl ">
                  Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
