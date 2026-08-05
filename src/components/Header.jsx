import { BorderDiv } from "../utils/BorderDiv.jsx";
import { Icons } from "../assets/icons.jsx";
import { FriendSection } from "./mobile/FriendsHeaderSection.jsx";
import { contextThemeSetup } from "../utils/contextSetup.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth.js";
import { Button } from "./reusableComponents/Button.jsx";
import { Avatar } from "./reusableComponents/Avatar.jsx";

import { useState } from "react";
import { useSearchContext } from "../contexts/searchContext.jsx";

export const Header = () => {
  const { isDark, toggle, iconsColor } = contextThemeSetup();
  const SearchIcon = Icons.search;
  const { user, isLoading, error } = useAuth();

  const navigate = useNavigate();

  const { setSearchQuery, searchQuery, setSearchBtnClicked } =
    useSearchContext();

  const handleSearch = async () => {
    navigate("/search");
    setSearchBtnClicked(true);
  };

  return (
    <header className="w-full  bg-text-xl">
      <nav className="flex justify-between  h-14 lg:h-18 items-center px-1 py-1 lg:px-3 Lg:py-2 ">
        <div>
          <h1 className="text-(--accent)  font-bold  text-xl  lg:text-2xl">
            ReelNest
          </h1>
        </div>

        {/* Search Div show desktop */}
        <div className="wrapper ml-1">
          <div className="flex ">
            <input
              className="lg:w-120 w-25 md:w-60 px-1 py-1 md:px-3 md:py-2 shadow-sm text-(--text-primary) text-sm outline-none border rounded-l-2xl border-(--border-color)"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />
            <div
              onClick={handleSearch}
              className="px-1 py-1 md:px-3 md:py-2 shadow-sm bg-(--bg-secondary) rounded-r-2xl"
            >
              <SearchIcon color={iconsColor} />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center items-center ">
          <Button
            content={
              isDark ? (
                <div className="flex transition-all duration-1000 justify-center items-center gap-3">
                  <span className="hidden lg:block">Light</span>
                  <Icons.LightMode size={20} color={iconsColor} />
                </div>
              ) : (
                <div className="flex transition-all duration-1000 justify-center items-center gap-3">
                  <span className="hidden lg:block">Dark</span>{" "}
                  <Icons.DarkMode color={iconsColor} size={20} />
                </div>
              )
            }
            fnc={toggle}
            otherStyles="shadow-sm lg:mr-4 ml-2 lg:px-3 lg:py-2 px-2 py-1 lg:ml-0 lg:rounded-xl rounded-full"
          />
          {isLoading || error ? (
            <Avatar size="md" skeleton={true} />
          ) : (
            <Avatar
              fn={() => navigate("/profile")}
              size="sm"
              src={user?.profileImage}
            />
          )}
        </div>
      </nav>
    </header>
  );
};
