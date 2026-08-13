import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { ProtectedRoute } from "../hooks/protectedRoute";
import { DisplayBlockUsers } from "../features/blockUser/page/DisplayBlockUser";
import { ForgotPasswordPage } from "../features/forgotPassword/page/forgotPassword";
import { SocketProvider } from "../contexts/socketContext";
import { SocketLayout } from "../layouts/SocketLayout";
import { useIncomingCallPopupContext } from "../utils/useIncomingCallContext";
import { GoogleCallback } from "../features/auth/pages/Google";

const LoginPage = React.lazy(() =>
  import("../features/auth/pages/Login").then((module) => ({
    default: module.LoginPage,
  })),
);

const NotFoundPage = React.lazy(() =>
  import("../features/notFound/pages/notFound").then((module) => ({
    default: module.NotFoundPage,
  })),
);

const VideoCallScreenPage = React.lazy(() =>
  import("../features/videoCall/pages/videoCallScreen").then((module) => ({
    default: module.VideoCallScreenPage,
  })),
);

const ScrollableFeed = React.lazy(() =>
  import("../features/feed/pages/scrollableFeed").then((module) => ({
    default: module.ScrollableFeed,
  })),
);

const SearchResults = React.lazy(() =>
  import("../features/searchResultsPage/page/searchResultsPage").then(
    (module) => ({
      default: module.SearchResults,
    }),
  ),
);

const SignupPage = React.lazy(() =>
  import("../features/auth/pages/Signup").then((module) => ({
    default: module.SignupPage,
  })),
);

const FeedPage = React.lazy(() =>
  import("../features/feed/pages/homeFeed").then((module) => ({
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
  import("../features/message/pages/MessageUsersPage").then((module) => ({
    default: module.MessageUsersPage,
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
  const navigate = useNavigate();
  const { isCallAccepted } = useIncomingCallPopupContext();
  useEffect(() => {
    if (isCallAccepted) navigate("/videoCall");
  }, [isCallAccepted]);
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot/password" element={<ForgotPasswordPage />} />
        <Route path="/google-callback" element={<GoogleCallback />} />

        {/* App Routes */}

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<AccountSettings />} />

          <Route path="/message" element={<Message_Users_Page />} />
          <Route path="/videoCall" element={<VideoCallScreenPage />} />

          <Route path="/search" element={<SearchResults />}></Route>

          <Route path="/users/block" element={<DisplayBlockUsers />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/create/post" element={<PostCreationPage />} />
          <Route path="/profile/collection" element={<SavedPost />} />
          <Route path="/feed" element={<ScrollableFeed />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
