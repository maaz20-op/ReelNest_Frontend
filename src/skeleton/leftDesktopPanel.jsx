import { Avatar } from "../components/reusableComponents/Avatar";
import { Button } from "../components/reusableComponents/Button";

export const FriendsListSkeleton = ({ isDark }) => {
  return (
    <div className="other-profile-container overflow-hidden  flex flex-col gap-2 flex-1 min-h-0   py-5">
      {[...Array(12)].map((_, indx) => (
        <div
          key={indx}
          className="friend-div flex items-center justify-center lg:gap-1 xl:gap-2 px-2 py-3 rounded"
        >
          <Avatar size="md" skeleton={true} />
          <div className="div-content lg:w-40 xl:w-45 overflow-hidden flex gap-1 animate-pulse flex-col">
            <h1 className="text-sm line-clamp-1 h-4 w-full rounded bg-(--bg-secondary) text-(--text-primary) "></h1>
            <h2 className="text-sm  line-clamp-1 h-3 w-full rounded bg-(--bg-secondary) text-(--text-secondary)"></h2>
          </div>

          <Button
            font="font-medium"
            skeleton={true}
            border="rounded-2xl"
            otherStyles={`${isDark ? "hover:bg-red-500" : "hover:bg-red-300"} hover:scale-[1.04] duration-300 border border-(--border-color)`}
          />
        </div>
      ))}
    </div>
  );
};
