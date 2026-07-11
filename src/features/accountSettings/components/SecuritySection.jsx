import { useState } from "react";
import { Button } from "../../../components/reusableComponents/Button";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  useDeleteUserAccountMutation,
  useUpdateUserProfileSettingsMutation,
} from "../../../services/users/user";
import { useLogoutUserMutation } from "../../../services/auth/auth";
import { useNavigate } from "react-router-dom";

export const SecuritySection = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [updateProfileSecurity] = useUpdateUserProfileSettingsMutation();
  const [logoutUser] = useLogoutUserMutation();
  const [deleteUserAccount] = useDeleteUserAccountMutation();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await logoutUser().unwrap();
      console.log(res);
      if (res?.success && res) navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await deleteUserAccount().unwrap();
    //   console.log(res);
    //   if (res?.success && res) navigate("/signup");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const updateSecurtiySettings = async (e) => {
    e.preventDefault();

    if (email === (user?.email || "")) {
      return console.log("No changes made");
    }

    const formData = new FormData();
    formData.append("email", email);

    // try {
    //   //await updateProfileSecurity({ formData, userId: user?._id });
    // } catch (err) {
    //   console.error(err);
    // }
  };
  return (
    <form
      action=""
      className="flex flex-col gap-10 md:gap-15 mt-6 md:mt-10 px-4 sm:px-0"
    >
      {/* Change Email Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Change Email
        </h1>
        <p className="text-sm sm:text-base text-(--text-secondary) max-w-3xl">
          Changing your email address will update the email linked to your
          account. This new email will be used for login, account recovery,
          security alerts, notifications, and other important account-related
          communication. Please make sure you have access to the new email
          address before saving your changes, as you may be asked to verify it
          for security purposes.
        </p>
        <input
          type="email"
          className="px-3 py-3 border-2 w-full sm:max-w-md lg:w-130 outline-none text-(--text-primary) rounded border-gray-500 mt-2"
          value={email ? email : user?.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button
        fnc={updateSecurtiySettings}
        background="bg-blue-600"
        padding="md"
        border="rounded"
        content="Save"
      />

      {/* Create New Password Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Create New Password
        </h1>
        <p className="text-sm sm:text-base text-(--text-secondary) max-w-3xl">
          Changing your password will update the password used to sign in to
          your account. For better security, your new password must contain at
          least 8 characters. We recommend using a combination of letters,
          numbers, and special characters to help keep your account safe and
          secure.
        </p>
        <input
          type="password"
          placeholder="Change your password"
          className="px-3 py-3 border-2 w-full sm:max-w-md lg:w-130 outline-none text-(--text-primary) rounded border-gray-500 mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Logout Section */}
      <div className="flex flex-col gap-3 items-start">
        <p className="text-sm sm:text-base text-(--text-secondary) max-w-3xl">
          Logging out will end your current session on this device and you will
          need to sign in again to access your account. Make sure all important
          changes are saved before continuing. You can log back in at any time
          using your account credentials.
        </p>
        <div className="w-full sm:w-auto">
          <Button
            fnc={handleLogout}
            background="bg-red-600"
            padding="md"
            border="rounded"
            content="Logout Now"
          />
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="flex flex-col gap-3 items-start">
        <p className="text-sm sm:text-base text-(--text-secondary) max-w-3xl">
          Deleting your account is permanent and cannot be undone. Once your
          account is deleted, your profile, posts, messages, saved data, and
          other account information may be permanently removed from our
          platform. Please make sure you really want to continue before
          confirming this action.
        </p>

        <div className="w-full sm:w-auto">
          <Button
            fnc={handleDeleteAccount}
            background="bg-red-600"
            padding="md"
            border="rounded"
            content="Delete Account"
          />
        </div>
      </div>
    </form>
  );
};
