import { Profiler, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Icons } from "../../../assets/icons";
import { ThemeContext } from "../../../contexts/theme";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useConnectionsData } from "../../../hooks/userConnectionData";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { useNavigate } from "react-router-dom";
import { handleRedirectToUserProfile } from "../../../utils/handleRedirectToUserProfile";
import { useGetUserConnectionsByIdQuery } from "../../../services/users/user";
import { ConnectionUserCardSkeleton } from "../../../skeleton/connections/connectionDivSkeleton";

const tabs = ["Friends", "Followers", "Following"];

export const ConnectionInfo = ({
  isConnectionInfoClicked,
  setIsConnectionClicked,
  connectionCate,
  isLoading,
  userId,
}) => {
  const [activeTab, setActiveTab] = useState("Friends");
  const [search, setSearch] = useState("");
  const { iconsColor } = contextThemeSetup();

  const navigate = useNavigate();

  if (!isConnectionInfoClicked) return null;

  const users = useMemo(() => {
    return connectionCate[activeTab].filter(
      (user) =>
        user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        user?.data?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        user?.username?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [activeTab, search, userId]);

  return (
    <div className="absolute left-1/2 bottom-0 z-50     h-[80%] md:top-20   w-full md:w-[470px]  -translate-x-1/2 rounded-2xl border border-zinc-800 bg-[var(--bg-primary)] text-white shadow-2xl overflow-hidden">
      {/* Search */}
      <div className="p-4 flex gap-4 items-center border-b border-zinc-800">
        <Icons.back
          size={20}
          color={iconsColor}
          onClick={() => setIsConnectionClicked(false)}
        />
        <div className="flex items-center gap-3 flex-1 rounded-xl bg-(--bg-secondary) px-4 py-3">
          <Search size={18} className="text-zinc-400" />

          <input
            type="text"
            placeholder={`Search ${activeTab}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b text-(--text-primary) border-(--bg-primary)">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold transition-all
              ${
                activeTab === tab
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-red-600 "
              }`}
          >
            {tab}
            <span className="ml-1 text-red-600 text-xs">
              ({connectionCate[tab].length})
            </span>
          </button>
        ))}
      </div>

      {/* Users */}
      <div className="max-h-[420px] overflow-y-auto account-settings">
        {!isLoading && users.length === 0 && (
          <div className="py-10 text-center text-zinc-500">No users found.</div>
        )}

        {!isLoading ? (
          users.map((user) => {
            const uniqueId = crypto.randomUUID();
            return (
              <div
                onClick={handleRedirectToUserProfile(
                  user?._id,
                  user?.fullname,
                  navigate,
                )}
                key={uniqueId}
                className="flex items-center justify-between px-4 py-3 hover:bg-(--bg-secondary) transition"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    size="md"
                    src={user?.profileImage || user?.data?.profileImage}
                  />

                  <div>
                    <p className="font-medium text-base text-(--text-primary)">
                      {user.fullname || user?.data?.fullname}
                    </p>
                    <p className="text-sm text-(--text-secondary)">
                      @{user.username || user?.data?.username}
                    </p>
                  </div>
                </div>

                <button className="rounded-full border border-(--border-color) px-4 py-1.5 text-sm hover:bg-(--bg-secondary) text-(--text-primary)">
                  View
                </button>
              </div>
            );
          })
        ) : (
          <ConnectionUserCardSkeleton />
        )}
      </div>
    </div>
  );
};
