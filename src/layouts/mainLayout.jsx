import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Header } from "../components/Header";
import { Nav_Actions } from "../components/RedirectNavActionIcons";
import { LeftFriendsPanelDesktop } from "../components/desktop/LeftFriendsPanel";
import { FriendSection } from "../components/mobile/FriendsHeaderSection";

const authPaths = ["/login", "/signup", "/forgot/password"];
const scrollableFeed = ["/feed"];
const search = ["/search"];
const homeFeed = ["/", "/profile"];

export const MainLayout = ({ children }) => {
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isAuthPage = authPaths.includes(location.pathname);
  const isScrollablFeed = scrollableFeed.includes(location.pathname);
  const isHomeFeed = homeFeed.includes(location.pathname);
  const isSearch = search.includes(location.pathname);
  const mobileWidth = windowWidth <= 450;

  useEffect(() => {
    const trackResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", trackResize);

    return () => window.removeEventListener("resize", trackResize);
  }, []);

  return (
    <div className="flex flex-col max-h-screen overflow-x-hidden h-dvh select-none max-w-screen bg-(--bg-primary)">
      {!isAuthPage && !isScrollablFeed && !mobileWidth && <Header />}
      {!isAuthPage && !isScrollablFeed && mobileWidth && <Header />}
      {!isAuthPage && isScrollablFeed && !mobileWidth && <Header />}

      {!isAuthPage &&
        !isHomeFeed &&
        !isSearch &&
        !isScrollablFeed &&
        !(<FriendSection />)}

      <div
        className={`${
          isAuthPage
            ? "flex justify-center overflow-hidden items-center w-full flex-1"
            : "min-h-0 flex-1 w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_90px] xl:grid-cols-[290px_minmax(0,1fr)_100px]"
        }`}
      >
        {!isAuthPage && <LeftFriendsPanelDesktop />}

        {children}

        {!isAuthPage && <Nav_Actions />}
      </div>
    </div>
  );
};
