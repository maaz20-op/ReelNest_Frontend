import { useToastContext } from "../contexts/toast";
import { useCreateUserSavedPinsMutation } from "../services/pins/pin";

export const useSavePost = (_id, userData) => {
  const { showToast } = useToastContext();
  const [savePost] = useCreateUserSavedPinsMutation();

  const handleSavePost = async () => {
    try {
      showToast(`Post Saved By ${userData?.fullname}`, true);

      const res = await savePost(_id);

      if (!res?.data?.success) {
        showToast(`Failed to Save Post By ${userData?.fullname}`, false);
      } else {
        showToast(`Post Saved By ${userData?.fullname}`, true);
      }
    } catch (err) {
      showToast(`Failed to Save Post By ${userData?.fullname}`, false);
    }
  };

  return handleSavePost;
};
