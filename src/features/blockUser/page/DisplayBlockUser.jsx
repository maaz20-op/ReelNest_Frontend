import React from "react";
import {
  useGetBlockedUsersQuery,
  useUnblockOtherUserMutation,
} from "../../../services/users/user";
import { DisplayBlockedUsersSkeleton } from "../../../skeleton/displayBlockedUsers/displayBlockedUser";

export const DisplayBlockUsers = () => {
  const { data, isLoading } = useGetBlockedUsersQuery();
  const users = data?.data[0];

  const [unblock] = useUnblockOtherUserMutation();

  if (isLoading) return <DisplayBlockedUsersSkeleton />;

  return (
    <div
      className="min-h-0 overflow-y-scroll account-settings p-4 transition-colors duration-300 sm:p-6 md:p-8 lg:p-12"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Top Heading Section */}
      <div
        className="max-w-7xl mx-auto mb-6 border-b pb-4 flex items-center justify-between"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Blocked Users
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage the profiles you have restricted.
          </p>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-semibold bg-red-500/10"
          style={{ color: "var(--accent)" }}
        >
          {users?.length || isLoading ? "Loading..." : 0} Total
        </span>
      </div>

      {/* Responsive Grid Layout */}
      <div className="max-w-7xl h-screen  mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.isArray(users) &&
            users.map(({ _id, fullname, username, profileImage }) => (
              <div
                key={_id}
                className="flex flex-col items-center p-5 rounded-xl border transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* User Avatar */}
                <img
                  src={profileImage}
                  alt={username}
                  className="w-20 h-20 rounded-full object-cover border-2"
                  style={{ borderColor: "var(--accent)" }}
                />

                {/* User Identity */}
                <h2 className="mt-3 font-semibold text-base text-center line-clamp-1">
                  {fullname}
                </h2>
                <p
                  className="text-xs mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  {username}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => unblock(_id)}
                  className="w-full py-2 px-4 rounded-lg font-medium text-sm text-white transition-colors duration-200"
                  style={{ backgroundColor: "var(--follow-btn-bg)" }}
                >
                  Unblock
                </button>
              </div>
            ))}
        </div>
        {!isLoading && Array.isArray(users) && users.length === 0 && (
          <p className="text-center text-(--text-primary)">
            No Users Blocked By You!
          </p>
        )}
      </div>
    </div>
  );
};
