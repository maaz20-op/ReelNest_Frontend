export const handleRedirectToUserProfile = (userId, fullname, navigate) => {
  const handleRedirectProfile = () => {
    navigate("/profile", {
      state: {
        userId: userId,
        name: fullname,
      },
    });
  };

  return handleRedirectProfile;
};
