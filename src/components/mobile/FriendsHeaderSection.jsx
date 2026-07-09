import { Icons } from "../../assets/icons";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useGetFollowersQuery } from "../../services/users/user";
import { contextThemeSetup } from "../../utils/contextSetup";
import { Avatar } from "../reusableComponents/Avatar";

export const FriendSection = () => {
  const { user } = useAuth();
  const { iconsColor } = contextThemeSetup();

  return (
    <div className="wrapper lg:hidden">
      <div className="h-30 max-w-full flex  items-center">
        <div className="friends-container w-[95%] mx-auto flex overflow-x-auto  gap-1 px-2 py-2 ">
          <div className="friend-card flex gap-1 justify-center items-center flex-col   px-2 py-2 rounded-2xl text-(--text-primary)">
            <div className="h-14 relative w-14 rounded-full object-cover bg-black">
              <img
                className="w-full h-full rounded-full"
                src={user?.profileImage}
                alt="user profile"
              />
              <Icons.plus
                className="absolute bottom-0 -left-2"
                color={iconsColor}
                size={19}
              />
            </div>
            <h1 className="text-(--text-secondary) font-bold">You</h1>
          </div>
          {[...Array(14)].map((_, indx) => (
            <div
              key={indx}
              className="friend-card flex gap-1 justify-center items-center flex-col   px-2 py-2 rounded-2xl text-(--text-primary)"
            >
              <div className="h-14 w-14 rounded-full object-cover bg-black">
                <img
                  className="w-full h-full rounded-full"
                  src="https://iili.io/BZuCZ57.jpg"
                  alt="user profile"
                />
              </div>
              <h1 className="text-(--text-secondary)">Malaika</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
