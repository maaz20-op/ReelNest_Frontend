import React from "react";
import { Avatar } from "../../components/reusableComponents/Avatar";

export const MainChatScreenTopHeaderSkeleton = () => {
  return (
    <div className="header-chat-screen bg-(--bg-primary)  w-full h-20 ">
      <div className="user-info flex  items-center justify-between px-2 py-3 rounded">
        <div className="flex gap-3 justify-center items-center">
          <Avatar size="lg" skeleton={true} />
          <div className="div-content lg:w-30 xl:w-45 py-2  gap-2  flex  flex-col">
            <div className=" h-4 bg-(--bg-secondary)" />
            <div className="h-3 bg-(--bg-secondary)" />
          </div>
        </div>
        <div className="flex lg:gap-5 xl:gap-10 pr-5">
          <div className="p-2  flex justify-center items-center gap-2 ">
            <div className="h-10 w-10 bg-(--bg-secondary) rounded-full" />
            <div className="h-10 w-10 bg-(--bg-secondary) rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const MainChatScreenSkeleton = () => {
  return (
    <div className="main-msg-screen  animate-pulse w-full flex flex-col ">
      {[...Array(8)].map((_, indx) => (
        <React.Fragment key={indx}>
          <div className="left px-2 W-10 flex flex-col gap-2 justify-center items-start lg:w-30 xl:w-50   h-20  bg-(--bg-secondary)  rounded-r-2xl">
            <div className="w-9/10 h-1/5  rounded-2xl  bg-(--bg-primary)" />
            <div className="w-9/10 h-1/5   rounded-2xl  bg-(--bg-primary)" />
          </div>
          <div className="right px-2 W-10 flex flex-col gap-2 justify-center items-start lg:w-30 xl:w-50   h-20 ml-auto bg-(--bg-secondary)  rounded-r-2xl">
            <div className="w-9/10 h-1/5  rounded-2xl  bg-(--bg-primary)" />
            <div className="w-9/10 h-1/5   rounded-2xl  bg-(--bg-primary)" />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export const MainChatScreenTypingAreaSkeleton = () => {
  return (
    <div className="send-msg-input w-full border-t-2 border-(--border-color) h-20 flex justify-between p-2 ">
      <div className="p-2 rounded-2xl w-4/5 h-8 bg-(--bg-secondary) " />
      <div className="h-10 w-10 bg-(--bg-secondary) rounded-full" />
    </div>
  );
};
