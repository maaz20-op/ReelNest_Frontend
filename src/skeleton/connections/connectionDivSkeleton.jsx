import { Avatar } from "../../components/reusableComponents/Avatar";

export const ConnectionUserCardSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-4 py-3 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <Avatar size="md" skeleton={true} bg="bg-(--bg-heavy-secondary)" />

            <div className="flex flex-col gap-2">
              <div className="h-4 w-28 rounded bg-(--bg-heavy-secondary)" />
              <div className="h-3 w-20 rounded bg-(--bg-secondary)" />
            </div>
          </div>

          <div className="h-8 w-20 rounded-full bg-(--bg-heavy-secondary)" />
        </div>
      ))}
    </>
  );
};
