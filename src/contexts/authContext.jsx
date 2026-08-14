import { createContext, useEffect, useMemo, useState } from "react";
import { useGetAuthMeQuery } from "../services/auth/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading, error } = useGetAuthMeQuery();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(data?.data[0]);
  }, [data]);

  console.log(isLoading);

  const value = useMemo(
    () => ({ user: user, isLoading, error, setUser, data }),
    [data, user?._id, isLoading, error],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
