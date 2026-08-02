import React from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../contexts/socketContext";

export const IncomingCallPopup = ({
  callingUser,
  setIsCallIncoming,
  setCallAccepted,
}) => {
  const { socket } = useSocketContext();

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-[400px] md:w-[450px] lg:w-[480px] xl:w-[500px] 2xl:w-[540px] p-4 sm:p-5 md:p-6 rounded-2xl shadow-2xl border transition-all duration-300 ease-in-out bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)]">
      {/* Header / Subtitle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {/* Pulsing Incoming Call Indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[var(--success)]" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--success)]" />
          </span>
          <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-[var(--text-secondary)]">
            Incoming Video Call
          </span>
        </div>

        <span className="text-xs px-2 py-0.5 rounded-full border bg-[var(--bg-tertiary)] text-[var(--text-muted)] border-[var(--border-color)]">
          HD
        </span>
      </div>

      {/* Caller Details Section */}
      <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
        {/* Avatar with Ring */}
        <div className="relative flex-shrink-0">
          <img
            src={callingUser?.profileImage}
            alt="Caller Avatar"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-[var(--border-color)]"
          />
          {/* Active ring highlight */}
          <div className="absolute inset-0 rounded-full animate-pulse border-2 border-[var(--success)]" />
        </div>

        {/* Name & Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold truncate text-[var(--text-primary)]">
            {callingUser?.fullname}
          </h3>
          <p className="text-xs sm:text-sm truncate text-[var(--text-secondary)]">
            @{callingUser?.username}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {/* Decline Button */}
        <button
          onClick={() => {
            setCallAccepted(false);
            setIsCallIncoming(false);
            socket.emit("call:ended", {
              to: callingUser?.username,
              declined: true,
            });
          }}
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl font-medium text-xs sm:text-sm md:text-base text-white transition-all transform active:scale-95 hover:opacity-90 shadow-lg bg-[var(--error)]"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 rotate-[135deg]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57a1 1 0 01-.27 1.12l-2.2 2.2z" />
          </svg>
          <span>Decline</span>
        </button>

        {/* Accept Button */}
        <button
          onClick={() => {
            setCallAccepted(true);
            setIsCallIncoming(false);
          }}
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl font-medium text-xs sm:text-sm md:text-base text-white transition-all transform active:scale-95 hover:opacity-90 shadow-lg bg-[var(--success)]"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.57a1 1 0 01-.27 1.12l-2.2 2.2z" />
          </svg>
          <span>Accept</span>
        </button>
      </div>
    </div>
  );
};
