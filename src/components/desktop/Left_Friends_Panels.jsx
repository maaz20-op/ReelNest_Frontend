import { useRef, useState } from "react";
import { Button } from "../reusable/Button";
import { contextThemeSetup } from "../../utils/contextSetup";
import { showScrollBarOnHover } from "../../utils/showSideBarOnHover";

const sectionKey = "maaz_key";
export const Left_FriendsPanel_Desktop = () => {
  const [activeIndx, setActive] = useState(0);

  const { isDark } = contextThemeSetup();

  const elementRef = useRef(null);
  const isHoverd = showScrollBarOnHover(elementRef);

  const handleClick = (indx) => {
    setActive(indx);
  };
  return (
    <div className="lg:flex lg:flex-col xl:p-5 hidden lg:p-2  border border-r border-(--border-color) py-4 min-h-0 ">
      <div className="sections text-(--text-secondary)   flex justify-between gap-2">
        {["Friends", "Followers", "Following"].map((sec, indx) => (
          <h1
            key={indx}
            className={`border-red-600 transition-all  ${activeIndx == indx ? "border-b-2" : ""}`}
            onClick={() => handleClick(indx)}
          >
            {sec}
          </h1>
        ))}
      </div>
      <div
        ref={elementRef}
        className={`${isHoverd ? "overflow-y-auto" : "overflow-y-hidden"} other-profile-container  flex flex-col gap-2 flex-1 min-h-0  mt-5  py-5 `}
      >
        {[...Array(12)].map((_, indx) => (
          <div
            key={indx}
            className="friend-div flex items-center justify-center lg:gap-1 xl:gap-2 px-2 py-3 rounded"
          >
            <div className="profile-img h-10 flex shrink-0 w-10 rounded-full ">
              <img
                className="h-full w-full rounded-full"
                src="https://iili.io/BZuCZ57.jpg"
                alt=""
              />
            </div>
            <div className="div-content lg:w-40 xl:w-45 overflow-hidden flex  flex-col">
              <h1 className="text-sm line-clamp-1 text-(--text-primary) ">
                Malaika Qamar dnfdkjfdkjd
              </h1>
              <h2 className="text-sm  line-clamp-1 text-(--text-secondary)">
                @angel-20
              </h2>
            </div>

            <Button
              background="bg-tranparent"
              content="Message"
              font="font-medium"
              textSize="sm"
              border="rounded-2xl"
              otherStyles={`${isDark ? "hover:bg-red-500" : "hover:bg-red-300"} hover:scale-[1.04] duration-300 border border-(--border-color)`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
