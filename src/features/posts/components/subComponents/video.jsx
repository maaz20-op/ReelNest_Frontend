import { Icons } from "../../../../assets/icons";
import { useVideoControls } from "../../../../utils/videoControls";

export const HomeFeedVideo = ({ mediaUrl, videoRef, isMute, setMute }) => {
  const {
    handleProgressBar,
    handleClick,
    isPlay,
    setPlay,
    setHide,
    progressBarWidth,
    hidePlayPauseIcon,
  } = useVideoControls(videoRef);

  return (
    <div className="video/image-container w-full relative h-full bg-black lg:rounded-2xl overflow-hidden">
      {Boolean(mediaUrl && typeof mediaUrl === "string" && mediaUrl.trim()) && (
        <video
          key={mediaUrl} /* IMPORTANT: Re-mounts video when mediaUrl changes */
          ref={videoRef}
          className="w-full object-cover h-[600px] sm:h-[540px] lg:h-[580px] 2xl:h-[620px] lg:rounded-2xl"
          src={mediaUrl}
          onPlay={() => setPlay(true)}
          onClick={() => {
            setHide(false);
            setMute((prev) => !prev);
          }}
          onTimeUpdate={handleProgressBar}
          muted={isMute}
          preload="metadata"
          onError={(e) => {
            console.warn("Video failed to load for URL:", mediaUrl);
          }}
        >
          Your browser does not support the video tag.
        </video>
      )}
      {!hidePlayPauseIcon && (
        <div
          onClick={handleClick}
          className="play-pause-icon absolute top-[45%]  flex justify-center items-center p-4 rounded-full left-[44%] "
        >
          {isPlay ? (
            <Icons.pause size={30} color="white" />
          ) : (
            <Icons.play size={30} color="white" />
          )}
        </div>
      )}
      <div
        onClick={() => setMute((prev) => !prev)}
        className="mute-unmute h-5 w-5 sm:h-7 sm:w-7 flex justify-center items-center rounded-full bg-black absolute bottom-2 right-1"
      >
        {isMute ? (
          <Icons.mute size={window.innerWidth > 450 ? 20 : 14} color="white" />
        ) : (
          <Icons.unmute
            size={window.innerWidth > 450 ? 20 : 14}
            color="white"
          />
        )}
      </div>
      <div className="progress-bar h-1 absolute bottom-0 w-full bg-gray-400">
        <div
          style={{ width: progressBarWidth + "%" }}
          className="h-1 bg-red-500 "
        ></div>
      </div>
    </div>
  );
};
