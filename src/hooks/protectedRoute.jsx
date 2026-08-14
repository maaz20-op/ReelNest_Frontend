import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const logout = localStorage.getItem("logout");
  const parseLogout = JSON.parse(logout);

  if (!user || !user?._id || parseLogout) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
