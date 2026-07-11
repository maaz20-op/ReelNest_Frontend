import { Nav_Actions } from "../components/RedirectNavActionIcons";
import { Header } from "../components/Header";
import { LeftFriendsPanelDesktop } from "../components/desktop/LeftFriendsPanel";
import { useLocation } from "react-router-dom";
import { FriendSection } from "../components/mobile/FriendsHeaderSection";
import { useEffect, useState } from "react";

const authPaths = ["/login", "/signup"];
const scrollableFeed = ["/feed"];
const homeFeed = ["/", "/profile"];
export const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = authPaths.includes(location.pathname);
  const isScrollablFeed = scrollableFeed.includes(location.pathname);
  const isHomeFeed = homeFeed.includes(location.pathname);
  const [windowWidth, setWindowWidth] = useState(0);

  const mobileWidth = windowWidth <= 400;

  useEffect(() => {
    const trackResize = () => {
      let width = window.innerWidth;

      setWindowWidth(width);
    };

    window.addEventListener("resize", trackResize);

    return () => window.removeEventListener("resize", trackResize);
  }, []);

  return (
    <div className="  flex flex-col max-h-screen overflow-x-hidden h-dvh select-none max-w-screen   bg-(--bg-primary)">
      {!isAuthPage && !isScrollablFeed && !mobileWidth && <Header />}
      {!isAuthPage && !isScrollablFeed && mobileWidth && <Header />}
      {!isAuthPage && isScrollablFeed && !mobileWidth && <Header />}
      {!isAuthPage && !isHomeFeed && !isScrollablFeed && <FriendSection />}
      <div
        className={`${isAuthPage ? "flex justify-center overflow-hidden items-center w-full  flex-1" : "min-h-0 flex-1 w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_90px] xl:grid-cols-[290px_minmax(0,1fr)_100px]"}`}
      >
        {!isAuthPage && <LeftFriendsPanelDesktop />}
        {children}
        {!isAuthPage && <Nav_Actions />}
      </div>
    </div>
  );
};
