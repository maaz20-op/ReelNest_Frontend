import { useState, useEffect } from "react"; // Added useEffect to handle async auth loading
import { Button } from "../../../components/reusableComponents/Button";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUpdateUserProfileSettingsMutation } from "../../../services/users/user";
import { Loader } from "../../../components/reusableComponents/Loader";

export const PersonalizationSection = () => {
  const { user } = useAuth();

  // 1. Initialize state variables directly with existing user profile data
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [username, setUsername] = useState(user?.username || "");
  const [visibility, setVisibility] = useState(
    user?.accountVisibility || "Public",
  );
  const [bio, setBio] = useState(user?.bio || "");

  const [updateProfile, { isLoading }] = useUpdateUserProfileSettingsMutation();

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  useEffect(() => {
    if (user) {
      setFullname(user?.fullname || "");
      setUsername(user?.username || "");
      setBio(user?.bio || "");
    }
  }, [user]);

  const handleSavePersonlizationSettings = async (e) => {
    e.preventDefault();

    // Check if any actual field edits were made
    if (
      fullname === (user?.fullname || "") &&
      username === (user?.username || "") &&
      bio === (user?.bio || "") &&
      visibility === user?.accountVisibility
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("accountVisibility", visibility);

    try {
      await updateProfile({ formData, userId: user?._id });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="account-settings flex py-5 flex-col gap-10 md:gap-15 mt-6 md:mt-10 px-4 sm:px-0">
      {/* Full Name Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-base sm:text-2xl font-semibold text-(--text-primary)">
          Change your Full Name
        </h1>
        <p className="text-(--text-secondary) text-sm lg:text-base max-w-3xl">
          Updating your full name will change how your name appears across your
          profile...
        </p>
        <input
          type="text"
          className="px-3 py-3 border-2 w-full sm:max-w-md lg:w-130 outline-none text-(--text-primary) rounded border-gray-500 mt-2"
          value={fullname} // Changed to controlled value
          placeholder="change your fullname..."
          onChange={(e) => setFullname(e.target.value)}
          name="fullname"
        />
      </div>

      {/* Username Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-base sm:text-2xl font-semibold text-(--text-primary)">
          Change Username
        </h1>
        <p className="text-(--text-secondary) text-sm lg:text-base max-w-3xl">
          Changing your username will update your unique account identity across
          the platform...
        </p>

        {/* RECOMMENDED DESIGN: Visual-only '@' symbol container so your state stays completely clean */}
        <div className="relative w-full sm:max-w-md lg:w-130 mt-2">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium pointer-events-none">
            @
          </span>
          <input
            type="text"
            placeholder="Change your username"
            name="username"
            className="pl-8 pr-3 py-3 border-2 w-full outline-none text-(--text-primary) rounded border-gray-500"
            value={username} // Keeps state entirely free of '@' symbols
            onChange={(e) => setUsername(e.target.value.replace(/@/g, ""))} // Strips all input '@' marks globally
          />
        </div>
      </div>

      {/* Bio Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-base sm:text-2xl font-semibold text-(--text-primary)">
          Change Bio
        </h1>
        <p className="text-(--text-secondary) text-sm lg:text-base max-w-3xl">
          Updating your bio will change the short description displayed on your
          profile...
        </p>
        <textarea
          placeholder="Write something about yourself..."
          className="px-3 py-3 border-2 w-full sm:max-w-md lg:w-130 h-100 account-settings resize-none outline-none text-(--text-primary) rounded border-gray-500 mt-2"
          value={bio} // Changed to controlled value
          onChange={(e) => setBio(e.target.value)}
          name="bio"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-semibold text-(--text-primary)">
            Account Visibility
          </h1>

          <p className="mt-2 text-sm lg:text-base text-(--text-secondary) max-w-3xl">
            Choose who can see your profile and posts. If your account is set to
            <span className="font-medium text-(--text-primary)"> Private</span>,
            only approved followers will be able to view your content.
          </p>
        </div>

        <div className="relative w-full max-w-xs">
          <select
            value={visibility}
            onChange={handleVisibilityChange}
            className="
        w-full
        appearance-none
        rounded-xl
        border
        border-(--border-color)
        bg-(--surface)
        px-4
        py-3
        pr-10
        text-(--text-primary)
        outline-none
        transition
        duration-200
        focus:border-red-500
        focus:ring-2
        focus:ring-red-500/20
        cursor-pointer
      "
          >
            <option
              className="bg-(--bg-primary) hover:bg-(--bg-secondary)"
              value="Public"
            >
              🌍 Public
            </option>
            <option
              className="bg-(--bg-primary) hover:bg-red-700"
              value="Private"
            >
              🔒 Private
            </option>
          </select>

          {/* Custom Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--text-secondary)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <Button
        fnc={handleSavePersonlizationSettings}
        background="bg-blue-600"
        padding="md"
        border="rounded"
        disable={isLoading}
        content={
          <div className="flex gap-3 justify-center items-center ">
            <span>Save Personalization</span>
            {isLoading && <Loader size="sm" color="white" />}
          </div>
        }
      />
    </div>
  );
};
