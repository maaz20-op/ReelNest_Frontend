import { Avatar } from "../../components/Avatar";

export const UserInfoCardSkeleton = () => {
  return (
    <div className="profile-Card rounded md:flex md:flex-row-reverse md:justify-end h-6/7 md:h-40 px-6 py-4 w-14/15 md:w-9/10 mx-auto mt-4 bg-(--bg-secondary) animate-pulse">
      {/* Settings Icon */}
      <div className="flex justify-end">
        <div className="w-6 h-6 rounded-full bg-(--bg-heavy-secondary)" />
      </div>

      <div className="flex flex-col md:gap-6 2xl:gap-8 md:flex-row gap-2 [&>*:last-child]:mt-3 items-center">
        {/* Avatar + Name */}
        <div className="flex shrink-0 flex-col p-1 2xl:flex-row 2xl:w-1/3 items-center gap-2">
          <div className="relative">
            <Avatar size="xl" skeleton={true} bg="bg-(--bg-heavy-secondary)" />

            {/* Pencil Icon */}
            <div className="absolute top-3 right-0 w-3 h-3 rounded-full bg-(--bg-heavy-secondary)" />
          </div>

          <div className="content flex flex-col gap-3 justify-center md:w-full items-center">
            <div className="w-32 h-5 rounded bg-(--bg-heavy-secondary)" />
            <div className="w-24 h-4 rounded bg-(--bg-heavy-secondary)" />
          </div>
        </div>

        {/* Bio */}
        <div className="md:w-70 mt-2 md:mt-4 flex flex-col gap-2">
          <div className="h-3 w-full rounded bg-(--bg-heavy-secondary)" />
          <div className="h-3 w-4/5 rounded bg-(--bg-heavy-secondary)" />
          <div className="h-3 w-2/3 rounded bg-(--bg-heavy-secondary)" />
        </div>

        {/* Followers */}
        <div className="followers md:w-1/3 mt-2 md:mt-4 justify-center flex gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex flex-col justify-center items-center gap-2"
            >
              <div className="w-16 h-4 rounded bg-(--bg-heavy-secondary)" />
              <div className="w-10 h-4 rounded bg-(--bg-heavy-secondary)" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="h-10 w-36 rounded-2xl bg-(--bg-heavy-secondary)" />
      </div>
    </div>
  );
};
