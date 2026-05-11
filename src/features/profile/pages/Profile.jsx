import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { BorderDiv } from "../../../utils/BorderDiv";
import { contextThemeSetup } from "../../../utils/contextSetup";

export const Profile = () => {
  const { iconsColor } = contextThemeSetup();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-0 overflow-y-auto  md:flex gap-12">
      <div className="profile-Card rounded lg:h-6/7  px-6 py-4 w-14/15 md:w-2/5 md:mx-1 mx-auto mt-4 bg-(--bg-secondary)">
        <div className="flex justify-end">
          <Icons.settings
            onClick={() => navigate("/settings")}
            size={23}
            color={iconsColor}
          />
        </div>
        <div className="flex flex-col gap-2  items-center">
          {/* User Profile Img */}
          <div className="profile-img lg:h-40  h-30 w-30  relative lg:w-40 rounded-full">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://iili.io/BZuCZ57.jpg"
              alt="your profile Img"
            />

            <p className="absolute bg-white rounded px-0.5 py-0.5  top-0 right-5">
              <Icons.pencil size={17} />
            </p>
          </div>

          {/* user Names */}
          <div className="content flex flex-col  items-center">
            <h1 className="text-xl md:text-2xl font-md text-(--text-primary)">
              {" "}
              Malaika Qamar
            </h1>
            <h2 className="text-md md:text-xl text-(--text-secondary) lg:text-sm">
              @angel-20
            </h2>
          </div>
          <p className="line-clamp-2 lg:line-clamp-3 mt-2 md:mt-4 text-md text-center text-(--text-secondary)">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab esse
            fugiat, molestiae vitae voluptates nobis dignissimos eaque quia amet
            assumenda, aperiam tempore optio animi? Ipsa quam possimus dolore
            nam minus.
          </p>

          <div className="followers mt-2 md:mt-4 flex gap-4">
            {[
              { label: "Friends", count: 1 },
              { label: "Following", count: 1 },
              { label: "Followers", count: 12 },
            ].map(({ label, count }, indx) => (
              <div key={indx} className="flex flex-col items-center gap-2">
                <h2 className="text-(--text-primary)">{label}</h2>
                <h3 className="text-(--text-secondary)">| {count} |</h3>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/profile/collection")}
            className="bg-pink-800 px-3 mt-3 rounded-2xl py-2 text-(--text-primary)"
          >
            View Your Collection
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex items-center mb-3  justify-center md:gap-23 gap-4 mt-10">
          <span className="bg-red-500 px-3 py-2 font-bold rounded-2xl text-(--text-primary)">
            {" "}
            videos
          </span>
          <span className="bg-red-500 px-3 py-2  font-bold rounded-2xl text-(--text-primary)">
            {" "}
            Images
          </span>
        </div>
        <BorderDiv />
      </div>
    </div>
  );
};
