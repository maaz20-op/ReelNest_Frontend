import { useNavigate } from "react-router-dom";
import { useGetAuthMeQuery } from "../../../services/auth/auth";

export const useAuth = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAuthMeQuery();
  const user = data?.data[0];

  if (isLoading) {
    return { user: null, isLoading, error };
  }
  if (!user || !data.success) {
    return { user: null, isLoading, error };
  }

  console.log("user", user);
  return { user, isLoading, error };
};
