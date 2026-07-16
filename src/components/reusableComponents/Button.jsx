import { useState } from "react";

const paddings = {
  sm: "px-2 py-1",
  md: "px-3 py-2",
  lg: "px-4 py-3",
};

const textSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Button = ({
  background = "bg-(--bg-secondary)",
  padding = "sm",
  content,
  border = "rounded",
  textSize = "md",
  otherStyles = "",
  disable = false,
  width = "w-fit",
  font,
  skeleton = false,
  fnc = function () {},
}) => {
  if (skeleton) {
    return (
      <div className="h-8 w-23 bg-(--bg-secondary) animate-pulse rounded-2xl"></div>
    );
  }
  return (
    <button
      disabled={disable}
      className={`${background} ${border} ${textSizes[textSize]} ${width} ${otherStyles}  ${font} ${paddings[padding]} flex justify-center items-center  text-(--text-primary) `}
      onClick={fnc}
    >
      {content}
    </button>
  );
};
