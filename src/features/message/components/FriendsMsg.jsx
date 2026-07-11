import { useEffect } from "react";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useConnectionsData } from "../../../hooks/userConnectionData";

export const FriendsMsgUI = () => {
  const connectionData = useConnectionsData();

  const friends = connectionData?.connectionList?.Friends || [];
  return (
    <div className="flex  flex-col gap-2 mt-5 px-2 py-3">
      {friends.map(({ profileImage }, indx) => (
        <div
          key={indx}
          className="msg-div cursor-pointer  flex items-center justify-between hover:bg-(--bg-secondary) gap-3 px-1 py-3 rounded"
        >
          <Avatar size="md" src={profileImage} />

          <p className="text-(--text-primary) w-2/3 font-light line-clamp-1">
            Hi this is maaz app
          </p>
          <div className="flex flex-col gap-1 w-1/6">
            <span className="bg-red-600 flex ml-auto justify-center items-center text-(--text-primary) p-1 h-5 w-5 rounded-full">
              1
            </span>
            <span className="  text-xs text-(--text-muted)">12:00 pm</span>
          </div>
        </div>
      ))}
    </div>
  );
};
