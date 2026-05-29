import apiClient from "../../../app/config/api";

export const LoginUser = async (email, password) => {
  try {
    const res = await apiClient.post("/auth/local/login", { email, password });
    if (res?.data?.success) return res.data;
  } catch (err) {
    return null;
  }
};
