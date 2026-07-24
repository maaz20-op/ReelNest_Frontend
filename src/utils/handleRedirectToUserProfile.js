import { replace } from "react-router-dom";

export const handleRedirectToUserProfile = (userId, fullname, navigate) => {
  if (!userId || !fullname || !navigate) return;
  const handleRedirectProfile = (e) => {
    navigate("/profile", {
      state: {
        userId: userId,
        name: fullname,
      },
      replace: true,
    });
  };

  return handleRedirectProfile;
};
