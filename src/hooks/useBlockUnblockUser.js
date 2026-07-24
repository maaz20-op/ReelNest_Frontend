import { useToastContext } from "../contexts/toast";
import { useAuth } from "../features/auth/hooks/useAuth";
import {
  useBlockOtherUserMutation,
  useUnblockOtherUserMutation,
} from "../services/users/user";

export const useBlockUnBlockUser = (setBlockedUser) => {
  const { user: loggedInUser } = useAuth();
  const [blockUser] = useBlockOtherUserMutation();
  const [unBlockUser] = useUnblockOtherUserMutation();
  const { showToast } = useToastContext();

  const handleBlockUser = async (user) => {
    if (!user?._id) return;
    if (user?._id?.toString() === loggedInUser?._id?.toString()) return;

    try {
      const res = await blockUser(user).unwrap();
      if (res?.success) {
        setBlockedUser(true);
        showToast(`you Blocked ${user?.fullname}`, true);
      } else {
        setBlockedUser(false);
        showToast(
          `Something went Wrong!, Can't Block ${user?.fullname}`,
          false,
        );
      }
    } catch (err) {
      setBlockedUser(false);
      showToast(`Something went Wrong!, Can't Block ${user?.fullname}`, false);
      console.error(err);
    }
  };

  const handleUnBlockUser = async (user) => {
    if (!user?._id) return;
    if (user?._id?.toString() === loggedInUser?._id?.toString()) return;

    try {
      const res = await unBlockUser(user?._id).unwrap();
      if (res.success) {
        setBlockedUser(false);
        showToast(`you unBlocked ${user?.fullname}`, true);
      } else {
        setBlockedUser(true);
        showToast(
          `Something went Wrong!, Can't unBlock ${user?.fullname}`,
          false,
        );
      }
    } catch (err) {
      setBlockedUser(true);
      showToast(
        `Something went Wrong!, Can't unBlock ${user?.fullname}`,
        false,
      );
      console.error(err);
    }
  };

  return { handleBlockUser, handleUnBlockUser };
};
