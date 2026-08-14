import { createContext, useEffect, useMemo, useState } from "react";
import { useGetAuthMeQuery } from "../services/auth/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data, isLoading, error } = useGetAuthMeQuery();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data?.data?.[0]) {
      setUser(data.data[0]);
    }
  }, [data]);

  const userData = data?.data[0] || null;

  console.log(userData);
  const value = useMemo(
    () => ({ user, userData, isLoading, error, setUser, data }),
    [user, isLoading, error, data, userData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
