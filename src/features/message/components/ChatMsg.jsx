import React from "react";
import { Avatar } from "../../../components/Avatar";
import { Icons } from "../../../assets/icons";

export const ChatMsg = () => {
  return (
    <div className="main-msg-screen flex flex-col ">
      {[...Array(12)].map((_, indx) => (
        <React.Fragment key={indx}>
          <p className="left px-2 py-2 max-w-[60%] text-(--text-primary) bg-(--bg-tertiary) w-fit rounded-r-2xl">
            Hi this is Malaika{" "}
          </p>
          <p className="right px-2 ml-auto py-2 max-w-[60%] text-black bg-red-400  w-fit rounded-r-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            sunt. Sunt, quam nemo repellendus placeat ipsa, tempora, fugit quod
            corporis incidunt autem dolorum atque recusandae unde ipsam rem
            pariatur quasi.
          </p>
        </React.Fragment>
      ))}
    </div>
  );
};

export const ChatScreenHeader = ({ iconsColor, isDark }) => {
  return (
    <div className="header-chat-screen bg-(--bg-primary)  w-full h-17 ">
      <div className="user-info flex  items-center justify-between px-2 py-3 rounded">
        <div className="flex gap-3 items-center">
          <Avatar size="lg" />
          <div className="div-content lg:w-30 xl:w-45 leading-6  overflow-hidden flex  flex-col">
            <h1 className="text-[18px] line-clamp-1 text-(--text-primary) ">
              Malaika Qamar
            </h1>
            <h2 className="text-sm  line-clamp-1 text-(--text-secondary)">
              @angel-20
            </h2>
          </div>
        </div>
        <div className="flex lg:gap-5 xl:gap-10 pr-5">
          <div
            className={`${isDark ? "hover:bg-red-500 " : "hover:bg-red-300 "} p-2  flex justify-center items-center  rounded-full`}
          >
            <Icons.call size={23} color={iconsColor} />
          </div>
          <div
            className={`${isDark ? "hover:bg-red-500 " : "hover:bg-red-300 "} p-2  flex justify-center items-center  rounded-full`}
          >
            <Icons.videoCall size={23} color={iconsColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatScreenTypingArea = ({ iconsColor }) => {
  return (
    <div className="send-msg-input w-full h-22 p-2 ">
      <form className="flex items-center gap-15">
        <textarea
          className="p-2 rounded-2xl account-settings resize-none text-(--text-primary) flex-1 focus:border-red-700 outline-none border-2 border-(--border-color)"
          type="text"
          placeholder="Write Your Message"
        />
        <Icons.send
          className={`text-${iconsColor}  hover:text-red-600`}
          size={30}
        />
      </form>
    </div>
  );
};
