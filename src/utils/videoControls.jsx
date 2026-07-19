import { useEffect } from "react";
import { useState } from "react";

export const useVideoControls = (videoRef) => {
  const [isPlay, setPlay] = useState(false);
  const [progressBarWidth, setWidth] = useState(0);
  const [hidePlayPauseIcon, setHide] = useState(false);

  useEffect(() => {
    if (!isPlay) return;
    const timeoutId = setTimeout(() => {
      setHide(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isPlay]);

  const handleProgressBar = () => {
    const totalDuration = Math.floor(videoRef?.current.duration);
    const currentPlayTime = Math.floor(videoRef?.current.currentTime);

    const progress = (currentPlayTime / totalDuration) * 100;

    setWidth(progress);
  };

  const handleClick = () => {
    setPlay((prev) => !prev);
    if (isPlay) return videoRef?.current.pause();

    videoRef?.current.play();
    setHide(false);
  };

  return {
    handleProgressBar,
    handleClick,
    isPlay,
    setPlay,
    setHide,
    progressBarWidth,
    hidePlayPauseIcon,
  };
};
