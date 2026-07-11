import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";

export const checkIsFollowed = (otherUserId) => {
  const { user, isLoading } = useAuth();

  const [isFollow, setFollowed] = useState(false);
  const [isFriend, setFriend] = useState(false);
  const [isYourFollower, setYourFollower] = useState(false);

  useEffect(() => {
    const followed =
      otherUserId && user?.following?.includes(String(otherUserId));

    if (followed) setFollowed(true);

    return () => setFollowed(false);
  }, [user?._id, otherUserId]);

  return {
    isFollow: isFollow,
  };
};
