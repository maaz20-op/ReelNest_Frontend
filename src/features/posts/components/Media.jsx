import { Icons } from "../../../assets/icons";
import { useGetPostsQuery } from "../api/postApi";

export const Media = ({ iconsColor, setCommentsOpen }) => {
  const { data, isLoading, error } = useGetPostsQuery();

  // LOADING
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // ERROR
  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="posts-container">
      {data.data.map(({ _id, mediaUrl, postdata, userData, likes }) => (
        <div
          key={_id}
          className="video-image-card py-6 flex flex-col gap-2 w-full px-2 "
        >
          {/* Profile image - username */}
          <div className="profile-info flex gap-2 ">
            <div className="profile-img  h-10 w-10">
              <img
                src={userData?.profileImage}
                className="w-full object-cover h-full rounded-full"
                alt="creater profile Image"
              />
            </div>
            <div className="user-name flex flex-col leading-4 justify-center">
              <h1 className="text-(--text-primary) text-sm">
                {userData?.fullname}
              </h1>
              <h2 className="text-(--text-secondary) text-sm">
                {userData?.username}
              </h2>
            </div>
          </div>

          {/* Image - video content */}
          <div className="video/image-container  w-full ">
            <video
              className="w-full aspect-square object-cover  h-140 rounded-2xl"
              src={
                mediaUrl
                  ? mediaUrl
                  : "https://res.cloudinary.com/ddl6cgcbp/video/upload/q_auto,f_auto/v1752447426/ReelNest/videos/x764nhgtfjojbau5h23i.mp4"
              }
              controls
            ></video>
          </div>
          {/* Like comments Button */}
          <div className="action-icons px-2 mt-2 flex justify-between">
            <div className="flex gap-8">
              <Icons.heart color={iconsColor} size={23} />
              <Icons.comments
                onClick={() => setCommentsOpen(true)}
                color={iconsColor}
                size={23}
              />
              <Icons.send color={iconsColor} size={23} />
            </div>
            <Icons.save color={iconsColor} size={23} />
          </div>

          {/* Likes and  video title */}
          <div className="mt-4 text-sm">
            <div className="text-(--text-secondary) ">
              Liked by{" "}
              <span className="text-(--text-primary)">maaz, sidhu</span> and{" "}
              <span className="text-(--text-primary)">
                {(Array.isArray(likes) && likes.length) || "N/A"} others
              </span>
            </div>
            <div className=" flex gap-1  flex-col sm:flex-row text-(--text-primary) ">
              <p>malaika_posted: </p>
              <p className="text-(--text-secondary) ">{postdata}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
