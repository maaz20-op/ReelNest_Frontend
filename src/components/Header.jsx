import { BorderDiv } from "../utils/BorderDiv.jsx";
import { Icons } from "../assets/icons.jsx";
import { FriendSection } from "./mobile/FriendsHeaderSection.jsx";
import { contextThemeSetup } from "../utils/contextSetup.js";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { isDark, toggle, iconsColor } = contextThemeSetup();
  const SearchIcon = Icons.search;

  const navigate = useNavigate();

  return (
    <header className="  w-full  bg-text-xl">
      <nav className="flex justify-between h-14 lg:h-18 items-center px-3 py-2 ">
        <h1 className="text-(--accent) font-bold text-2xl lg:text-2xl">
          ReelNest
        </h1>

        {/* Search Div show desktop */}
        <div className="wrapper sm:block hidden">
          <div className="flex ">
            <input
              className="lg:w-120 px-3 py-2 text-(--text-primary) text-sm outline-none border rounded-l-2xl border-(--border-color)"
              type="text"
              placeholder="Search"
            />
            <div className="px-3 py-2 bg-(--bg-secondary) rounded-r-2xl">
              <SearchIcon color={iconsColor} />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="px-2 py-1 rounded-2xl text-(--text-primary) bg-(--bg-secondary) text-sm"
            onClick={toggle}
          >
            {isDark ? "Light" : "Dark"}
          </button>
          <div
            onClick={() => navigate("/profile")}
            className="h-10 w-10 rounded-full bg-black"
          >
            <img
              className="w-full object-cover h-full rounded-full"
              src="https://iili.io/BZuCZ57.jpg"
              alt="your profile"
            />
          </div>
        </div>
      </nav>
      <BorderDiv />
      <FriendSection />
      <BorderDiv />
    </header>
  );
};
