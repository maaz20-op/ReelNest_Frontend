import { Avatar } from "../../components/Avatar";
export const PostCardSkeleton = () => {
  return (
    <div className="posts-container overflow-hidden">
      {[...Array(2)].map((_, indx) => (
        <div
          key={indx}
          className="video-image-card py-6 flex flex-col gap-2 w-full px-2"
        >
          {/* Profile image - username */}
          <div className="profile-info flex gap-2 ">
            <Avatar size="md" skeleton={true} />
            <div className="user-name gap-1 flex animate-pulse flex-col leading-4 justify-center">
              <h1 className="bg-(--bg-secondary) rounded h-4 w-22 text-sm"></h1>
              <h2 className="bg-(--bg-secondary) rounded  h-3 w-22 text-sm"></h2>
            </div>
          </div>

          {/* Image - video content */}
          <div className="video/image-container  w-full ">
            <div className="w-full aspect-square bg-(--bg-secondary) animate-pulse  h-140 rounded-2xl"></div>
          </div>

          {/* Like comments Button */}

          <div className="action-icons flex justify-between  px-2 mt-2 ">
            <div className="flex gap-8   animate-pulse">
              {[...Array(3)].map((_, indx) => (
                <div
                  key={indx}
                  className="h-10  w-10 rounded-full bg-(--bg-secondary)"
                ></div>
              ))}
            </div>
            <div className="h-8  w-8 rounded bg-(--bg-secondary)"></div>
          </div>

          {/* Likes and  video title */}
          <div className="mt-4  flex flex-col gap-2 text-sm">
            <div className="w-40 h-4 rounded-2xl bg-(--bg-secondary)"></div>
            <div className="w-40 h-6 rounded-2xl bg-(--bg-secondary)"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
