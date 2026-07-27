import React from "react";

export const ChatScreenSkeleton = () => {
  return (
    <div className="chat-screen-skeleton flex flex-col h-full w-full bg-(--bg-primary) overflow-hidden animate-pulse">
      {/* 1. HEADER SKELETON */}
      <div className="header-skeleton w-full h-17 border-b border-(--border-color) bg-(--bg-primary) px-4 py-3 flex items-center justify-between">
        {/* User Info Skeleton */}
        <div className="flex gap-3 items-center">
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 rounded-full bg-(--bg-secondary) shrink-0" />

          {/* Name & Username Skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-4.5 w-32 bg-(--bg-secondary) rounded-md" />
            <div className="h-3.5 w-20 bg-(--bg-secondary) rounded-md" />
          </div>
        </div>

        {/* Action Icons Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-(--bg-secondary)" />
          <div className="w-10 h-10 rounded-full bg-(--bg-secondary)" />
        </div>
      </div>

      {/* 2. MESSAGES AREA SKELETON */}
      <div className="main-msg-skeleton flex-1 account-settings overflow-y-auto p-4 space-y-4">
        {[...Array(5)].map((_, indx) => (
          <React.Fragment key={indx}>
            {/* Left Message Skeleton */}
            <div className="flex justify-start">
              <div className="h-10 w-48 bg-(--bg-secondary) rounded-2xl rounded-tl-none" />
            </div>

            {/* Right Message Skeleton */}
            <div className="flex justify-end">
              <div className="h-16 w-64 sm:w-80 bg-(--bg-secondary) rounded-2xl rounded-tr-none" />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* 3. TYPING AREA SKELETON */}
      <div className="send-msg-skeleton w-full p-3 border-t border-(--border-color) bg-(--bg-primary)">
        <div className="flex items-center gap-3">
          {/* Input Box Skeleton */}
          <div className="h-12 flex-1 bg-(--bg-secondary) rounded-2xl" />
          {/* Send Button Skeleton */}
          <div className="w-10 h-10 rounded-full bg-(--bg-secondary) shrink-0" />
        </div>
      </div>
    </div>
  );
};
