import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

export const useAuth = () => {
  const { data, isLoading, error, refetch, user } = useContext(AuthContext);

  // 1. If the auth state is still loading from the server, return early safely
  if (isLoading) {
    return { user: null, isLoading, error, refetch };
  }

  // 2. CRITICAL FIX: Use optional chaining (?.) to prevent crashing if data is undefined
  if (!user || !data?.success) {
    return { user: null, isLoading, error, refetch };
  }

  // 3. Return the authenticated user profile details safely
  return { user, isLoading, error, refetch };
};
