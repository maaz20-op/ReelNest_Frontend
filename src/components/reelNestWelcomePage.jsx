import { motion } from "framer-motion";
import { useAuth } from "../features/auth/hooks/useAuth";

export const ReelnestWelcomePage = () => {
  const { userData, isLoading } = useAuth();

  return (
    <div className="flex absolute z-200 w-full inset-0 flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white overflow-hidden px-4">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="flex flex-col items-center text-center z-10 max-w-md w-full">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.1,
          }}
          whileHover={{ scale: 1.05 }}
          className="relative mb-6"
        >
          {/* Outer Pulse Ring */}
          <div className="absolute inset-0 bg-red-600/30 rounded-3xl blur-xl animate-pulse" />

          <img
            src="/reelnest-logo.png"
            alt="ReelNest Logo"
            className="w-28 h-28 md:w-32 md:h-32 object-contain relative z-10 drop-shadow-[0_10px_10px_rgba(220,38,38,0.3)]"
          />
        </motion.div>

        {/* Brand Name Animation */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white via-slate-200 to-red-500 bg-clip-text text-transparent font-sans"
        >
          ReelNest
        </motion.h1>

        {/* Dynamic Tagline Based on User State */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-2 min-h-[40px]"
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-slate-400 font-medium tracking-wide animate-pulse">
                Syncing your entertainment nest...
              </p>
              {/* Sleek Custom Loader Line */}
              <div className="w-32 h-[3px] bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-rose-600 w-1/2 rounded-full animate-[loading_1.5s_infinite_ease-in-out]" />
              </div>
            </div>
          ) : userData ? (
            <div className="space-y-4">
              <p className="text-lg text-slate-300 font-medium">
                Welcome back,{" "}
                <span className="text-red-500 font-semibold">
                  {userData.fullname}
                </span>
                ! ✨
              </p>
              <button className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium rounded-xl shadow-lg shadow-red-950/50 transition-all duration-300 scale-100 hover:scale-105 active:scale-95">
                Go to Dashboard
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-400 font-light">
              Your ultimate cinematic escape awaits.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
