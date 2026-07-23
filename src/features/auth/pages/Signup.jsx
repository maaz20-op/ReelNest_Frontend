import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icons } from "../../../assets/icons";
import { Button } from "../../../components/reusableComponents/Button";
import { useSignupUserMutation } from "../../../services/auth/auth";
import { Loader } from "../../../components/reusableComponents/Loader";

export const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupUser, { isLoading }] = useSignupUserMutation();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (fullname && username && email && password) {
      const res = await signupUser({
        fullname,
        username,
        email,
        password,
      });
      if (res?.data) navigate("/login");
    }
  };

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-[92%] sm:w-full max-w-xs sm:max-w-md lg:max-w-md mx-auto rounded-2xl p-4 sm:p-6 lg:p-7 backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-slate-800/60 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-red-500/10">
        {/* 🌈 Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-400" />

        {/* 🔥 Compact Heading & Subtitle */}
        <div className="text-center space-y-1 mb-4 sm:mb-5 mt-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-(--text-primary)">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">
              ReelNest
            </span>
          </h1>
          <p className="text-[11px] sm:text-xs lg:text-sm text-(--text-secondary) opacity-80">
            Start Your Creator Journey Today!
          </p>
        </div>

        {/* 📝 Form Section */}
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-2.5 sm:gap-3"
        >
          {/* Full Name Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
              {Icons.user ? (
                <Icons.user className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              ) : (
                <span className="text-xs">👤</span>
              )}
            </div>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300/40 dark:border-slate-700/60 bg-white/5 text-(--text-primary) placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
            />
          </div>

          {/* Username Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
              {Icons.username || Icons.at ? (
                <Icons.username className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              ) : (
                <span className="text-xs">🏷️</span>
              )}
            </div>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300/40 dark:border-slate-700/60 bg-white/5 text-(--text-primary) placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
              {Icons.email ? (
                <Icons.email className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              ) : (
                <span className="text-xs">📧</span>
              )}
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300/40 dark:border-slate-700/60 bg-white/5 text-(--text-primary) placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
              {Icons.password ? (
                <Icons.password className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              ) : (
                <span className="text-xs">🔒</span>
              )}
            </div>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300/40 dark:border-slate-700/60 bg-white/5 text-(--text-primary) placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
            />
          </div>

          {/* ❤️ Primary Action Button */}
          <div className="mt-1">
            <Button
              fnc={handleSignup}
              padding="sm"
              background="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
              border="rounded-xl shadow-md shadow-red-600/30 hover:shadow-red-600/50"
              disable={isLoading}
              content={
                !isLoading ? (
                  <span className="font-semibold text-white tracking-wide text-xs sm:text-sm py-0.5 inline-block">
                    Sign Up
                  </span>
                ) : (
                  <div className="flex justify-center items-center gap-2 py-0.5">
                    <span className="font-medium text-white text-xs sm:text-sm">
                      Creating Account...
                    </span>
                    <Loader size="sm" color="white" />
                  </div>
                )
              }
              width="w-full"
            />
          </div>

          {/* Login Redirect Link */}
          <p className="text-center text-[11px] sm:text-xs text-(--text-primary)">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-bold text-red-500 hover:text-red-600 hover:underline transition-colors focus:outline-none"
            >
              Login now
            </button>
          </p>

          {/* Divider */}
          <div className="relative my-1.5 sm:my-2 flex items-center justify-center">
            <div className="border-t border-gray-300/30 dark:border-slate-700/60 w-full" />
            <span className="bg-transparent px-2 text-[9px] sm:text-[10px] font-semibold text-(--text-secondary) uppercase tracking-wider whitespace-nowrap absolute">
              Or signup with
            </span>
          </div>

          {/* ⚡ Google Auth Button */}
          <button
            type="button"
            onClick={() => {
              window.location.href =
                "https://reel-nest-backend.vercel.app/api/v1/auth/google";
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-(--text-primary) bg-white/10 dark:bg-slate-800/40 hover:bg-white/20 dark:hover:bg-slate-800/70 border border-white/10 dark:border-slate-700/40 transition-all duration-200 active:scale-[0.98] font-medium text-xs shadow-sm"
          >
            {Icons.google && <Icons.google className="w-4 h-4" />}
            <span>Signup with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};
