import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { ReelnestWelcomePage } from "../components/reelNestWelcomePage";

export const ProtectedRoute = () => {
  const { userData: user, isLoading } = useAuth();
  const location = useLocation();
  const logout = localStorage.getItem("logout");
  const parseLogout = JSON.parse(logout);
  if (!user && !user?._id && isLoading) {
    return <ReelnestWelcomePage />;
  }

  if ((!user && !isLoading) || parseLogout) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
