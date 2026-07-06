import { useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { BorderDiv } from "../../../utils/BorderDiv";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Button } from "../../../components/reusableComponents/Button";
import { Avatar } from "../../../components/Avatar";
import { UserInfoCard } from "../components/userInfoCard";
import { UserInfoCardSkeleton } from "../../../skeleton/profile/userInfoCard";
import { GridVideoLayout } from "../../../components/GridMediaLayout/Video/gridVideo";
import { useGetUserByIdQuery } from "../../../services/users/user";
import { GiTrumpet } from "react-icons/gi";
import { useEffect } from "react";
import { GridVideoLayoutSkeleton } from "../../../skeleton/video/GridVideoSkeleton";
import { useGetPostsByuserIdQuery } from "../../../services/posts/post";

export const Profile = () => {
  const { iconsColor, isDark } = contextThemeSetup();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { user } = useAuth();
  const [isLoggedInUser, setLoggedInUser] = useState(true);
  const location = useLocation();
  const obj = location.state;

  const [profileImgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = obj?.userId ? obj?.userId : user?._id;

  // get Profile User
  const { data, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  // get profile User Videos
  const { data: userPosts, isLoading: isUserPostsLoading } =
    useGetPostsByuserIdQuery(data?.data[0]?._id, {
      skip: !data?.data[0]?._id,
    });

  useEffect(() => {
    if (data?.data[0]?._id !== user?._id) setLoggedInUser(false);
    else if (data?.data[0]?._id === user?._id) setLoggedInUser(true);
  }, [data?.data[0]]);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      console.log(result);
      setImgSrc(result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full min-h-0 account-settings overflow-y-auto flex flex-col ">
      {/* user info Card top */}
      {isLoading || error || !data ? (
        <UserInfoCardSkeleton />
      ) : (
        <UserInfoCard
          user={data?.data[0]}
          inputRef={inputRef}
          userPosts={userPosts}
          handleChange={handleChange}
          iconsColor={iconsColor}
          profileImgSrc={profileImgSrc}
          isDark={isDark}
          isLoggedInUser={isLoggedInUser}
        />
      )}

      <div className="user-content-area  flex flex-col">
        <div className="flex items-center mb-3 w-full justify-center  md:gap-23 gap-4 mt-8">
          {["Images", "Videos"].map((cate, indx) => (
            <span
              key={indx}
              className={`${isDark ? "bg-red-500" : "bg-red-200"}
             px-3 py-2 hover:bg-red-500 cursor-pointer 
              transition-all
              duration-300 
              hover:scale-[1.05]
               hover:text-white
                font-medium 
               rounded-2xl 
               text-(--text-primary)`}
            >
              {cate}
            </span>
          ))}
        </div>
        <BorderDiv />

        {/* grid video Layout*/}

        {isUserPostsLoading || !userPosts ? (
          <GridVideoLayoutSkeleton />
        ) : userPosts?.data[0].length > 0 ? (
          <GridVideoLayout user={data?.data[0]} posts={userPosts?.data[0]} />
        ) : (
          <div className="flex flex-col justify-center h-100 items-center gap-6">
            <img className="h-30 w-30" src="/no-posts.svg" alt="no-friends" />
            <p className="w-50 text-center text-(--text-primary)">
              No Posts Uploaded By You!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
