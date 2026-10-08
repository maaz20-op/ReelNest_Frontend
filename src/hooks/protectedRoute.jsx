import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { ReelnestWelcomePage } from "../components/reelNestWelcomePage";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const logout = localStorage.getItem("logout");
  const parseLogout = JSON.parse(logout);

  if (!user && !user?._id && isLoading) {
    return <ReelnestWelcomePage />;
  }

  if (parseLogout || logout === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
