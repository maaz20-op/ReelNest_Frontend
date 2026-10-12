import { useNavigate } from "react-router-dom";
import { useGetAuthMeQuery } from "../../../services/auth/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

export const useAuth = () => {
  const { data, userData, isLoading, error, setUser, user } =
    useContext(AuthContext);

  if (isLoading) {
    return { user: null, userData, setUser, isLoading, error };
  }
  if (!user || !data?.success) {
    return { user: null, userData, setUser, isLoading, error };
  }

  return { user, setUser, userData, isLoading, error };
};
