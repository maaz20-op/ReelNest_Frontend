import { useMemo, useState } from "react";
import { useFollowUserMutation } from "../services/users/user";
import { debounce } from "../utils/debounce";

export const useFollowUser = ({ userData, setFollow }) => {
  const [followUser, { isLoading, data }] = useFollowUserMutation();

  const debouncedFollow = useMemo(() => {
    return debounce(() => {
      followUser({
        _id: userData?._id,
        fullname: userData?.fullname,
        username: userData?.username,
        profileImage: userData?.profileImage,
      }); // send backend request after updating Ui
    }, 1000);
  }, []);

  const handleFollowClick = (e) => {
    e.stopPropagation();
    setFollow(true);

    debouncedFollow();
  };

  return handleFollowClick;
};

export const useUnfollowUser = ({ unfollowUserId, setFollow }) => {
  const debouncedFollow = useMemo(() => {
    return debounce(() => {
      followUser(); // send backend request after updating Ui
    }, 1000);
  }, []);

  const handleUnfollowClick = (e) => {
    e.stopPropagation();
    setFollow(false);

    debouncedFollow();
  };

  return handleUnfollowClick;
};
