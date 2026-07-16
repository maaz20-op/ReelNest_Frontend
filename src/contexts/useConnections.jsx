import { createContext, useContext, useMemo } from "react";
import { useGetLoggedInUserConnectionQuery } from "../services/users/user";
import { useAuth } from "../features/auth/hooks/useAuth";

export const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const { data, isLoading, error } = useGetLoggedInUserConnectionQuery();
  const { user } = useAuth();
  // useMemo lagayein taaki object reference safe rahe
  const contextValue = useMemo(() => {
    return {
      connectionList: {
        Friends: data?.data?.[2], // ?. use karein taaki data undefined hone par crash na ho
        Following: data?.data?.[1],
        Followers: data?.data?.[0],
      },
      isLoading: isLoading,
      error: error,
    };
  }, [data, isLoading, error, user?._id]); // Yeh sirf tabhi chalega jab API ka response badlega

  return (
    <ConnectionContext.Provider value={contextValue}>
      {children}
    </ConnectionContext.Provider>
  );
};
