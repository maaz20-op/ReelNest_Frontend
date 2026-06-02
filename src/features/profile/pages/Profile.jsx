import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { BorderDiv } from "../../../utils/BorderDiv";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Button } from "../../../components/reusable/Button";

export const Profile = () => {
  const { iconsColor, isDark } = contextThemeSetup();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { user } = useAuth();
  const [profileImgSrc, setImgSrc] = useState();

  return (
    <div className="w-full min-h-0 overflow-y-auto pl-(--page-x-padding) md:flex gap-12">
      <div className="profile-Card rounded lg:h-6/7  px-6 py-4 w-14/15 md:w-2/5 md:mx-1 mx-auto mt-4 bg-(--bg-secondary)">
        <div className="flex justify-end">
          <Icons.settings
            onClick={() => navigate("/settings")}
            size={23}
            color={iconsColor}
          />
        </div>
        <div className="flex flex-col gap-2 [&>*:last-child]:mt-3 items-center">
          {/* User Profile Img */}
          <div className="profile-img lg:h-40  h-30 w-30  relative lg:w-40 rounded-full">
            <img
              className="h-full w-full rounded-full object-cover"
              src={user?.profileImage}
              alt="your profile Img"
            />

            <p className="absolute bg-white rounded px-0.5 py-0.5  top-0 right-5">
              <Icons.pencil
                onClick={(e) => {
                  e.preventDefault();
                  console.log("clicked");
                  inputRef.current.click();
                }}
                size={17}
              />
              <input
                className="hidden"
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  const reader = new FileReader();

                  reader.onload = (e) => {
                    setImgSrc(e.target.result);
                  };

                  reader.readAsDataURL(file);
                }}
              />
            </p>
          </div>

          {/* user Names */}
          <div className="content flex flex-col  items-center">
            <h1 className="text-xl md:text-2xl font-md text-(--text-primary)">
              {" "}
              {user?.fullname}
            </h1>
            <h2 className="text-md md:text-xl text-(--text-secondary) lg:text-sm">
              {user?.username}
            </h2>
          </div>
          <p className="user-bio line-clamp-2 lg:line-clamp-3 mt-2 md:mt-4 text-md text-center text-(--text-secondary)">
            {user?.bio}
          </p>

          <div className="followers mt-2 md:mt-4 flex gap-4">
            {[
              { label: "Friends", count: user?.followers.length },
              { label: "Following", count: user?.following.length },
              { label: "Followers", count: user?.following.length },
            ].map(({ label, count }, indx) => (
              <div key={indx} className="flex flex-col items-center gap-2">
                <h2 className="text-(--text-primary)">{label}</h2>
                <h3 className="text-(--text-secondary)">| {count} |</h3>
              </div>
            ))}
          </div>

          <Button
            padding="md"
            background={isDark ? "bg-pink-800" : "bg-pink-400"}
            border="rounded-2xl"
            content="My Collections"
            fnc={() => navigate("/profile/collection")}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-3 w-125  justify-center md:gap-23 gap-4 mt-10">
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
      </div>
    </div>
  );
};
