import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const logout = localStorage.getItem("logout");
  const parseLogout = logout ? JSON.parse(logout) : false; // Safe parsing ka tareeqa

  console.log("Loading Status:", isLoading, "User Data:", user);

  // 1. Sabse pehle loading check karein. Jab tak loading hai, yahin rukein.
  if (isLoading) {
    return <div>Loading...</div>; // Aap yahan apna koi achha sa Spinner laga sakte hain
  }

  // 2. Loading khatam hone ke baad check karein ke user logged in hai ya nahi
  if (!user || !user?._id || parseLogout) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Agar loading bhi khatam ho gayi aur user bhi mojud hai, to andar ka page dikhayein
  return <Outlet />;
};
