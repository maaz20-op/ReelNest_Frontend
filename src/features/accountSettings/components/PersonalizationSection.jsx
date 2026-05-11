export const PersonalizationSection = () => {
  return (
    <form action="" className="account-settings flex flex-col gap-15   mt-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-(--text-primary)">
          Change your Full Name{" "}
        </h1>
        <p className="text-(--text-secondary)">
          {" "}
          Updating your full name will change how your name appears across your
          profile and other areas of the platform. This name may be visible to
          other users in posts, comments, messages, and account-related
          interactions. Please use your preferred name and make sure the
          information is accurate before saving your changes.
        </p>
        <input
          type="text"
          className="px-3 py-3 border-2 w-130 outline-none text-(--text-primary) rounded border-gray-500"
          value="Malaika Qamar"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-(--text-primary)">Change Username</h1>
        <p className="text-(--text-secondary)">
          {" "}
          Changing your username will update your unique account identity across
          the platform. Your username may be visible in your profile link,
          posts, comments, mentions, messages, and other public interactions.
          Some usernames may not be available if they are already in use. Please
          choose a username that is unique, easy to recognize, and follows our
          platform guidelines before saving your changes.
        </p>
        <input
          type="email"
          placeholder="Change your password"
          className="px-3 py-3 border-2 w-130 outline-none text-(--text-primary) rounded border-gray-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-(--text-primary)">Change Bio</h1>
        <p className="text-(--text-secondary)">
          {" "}
          Updating your bio will change the short description displayed on your
          profile. Your bio helps other users learn more about you and may be
          visible across different areas of the platform. You can use this
          section to share information about yourself, your interests, or
          anything you would like others to see on your profile. Please make
          sure your bio follows our community guidelines before saving your
          changes.
        </p>
        <input
          type="text"
          placeholder="Change your password"
          className="px-3 py-3 border-2 w-130 outline-none text-(--text-primary) rounded border-gray-500"
        />
      </div>
    </form>
  );
};
