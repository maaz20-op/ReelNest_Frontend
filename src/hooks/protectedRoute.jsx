import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { ReelnestWelcomePage } from "../components/reelNestWelcomePage";

export const ProtectedRoute = () => {
  const { userData: user, user: a, isLoading } = useAuth();

  const location = useLocation();
  const logout = localStorage.getItem("logout");
  const parseLogout = JSON.parse(logout);
  console.log(
    "protected ROute wala user =",
    a,
    "logout=",
    logout,
    " user data is = ",
    user,
  );
  if (!user && !user?._id && isLoading) {
    return <ReelnestWelcomePage />;
  }

  if ((!user && !isLoading) || parseLogout) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
