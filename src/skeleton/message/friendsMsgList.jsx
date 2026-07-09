import { Avatar } from "../../components/reusableComponents/Avatar";

export const FriendsMessageListSkeleton = () => {
  return (
    <div className="flex overflow-hidden flex-col gap-2 mt-5 px-2 py-3">
      {[...Array(8)].map((_, indx) => (
        <div
          key={indx}
          className="msg-div cursor-pointer  flex items-center justify-between  gap-3 px-1 py-3 rounded"
        >
          <Avatar skeleton={true} size="md" />

          <div className="bg-(--bg-secondary) w-2/3 h-4 rounded-xl" />
          <div className="flex flex-col gap-1 w-1/6">
            <div className="bg-red-600 flex ml-auto justify-center items-center  p-1 h-5 w-5 rounded-full" />

            <div className="bg-(--bg-secondary) h-4 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
};
