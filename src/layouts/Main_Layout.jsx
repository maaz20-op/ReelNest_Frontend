import { Nav_Actions } from "../components/RedirectNavActionIcons";
import { Header } from "../components/Header";
import { Left_FriendsPanel_Desktop } from "../components/desktop/Left_Friends_Panels";
import { useLocation } from "react-router-dom";

const authPaths = ["/login", "/signup"];
export const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = authPaths.includes(location.pathname);
  return (
    <div className=" flex flex-col max-h-screen overflow-x-hidden h-screen select-none max-w-screen   bg-(--bg-primary)">
      {!isAuthPage && <Header />}
      <div
        className={`${isAuthPage ? "flex justify-center overflow-hidden items-center w-full  flex-1" : "min-h-0 flex-1 w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_90px] xl:grid-cols-[290px_minmax(0,1fr)_100px]"}`}
      >
        {!isAuthPage && <Left_FriendsPanel_Desktop />}
        {children}
        {!isAuthPage && <Nav_Actions />}
      </div>
    </div>
  );
};
