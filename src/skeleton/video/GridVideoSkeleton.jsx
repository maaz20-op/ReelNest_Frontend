import { Avatar } from "../../components/reusableComponents/Avatar";

export const GridVideoLayoutSkeleton = () => {
  return (
    <div className="video-container  p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, indx) => (
        <div
          key={indx}
          className="grid-video h-90 w-full animate-pulse rounded-xl bg-(--bg-secondary) "
        >
          <div className="video-content relative h-full w-full">
            <div className="user-info absolute flex gap-2 items-center   top-2 left-4">
              <Avatar
                size="sm"
                bg="bg-(--bg-heavy-secondary)"
                skeleton={true}
              />

              <h1 className="text-sm h-5 w-16  bg-(--bg-heavy-secondary)  rounded text-white" />
            </div>

            <h1 className="text-white absolute bottom-3   bg-(--bg-heavy-secondary) h-4 w-[90%] rounded-xl line-clamp-2 [&:fullscreen]:absolute [&:fullscreen]:left-60 left-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
