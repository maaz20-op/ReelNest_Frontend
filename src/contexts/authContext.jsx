import { createContext, useMemo } from "react";
import { useLazyGetAuthMeQuery } from "../services/auth/auth";
import { useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Fetch user profile data globally
  const [getUser, { data, isLoading, isFetching, error, refetch }] =
    useLazyGetAuthMeQuery();

  useEffect(() => {
    getUser();
  }, []);

  // DERIVE state instead of storing it in a local useState hook.
  // This ensures isLoading and user switch states at the exact same millisecond.
  const user = data?.success && data?.data ? data.data[0] : null;

  const value = useMemo(
    () => ({
      user,
      // Treat isFetching as loading so route guards wait during active background updates
      isLoading: isLoading || isFetching,
      error,
      data,
      refetch, // Expose refetch so you can force reload user details on manual login
    }),
    [data, isLoading, isFetching, error, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
