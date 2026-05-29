import { useNavigate } from "react-router-dom";
import { useGetAuthMeQuery } from "../api/authMe";

export const useAuth = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAuthMeQuery();
  const user = data?.data[0];
  console.log(data, error, isLoading);

  if (isLoading) {
    return { user: null, isLoading, error };
  }
  if (!user || !data.success) {
    console.log("no user found");
    return { user: null, isLoading, error };
  }

  console.log("user", user);
  return { user, isLoading, error };
};
