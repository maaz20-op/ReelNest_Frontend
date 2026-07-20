import { Avatar } from "../../components/reusableComponents/Avatar";

export const DisplayBlockedUsersSkeleton = () => {
  return (
    <div className="min-h-0 overflow-y-scroll account-settings p-4 sm:p-6 md:p-8 lg:p-12 animate-pulse">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 border-b border-(--border-color) pb-4 flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="h-8 w-52 rounded bg-(--bg-heavy-secondary)" />
          <div className="h-4 w-72 rounded bg-(--bg-heavy-secondary)" />
        </div>

        <div className="h-7 w-20 rounded-full bg-(--bg-heavy-secondary)" />
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-5 rounded-xl border border-(--border-color) bg-(--bg-secondary)"
            >
              {/* Avatar */}
              <Avatar
                size="xl"
                skeleton={true}
                bg="bg-(--bg-heavy-secondary)"
              />

              {/* Name */}
              <div className="mt-4 h-5 w-32 rounded bg-(--bg-heavy-secondary)" />

              {/* Username */}
              <div className="mt-2 h-4 w-24 rounded bg-(--bg-heavy-secondary)" />

              {/* Button */}
              <div className="mt-5 h-10 w-full rounded-lg bg-(--bg-heavy-secondary)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
