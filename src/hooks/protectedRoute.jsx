import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (!user && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
