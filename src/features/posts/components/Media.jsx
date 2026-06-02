import { useEffect, useState } from "react";
import { Icons } from "../../../assets/icons";
import { useLazyGetPostsQuery } from "../api/postApi";

export const Media = ({
  iconsColor,
  setCommentsOpen,
  isCommentsOpen,
  setBtmContainer,
  isBottomOfContainer,
  setEndOfPosts,
  isPostsEnd,
}) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLiked, setLike] = useState(false);
  const [fetchPosts, { data, isLoading, error, isFetching }] =
    useLazyGetPostsQuery();

  const postsRawData = data?.data?.[0];
  const hasNextPage = data?.data?.[1];

  // calling api
  useEffect(() => {
    if (page > 1 && !hasNextPage) return;
    fetchPosts({ page: page });
  }, [page]);

  //settings data
  useEffect(() => {
    if (data?.data) {
      if (page === 1) return setPosts(postsRawData);

      setPosts((prev) => {
        return [...prev, ...postsRawData];
      });
      setBtmContainer(false);
    }
  }, [data]);

  //updating page
  useEffect(() => {
    if (!isBottomOfContainer) return;
    if (isFetching) return;
    if (!hasNextPage) {
      setEndOfPosts(true);
      return;
    }

    setPage((prev) => prev + 1);
  }, [isBottomOfContainer]);

  // LOADING
  if (isLoading && page === 1) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="posts-container">
      {Array.isArray(posts) &&
        posts.map(({ _id, mediaUrl, postdata, userData, likesUsersData }) => (
          <div
            key={_id}
            className="video-image-card py-6 flex flex-col gap-2 w-full px-2"
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
                <Icons.heart
                  onClick={() => setLike(true)}
                  color={iconsColor}
                  className={isLiked ? "bg-pink-700 rounded-2xl" : ""}
                  size={23}
                />
                <Icons.comments
                  onClick={() => setCommentsOpen((prev) => !prev)}
                  color={isCommentsOpen ? "red" : iconsColor}
                  size={23}
                />
                <Icons.send color={iconsColor} size={23} />
              </div>
              <Icons.save color={iconsColor} size={23} />
            </div>

            {/* Likes and  video title */}
            <div className="mt-4 text-sm">
              {likesUsersData.length > 0 && Array.isArray(likesUsersData) ? (
                <div className="text-(--text-secondary) ">
                  Liked by{" "}
                  <span className="text-(--text-primary)">
                    {likesUsersData?.[0]?.name?.split(" ")[0]},{" "}
                    {likesUsersData?.[1]?.name?.split(" ")[0]}
                  </span>{" "}
                  {likesUsersData.length > 2 && (
                    <span className="text-(--text-primary)">
                      {(Array.isArray(likesUsersData) &&
                        Math.abs(likesUsersData.length - 2)) ||
                        0}{" "}
                      and others
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-(--text-secondary) ">No Likes Yet!</div>
              )}
              <div className=" flex gap-1  flex-col sm:flex-row text-(--text-primary) ">
                <p>{userData?.username || "user"}_posted: </p>
                <p className="text-(--text-secondary) ">{postdata}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
