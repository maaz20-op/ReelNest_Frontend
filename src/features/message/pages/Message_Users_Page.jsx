import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { Chat_Msg } from "../components/Chat_Msg";
import { Friends_Msg_UI } from "../components/FriendsMsg";

export const Message_Users_Page = () => {
  const { iconsColor } = contextThemeSetup();

  return (
    <div className="w-full flex flex-col min-h-0  ">
      {/* Header */}
      <div className="py-4 ">
        <h1 className="text-center text-2xl text-(--text-primary)">My Chats</h1>
      </div>

      {/* Messages Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0    border-t-2 border-(--border-color)">
        {/* Friends Msg UI */}
        <div className="all-messages flex flex-col  min-h-0  account-settings overflow-y-auto rounded-xl">
          <Friends_Msg_UI />
        </div>
        {/* Main Chat Screen */}
        <div className="main-chat-screen lg:block  min-h-0">
          <div className="header-chat-screen bg-(--bg-primary)  w-full h-17 ">
            <div className="user-info flex  items-center justify-between px-2 py-3 rounded">
              <div className="flex gap-3 items-center">
                <div className="profile-img h-12 flex shrink-0 w-12 rounded-full ">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://iili.io/BZuCZ57.jpg"
                    alt=""
                  />
                </div>
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
                <Icons.call size={23} color={iconsColor} />
                <Icons.videoCall size={23} color={iconsColor} />
              </div>
            </div>
          </div>

          {/* Main Msg Screen */}
          <div className="main-msg-screen relative  h-4/6 overflow-y-auto p-2 account-settings">
            <Chat_Msg />
          </div>
          <div className="send-msg-input w-full h-22 p-2 ">
            <form className="flex items-center gap-15">
              <textarea
                className="p-2 rounded-2xl account-settings resize-none text-(--text-primary) w-5/7  focus:border-red-700 outline-none border-2 border-(--border-color)"
                type="text"
                placeholder="Write Your Message"
              />
              <Icons.send color={iconsColor} size={30} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
