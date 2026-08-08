import { useNavigate } from "react-router-dom";
import { useGetAuthMeQuery } from "../../../services/auth/auth";
import { useState } from "react";
import { useEffect } from "react";

export const useAuth = () => {
  const { data, isLoading, error } = useGetAuthMeQuery();
  const [user, setUser] = useState(null);
  //const user = data?.data[0];

  useEffect(() => {
    setUser(data?.data[0]);
  }, [data]);

  if (isLoading) {
    return { user: null, setUser, isLoading, error };
  }
  if (!user || !data.success) {
    return { user: null, setUser, isLoading, error };
  }

  return { user, setUser, isLoading, error };
};
