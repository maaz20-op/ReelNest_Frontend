import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/Login";
import { SignupPage } from "../features/auth/pages/Signup";
import { Children } from "react";
import { FeedPage } from "../features/feed/pages/Feed";
import { Profile } from "../features/profile/pages/Profile";
import { AccountSettings } from "../features/accountSettings/pages/accountPage";
import { Message_Users_Page } from "../features/message/pages/Message_Users_Page";
import { OthersProfile } from "../features/othersprofile/pages/OtherProfile";
import { Upgrade } from "../features/upgrade/pages/UpgradePage";
import { PostCreationPage } from "../features/postCreation/pages/postCreationPage";
import { Save } from "lucide-react";
import { SavedPost } from "../features/savedPosts/pages/savedPosts";

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
