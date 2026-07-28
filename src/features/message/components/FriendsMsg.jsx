import React, { useEffect, useState } from "react";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useConnectionsData } from "../../../hooks/userConnectionData";
import { FriendsMessageListSkeleton } from "../../../skeleton/message/friendsMsgList";
import { socket } from "../../../socketConnection/messagesSocket";
export const FriendsMsgUI = ({
  setIsChatUserBoxSelected,
  setTargetChatUser,
  onlineUsers,
  setOnlineUsers,
}) => {
  const connectionData = useConnectionsData();
  const isLoading = connectionData?.isLoading;
  const friends = connectionData?.connectionList?.Friends || [];

  useEffect(() => {
    socket.on("check-online-friends", (data) => {
      console.log("online users", data);
      setOnlineUsers(data);
    });
  }, []);

  useEffect(() => {
    if (!friends) return;
    const friendsMapped = friends.map((val) => val?.username);

    socket.emit("check-online-friends", {
      friends: friendsMapped,
    });
  }, [friends[0]?._id]);

  if (isLoading) return <FriendsMessageListSkeleton />;
  return (
    <div className="flex h-screen flex-col gap-2 mt-5 px-2 py-3">
      {friends.map((user, indx) => (
        <div
          onClick={() => {
            setIsChatUserBoxSelected(true);
            setTargetChatUser(user);
          }}
          key={indx}
          className="msg-div cursor-pointer  flex items-center justify-between hover:bg-(--bg-secondary) gap-3 px-1 py-3 rounded"
        >
          <div className="relative flex justify-center items-center">
            <Avatar size="md" src={user?.profileImage} />
            {onlineUsers.includes(user?.username) && (
              <span className="bg-green-600 h-3 w-3 rounded-full absolute right-0 bottom-0"></span>
            )}
          </div>

          <p className="text-(--text-primary) w-2/3 font-light line-clamp-1">
            Start Chating with {user?.fullname}
          </p>
          <div className="flex  gap-1 w-1/4 lg:w-1/5">
            <React.Fragment>
              <span
                className={`${onlineUsers.includes(user?.username) ? "bg-green-600" : "bg-zinc-400"} flex ml-auto justify-center items-center text-(--text-primary) p-1 h-3 w-3 rounded-full`}
              />
              <span className="  text-xs text-(--text-muted)">
                {onlineUsers.includes(user?.username)
                  ? " Active Nester"
                  : "Not Active"}
              </span>
            </React.Fragment>
          </div>
        </div>
      ))}
    </div>
  );
};
