import { Button } from "../../../components/reusable/Button";

export const SecuritySection = () => {
  return (
    <form action="" className="flex flex-col gap-15  mt-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-(--text-primary)">Change Email</h1>
        <p className="text-(--text-secondary)">
          {" "}
          Changing your email address will update the email linked to your
          account. This new email will be used for login, account recovery,
          security alerts, notifications, and other important account-related
          communication. Please make sure you have access to the new email
          address before saving your changes, as you may be asked to verify it
          for security purposes.
        </p>
        <input
          type="email"
          className="px-3 py-3 border-2 w-130 outline-none text-(--text-primary) rounded border-gray-500"
          value="malaika@gmail.com"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-(--text-primary)">Create New Password</h1>
        <p className="text-(--text-secondary)">
          {" "}
          Changing your password will update the password used to sign in to
          your account. For better security, your new password must contain at
          least 8 characters. We recommend using a combination of letters,
          numbers, and special characters to help keep your account safe and
          secure.
        </p>
        <input
          type="email"
          placeholder="Change your password"
          className="px-3 py-3 border-2 w-130 outline-none text-(--text-primary) rounded border-gray-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-(--text-secondary)">
          {" "}
          Logging out will end your current session on this device and you will
          need to sign in again to access your account. Make sure all important
          changes are saved before continuing. You can log back in at any time
          using your account credentials.
        </p>
        <Button
          background="bg-red-600"
          padding="md"
          border="rounded"
          content="Logout Now"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-(--text-secondary)">
          {" "}
          Deleting your account is permanent and cannot be undone. Once your
          account is deleted, your profile, posts, messages, saved data, and
          other account information may be permanently removed from our
          platform. Please make sure you really want to continue before
          confirming this action.
        </p>
        <Button
          background="bg-red-600"
          padding="md"
          border="rounded"
          content="Delete Account"
        />
      </div>
    </form>
  );
};
