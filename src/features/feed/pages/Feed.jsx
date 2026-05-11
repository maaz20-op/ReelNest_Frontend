import { useRef, useState, useEffect } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { Comments } from "../../comments/components/Comments";
import { Images } from "../../posts/components/Images";

export const FeedPage = () => {
  const { iconsColor } = contextThemeSetup();

  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const [translateCommentsX, setTranslateCommentsX] = useState(0);
  const [commentsContainerWidth, setCommentsContainerWidth] = useState(0);

  // post container Refrence
  const postContainerRef = useRef();

  useEffect(() => {
    const updateTranslateWidth = () => {
      const rect = postContainerRef.current.getBoundingClientRect();

      setTranslateCommentsX(rect.left);
      setCommentsContainerWidth(rect.width);
    };
    updateTranslateWidth();
    window.addEventListener("resize", updateTranslateWidth);

    return () => window.removeEventListener("resize", updateTranslateWidth);
  }, []);

  return (
    <div className="min-h-0 px-2  py-3 md:grid md:grid-cols-[500px_1fr] lg:grid-cols-[550px_1fr] flex flex-col gap-4 ">
      <div
        ref={postContainerRef}
        className={`${isCommentsOpen ? "overflow-hidden" : "overflow-y-auto "} min-h-0    account-settings`}
      >
        {/* Images */}
        <Images iconsColor={iconsColor} setCommentsOpen={setCommentsOpen} />
        <Comments
          isCommentsOpen={isCommentsOpen}
          setCommentsOpen={setCommentsOpen}
          iconsColor={iconsColor}
          translateCommentsX={translateCommentsX}
          commentsContainerWidth={commentsContainerWidth}
        />
      </div>
    </div>
  );
};
