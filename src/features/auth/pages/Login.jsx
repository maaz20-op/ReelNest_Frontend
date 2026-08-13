import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Icons } from "../../../assets/icons";
import { Button } from "../../../components/reusableComponents/Button";
import { useLoginUserMutation } from "../../../services/auth/auth";
import { Loader } from "../../../components/reusableComponents/Loader";
import { useAuth } from "../hooks/useAuth";

import { FaExclamationTriangle, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useToastContext } from "../../../contexts/toast";
import { AuthContext } from "../../../contexts/authContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    user,
    setUser,
    isLoading: userLoading,
    error,
  } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { showToast } = useToastContext();

  useEffect(() => {
    let isMounted = true;

    if (!userLoading && user?._id && !isSubmit && !error) {
      if (isMounted) {
        showToast(
          "You are already logged in. To switch accounts, please log out first!",
          true,
        );
        navigate("/", { replace: true });
      }
    }

    return () => {
      isMounted = false;
      setSubmit(false);
    };
  }, [userLoading, error, user?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMsg("Email can't be Empty!");
      return;
    }
    if (!email.includes("@")) {
      setErrorMsg("Email must be a valid email!");
      return;
    }
    if (!password.trim()) {
      setErrorMsg("Password can't be Empty!");
      return;
    }

    setErrorMsg("");

    try {
      const res = await loginUser({ email, password }).unwrap();

      if (res?.data && res?.success) {
        localStorage.setItem("logout", "false");
        setSubmit(true);
        setUser(res.data[0]);
        navigate("/");
        showToast("Login Successful!", true);
      }
    } catch (err) {
      console.log(err);
      setSubmit(false);
      showToast(`${err?.data?.error || "Something Went Wrong"}`, false);
    }
  };

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-[92%] sm:w-full max-w-xs sm:max-w-md lg:max-w-md mx-auto rounded-2xl p-4 sm:p-6 lg:p-7 backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-slate-800/60 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-red-500/10">
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-400" />

        {/* Heading & Subtitle */}
        <div className="text-center space-y-1 mb-4 sm:mb-5 mt-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-(--text-primary)">
            Welcome Back to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">
              ReelNest
            </span>
          </h1>
          <p className="text-[11px] sm:text-xs lg:text-sm text-(--text-secondary) opacity-80">
            Enter your details to access your account
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2.5 sm:gap-3.5"
        >
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
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300/40 dark:border-slate-700/60 bg-white/5 text-(--text-primary) placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
            />
          </div>

          {/* Password Input */}
          <div className="relative group flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
              {Icons.password ? (
                <Icons.password className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              ) : (
                <span className="text-xs">🔒</span>
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300/40 dark:border-slate-700/60 bg-white/5 text-(--text-primary) placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          {/* Error Message Display */}
          {errorMsg && (
            <div className="text-xs flex items-center gap-2 text-red-500 font-medium my-1">
              <FaExclamationTriangle className="text-yellow-500 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          {/* Login Button */}
          <div className="mt-1">
            <Button
              fnc={handleSubmit}
              padding="sm"
              background="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
              border="rounded-xl shadow-md shadow-red-600/30 hover:shadow-red-600/50"
              disable={isLoading}
              content={
                !isLoading ? (
                  <span className="font-semibold text-white tracking-wide text-xs sm:text-sm py-0.5 inline-block">
                    Login
                  </span>
                ) : (
                  <div className="flex justify-center items-center gap-2 py-0.5">
                    <span className="font-medium text-white text-xs sm:text-sm">
                      Logging In...
                    </span>
                    <Loader size="sm" color="white" />
                  </div>
                )
              }
              width="w-full"
            />
          </div>

          {/* Signup Link */}
          <p className="text-center text-[11px] sm:text-xs text-(--text-primary)">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-bold text-red-500 hover:text-red-600 hover:underline transition-colors focus:outline-none"
            >
              Sign up now
            </button>
          </p>

          <div className="relative my-1.5 sm:my-2.5 flex items-center justify-center">
            <div className="border-t border-gray-300/30 dark:border-slate-700/60 w-full" />
            <span className="bg-transparent px-2 text-[9px] sm:text-[10px] font-semibold text-(--text-secondary) uppercase tracking-wider whitespace-nowrap absolute">
              Or continue with
            </span>
          </div>

          {/* Social Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "https://reelnestbackend-production.up.railway.app/api/v1/auth/google";
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-(--text-primary) bg-white/10 dark:bg-slate-800/40 hover:bg-white/20 dark:hover:bg-slate-800/70 border border-white/10 dark:border-slate-700/40 transition-all duration-200 active:scale-[0.98] font-medium text-xs shadow-sm"
            >
              {Icons.google && <Icons.google className="w-4 h-4" />}
              <span>Login with Google</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/forgot/password")}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-[11px] sm:text-xs text-(--text-secondary) hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 font-medium"
            >
              {Icons.password && <Icons.password className="w-3.5 h-3.5" />}
              <span>Forgot Password?</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
