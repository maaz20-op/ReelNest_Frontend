import { Button } from "../../../reusableComponents/Button";
import { Avatar } from "../../../Avatar";
import { useNavigate } from "react-router-dom";

export const FriendsList = ({
  elementRef,
  isHoverd,
  isDark,
  followersList,
}) => {
  const navigate = useNavigate();
  return (
    <div
      ref={elementRef}
      className={`${isHoverd ? "overflow-y-auto" : "overflow-y-hidden"} other-profile-container  flex flex-col gap-2 flex-1 min-h-0  mt-5  py-5 `}
    >
      {followersList?.length > 0 &&
        followersList.map((data, indx) => (
          <div
            key={indx}
            onClick={() =>
              navigate("/profile", {
                state: {
                  userId: data?.data?._id || data?._id,
                },
              })
            }
            className="friend-div flex items-center justify-center lg:gap-1 xl:gap-2 px-2 py-3 rounded"
          >
            <Avatar
              size="md"
              src={data?.data?.profileImage || data?.profileImage}
            />
            <div className="div-content lg:w-40 xl:w-45 overflow-hidden flex  flex-col">
              <h1 className="text-sm line-clamp-1 text-(--text-primary) ">
                {data?.data?.fullname || data?.fullname}
              </h1>
              <h2 className="text-sm  line-clamp-1 text-(--text-secondary)">
                {data?.data?.username || data?.username}
              </h2>
            </div>

            <Button
              background="bg-tranparent"
              content="Message"
              font="font-medium"
              textSize="sm"
              border="rounded-2xl"
              otherStyles={`${isDark ? "hover:bg-red-500" : "hover:bg-red-300"} hover:scale-[1.04] duration-300 border border-(--border-color)`}
            />
          </div>
        ))}
    </div>
  );
};
