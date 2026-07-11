import { createContext, useContext, useEffect } from "react";
import { useGetFollowersQuery } from "../services/users/user";

export const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const { data, isLoading, error } = useGetFollowersQuery();

  const setList = {
    Friends: data?.data[2],
    Following: data?.data[1],
    Followers: data?.data[0],
  };

  const value = {
    connectionList: setList,
    isLoading: isLoading,
    error: error,
  };
  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
};
