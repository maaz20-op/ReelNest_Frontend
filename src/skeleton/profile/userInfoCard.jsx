import { Avatar } from "../../components/reusableComponents/Avatar";

export const UserInfoCardSkeleton = () => {
  return (
    <div
      className="profile-Card rounded
      md:flex md:flex-row-reverse md:justify-end
      min-h-fit md:h-40
      px-4 sm:px-5 md:px-6 py-4
      w-[95%] sm:w-[92%] md:w-9/10 lg:w-full
      mx-auto mt-4
      bg-(--bg-secondary) overflow-hidden animate-pulse"
    >
      {/* Settings Icon */}
      <div className="flex justify-end shrink-0">
        <div className="w-6 h-6 rounded-full bg-(--bg-heavy-secondary)" />
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 lg:gap-8 2xl:gap-8 flex-1">
        {/* Avatar + Name */}
        <div className="flex shrink-0 flex-col p-1 2xl:flex-row items-center gap-2 lg:gap-3 2xl:w-1/3">
          <div className="relative">
            <Avatar size="xl" skeleton={true} bg="bg-(--bg-heavy-secondary)" />

            <div className="absolute top-3 right-0 w-3 h-3 rounded-full bg-(--bg-heavy-secondary)" />
          </div>

          <div className="content flex flex-col gap-3 justify-center items-center md:items-center 2xl:items-start md:w-full">
            <div className="w-28 sm:w-32 h-5 rounded bg-(--bg-heavy-secondary)" />
            <div className="w-20 sm:w-24 h-4 rounded bg-(--bg-heavy-secondary)" />
          </div>
        </div>

        {/* Bio */}
        <div className="w-full md:w-60 lg:w-70 mt-2 md:mt-4 flex flex-col gap-2">
          <div className="h-3 w-full rounded bg-(--bg-heavy-secondary)" />
          <div className="h-3 w-4/5 rounded bg-(--bg-heavy-secondary)" />
          <div className="h-3 w-2/3 rounded bg-(--bg-heavy-secondary)" />
        </div>

        {/* Followers */}
        <div className="followers md:w-1/3 mt-2 md:mt-4 justify-center flex gap-4 lg:gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex flex-col justify-center items-center gap-2"
            >
              <div className="w-14 sm:w-16 h-4 rounded bg-(--bg-heavy-secondary)" />
              <div className="w-8 sm:w-10 h-4 rounded bg-(--bg-heavy-secondary)" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="h-10 w-32 sm:w-36 rounded-2xl bg-(--bg-heavy-secondary) mt-3 md:mt-3 shrink-0" />
      </div>
    </div>
  );
};
