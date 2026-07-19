import React, { useEffect, useState } from "react";
import {
  Search,
  UserPlus,
  Play,
  Heart,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import { GridMediaLayoutProfile } from "../../profile/components/GridMediaLayout";
import { GridVideoLayoutSkeleton } from "../../../skeleton/video/GridVideoSkeleton";
import { useConnectionsData } from "../../../hooks/userConnectionData";
import { Avatar } from "../../../components/reusableComponents/Avatar";
import { Button } from "../../../components/reusableComponents/Button";
import { useSearchContext } from "../../../contexts/seachContext";
import { useLazyGetSearchResultsQuery } from "../../../services/posts/post";
import { useFollowUser } from "../../../hooks/useFollowUser";

export function SearchResults() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Images", "Videos", "Users"];

  const { searchQuery, isSearchBtnClick } = useSearchContext();
  const [getSearchResults, { data, isLoading }] =
    useLazyGetSearchResultsQuery();

  useEffect(() => {
    if (!searchQuery || !isSearchBtnClick) return;

    const callBackend = async () => {
      try {
        await getSearchResults(searchQuery);
      } catch (err) {
        console.error(err);
      }
    };

    callBackend();
  }, [searchQuery, isSearchBtnClick]);

  const suggestedAccounts = useConnectionsData()?.connectionList?.Followers;
  const videoPosts =
    Array.isArray(data?.data[0]) &&
    data?.data[0].filter((p) => p?.mediaType !== "image");

  const imagesPosts =
    Array.isArray(data?.data[0]) &&
    data?.data[0].filter((p) => p?.mediaType !== "video");

  return (
    <div className="min-h-0 overflow-y-auto  account-settings bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Tabs */}

        <div className="sticky -top-1 z-20 mb-8 border-b border-[var(--border-color)] bg-[var(--bg-primary)] py-3">
          <div className="flex gap-3 overflow-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-2 transition
                ${
                  activeTab === tab
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-secondary)] hover:bg-[var(--hover-bg)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Videos */}

        {(activeTab === "Videos" || activeTab === "All") && (
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-2">
              <h2 className="text-2xl font-bold">Videos</h2>
            </div>
            {isLoading ? (
              <GridVideoLayoutSkeleton />
            ) : (
              <GridMediaLayoutProfile
                posts={videoPosts}
                isSearchPage={true}
                isVideoTab={true}
              />
            )}
          </section>
        )}

        {/* Accounts */}
        {(activeTab === "Users" || activeTab === "All") && (
          <section className="mb-12">
            <h2 className="mb-5 text-2xl font-bold">Accounts</h2>

            <div className="space-y-4">
              {Array.isArray(suggestedAccounts) &&
                suggestedAccounts.map(({ data: user }) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar size="md" src={user?.profileImage} />

                      <div>
                        <h3 className="font-semibold">{user?.fullname}</h3>

                        <p className="text-sm text-[var(--text-secondary)]">
                          @{user?.username}
                        </p>
                      </div>
                    </div>

                    <Button content={"Follow"} background="bg-pink-600" />
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Images */}
        {(activeTab === "Images" ||
          (activeTab === "All" && imagesPosts.length !== 0)) && (
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-2">
              <h2 className="text-2xl font-bold">Images</h2>
            </div>

            {!isLoading ? (
              <GridMediaLayoutProfile
                posts={imagesPosts}
                isSearchPage={true}
                isVideoTab={false}
              />
            ) : (
              <GridVideoLayoutSkeleton />
            )}
          </section>
        )}
      </div>
    </div>
  );
}
