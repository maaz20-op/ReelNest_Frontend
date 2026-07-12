import { Grid2X2 } from "lucide-react";
import { BorderDiv } from "../../../utils/BorderDiv";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { GridMediaLayoutProfile } from "../../profile/components/GridMediaLayout";
import { useAuth } from "../../auth/hooks/useAuth";
import { GridVideoLayoutSkeleton } from "../../../skeleton/video/GridVideoSkeleton";
import {
  useGetSavedImagePostsQuery,
  useGetSavedVideoPostsQuery,
} from "../../../services/pins/pin";
import { VideosImagesToggleTab } from "../../../components/reusableComponents/videosImagesTab";
import { useState } from "react";

export const SavedPost = () => {
  const { isDark } = contextThemeSetup();
  const { user } = useAuth();
  const [isVideoTab, setVideoTab] = useState(true);

  // fetch saved videos

  const {
    data: savedPostsVideo,
    isLoading,
    error,
  } = useGetSavedVideoPostsQuery();
  const savedVideoPins = savedPostsVideo?.data?.[0] || [];

  // fetch saved images
  const { data: savedPostsImage } = useGetSavedImagePostsQuery();
  const savedImagesPins = savedPostsImage?.data[0] || [];

  return (
    <div className="p-3 min-h-0 flex flex-col">
      <h1 className="text-(--text-primary) mt-4 text-2xl text-center font-bold">
        Saved Posts
      </h1>

      {/* Images videos toggle */}
      <VideosImagesToggleTab setVideoTab={setVideoTab} />
      <BorderDiv />

      <div className="min-h-0 account-settings overflow-y-auto w-full h-full">
        {savedVideoPins.length === 0 && isVideoTab && (
          <div className="text-(--text-primary) h-full w-full flex justify-center items-center">
            No Saved video Posts yet...
          </div>
        )}
        {savedImagesPins.length === 0 && !isVideoTab && (
          <div className="text-(--text-primary) h-full w-full flex justify-center items-center">
            No Saved Images Posts yet...
          </div>
        )}
        {isLoading || error ? (
          <GridVideoLayoutSkeleton />
        ) : isVideoTab ? (
          <GridMediaLayoutProfile
            user={user}
            posts={savedVideoPins}
            isVideoTab={isVideoTab}
          />
        ) : (
          <GridMediaLayoutProfile
            user={user}
            posts={savedImagesPins}
            isVideoTab={isVideoTab}
          />
        )}
      </div>
    </div>
  );
};
