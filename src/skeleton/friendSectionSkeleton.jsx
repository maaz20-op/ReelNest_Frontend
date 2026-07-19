import { Avatar } from "../components/reusableComponents/Avatar";

export const FriendSectionSkeleton = () => {
  return (
    <div className="wrapper lg:hidden">
      <div className="h-30 max-w-full flex items-center">
        <div className="friends-container w-[95%] mx-auto flex overflow-x-auto gap-3 px-2 py-2">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="friend-card flex flex-col items-center gap-2 px-2 py-2 flex-shrink-0"
            >
              <div className="relative">
                <Avatar
                  size="lg"
                  skeleton={true}
                  bg="bg-(--bg-heavy-secondary)"
                />

                {index === 0 && (
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-(--bg-secondary) animate-pulse" />
                )}
              </div>

              <div className="animate-pulse flex flex-col items-center gap-1">
                <div className="h-3 w-12 rounded bg-(--bg-heavy-secondary)" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
