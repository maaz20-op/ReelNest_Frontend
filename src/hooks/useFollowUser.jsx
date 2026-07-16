import { useMemo, useState } from "react";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../services/users/user";
import { debounce } from "../utils/debounce";
import { useToastContext } from "../contexts/toast";

export const useFollowUser = ({ userData, setFollow }) => {
  const [followUser, { isLoading, data }] = useFollowUserMutation();
  const { showToast, setSuccessMsg } = useToastContext();
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
    showToast(`${userData?.fullname || "User"} Followed By You!`);

    debouncedFollow();
  };

  return { handleFollowClick, isLoading };
};

export const useUnfollowUser = ({ unfollowUserId, setFollow, userId }) => {
  const [unfollowUser, { data, isLoading }] = useUnfollowUserMutation();
  const { showToast, setSuccessMsg } = useToastContext();
  console.log(unfollowUserId);
  const debouncedFollow = useMemo(() => {
    return debounce(async () => {
      await unfollowUser({ unfollowUserId: unfollowUserId, userId: userId }); // send backend request after updating Ui
    }, 1000);
  }, [unfollowUser]);

  const handleUnfollowClick = (e) => {
    e.stopPropagation();
    setFollow(false);
    showToast(`Unfollowed Successfully`);
    setSuccessMsg(true);
    debouncedFollow();
  };

  return handleUnfollowClick;
};
