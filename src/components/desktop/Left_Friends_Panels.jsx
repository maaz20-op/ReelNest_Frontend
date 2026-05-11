import { useRef, useState } from "react";

const sectionKey = "maaz_key";
export const Left_FriendsPanel_Desktop = () => {
  const [activeIndx, setActive] = useState(0);

  const handleClick = (indx) => {
    setActive(indx);
  };
  return (
    <div className="lg:flex lg:flex-col hidden px-4 py-4 min-h-0 ">
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
  );
};
