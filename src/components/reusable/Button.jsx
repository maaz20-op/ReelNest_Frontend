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
  fnc = function () {},
}) => {
  return (
    <button
      className={`${background} ${border} ${textSizes[textSize]} ${width} ${otherStyles}  ${font} ${paddings[padding]}  text-(--text-primary) `}
      onClick={fnc}
    >
      {content}
    </button>
  );
};
