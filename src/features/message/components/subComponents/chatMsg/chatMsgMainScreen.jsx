import React, { useState } from "react";
import { VirtualList } from "../../../../../utils/useVirtualization";
import { TooltipMenu } from "../../../../../utils/tooltip";

export const ChatMsgScreen = ({
  handleScroll,
  chatContainerRef,
  msgs,
  messagesEndRef,
  selectedChatUser,
  user,
  deleteMsg,
  setApiData,
}) => {
  const [isToolTipOpen, setToolTipOpen] = useState(false);
  const [currentToolTipId, setCurrentToolTipId] = useState(null);
  return (
    <div
      onScroll={handleScroll}
      ref={chatContainerRef}
      className="main-msg-screen  account-settings flex-1 overflow-y-auto p-4 space-y-4"
    >
      {msgs && msgs?.length > 0 && (
        <VirtualList
          mainContainerRef={chatContainerRef}
          data={msgs}
          itemRendered={(msg) => {
            const isMe = msg?.senderId?.toString() === user?._id?.toString();
            const chatUserMsg =
              msg?.senderId?.toString() === selectedChatUser?._id?.toString();

            const msgCreatedDate = new Date(msg?.createdAt || Date.now());
            const date = msgCreatedDate.toLocaleDateString("en-GB");
            const time = msgCreatedDate.toLocaleTimeString("en-US", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <React.Fragment key={msg?._id || msg?.createdAt}>
                {chatUserMsg && (
                  <div className="flex flex-col gap-2 justify-start my-2">
                    <div className="flex gap-2">
                      <span className="text-(--text-secondary) text-xs">
                        {date}
                      </span>
                      <span className="text-(--text-secondary) text-xs">
                        {time}
                      </span>
                    </div>
                    <p className="px-4 py-2.5 max-w-[70%] sm:max-w-[60%] text-(--text-primary) bg-(--bg-tertiary) rounded-2xl rounded-tl-none shadow-sm">
                      {msg?.msg}
                    </p>
                  </div>
                )}
                {isMe && (
                  <div
                    onClick={() => {
                      setToolTipOpen((prev) => !prev);
                      setCurrentToolTipId(msg?._id);
                    }}
                    className="flex relative flex-col items-end my-2"
                  >
                    {isToolTipOpen && currentToolTipId === msg?._id && (
                      <TooltipMenu
                        className="top-16"
                        options={[
                          {
                            action: () => {
                              if (msg?._id) {
                                deleteMsg(msg?._id);
                                setApiData((prev) =>
                                  prev.filter(
                                    (allMsgs) =>
                                      allMsgs?._id.toString() !==
                                      msg?._id.toString(),
                                  ),
                                );
                              }
                            },
                            label: "Delete",
                          },
                        ]}
                      />
                    )}
                    <div className="flex gap-2">
                      <span className="text-(--text-secondary) text-xs">
                        {date}
                      </span>
                      <span className="text-(--text-secondary) text-xs">
                        {time}
                      </span>
                    </div>
                    <p className="px-4 py-2.5 max-w-[70%] sm:max-w-[60%] text-white bg-purple-500 rounded-2xl rounded-tr-none shadow-sm">
                      {msg?.msg}
                    </p>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
