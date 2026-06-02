import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
const LoginPage = React.lazy(() =>
  import("../features/auth/pages/Login").then((module) => ({
    default: module.LoginPage,
  })),
);
const SignupPage = React.lazy(() =>
  import("../features/auth/pages/Signup").then((module) => ({
    default: module.SignupPage,
  })),
);

const FeedPage = React.lazy(() =>
  import("../features/feed/pages/Feed").then((module) => ({
    default: module.FeedPage,
  })),
);

const Profile = React.lazy(() =>
  import("../features/profile/pages/Profile").then((module) => ({
    default: module.Profile,
  })),
);

const AccountSettings = React.lazy(() =>
  import("../features/accountSettings/pages/accountPage").then((module) => ({
    default: module.AccountSettings,
  })),
);

const Message_Users_Page = React.lazy(() =>
  import("../features/message/pages/Message_Users_Page").then((module) => ({
    default: module.Message_Users_Page,
  })),
);

const OthersProfile = React.lazy(() =>
  import("../features/othersprofile/pages/OtherProfile").then((module) => ({
    default: module.OthersProfile,
  })),
);

const Upgrade = React.lazy(() =>
  import("../features/upgrade/pages/UpgradePage").then((module) => ({
    default: module.Upgrade,
  })),
);

const PostCreationPage = React.lazy(() =>
  import("../features/postCreation/pages/postCreationPage").then((module) => ({
    default: module.PostCreationPage,
  })),
);

const SavedPost = React.lazy(() =>
  import("../features/savedPosts/pages/savedPosts").then((module) => ({
    default: module.SavedPost,
  })),
);

export const AppRouting = () => {
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* App Routes */}
        <Route path="/" element={<FeedPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="/message" element={<Message_Users_Page />}></Route>
        <Route path="/other/profile" element={<OthersProfile />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/create/post" element={<PostCreationPage />} />
        <Route path="/profile/collection" element={<SavedPost />} />
      </Routes>
    </>
  );
};
